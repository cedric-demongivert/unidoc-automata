/**
 * 
 */
export type UnidocAutomataAnnotation = (
  UnidocAutomataAnnotation.EVENTS |
  UnidocAutomataAnnotation.WHITESPACES |
  UnidocAutomataAnnotation.WORDS |
  UnidocAutomataAnnotation.TAG_STARTS |
  UnidocAutomataAnnotation.TAG_ENDS |
  UnidocAutomataAnnotation.START |
  UnidocAutomataAnnotation.SUCCESS |
  UnidocAutomataAnnotation.FAILURE |
  UnidocAutomataAnnotation.GENERATE |
  UnidocAutomataAnnotation.RESULT
)

/**
 * 
 */
export namespace UnidocAutomataAnnotation {
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
  export type GENERATE = 8

  /**
   * 
   */
  export const GENERATE: GENERATE = 8

  /**
   * 
   */
  export type RESULT = 9

  /**
   * 
   */
  export const RESULT: RESULT = 9

  /**
   * 
   */
  export const DEFAULT: UnidocAutomataAnnotation = EVENTS

  /**
   * 
   */
  export const ALL: UnidocAutomataAnnotation[] = [
    EVENTS,
    WHITESPACES,
    WORDS,
    TAG_STARTS,
    TAG_ENDS,
    START,
    SUCCESS,
    FAILURE,
    GENERATE,
    RESULT
  ]

  /**
   * 
   */
  export function toString(type: UnidocAutomataAnnotation): string | undefined {
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
      case GENERATE: return 'GENERATE'
      case RESULT: return 'RESULT'
      default: return undefined
    }
  }

  /**
   * 
   */
  export function fromName(name: string): UnidocAutomataAnnotation | undefined {
    switch (name) {
      case 'events': return EVENTS
      case 'whitespaces': return WHITESPACES
      case 'words': return WORDS
      case 'tagStarts': return TAG_STARTS
      case 'tagEnds': return TAG_ENDS
      case 'start': return START
      case 'success': return SUCCESS
      case 'failure': return FAILURE
      case 'generate': return GENERATE
      case 'result': return RESULT
      default: return undefined
    }
  }

  /**
   * 
   */
  export function toDebugString(type: UnidocAutomataAnnotation): string {
    return `UnidocAutomataAnnotation #${type} (${toString(type) || 'undefined'})`
  }
}