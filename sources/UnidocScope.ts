/**
 * 
 */
export type UnidocScope = (
  UnidocScope.SHALLOW |
  UnidocScope.DEEP |
  UnidocScope.EVERYTHING
)

/**
 * 
 */
export namespace UnidocScope {
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
  export const DEFAULT: UnidocScope = SHALLOW

  /**
   * 
   */
  export const ALL: UnidocScope[] = [
    SHALLOW,
    DEEP,
    EVERYTHING
  ]

  /**
   * 
   */
  export function toString(type: UnidocScope): string | undefined {
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
  export function fromName(name: string): UnidocScope | undefined {
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
  export function toDebugString(type: UnidocScope): string {
    return `UnidocScope #${type} (${toString(type) || 'undefined'})`
  }
}