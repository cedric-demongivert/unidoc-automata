import * as types from '@babel/types'

import { BabelEmpty } from './BabelEmpty'
import { Duplicator } from '@cedric-demongivert/gl-tool-collection'

/**
 * 
 */
const VALUE: string = 'value'

/**
 * 
 */
export class UnidocAutomataClass {
  /**
   * 
   */
  public identifier: types.Identifier

  /**
   * 
   */
  public default: boolean

  /**
   * 
   */
  public source: types.StringLiteral

  /**
   * 
   */
  public constructor() {
    this.identifier = BabelEmpty.IDENTIFIER
    this.source = BabelEmpty.STRING_LITERAL
    this.default = false
  }

  /**
   * 
   */
  public setIdentifier(identifier: types.Identifier): this {
    this.identifier = identifier
    return this
  }

  /**
   * 
   */
  public setSource(source: types.StringLiteral): this {
    this.source = source
    return this
  }

  /**
   * 
   */
  public setDefault(value: boolean): this {
    this.default = value
    return this
  }

  /**
   * 
   */
  public clear(): this {
    this.identifier = BabelEmpty.IDENTIFIER
    this.source = BabelEmpty.STRING_LITERAL
    this.default = false
    return this
  }

  /**
   * 
   */
  public copy(toCopy: UnidocAutomataClass): this {
    this.identifier = toCopy.identifier
    this.source = toCopy.source
    this.default = toCopy.default
    return this
  }

  /**
   * 
   */
  public clone(toCopy: UnidocAutomataClass): UnidocAutomataClass {
    return new UnidocAutomataClass().copy(this)
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof UnidocAutomataClass) {
      return (
        other.identifier === this.identifier &&
        other.source === this.source &&
        other.default === this.default
      )
    }

    return false
  }
}

/**
 * 
 */
export namespace UnidocAutomataClass {
  /**
   * 
   */
  export function create(): UnidocAutomataClass {
    return new UnidocAutomataClass()
  }

  /**
   * 
   */
  export const ALLOCATOR: Duplicator<UnidocAutomataClass> = Duplicator.fromFactory(create)
}