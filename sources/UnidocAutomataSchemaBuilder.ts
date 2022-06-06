import { Empty, equals } from "@cedric-demongivert/gl-tool-utils"
import { Pack } from "@cedric-demongivert/gl-tool-collection"

import { EventHookSchema } from './EventHookSchema'
import { StreamHookSchema } from './StreamHookSchema'
import { TypeSchema } from './TypeSchema'
import { UnidocAutomataSchema } from "./UnidocAutomataSchema"
import { ResultProviderSchema } from "./ResultProviderSchema"

/**
 * 
 */
export class UnidocAutomataSchemaBuilder {
  /**
   * 
   */
  public automata: TypeSchema | undefined

  /**
   * 
   */
  public builder: TypeSchema | undefined

  /**
   * 
   */
  public readonly eventHooks: Pack<EventHookSchema | null>

  /**
   * 
   */
  public readonly streamHooks: Pack<StreamHookSchema | null>

  /**
   * 
   */
  public resultProvider: ResultProviderSchema | undefined

  /**
   * 
   */
  public constructor() {
    this.automata = undefined
    this.builder = undefined
    this.eventHooks = Pack.any(0, Empty.nullptr)
    this.streamHooks = Pack.any(0, Empty.nullptr)
    this.resultProvider = undefined
  }

  /**
   * 
   */
  public build(): UnidocAutomataSchema {
    return new UnidocAutomataSchema(this)
  }

  /**
   * @see Clearable.prototype.clear
   */
  public clear(): void {
    this.automata = undefined
    this.eventHooks.clear()
    this.streamHooks.clear()
    this.builder = undefined
    this.resultProvider = undefined
  }

  /**
   * @see Comparable.prototype.equals
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof UnidocAutomataSchemaBuilder) {
      return (
        equals(other.automata, this.automata) &&
        other.eventHooks.equals(this.eventHooks) &&
        other.streamHooks.equals(this.streamHooks) &&
        equals(other.builder, this.builder) &&
        equals(other.resultProvider, this.resultProvider)
      )
    }

    return false
  }

  /**
   * @see Assignable.prototype.copy
   */
  public copy(toCopy: UnidocAutomataSchemaBuilder): this {
    this.automata = toCopy.automata
    this.builder = toCopy.builder
    this.eventHooks.copy(toCopy.eventHooks)
    this.streamHooks.copy(toCopy.streamHooks)
    this.resultProvider = toCopy.resultProvider

    return this
  }
}

/**
 * 
 */
export namespace UnidocAutomataSchemaBuilder {
  /**
   * 
   */
  export function create(): UnidocAutomataSchemaBuilder {
    return new UnidocAutomataSchemaBuilder()
  }
}