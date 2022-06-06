import babel, { parseSync, traverse } from '@babel/core'
import { readFileSync } from 'fs'

import { assertNotNull } from './assertNotNull'

import { FilePath } from './FilePath'
import { SourceCodeElement } from './SourceCodeElement'

/**
 * 
 */
export class SourceCode {
  /**
   * 
   */
  public readonly path: FilePath

  /**
   * 
   */
  public readonly file: babel.types.File

  /**
   * 
   */
  public readonly program: babel.NodePath<babel.types.Program>

  /**
   * 
   */
  public constructor(path: FilePath, options?: babel.TransformOptions) {
    this.path = path

    const code: string = readFileSync(path.value, 'utf-8')
    const file: babel.ParseResult | null = parseSync(code, options)

    if (file == null) {
      throw new Error('Babel parser gives no result for file ' + path.value + '.')
    }

    let program: babel.NodePath<babel.types.Program> | null | undefined = undefined

    traverse(file, {
      Program(path: babel.NodePath<babel.types.Program>): void {
        program = path
        path.stop()
      }
    })

    if (program == null) {
      throw new Error('Expected to find program in file node.')
    }

    this.program = program
    this.file = file
  }

  /**
   * 
   */
  public element<NodeType extends babel.types.Node>(path: babel.NodePath<NodeType>): SourceCodeElement<NodeType> {
    return new SourceCodeElement<NodeType>(this, path)
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof SourceCode) {
      return other.path.equals(this.path)
    }

    return false
  }
}

/**
 * 
 */
export namespace SourceCode {
  /**
   * 
   */
  export function create(path: FilePath, options?: babel.TransformOptions): SourceCode {
    return new SourceCode(path, options)
  }
}