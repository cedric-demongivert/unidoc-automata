/**
 * 
 */
export type UnidocAutomataScope = (
  UnidocAutomataScope.SHALLOW |
  UnidocAutomataScope.DEEP |
  UnidocAutomataScope.EVERYTHING
)

/**
 * 
 */
export namespace UnidocAutomataScope {
  /**
   * 
   */
  export type SHALLOW = 0

  /**
   * 
   */
  export const SHALLOW: SHALLOW = 0

  /**
   * 
   */
  export type DEEP = 1

  /**
   * 
   */
  export const DEEP: DEEP = 1

  /**
   * 
   */
  export type EVERYTHING = 2

  /**
   * 
   */
  export const EVERYTHING: EVERYTHING = 2

  /**
   * 
   */
  export const DEFAULT: UnidocAutomataScope = SHALLOW

  /**
   * 
   */
  export const ALL: UnidocAutomataScope[] = [
    SHALLOW,
    DEEP,
    EVERYTHING
  ]

  /**
   * 
   */
  export function toString(type: UnidocAutomataScope): string | undefined {
    /**
     * 
     */
    switch (type) {
      case SHALLOW: return 'SHALLOW'
      case DEEP: return 'DEEP'
      case EVERYTHING: return 'EVERYTHING'
      default: return undefined
    }
  }

  /**
   * 
   */
  export function fromName(name: string): UnidocAutomataScope | undefined {
    switch (name) {
      case 'shallow': return SHALLOW
      case 'deep': return DEEP
      case 'everything': return EVERYTHING
      default: return undefined
    }
  }

  /**
   * 
   */
  export function toDebugString(type: UnidocAutomataScope): string {
    return `UnidocAutomataScope #${type} (${toString(type) || 'undefined'})`
  }
}