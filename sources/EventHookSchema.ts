import { EventHookType } from './EventHookType'
import { HookSchema } from './HookSchema'
import { SourceCodeElement } from './SourceCodeElement'
import { UnidocScope } from './UnidocScope'
import { MethodArgument } from './MethodArgument'

/**
 * 
 */
export class EventHookSchema {
  /**
   * 
   */
  public readonly type: EventHookType

  /**
   * 
   */
  public readonly listener: HookSchema

  /**
   * 
   */
  public readonly scope: UnidocScope

  /**
   *  
   */
  public get origin(): SourceCodeElement | null {
    return this.listener.origin
  }

  /**
   * 
   */
  public constructor(type: EventHookType, listener: HookSchema, scope: UnidocScope) {
    this.type = type
    this.listener = listener
    this.scope = scope
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

    if (other instanceof EventHookSchema) {
      return (
        this.type === other.type &&
        this.listener.equals(other.listener) &&
        this.scope === other.scope
      )
    }

    return false
  }
}

/**
 * 
 */
export namespace EventHookSchema {
  /**
   * 
   */
  export function create(type: EventHookType, listener: HookSchema, scope: UnidocScope): EventHookSchema {
    return new EventHookSchema(type, listener, scope)
  }
}