import * as babel from '@babel/core'

import { HookSchema } from './HookSchema'
import { SourceCodeElement } from './SourceCodeElement'
import { MethodArgument } from './MethodArgument'

/**
 * 
 */
export class ResultProviderSchema {
  /**
   * 
   */
  public readonly type: babel.types.Noop | babel.types.TypeAnnotation | babel.types.TSTypeAnnotation

  /**
   * 
   */
  public readonly listener: HookSchema

  /**
   *  
   */
  public get origin(): SourceCodeElement | null {
    return this.listener.origin
  }

  /**
   * 
   */
  public constructor(type: babel.types.Noop | babel.types.TypeAnnotation | babel.types.TSTypeAnnotation, listener: HookSchema) {
    this.listener = listener
    this.type = type
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
    return this.listener.call(...parameters)
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
    return this.listener.callStatement(...parameters)
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof ResultProviderSchema) {
      return (
        this.listener.equals(other.listener) &&
        this.type === other.type
      )
    }

    return false
  }
}

/**
 * 
 */
export namespace ResultProviderSchema {
  /**
   * 
   */
  export function create(type: babel.types.Noop | babel.types.TypeAnnotation | babel.types.TSTypeAnnotation, hook: HookSchema): ResultProviderSchema {
    return new ResultProviderSchema(type, hook)
  }
}