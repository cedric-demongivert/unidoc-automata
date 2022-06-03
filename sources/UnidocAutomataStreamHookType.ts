/**
 * 
 */
export type UnidocAutomataStreamHookType = (
  UnidocAutomataStreamHookType.START |
  UnidocAutomataStreamHookType.SUCCESS |
  UnidocAutomataStreamHookType.FAILURE
)

/**
 * 
 */
export namespace UnidocAutomataStreamHookType {
  /**
   * 
   */
  export type START = 0

  /**
   * 
   */
  export const START: START = 0

  /**
   * 
   */
  export type SUCCESS = 1

  /**
   * 
   */
  export const SUCCESS: SUCCESS = 1

  /**
   * 
   */
  export type FAILURE = 2

  /**
   * 
   */
  export const FAILURE: FAILURE = 2

  /**
   * 
   */
  export const DEFAULT: UnidocAutomataStreamHookType = START

  /**
   * 
   */
  export const ALL: UnidocAutomataStreamHookType[] = [
    START,
    SUCCESS,
    FAILURE
  ]

  /**
   * 
   */
  export function toString(type: UnidocAutomataStreamHookType): string | undefined {
    /**
     * 
     */
    switch (type) {
      case START: return 'START'
      case SUCCESS: return 'SUCCESS'
      case FAILURE: return 'FAILURE'
      default: return undefined
    }
  }

  /**
   * 
   */
  export function toDebugString(type: UnidocAutomataStreamHookType): string {
    return `UnidocAutomataStreamHookType #${type} (${toString(type) || 'undefined'})`
  }
}