import { Binding, NodePath } from '@babel/traverse'
import * as types from '@babel/types'
import { UnidocPath } from '@cedric-demongivert/unidoc'

import { UnidocAutomataAnnotation } from './UnidocAutomataAnnotation'
import { UnidocAutomataAnnotationExtractor } from './UnidocAutomataAnnotationExtractor'
import { UnidocAutomataClass } from './UnidocAutomataClass'
import { UnidocAutomataEventHook } from './UnidocAutomataEventHook'
import { UnidocAutomataEventHookType } from './UnidocAutomataEventHookType'
import { UnidocAutomataListener } from './UnidocAutomataListener'

import { UnidocAutomataSchema } from './UnidocAutomataSchema'
import { UnidocAutomataScope } from './UnidocAutomataScope'
import { UnidocAutomataStreamHook } from './UnidocAutomataStreamHook'
import { UnidocAutomataStreamHookType } from './UnidocAutomataStreamHookType'

/**
 * 
 */
const PUBLIC_ACCESSIBILITY: string = 'public'

/**
 * 
 */
export namespace UnidocAutomataSchemaExtractor {
  /**
   * 
   */
  export function extract(classPath: NodePath<types.ClassDeclaration>, output: UnidocAutomataSchema = new UnidocAutomataSchema()): UnidocAutomataSchema | undefined {
    const decorators: Array<types.Decorator> | null | undefined = classPath.node.decorators

    if (decorators == null) return undefined
    if (decorators.length < 1) return undefined

    let index: number = 0

    while (index < decorators.length) {
      const decorator: types.Decorator = decorators[index]
      const annotation: UnidocAutomataAnnotation | undefined = UnidocAutomataAnnotationExtractor.extract(decorator, classPath.scope)

      if (annotation === UnidocAutomataAnnotation.GENERATE) {
        output.clear()

        output.builder.setIdentifier()
        handleGenerateAnnotation(classPath.get(`decorators.${index}`) as NodePath<types.Decorator>, output)
        handleClassAnnotations(classPath, output)
        handleClassMethods(classPath, output)

        return output
      } else {
        index += 1
      }
    }

    return undefined
  }

  /**
   *  
   */
  function handleGenerateAnnotation(decoratorPath: NodePath<types.Decorator>, output: UnidocAutomataSchema): void {
    const typeBinding: Binding | undefined = UnidocAutomataAnnotationExtractor.extractTypeBinding(decoratorPath, 0)

    if (typeBinding == null) {
      output.base.copy(UnidocAutomataSchema.DEFAULT_BASE_CLASS)
      decoratorPath.remove()
      return
    }

    const baseClass: UnidocAutomataClass | undefined = UnidocAutomataAnnotationExtractor.extractClass(typeBinding, output.base)

    if (baseClass == null) {
      throw decoratorPath.buildCodeFrameError('Unable to extract class information from the provided identifier.')
    }

    if (typeBinding.references === 1) {
      const parent: NodePath<types.ImportDeclaration> = typeBinding.path.parentPath as NodePath<types.ImportDeclaration>

      if (parent.node.specifiers.length === 1) {
        parent.remove()
      } else {
        typeBinding.path.remove()
      }
    }

    decoratorPath.remove()
  }

  /**
   *  
   */
  function handleClassAnnotations(classPath: NodePath<types.ClassDeclaration>, output: UnidocAutomataSchema): void {

  }

  /**
   *  
   */
  function handleClassMethods(classPath: NodePath<types.ClassDeclaration>, output: UnidocAutomataSchema): void {
    const classNode: types.ClassDeclaration = classPath.node
    const classBody = classNode.body.body

    for (let index = 0; index < classBody.length; ++index) {
      const method = classBody[index]

      if (!types.isClassMethod(method)) continue
      if (method.accessibility !== PUBLIC_ACCESSIBILITY) continue
      if (method.decorators == null) continue

      const decorators: types.Decorator[] = method.decorators
      let decoratorIndex: number = 0

      while (decoratorIndex < decorators.length) {
        const decorator: types.Decorator = decorators[decoratorIndex]
        const annotation: UnidocAutomataAnnotation | undefined = UnidocAutomataAnnotationExtractor.extract(decorator, classPath.scope)

        if (annotation == null) {
          decoratorIndex += 1
          continue
        }

        const decoratorPath: NodePath<types.Decorator> = classPath.get(`body.body.${index}.decorators.${decoratorIndex}`) as NodePath<types.Decorator>

        handleAnnotatedMethod(method, decoratorPath, annotation, output)

        decoratorPath.remove()
      }
    }
  }

  /**
   * 
   */
  function handleAnnotatedMethod(method: types.ClassMethod, decorator: NodePath<types.Decorator>, annotation: UnidocAutomataAnnotation, output: UnidocAutomataSchema): void {
    switch (annotation) {
      case UnidocAutomataAnnotation.EVENTS:
        handleEventHookAnnotation(method, decorator, UnidocAutomataEventHookType.EVENTS, output)
        break
      case UnidocAutomataAnnotation.WHITESPACES:
        handleEventHookAnnotation(method, decorator, UnidocAutomataEventHookType.WHITESPACES, output)
        break
      case UnidocAutomataAnnotation.WORDS:
        handleEventHookAnnotation(method, decorator, UnidocAutomataEventHookType.WORDS, output)
        break
      case UnidocAutomataAnnotation.TAG_STARTS:
        handleEventHookAnnotation(method, decorator, UnidocAutomataEventHookType.TAG_STARTS, output)
        break
      case UnidocAutomataAnnotation.TAG_ENDS:
        handleEventHookAnnotation(method, decorator, UnidocAutomataEventHookType.TAG_ENDS, output)
        break
      case UnidocAutomataAnnotation.START:
        handleStreamHookAnnotation(method, decorator, UnidocAutomataStreamHookType.START, output)
        break
      case UnidocAutomataAnnotation.SUCCESS:
        handleStreamHookAnnotation(method, decorator, UnidocAutomataStreamHookType.SUCCESS, output)
        break
      case UnidocAutomataAnnotation.FAILURE:
        handleStreamHookAnnotation(method, decorator, UnidocAutomataStreamHookType.FAILURE, output)
        break
      case UnidocAutomataAnnotation.GENERATE:
        throw decorator.buildCodeFrameError('Trying to decorate a method with a class decorator.')
      case UnidocAutomataAnnotation.RESULT:
        /*if (schema.resultProvider == null) {
          schema.resultProvider = key
        } else {
          throw decorator.buildCodeFrameError('Unable to handle this result annotation as the class already got one.')
        }*/
        break
      default:
        throw decorator.buildCodeFrameError(
          `Unable to handle decorator of type ${UnidocAutomataAnnotation.toDebugString(annotation)} as ` +
          'no procedure was defined for that into this extractor.'
        )
    }
  }

  /**
   * 
   */
  function handleStreamHookAnnotation(method: types.ClassMethod, decorator: NodePath<types.Decorator>, type: UnidocAutomataStreamHookType, output: UnidocAutomataSchema): void {
    output.streamHooks.push(UnidocAutomataStreamHook.DEFAULT)

    output.streamHooks.last
      .setListener(new UnidocAutomataListener(method))
      .setType(type)
  }

  /**
   * 
   */
  function handleEventHookAnnotation(method: types.ClassMethod, decorator: NodePath<types.Decorator>, type: UnidocAutomataEventHookType, output: UnidocAutomataSchema): void {
    let scope: UnidocAutomataScope = UnidocAutomataScope.DEFAULT

    const scopeValue: string | undefined = UnidocAutomataAnnotationExtractor.extractString(decorator, 0)

    if (scopeValue != undefined) {
      const candidate: UnidocAutomataScope | undefined = UnidocAutomataScope.fromName(scopeValue)

      if (candidate == null) {
        throw decorator.buildCodeFrameError(`Illegal parameter : "${scopeValue}" is not a valid scope type.`)
      }
    }

    output.eventHooks.push(UnidocAutomataEventHook.DEFAULT)

    output.eventHooks.last
      .setListener(new UnidocAutomataListener(method))
      .setType(type)
      .setScope(scope)
  }
}