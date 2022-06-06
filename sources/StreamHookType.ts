/**
 * 
 */
export type StreamHookType = (
  StreamHookType.START |
  StreamHookType.SUCCESS |
  StreamHookType.FAILURE
)

/**
 * 
 */
export namespace StreamHookType {
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
  export const DEFAULT: StreamHookType = START

  /**
   * 
   */
  export const ALL: StreamHookType[] = [
    START,
    SUCCESS,
    FAILURE
  ]

  /**
   * 
   */
  export function toString(type: StreamHookType): string | undefined {
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
  export function toDebugString(type: StreamHookType): string {
    return `StreamHookType #${type} (${toString(type) || 'undefined'})`
  }
}