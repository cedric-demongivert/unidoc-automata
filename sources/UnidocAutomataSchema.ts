import * as types from "@babel/types"

import { Pack } from "@cedric-demongivert/gl-tool-collection"

import { UnidocAutomataEventHook } from './UnidocAutomataEventHook'
import { UnidocAutomataStreamHook } from './UnidocAutomataStreamHook'
import { UnidocAutomataClass } from './UnidocAutomataClass'
import { UnidocAutomataScope } from "./UnidocAutomataScope"
import { UnidocAutomataEventHookType } from "./UnidocAutomataEventHookType"

/**
 * 
 */
export class UnidocAutomataSchema {
  /**
   * 
   */
  public readonly base: UnidocAutomataClass

  /**
   * 
   */
  public readonly builder: UnidocAutomataClass

  /**
   * 
   */
  public readonly eventHooks: Pack<UnidocAutomataEventHook>

  /**
   * 
   */
  public readonly streamHooks: Pack<UnidocAutomataStreamHook>

  /**
   * 
   */
  public readonly resultProvider: UnidocAutomataEventHook

  /**
   * 
   */
  public constructor() {
    this.base = new UnidocAutomataClass()
    this.builder = new UnidocAutomataClass()
    this.eventHooks = Pack.instance(UnidocAutomataEventHook.ALLOCATOR, 0)
    this.streamHooks = Pack.instance(UnidocAutomataStreamHook.ALLOCATOR, 0)
    this.resultProvider = new UnidocAutomataEventHook()
  }

  /**
   * 
   */
  public getListenedEvents(scope: UnidocAutomataScope, result: Set<UnidocAutomataEventHookType> = new Set()): Set<UnidocAutomataEventHookType> {
    result.clear()

    for (const hook of this.eventHooks) {
      if (hook.scope === scope) {
        result.add(hook.type)
      }
    }

    return result
  }

  /**
   * @see Clearable.prototype.clear
   */
  public clear(): void {
    this.base.clear()
    this.eventHooks.clear()
    this.streamHooks.clear()
    this.builder.clear()
    this.resultProvider.clear()
  }

  /**
   * @see Clonable.prototype.clone
   */
  public clone(): UnidocAutomataSchema {
    return new UnidocAutomataSchema().copy(this)
  }

  /**
   * @see Comparable.prototype.equals
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof UnidocAutomataSchema) {
      return (
        other.base.equals(this.base) &&
        other.eventHooks.equals(this.eventHooks) &&
        other.streamHooks.equals(this.streamHooks) &&
        other.builder.equals(this.builder) &&
        other.resultProvider.equals(this.resultProvider)
      )
    }

    return false
  }

  /**
   * @see Assignable.prototype.copy
   */
  public copy(toCopy: UnidocAutomataSchema): this {
    this.base.copy(toCopy.base)
    this.eventHooks.copy(toCopy.eventHooks)
    this.streamHooks.copy(toCopy.streamHooks)
    this.builder.copy(toCopy.builder)
    this.resultProvider.copy(toCopy.resultProvider)

    return this
  }
}

/**
 * 
 */
export namespace UnidocAutomataSchema {
  /**
   * 
   */
  export const DEFAULT_BASE_CLASS: UnidocAutomataClass = (
    new UnidocAutomataClass()
      .setIdentifier(types.identifier('UnidocAutomata'))
      .setSource(types.stringLiteral('@cedric-demongivert/unidoc-automata'))
  )

  /**
   * 
   */
  export function create(): UnidocAutomataSchema {
    return new UnidocAutomataSchema()
  }
}