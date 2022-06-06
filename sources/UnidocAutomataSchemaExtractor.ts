import babel from '@babel/core'

import { SchemaAnnotationType } from './SchemaAnnotationType'
import { SchemaAnnotationExtractor } from './SchemaAnnotationExtractor'
import { DefaultTypeSchema } from './DefaultTypeSchema'
import { NamedTypeSchema } from './NamedTypeSchema'
import { EventHookSchema } from './EventHookSchema'
import { EventHookType } from './EventHookType'
import { HookSchema } from './HookSchema'

import { UnidocAutomataSchema } from './UnidocAutomataSchema'
import { UnidocScope } from './UnidocScope'
import { SourceCode } from './SourceCode'
import { SourceCodeElement } from './SourceCodeElement'
import { StreamHookSchema } from './StreamHookSchema'
import { StreamHookType } from './StreamHookType'
import { ResultProviderSchema } from './ResultProviderSchema'
import { UnidocAutomataSchemaBuilder } from './UnidocAutomataSchemaBuilder'

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
  export function extractFromSource(source: SourceCode): Array<UnidocAutomataSchema> {
    const statements: Array<babel.NodePath<babel.types.Statement>> = source.program.get('body')
    const result: Array<UnidocAutomataSchema> = []

    for (let index = 0; index < statements.length; ++index) {
      const statement: babel.NodePath<babel.types.Statement> = statements[index]

      if (!statement.isExportDeclaration()) continue

      const schema: UnidocAutomataSchema | undefined = extractFromExportDeclaration(source.element(statement))

      if (schema == null) continue

      result.push(schema)
    }

    return result
  }

  /**
   * 
   */
  function extractFromExportDeclaration(element: SourceCodeElement<babel.types.ExportDeclaration>): UnidocAutomataSchema | undefined {
    const declaration: babel.NodePath<babel.types.ExportDeclaration> = element.path

    if (declaration.isExportDefaultDeclaration()) {
      const expression = declaration.get('declaration')

      if (expression.isClassDeclaration()) {
        const builder: UnidocAutomataSchemaBuilder | undefined = extractFromClassDeclaration(element.source.element(expression))

        if (builder == null) return undefined

        builder.builder = new DefaultTypeSchema(
          element,
          element.source.path,
          expression.node.id
        )

        return builder.build()
      }

      if (expression.isIdentifier()) {
        const binding = expression.scope.getBinding(expression.node.name)

        if (binding == null) return undefined

        const bindingPath = binding.path

        if (!bindingPath.isClassDeclaration()) return undefined

        const builder: UnidocAutomataSchemaBuilder | undefined = extractFromClassDeclaration(element.source.element(bindingPath))

        if (builder == null) return undefined

        builder.builder = new DefaultTypeSchema(
          element,
          element.source.path,
          bindingPath.node.id
        )

        return builder.build()
      }

      return undefined
    }

    if (declaration.isExportNamedDeclaration()) {
      const definition = declaration.get('declaration')

      if (definition && definition.isClassDeclaration()) {
        const builder: UnidocAutomataSchemaBuilder | undefined = extractFromClassDeclaration(element.source.element(definition))

        if (builder == null) return undefined

        builder.builder = new NamedTypeSchema(
          element,
          element.source.path,
          definition.node.id,
          definition.node.id
        )

        return builder.build()
      }

      return undefined
    }

    return undefined
  }

  /**
   * 
   */
  function extractFromClassDeclaration(element: SourceCodeElement<babel.types.ClassDeclaration>): UnidocAutomataSchemaBuilder | undefined {
    const decorators = element.path.get('decorators')

    if (!(decorators instanceof Array)) return undefined
    if (decorators.length < 1) return undefined

    let index: number = 0

    while (index < decorators.length) {
      const decorator: babel.NodePath<babel.types.Decorator> = decorators[index]
      const annotation: SchemaAnnotationType | undefined = SchemaAnnotationExtractor.extract(decorator)

      if (annotation === SchemaAnnotationType.GENERATE) {
        const result: UnidocAutomataSchemaBuilder = new UnidocAutomataSchemaBuilder()

        handleGenerateAnnotation(element.source.element(decorator), result)
        handleClassAnnotations(element, result)
        handleClassMethods(element, result)

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
  function handleGenerateAnnotation(element: SourceCodeElement<babel.types.Decorator>, output: UnidocAutomataSchemaBuilder): void {
    const binding = SchemaAnnotationExtractor.extractTypeBinding(element.path, 0)

    if (binding == null) {
      element.path.remove()
      return
    }

    output.automata = SchemaAnnotationExtractor.extractTypeSchemaFromBinding(element, binding)

    if (binding.references === 1) {
      const parent: babel.NodePath<babel.types.ImportDeclaration> = binding.path.parentPath as babel.NodePath<babel.types.ImportDeclaration>

      if (parent.node.specifiers.length === 1) {
        parent.remove()
      } else {
        binding.path.remove()
      }
    }

    element.path.remove()
  }

  /**
   *  
   */
  function handleClassAnnotations(element: SourceCodeElement<babel.types.ClassDeclaration>, output: UnidocAutomataSchemaBuilder): void {

  }

  /**
   *  
   */
  function handleClassMethods(element: SourceCodeElement<babel.types.ClassDeclaration>, output: UnidocAutomataSchemaBuilder): void {
    const classBody = element.path.get('body').get('body')

    for (const method of classBody) {
      if (!method.isClassMethod()) continue
      if (method.node.accessibility !== PUBLIC_ACCESSIBILITY) continue
      if (method.node.decorators == null) continue

      const decorators = method.get('decorators')

      if (!(decorators instanceof Array)) continue

      const methodElement = element.source.element(method)

      for (const decorator of decorators) {
        const annotation: SchemaAnnotationType | undefined = SchemaAnnotationExtractor.extract(decorator)

        if (annotation == null) continue

        handleAnnotatedMethod(methodElement, element.source.element(decorator), annotation, output)
        decorator.remove()
      }
    }
  }

  /**
   * 
   */
  function handleAnnotatedMethod(method: SourceCodeElement<babel.types.ClassMethod>, decorator: SourceCodeElement<babel.types.Decorator>, annotation: SchemaAnnotationType, output: UnidocAutomataSchemaBuilder): void {
    switch (annotation) {
      case SchemaAnnotationType.EVENTS:
        handleEventHookAnnotation(method, decorator, EventHookType.EVENTS, output)
        break
      case SchemaAnnotationType.WHITESPACES:
        handleEventHookAnnotation(method, decorator, EventHookType.WHITESPACES, output)
        break
      case SchemaAnnotationType.WORDS:
        handleEventHookAnnotation(method, decorator, EventHookType.WORDS, output)
        break
      case SchemaAnnotationType.TAG_STARTS:
        handleEventHookAnnotation(method, decorator, EventHookType.TAG_STARTS, output)
        break
      case SchemaAnnotationType.TAG_ENDS:
        handleEventHookAnnotation(method, decorator, EventHookType.TAG_ENDS, output)
        break
      case SchemaAnnotationType.START:
        handleStreamHookAnnotation(method, decorator, StreamHookType.START, output)
        break
      case SchemaAnnotationType.SUCCESS:
        handleStreamHookAnnotation(method, decorator, StreamHookType.SUCCESS, output)
        break
      case SchemaAnnotationType.FAILURE:
        handleStreamHookAnnotation(method, decorator, StreamHookType.FAILURE, output)
        break
      case SchemaAnnotationType.GENERATE:
        throw decorator.path.buildCodeFrameError('Trying to decorate a method with a class decorator.')
      case SchemaAnnotationType.RESULT:
        if (output.resultProvider == null) {
          output.resultProvider = ResultProviderSchema.create(
            method.node.returnType!,
            HookSchema.fromClassMethod(method, decorator)
          )
        } else {
          throw decorator.path.buildCodeFrameError('Unable to handle this result annotation as the class already got one.')
        }
        break
      default:
        throw decorator.path.buildCodeFrameError(
          `Unable to handle decorator of type ${SchemaAnnotationType.toDebugString(annotation)} as ` +
          'no procedure was defined for that into this extractor.'
        )
    }
  }

  /**
   * 
   */
  function handleStreamHookAnnotation(method: SourceCodeElement<babel.types.ClassMethod>, decorator: SourceCodeElement<babel.types.Decorator>, type: StreamHookType, output: UnidocAutomataSchemaBuilder): void {
    output.streamHooks.push(
      StreamHookSchema.create(
        type,
        HookSchema.fromClassMethod(method, decorator)
      )
    )
  }

  /**
   * 
   */
  function handleEventHookAnnotation(method: SourceCodeElement<babel.types.ClassMethod>, decorator: SourceCodeElement<babel.types.Decorator>, type: EventHookType, output: UnidocAutomataSchemaBuilder): void {
    let scope: UnidocScope = UnidocScope.DEFAULT

    const scopeValue: string | undefined = SchemaAnnotationExtractor.extractString(decorator.path, 0)

    if (scopeValue != undefined) {
      const candidate: UnidocScope | undefined = UnidocScope.fromName(scopeValue)

      if (candidate == null) {
        throw decorator.path.buildCodeFrameError(`Illegal parameter : "${scopeValue}" is not a valid scope type.`)
      }

      scope = candidate
    }

    output.eventHooks.push(EventHookSchema.create(type, HookSchema.fromClassMethod(method, decorator), scope))
  }
}