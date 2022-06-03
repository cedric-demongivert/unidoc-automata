import * as types from '@babel/types'
import { Duplicator } from '@cedric-demongivert/gl-tool-collection'

/**
 * 
 */
const NONE: string = 'none'

/**
 * 
 */
function createIllegalListenerError(instance: UnidocAutomataListener): Error {
  return new Error(
    `Illegal ${instance.constructor.name} instance state : ${instance.constructor.name} instances can ` +
    `only reference ClassMethod instances that uses an instance of Identifier or StringLiteral as a key property.`
  )
}

/**
 * 
 */
function assertLegalSource(instance: UnidocAutomataListener, source: UnidocAutomataListener.Source): void {
  if (types.isClassMethod(source)) {
    if (!types.isIdentifier(source.key) && !types.isStringLiteral(source.key)) {
      throw createIllegalListenerError(instance)
    }
  }
}


/**
 * 
 */
export class UnidocAutomataListener {
  /**
   * 
   */
  private _source: UnidocAutomataListener.Source

  /**
   * 
   */
  public constructor(source?: UnidocAutomataListener.Source) {
    assertLegalSource(this, source)
    this._source = source
  }

  /**
   * 
   */
  public get source(): UnidocAutomataListener.Source {
    return this._source
  }

  /**
   * 
   */
  public set source(source: UnidocAutomataListener.Source) {
    assertLegalSource(this, source)
    this._source = source
  }

  /**
   * 
   */
  public get name(): string {
    const source: UnidocAutomataListener.Source = this.source

    if (source == null) {
      return NONE
    }

    if (types.isClassMethod(source)) {
      if (types.isIdentifier(source.key)) {
        return source.key.name
      } else if (types.isStringLiteral(source.key)) {
        return source.key.value
      } else {
        throw createIllegalListenerError(this)
      }
    } else {
      return source.value
    }
  }

  /**
   * 
   */
  public setSource(source: UnidocAutomataListener.Source): this {
    if (types.isClassMethod(source)) {
      if (!types.isIdentifier(source.key) && !types.isStringLiteral(source.key)) {
        throw createIllegalListenerError(this)
      }
    }

    this.source = source
    return this
  }

  /**
   * 
   */
  public clear(): this {
    this.source = undefined
    return this
  }

  /**
   * 
   */
  public copy(toCopy: UnidocAutomataListener): this {
    this.source = toCopy.source
    return this
  }

  /**
   * 
   */
  public clone(): UnidocAutomataListener {
    return new UnidocAutomataListener().copy(this)
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof UnidocAutomataListener) {
      return this.source === other.source
    }

    return false
  }
}

/**
 * 
 */
export namespace UnidocAutomataListener {
  /**
   * 
   */
  export type Source = types.ClassMethod | types.StringLiteral | undefined

  /**
   * 
   */
  export function create(source?: UnidocAutomataListener.Source): UnidocAutomataListener {
    return new UnidocAutomataListener(source)
  }

  /**
   * 
   */
  export const ALLOCATOR: Duplicator<UnidocAutomataListener> = Duplicator.fromFactory(create)
}