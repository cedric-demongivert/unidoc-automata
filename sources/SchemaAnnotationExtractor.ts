import * as babel from '@babel/core'

import { SchemaAnnotationType } from './SchemaAnnotationType'
import { SourceCodeElement } from './SourceCodeElement'
import { TypeSchema } from './TypeSchema'

/**
 * 
 */
const TARGET: string = 'UnidocAutomata'

/**
 * 
 */
const MODULE: string = 'module'

/**
 * 
 */
export namespace SchemaAnnotationExtractor {
  /**
   * 
   */
  export function extract(decorator: babel.NodePath<babel.types.Decorator>): SchemaAnnotationType | undefined {
    const expression: babel.types.Expression = decorator.node.expression

    if (!babel.types.isCallExpression(expression)) return undefined

    const callee: babel.types.Expression | babel.types.V8IntrinsicIdentifier = expression.callee

    if (!babel.types.isMemberExpression(callee)) return undefined

    const object: babel.types.Expression = callee.object
    const property: babel.types.Expression | babel.types.PrivateName = callee.property

    if (!babel.types.isIdentifier(object)) return undefined

    const objectBinding = decorator.scope.getBinding(object.name)

    if (objectBinding == null) return undefined

    const objectBindingNode: babel.types.Node = objectBinding.path.node

    if (!babel.types.isImportSpecifier(objectBindingNode)) return undefined

    const imported: babel.types.StringLiteral | babel.types.Identifier = objectBindingNode.imported

    if (!babel.types.isIdentifier(imported)) return undefined
    if (imported.name !== TARGET) return undefined

    if (!babel.types.isIdentifier(property)) return undefined

    return SchemaAnnotationType.fromName(property.name)
  }

  /**
   * 
   */
  export function extractTypeBinding(path: babel.NodePath<babel.types.Decorator>, index: number) {
    const expression: babel.NodePath<babel.types.Expression> = path.get('expression')

    if (!expression.isCallExpression()) return undefined

    const decoratorArguments = expression.get('arguments')

    if (decoratorArguments.length <= index) return undefined

    const argument = decoratorArguments[index]

    if (!argument.isIdentifier()) {
      throw argument.buildCodeFrameError('Illegal type parameter : the given parameter is not an identifier.')
    }

    const argumentBinding = path.scope.getBinding(argument.node.name)

    if (argumentBinding == null) {
      throw argument.buildCodeFrameError('Illegal type parameter : the given parameter does not refer to anything.')
    }

    return argumentBinding
  }

  /**
   * 
   */
  export function extractString(path: babel.NodePath<babel.types.Decorator>, index: number): string | undefined {
    const expression: babel.types.Expression = path.node.expression

    if (!babel.types.isCallExpression(expression)) return undefined

    const decoratorArguments = expression.arguments

    if (decoratorArguments.length <= index) return undefined

    const argument = decoratorArguments[index]

    if (!babel.types.isStringLiteral(argument)) {
      const argumentPath: babel.NodePath = path.get(`expression.arguments.${index}`) as babel.NodePath
      throw argumentPath.buildCodeFrameError('Illegal type parameter : the given parameter is not a string literal.')
    }

    return argument.value
  }


  /**
   * 
   */
  export function extractTypeSchemaFromBinding(element: SourceCodeElement<babel.types.Decorator>, binding: any): TypeSchema | undefined {
    return TypeSchema.fromImportSpecifier(element.source.element(binding.path))
  }


  /**
   * 
   */
  export function extractTypeSchema(element: SourceCodeElement<babel.types.Decorator>, index: number): TypeSchema | undefined {
    const binding = extractTypeBinding(element.path, index)

    if (binding == null) return undefined

    return TypeSchema.fromImportSpecifier(element.source.element(binding.path))
  }
}