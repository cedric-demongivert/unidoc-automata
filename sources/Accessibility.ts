/**
 * 
 */
export type Accessibility = 'public' | 'protected' | 'private'

/**
 * 
 */
export namespace Accessibility {
  /**
   * 
   */
  export const PUBLIC: 'public' = 'public'

  /**
   * 
   */
  export const PROTECTED: 'protected' = 'protected'

  /**
   * 
   */
  export const PRIVATE: 'private' = 'private'

  /**
   * 
   */
  export const DEFAULT: Accessibility = PUBLIC

  /**
   * 
   */
  export const ALL: Accessibility[] = [
    PUBLIC,
    PROTECTED,
    PRIVATE
  ]
}