import type * as babel from '@babel/core'

/**
 * 
 */
export type MethodParameter = (
  babel.types.Identifier |
  babel.types.Pattern |
  babel.types.RestElement |
  babel.types.TSParameterProperty
)