/**
 * 
 */
export type EventHookType = (
  EventHookType.EVENTS |
  EventHookType.WHITESPACES |
  EventHookType.WORDS |
  EventHookType.TAG_STARTS |
  EventHookType.TAG_ENDS |
  EventHookType.START |
  EventHookType.SUCCESS |
  EventHookType.FAILURE
)

/**
 * 
 */
export namespace EventHookType {
  /**
   * 
   */
  export type EVENTS = 0

  /**
   * 
   */
  export const EVENTS: EVENTS = 0

  /**
   * 
   */
  export type WHITESPACES = 1

  /**
   * 
   */
  export const WHITESPACES: WHITESPACES = 1

  /**
   * 
   */
  export type WORDS = 2

  /**
   * 
   */
  export const WORDS: WORDS = 2

  /**
   * 
   */
  export type TAG_STARTS = 3

  /**
   * 
   */
  export const TAG_STARTS: TAG_STARTS = 3

  /**
   * 
   */
  export type TAG_ENDS = 4

  /**
   * 
   */
  export const TAG_ENDS: TAG_ENDS = 4

  /**
   * 
   */
  export type START = 5

  /**
   * 
   */
  export const START: START = 5

  /**
   * 
   */
  export type SUCCESS = 6

  /**
   * 
   */
  export const SUCCESS: SUCCESS = 6

  /**
   * 
   */
  export type FAILURE = 7

  /**
   * 
   */
  export const FAILURE: FAILURE = 7

  /**
   * 
   */
  export const DEFAULT: EventHookType = EVENTS

  /**
   * 
   */
  export const ALL: EventHookType[] = [
    EVENTS,
    WHITESPACES,
    WORDS,
    TAG_STARTS,
    TAG_ENDS,
    START,
    SUCCESS,
    FAILURE
  ]

  /**
   * 
   */
  export function toString(type: EventHookType): string | undefined {
    /**
     * 
     */
    switch (type) {
      case EVENTS: return 'EVENTS'
      case WHITESPACES: return 'WHITESPACES'
      case WORDS: return 'WORDS'
      case TAG_STARTS: return 'TAG_STARTS'
      case TAG_ENDS: return 'TAG_ENDS'
      case START: return 'START'
      case SUCCESS: return 'SUCCESS'
      case FAILURE: return 'FAILURE'
      default: return undefined
    }
  }

  /**
   * 
   */
  export function toDebugString(type: EventHookType): string {
    return `EventHookType #${type} (${toString(type) || 'undefined'})`
  }
}