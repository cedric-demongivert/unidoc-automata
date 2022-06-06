/**
 * 
 */
export type Operator = ('=' | '===')

/**
 * 
 */
export namespace Operator {
  /**
   * 
   */
  export const ASSIGN: '=' = '='

  /**
   * 
   */
  export const EQUALS: '===' = '==='

  /**
   * 
   */
  export const ALL: Operator[] = [
    ASSIGN,
    EQUALS
  ]
}