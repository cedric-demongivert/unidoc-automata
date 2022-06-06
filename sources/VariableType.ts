/**
 * 
 */
export type VariableType = ('const' | 'let' | 'var')

/**
 * 
 */
export namespace VariableType {
  /**
   * 
   */
  export const CONST: 'const' = 'const'

  /**
   * 
   */
  export const LET: 'let' = 'let'

  /**
   * 
   */
  export const VAR: 'var' = 'var'

  /**
   * 
   */
  export const DEFAULT: VariableType = LET

  /**
   * 
   */
  export const ALL: VariableType[] = [
    CONST,
    LET,
    VAR
  ]
}