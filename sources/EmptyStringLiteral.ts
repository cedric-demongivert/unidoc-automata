import * as types from "@babel/types"

import { Empty } from '@cedric-demongivert/gl-tool-utils'

/**
 * 
 */
export namespace EmptyStringLiteral {
  /**
   * 
   */
  export const INSTANCE: types.StringLiteral = types.stringLiteral(Empty.STRING)

  /**
   * 
   */
  export function get(): types.StringLiteral {
    return INSTANCE
  }
}