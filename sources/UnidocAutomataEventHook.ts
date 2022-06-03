import { Duplicator } from '@cedric-demongivert/gl-tool-collection'
import { UnidocAutomataEventHookType } from './UnidocAutomataEventHookType'
import { UnidocAutomataListener } from './UnidocAutomataListener'
import { UnidocAutomataScope } from './UnidocAutomataScope'

/**
 * 
 */
export class UnidocAutomataEventHook {
  /**
   * 
   */
  public readonly listener: UnidocAutomataListener

  /**
   * 
   */
  public type: UnidocAutomataEventHookType

  /**
   * 
   */
  public scope: UnidocAutomataScope

  /**
   * 
   */
  public constructor() {
    this.listener = UnidocAutomataListener.create()
    this.type = UnidocAutomataEventHookType.DEFAULT
    this.scope = UnidocAutomataScope.DEFAULT
  }

  /**
   * 
   */
  public setListener(listener: UnidocAutomataListener): this {
    this.listener.copy(listener)
    return this
  }

  /**
   * 
   */
  public setType(type: UnidocAutomataEventHookType): this {
    this.type = type
    return this
  }

  /**
   * 
   */
  public setScope(scope: UnidocAutomataScope): this {
    this.scope = scope
    return this
  }

  /**
   * 
   */
  public clear(): this {
    this.listener.clear()
    this.type = UnidocAutomataEventHookType.DEFAULT
    this.scope = UnidocAutomataScope.DEFAULT
    return this
  }

  /**
   * 
   */
  public copy(toCopy: UnidocAutomataEventHook): this {
    this.listener.copy(toCopy.listener)
    this.type = toCopy.type
    this.scope = toCopy.scope
    return this
  }

  /**
   * 
   */
  public clone(): UnidocAutomataEventHook {
    return new UnidocAutomataEventHook().copy(this)
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof UnidocAutomataEventHook) {
      return (
        this.listener.equals(other.listener) &&
        this.type === other.type &&
        this.scope === other.scope
      )
    }

    return false
  }
}

/**
 * 
 */
export namespace UnidocAutomataEventHook {
  /**
   * 
   */
  export const DEFAULT: UnidocAutomataEventHook = new UnidocAutomataEventHook()

  /**
   * 
   */
  export function create(): UnidocAutomataEventHook {
    return new UnidocAutomataEventHook()
  }

  /**
   * 
   */
  export const ALLOCATOR: Duplicator<UnidocAutomataEventHook> = Duplicator.fromFactory(create)
}