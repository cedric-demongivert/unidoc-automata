import { StreamHookType } from './StreamHookType'
import { HookSchema } from './HookSchema'
import { SourceCodeElement } from './SourceCodeElement'
import { MethodArgument } from './MethodArgument'

/**
 * 
 */
export class StreamHookSchema {
  /**
   * 
   */
  public readonly type: StreamHookType

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
  public constructor(type: StreamHookType, listener: HookSchema) {
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

    if (other instanceof StreamHookSchema) {
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
export namespace StreamHookSchema {
  /**
   * 
   */
  export function create(type: StreamHookType, hook: HookSchema): StreamHookSchema {
    return new StreamHookSchema(type, hook)
  }
}