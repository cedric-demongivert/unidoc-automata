import { Binding, NodePath } from '@babel/traverse'
import * as types from '@babel/types'
import { UnidocPath } from '@cedric-demongivert/unidoc'

import { UnidocAutomataAnnotation } from './UnidocAutomataAnnotation'
import { UnidocAutomataAnnotationExtractor } from './UnidocAutomataAnnotationExtractor'
import { UnidocAutomataClass } from './UnidocAutomataClass'
import { UnidocAutomataEventHook } from './UnidocAutomataEventHook'
import { UnidocAutomataEventHookType } from './UnidocAutomataEventHookType'
import { UnidocAutomataExtractionContext } from './UnidocAutomataExtractionContext'
import { UnidocAutomataListener } from './UnidocAutomataListener'

import { UnidocAutomataSchema } from './UnidocAutomataSchema'
import { UnidocAutomataScope } from './UnidocAutomataScope'
import { UnidocAutomataSource } from './UnidocAutomataSource'
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
  export function extractFromSource(source: UnidocAutomataSource): Array<UnidocAutomataSchema> {
    const statements: Array<NodePath<types.Statement>> = source.program.get('body')
    const result: Array<UnidocAutomataSchema> = []

    for (let index = 0; index < statements.length; ++index) {
      const statement: NodePath<types.Statement> = statements[index]

      if (!statement.isExportDeclaration()) continue

      const schema: UnidocAutomataSchema | undefined = extractFromExportDeclaration(statement)

      if (schema == null) continue

      schema.builder.source = source.path
      result.push(schema)
    }

    return result
  }

  /**
   * 
   */
  function extractFromExportDeclaration(exportationPath: NodePath<types.ExportDeclaration>): UnidocAutomataSchema | undefined {
    if (exportationPath.isExportDefaultDeclaration()) {
      return extractFromExportDefaultDeclaration(exportationPath)
    }

    if (exportationPath.isExportNamedDeclaration()) {
      return extractFromExportNamedDeclaration(exportationPath)
    }

    return undefined
  }

  /**
   * 
   */
  function extractFromExportNamedDeclaration(exportationPath: NodePath<types.ExportNamedDeclaration>): UnidocAutomataSchema | undefined {
    const declaration = exportationPath.get('declaration')

    if (declaration.isClassDeclaration()) {
      const result: UnidocAutomataSchema | undefined = extractFromClassDeclaration(declaration)

      if (result == null) return undefined

      result.builder.setIdentifier(declaration.node.id)

      return result
    }

    return undefined
  }

  /**
   * 
   */
  function extractFromExportDefaultDeclaration(exportationPath: NodePath<types.ExportDefaultDeclaration>): UnidocAutomataSchema | undefined {
    const declaration = exportationPath.get('declaration')

    if (declaration.isClassDeclaration()) {
      const result: UnidocAutomataSchema | undefined = extractFromClassDeclaration(declaration)

      if (result == null) return undefined

      result.builder
        .setDefault(true)
        .setIdentifier(declaration.node.id)

      return result
    }

    if (declaration.isObjectExpression()) {

    }

    return undefined
  }

  /**
   * 
   */
  function extractFromClassDeclaration(classPath: NodePath<types.ClassDeclaration>): UnidocAutomataSchema | undefined {
    const decorators = classPath.get('decorators')

    if (!(decorators instanceof Array)) return undefined
    if (decorators.length < 1) return undefined

    let index: number = 0

    while (index < decorators.length) {
      const decorator: NodePath<types.Decorator> = decorators[index]
      const annotation: UnidocAutomataAnnotation | undefined = UnidocAutomataAnnotationExtractor.extract(decorator)

      if (annotation === UnidocAutomataAnnotation.GENERATE) {
        const result: UnidocAutomataSchema = new UnidocAutomataSchema()

        handleGenerateAnnotation(decorator, result)
        handleClassAnnotations(classPath, result)
        handleClassMethods(classPath, result)

        return result
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
  function handleClassMethods(classDeclaration: NodePath<types.ClassDeclaration>, output: UnidocAutomataSchema): void {
    const classBody = classDeclaration.get('body').get('body')

    for (const method of classBody) {
      if (!method.isClassMethod()) continue
      if (method.node.accessibility !== PUBLIC_ACCESSIBILITY) continue
      if (method.node.decorators == null) continue

      const decorators = method.get('decorators')

      if (!(decorators instanceof Array)) continue

      for (const decorator of decorators) {
        const annotation: UnidocAutomataAnnotation | undefined = UnidocAutomataAnnotationExtractor.extract(decorator)

        if (annotation == null) continue

        handleAnnotatedMethod(method, decorator, annotation, output)
        decorator.remove()
      }
    }
  }

  /**
   * 
   */
  function handleAnnotatedMethod(method: NodePath<types.ClassMethod>, decorator: NodePath<types.Decorator>, annotation: UnidocAutomataAnnotation, output: UnidocAutomataSchema): void {
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
  function handleStreamHookAnnotation(method: NodePath<types.ClassMethod>, decorator: NodePath<types.Decorator>, type: UnidocAutomataStreamHookType, output: UnidocAutomataSchema): void {
    output.streamHooks.push(UnidocAutomataStreamHook.DEFAULT)

    output.streamHooks.last
      .setListener(new UnidocAutomataListener(method.node))
      .setType(type)
  }

  /**
   * 
   */
  function handleEventHookAnnotation(method: NodePath<types.ClassMethod>, decorator: NodePath<types.Decorator>, type: UnidocAutomataEventHookType, output: UnidocAutomataSchema): void {
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
      .setListener(new UnidocAutomataListener(method.node))
      .setType(type)
      .setScope(scope)
  }
}