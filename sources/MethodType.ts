/**
 * 
 */
export type MethodType = 'constructor' | 'method' | 'get' | 'set'

/**
 * 
 */
export namespace MethodType {
  /**
   * 
   */
  export const CONSTRUCTOR: 'constructor' = 'constructor'

  /**
   * 
   */
  export const METHOD: 'method' = 'method'

  /**
   * 
   */
  export const GET: 'get' = 'get'

  /**
   * 
   */
  export const SET: 'set' = 'set'

  /**
   * 
   */
  export const DEFAULT: MethodType = METHOD

  /**
   * 
   */
  export const ALL: MethodType[] = [
    CONSTRUCTOR,
    METHOD,
    GET,
    SET
  ]
}