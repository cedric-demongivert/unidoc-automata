import * as babel from '@babel/core'
import { resolve as resolvePath, relative as relativePath } from 'path'

/**
 * 
 */
export class FilePath {
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
    this.value = resolvePath(value)
    this.literal = babel.types.stringLiteral(value)
  }

  /**
   * 
   */
  public resolve(path: string): string {
    return relativePath(path, this.value)
  }

  /**
   * 
   */
  public resolveAsLiteral(path: string): babel.types.StringLiteral {
    return babel.types.stringLiteral(this.resolve(path))
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof FilePath) {
      return other.value === this.value
    }

    return false
  }
}

/**
 * 
 */
export namespace FilePath {
  /**
   * 
   */
  export function create(path: string): FilePath {
    return new FilePath(path)
  }
}