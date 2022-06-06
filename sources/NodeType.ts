/**
 * 
 */
export type NodeType = (
  'ClassMethod' |
  'ClassProperty' |
  'VariableDeclaration'
)

/**
 * 
 */
export namespace NodeType {
  /**
   * 
   */
  export const CLASS_METHOD: 'ClassMethod' = 'ClassMethod'

  /**
   * 
   */
  export const CLASS_PROPERTY: 'ClassProperty' = 'ClassProperty'

  /**
   * 
   */
  export const VARIABLE_DECLARATION: 'VariableDeclaration' = 'VariableDeclaration'

  /**
   * 
   */
  export const ALL: NodeType[] = [
    CLASS_METHOD,
    CLASS_PROPERTY,
    VARIABLE_DECLARATION
  ]
}