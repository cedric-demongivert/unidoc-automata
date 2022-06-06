import { types } from '@babel/core'

export namespace Types {
  /**
   * 
   */
  export function orUndefined(type: types.TSTypeAnnotation): types.TSTypeAnnotation
  /**
   * 
   */
  export function orUndefined(type: types.Noop): types.Noop
  /**
   * 
   */
  export function orUndefined(type: types.TypeAnnotation): types.TypeAnnotation
  /**
   * 
   */
  export function orUndefined(type: types.TSTypeAnnotation | types.TypeAnnotation | types.Noop): types.TSTypeAnnotation | types.TypeAnnotation | types.Noop
  /**
   * 
   */
  export function orUndefined(type: types.TSTypeAnnotation | types.TypeAnnotation | types.Noop): types.TSTypeAnnotation | types.TypeAnnotation | types.Noop {
    if (types.isNoop(type)) {
      return type
    }

    if (types.isTSTypeAnnotation(type)) {
      const content: types.TSType = type.typeAnnotation

      if (types.isTSUnionType(content)) {
        for (const element of content.types) {
          if (types.isTSUndefinedKeyword(element)) {
            return type
          }
        }

        return types.tsTypeAnnotation(
          types.tsUnionType([
            ...content.types,
            types.tsUndefinedKeyword()
          ])
        )
      }

      return types.tsTypeAnnotation(
        types.tsUnionType([content, types.tsUndefinedKeyword()])
      )
    }

    const content: types.Flow = type.typeAnnotation

    if (types.isUnionTypeAnnotation(content)) {
      for (const element of content.types) {
        if (types.isVoidTypeAnnotation(element)) {
          return type
        }
      }

      return types.typeAnnotation(
        types.unionTypeAnnotation([
          ...content.types,
          types.voidTypeAnnotation()
        ])
      )
    }

    return types.typeAnnotation(
      types.unionTypeAnnotation([content, types.voidTypeAnnotation()])
    )
  }

  /**
   * 
   */
  export function orNull(type: types.TSTypeAnnotation): types.TSTypeAnnotation
  /**
   * 
   */
  export function orNull(type: types.Noop): types.Noop
  /**
   * 
   */
  export function orNull(type: types.TypeAnnotation): types.TypeAnnotation
  /**
   * 
   */
  export function orNull(type: types.TSTypeAnnotation | types.TypeAnnotation | types.Noop): types.TSTypeAnnotation | types.TypeAnnotation | types.Noop
  /**
   * 
   */
  export function orNull(type: types.TSTypeAnnotation | types.TypeAnnotation | types.Noop): types.TSTypeAnnotation | types.TypeAnnotation | types.Noop {
    if (types.isNoop(type)) {
      return type
    }

    if (types.isTSTypeAnnotation(type)) {
      const content: types.TSType = type.typeAnnotation

      if (types.isTSUnionType(content)) {
        for (const element of content.types) {
          if (types.isTSNullKeyword(element)) {
            return type
          }
        }

        return types.tsTypeAnnotation(
          types.tsUnionType([
            ...content.types,
            types.tsNullKeyword()
          ])
        )
      }

      return types.tsTypeAnnotation(
        types.tsUnionType([content, types.tsNullKeyword()])
      )
    }

    const content: types.Flow = type.typeAnnotation

    if (types.isUnionTypeAnnotation(content)) {
      for (const element of content.types) {
        if (types.isNullLiteralTypeAnnotation(element)) {
          return type
        }
      }

      return types.typeAnnotation(
        types.unionTypeAnnotation([
          ...content.types,
          types.nullLiteralTypeAnnotation()
        ])
      )
    }

    return types.typeAnnotation(
      types.unionTypeAnnotation([content, types.nullLiteralTypeAnnotation()])
    )
  }
}