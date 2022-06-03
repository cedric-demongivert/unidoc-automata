import { Duplicator } from '@cedric-demongivert/gl-tool-collection'
import { UnidocAutomataStreamHookType } from './UnidocAutomataStreamHookType'
import { UnidocAutomataListener } from './UnidocAutomataListener'
import { UnidocAutomataScope } from './UnidocAutomataScope'

/**
 * 
 */
export class UnidocAutomataStreamHook {
  /**
   * 
   */
  public readonly listener: UnidocAutomataListener

  /**
   * 
   */
  public type: UnidocAutomataStreamHookType

  /**
   * 
   */
  public constructor() {
    this.listener = UnidocAutomataListener.create()
    this.type = UnidocAutomataStreamHookType.DEFAULT
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
  public setType(type: UnidocAutomataStreamHookType): this {
    this.type = type
    return this
  }

  /**
   * 
   */
  public clear(): this {
    this.listener.clear()
    this.type = UnidocAutomataStreamHookType.DEFAULT
    return this
  }

  /**
   * 
   */
  public copy(toCopy: UnidocAutomataStreamHook): this {
    this.listener.copy(toCopy.listener)
    this.type = toCopy.type
    return this
  }

  /**
   * 
   */
  public clone(): UnidocAutomataStreamHook {
    return new UnidocAutomataStreamHook().copy(this)
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof UnidocAutomataStreamHook) {
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
export namespace UnidocAutomataStreamHook {
  /**
   * 
   */
  export const DEFAULT: UnidocAutomataStreamHook = new UnidocAutomataStreamHook()

  /**
   * 
   */
  export function create(): UnidocAutomataStreamHook {
    return new UnidocAutomataStreamHook()
  }

  /**
   * 
   */
  export const ALLOCATOR: Duplicator<UnidocAutomataStreamHook> = Duplicator.fromFactory(create)
}