import * as types from "@babel/types"
import { NoneIdentifier } from "./NoneIdentifier"

/**
 * 
 */
export namespace NoneClassMethod {
  /**
   * 
   */
  export const INSTANCE: types.ClassMethod = types.classMethod(
    'method',
    NoneIdentifier.INSTANCE,
    [],
    types.blockStatement([])
  )

  /**
   * 
   */
  export function get(): types.ClassMethod {
    return INSTANCE
  }
}