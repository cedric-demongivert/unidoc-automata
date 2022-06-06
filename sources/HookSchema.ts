import * as babel from '@babel/core'
import { equals } from '@cedric-demongivert/gl-tool-utils'

import { MethodArgument } from './MethodArgument'
import { MethodType } from './MethodType'
import { SourceCodeElement } from './SourceCodeElement'

/**
 * 
 */
export class HookSchema {
  /**
   * 
   */
  public readonly origin: SourceCodeElement | null

  /**
   * 
   */
  public readonly identifier: babel.types.Expression

  /**
   * 
   */
  public constructor(origin: SourceCodeElement | null, identifier: babel.types.Expression) {
    this.origin = origin
    this.identifier = identifier
  }

  /**
   * 
   */
  public call(parameters: Array<MethodArgument>): babel.types.CallExpression
  /**
   * 
   */
  public call(callee: babel.types.Expression, parameters: Array<MethodArgument>): babel.types.CallExpression
  /**
   * 
   */
  public call(...parameters: HookSchema.CallMethodArguments): babel.types.CallExpression
  /**
   * 
   */
  public call(...parameters: HookSchema.CallMethodArguments): babel.types.CallExpression {
    if (parameters.length === 1) {
      return babel.types.callExpression(this.identifier, parameters[0])
    } else {
      return babel.types.callExpression(
        babel.types.memberExpression(
          parameters[0],
          this.identifier
        ), parameters[1]
      )
    }
  }

  /**
   * 
   */
  public callStatement(parameters: Array<MethodArgument>): babel.types.ExpressionStatement
  /**
   * 
   */
  public callStatement(callee: babel.types.Expression, parameters: Array<MethodArgument>): babel.types.ExpressionStatement
  /**
   * 
   */
  public callStatement(...parameters: HookSchema.CallMethodArguments): babel.types.ExpressionStatement
  /**
   * 
   */
  public callStatement(...parameters: HookSchema.CallMethodArguments): babel.types.ExpressionStatement {
    return babel.types.expressionStatement(this.call(...parameters))
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof HookSchema) {
      return (
        this.identifier === other.identifier &&
        equals(this.origin, other.origin)
      )
    }

    return false
  }
}

/**
 * 
 */
export namespace HookSchema {
  /**
   * 
   */
  export type CallMethodArguments = (
    [babel.types.Expression, Array<MethodArgument>] |
    [Array<MethodArgument>]
  )

  /**
   * 
   */
  export function create(origin: SourceCodeElement | null, identifier: babel.types.Identifier): HookSchema {
    return new HookSchema(origin, identifier)
  }

  /**
   * 
   */
  export function fromClassMethod(element: SourceCodeElement<babel.types.ClassMethod>, origin: SourceCodeElement | null = element): HookSchema {
    const method: babel.types.ClassMethod = element.node

    if (method.kind !== MethodType.METHOD) {
      throw element.path.buildCodeFrameError('Trying to derivate a hook from a non-method element.')
    }

    const identifier: babel.types.Expression = method.key

    if (babel.types.isIdentifier(identifier)) {
      return new HookSchema(origin, babel.types.identifier(identifier.name))
    }

    if (babel.types.isStringLiteral(identifier)) {
      return new HookSchema(origin, babel.types.stringLiteral(identifier.value))
    }

    throw element.path.buildCodeFrameError('Trying to derivate a hook from a method keyed with an unsupported type of expression.')
  }
}