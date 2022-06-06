import * as babel from '@babel/core'

/**
 * 
 */
export class StaticPath {
  /**
   * 
   */
  public readonly value: string

  /**
   * 
   */
  public readonly literal: babel.types.StringLiteral

  /**
   * 
   */
  public constructor(value: string) {
    this.value = value
    this.literal = babel.types.stringLiteral(value)
  }

  /**
   * 
   */
  public resolve(path: string): string {
    return this.value
  }

  /**
   * 
   */
  public resolveAsLiteral(path: string): babel.types.StringLiteral {
    return this.literal
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof StaticPath) {
      return other.value === this.value
    }

    return false
  }
}

/**
 * 
 */
export namespace StaticPath {
  /**
   * 
   */
  export function create(path: string): StaticPath {
    return new StaticPath(path)
  }
}