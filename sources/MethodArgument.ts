import type * as babel from '@babel/core'

/**
 * 
 */
export type MethodArgument = (
  babel.types.Expression |
  babel.types.SpreadElement |
  babel.types.JSXNamespacedName |
  babel.types.ArgumentPlaceholder
)