import { NodePath } from '@babel/traverse'
import * as types from '@babel/types'

import * as fileSystem from 'fs'

/**
 * 
 */
export class UnidocAutomataSource {
  /**
   * 
   */
  public readonly path: types.StringLiteral

  /**
   * 
   */
  public readonly file: types.File

  /**
   * 
   */
  public readonly program: NodePath<types.Program>

  /**
   * 
   */
  public constructor(path: string, file: types.File, program: NodePath<types.Program>) {
    this.path = types.stringLiteral(path)
    this.file = file
    this.program = program
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof UnidocAutomataSource) {
      return (
        other.file === this.file &&
        other.path === this.path &&
        other.program === this.program
      )
    }

    return false
  }
}

/**
 * 
 */
export namespace UnidocAutomataSource {
  /**
   * 
   */
  export function create(path: string, file: types.File, program: NodePath<types.Program>): UnidocAutomataSource {
    return new UnidocAutomataSource(path, file, program)
  }
}