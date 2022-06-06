import * as babel from '@babel/core'

import { resolve as resolvePath } from 'path'
import { existsSync } from 'fs'

import { Comparable } from '@cedric-demongivert/gl-tool-utils'
import { SourceCode } from './SourceCode'
import { FilePath } from './FilePath'
import { StaticPath } from './StaticPath'

/**
 * 
 */
export interface SourcePath extends Comparable {
  /**
   * 
   */
  readonly value: string

  /**
   * 
   */
  readonly literal: babel.types.StringLiteral

  /**
   * 
   */
  resolve(path: string): string

  /**
   * 
   */
  resolveAsLiteral(path: string): babel.types.StringLiteral
}

/**
 * 
 */
export namespace SourcePath {
  /**
   * 
   */
  export function derivate(sourceCode: SourceCode, path: string): SourcePath {
    const resolved: string = resolvePath(sourceCode.path.value, path)

    if (existsSync(resolved)) {
      return FilePath.create(resolved)
    } else {
      return StaticPath.create(path)
    }
  }
}