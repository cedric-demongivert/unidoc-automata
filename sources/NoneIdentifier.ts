import * as types from "@babel/types"

/**
 * 
 */
export namespace NoneIdentifier {
  /**
   * 
   */
  export const INSTANCE: types.Identifier = types.identifier('none')

  /**
   * 
   */
  export function get(): types.Identifier {
    return INSTANCE
  }
}