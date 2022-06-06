import * as babel from '@babel/core'

import { Sequence } from '@cedric-demongivert/gl-tool-collection'
import { equals } from '@cedric-demongivert/gl-tool-utils'

import { UnidocAutomataSchemaBuilder } from './UnidocAutomataSchemaBuilder'

import { EventHookSchema } from './EventHookSchema'
import { StreamHookSchema } from './StreamHookSchema'
import { ResultProviderSchema } from './ResultProviderSchema'
import { TypeSchema } from './TypeSchema'
import { UnidocScope } from './UnidocScope'
import { EventHookType } from './EventHookType'
import { StreamHookType } from './StreamHookType'
import { NamedTypeSchema } from './NamedTypeSchema'
import { StaticPath } from './StaticPath'
import { assertNotNull } from './assertNotNull'


/**
 * 
 */
export class UnidocAutomataSchema {
  /**
   * 
   */
  public readonly automata: TypeSchema

  /**
   * 
   */
  public readonly builder: TypeSchema

  /**
   * 
   */
  public readonly eventHooks: Sequence<EventHookSchema | null>

  /**
   * 
   */
  public readonly streamHooks: Sequence<StreamHookSchema | null>

  /**
   * 
   */
  public readonly resultProvider: ResultProviderSchema | undefined

  /**
   * 
   */
  public constructor(builder: UnidocAutomataSchemaBuilder) {
    this.automata = builder.automata || UnidocAutomataSchema.DEFAULT_AUTOMATA
    this.builder = assertNotNull(builder.builder)
    this.eventHooks = builder.eventHooks.clone().view()
    this.streamHooks = builder.streamHooks.clone().view()
    this.resultProvider = builder.resultProvider
  }

  /**
   * 
   */
  public getListenedEvents(scope: UnidocScope, result: Set<EventHookType> = new Set()): Set<EventHookType> {
    result.clear()

    for (const hook of this.eventHooks) {
      if (hook && hook.scope === scope) {
        result.add(hook.type)
      }
    }

    return result
  }

  /**
   * 
   */
  public hasStreamHookOfType(type: StreamHookType): boolean {
    for (const hook of this.streamHooks) {
      if (hook && hook.type === type) return true
    }

    return false
  }

  /**
   * 
   */
  public getStreamHooksOfType(type: StreamHookType): Array<StreamHookSchema> {
    return [...this.streamHooksOfType(type)]
  }

  /**
   * 
   */
  public * streamHooksOfType(type: StreamHookType): IterableIterator<StreamHookSchema> {
    for (const hook of this.streamHooks) {
      if (hook && hook.type === type) {
        yield hook
      }
    }
  }

  /**
   * 
   */
  public needsDepth(): boolean {
    for (const hook of this.eventHooks) {
      if (hook && hook.scope != UnidocScope.EVERYTHING) {
        return true
      }
    }

    return false
  }

  /**
   * @see Comparable.prototype.equals
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof UnidocAutomataSchema) {
      return (
        other.automata.equals(this.automata) &&
        other.eventHooks.equals(this.eventHooks) &&
        other.streamHooks.equals(this.streamHooks) &&
        other.builder.equals(this.builder) &&
        equals(other.resultProvider, this.resultProvider)
      )
    }

    return false
  }
}

/**
 * 
 */
export namespace UnidocAutomataSchema {
  /**
   * 
   */
  const UNIDOC_AUTOMATA: babel.types.Identifier = babel.types.identifier('UnidocAutomata')

  /**
   * 
   */
  export const DEFAULT_AUTOMATA: TypeSchema = NamedTypeSchema.create(
    undefined,
    new StaticPath('@cedric-demongivert/unidoc-automata'),
    UNIDOC_AUTOMATA,
    UNIDOC_AUTOMATA
  )

  /**
   * 
   */
  export function create(builder: UnidocAutomataSchemaBuilder): UnidocAutomataSchema {
    return new UnidocAutomataSchema(builder)
  }
}