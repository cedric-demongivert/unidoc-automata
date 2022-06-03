import { Binding, NodePath, Scope } from '@babel/traverse'
import * as types from '@babel/types'
import { UnidocAutomataAnnotation } from './UnidocAutomataAnnotation'
import { UnidocAutomataClass } from './UnidocAutomataClass'

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
export namespace UnidocAutomataAnnotationExtractor {
  /**
   * 
   */
  export function extract(node: types.Decorator, scope: Scope): UnidocAutomataAnnotation | undefined {
    const expression: types.Expression = node.expression

    if (!types.isCallExpression(expression)) return undefined

    const callee: types.Expression | types.V8IntrinsicIdentifier = expression.callee

    if (!types.isMemberExpression(callee)) return undefined

    const object: types.Expression = callee.object
    const property: types.Expression | types.PrivateName = callee.property

    if (!types.isIdentifier(object)) return undefined

    const objectBinding: Binding | undefined = scope.getBinding(object.name)

    if (objectBinding == null) return undefined

    const objectBindingNode: types.Node = objectBinding.path.node

    if (!types.isImportSpecifier(objectBindingNode)) return undefined

    const imported: types.StringLiteral | types.Identifier = objectBindingNode.imported

    if (!types.isIdentifier(imported)) return undefined
    if (imported.name !== TARGET) return undefined

    if (!types.isIdentifier(property)) return undefined

    return UnidocAutomataAnnotation.fromName(property.name)
  }

  /**
   * 
   */
  export function extractTypeBinding(path: NodePath<types.Decorator>, index: number): Binding | undefined {
    const expression: types.Expression = path.node.expression

    if (!types.isCallExpression(expression)) return undefined

    const decoratorArguments = expression.arguments

    if (decoratorArguments.length <= index) return undefined

    const argument = decoratorArguments[index]

    if (!types.isIdentifier(argument)) {
      const argumentPath: NodePath = path.get(`expression.arguments.${index}`) as NodePath
      throw argumentPath.buildCodeFrameError('Illegal type parameter : the given parameter is not an identifier.')
    }

    const argumentBinding: Binding | undefined = path.scope.getBinding(argument.name)

    if (argumentBinding === undefined) {
      const argumentPath: NodePath = path.get(`expression.arguments.${index}`) as NodePath
      throw argumentPath.buildCodeFrameError('Illegal type parameter : the given parameter does not refer to anything.')
    }

    if (argumentBinding.kind !== MODULE) {
      const argumentPath: NodePath = path.get(`expression.arguments.${index}`) as NodePath
      throw argumentPath.buildCodeFrameError('Illegal type parameter : the given parameter does not refer to an imported module.')
    }

    return argumentBinding
  }

  /**
   * 
   */
  export function extractString(path: NodePath<types.Decorator>, index: number): string | undefined {
    const expression: types.Expression = path.node.expression

    if (!types.isCallExpression(expression)) return undefined

    const decoratorArguments = expression.arguments

    if (decoratorArguments.length <= index) return undefined

    const argument = decoratorArguments[index]

    if (!types.isStringLiteral(argument)) {
      const argumentPath: NodePath = path.get(`expression.arguments.${index}`) as NodePath
      throw argumentPath.buildCodeFrameError('Illegal type parameter : the given parameter is not a string literal.')
    }

    return argument.value
  }


  /**
   * 
   */
  export function extractClass(binding: Binding, output: UnidocAutomataClass = new UnidocAutomataClass()): UnidocAutomataClass | undefined {
    const bindingPath: NodePath<types.Node> = binding.path
    const bindingNode: types.Node = bindingPath.node
    const parentNode: types.Node = bindingPath.parent

    if (!types.isImportDeclaration(parentNode)) return undefined

    if (types.isImportSpecifier(bindingNode)) {
      const imported: types.StringLiteral | types.Identifier = bindingNode.imported

      if (types.isIdentifier(imported)) {
        output.identifier = imported
      } else {
        output.identifier = types.identifier(imported.value)
      }

      output.default = false
      output.source = parentNode.source
      return output
    }

    if (types.isImportDefaultSpecifier(bindingNode)) {
      output.identifier = bindingNode.local
      output.default = true
      output.source = parentNode.source
      return output
    }

    return undefined
  }

}