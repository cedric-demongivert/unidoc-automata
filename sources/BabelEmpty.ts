import * as types from "@babel/types"

import { Empty } from '@cedric-demongivert/gl-tool-utils'

/**
 * 
 */
export namespace BabelEmpty {
  /**
   * 
   */
  export const STRING_LITERAL: types.StringLiteral = types.stringLiteral(Empty.STRING)

  /**
   * 
   */
  export function stringLiteral(): types.StringLiteral {
    return STRING_LITERAL
  }

  /**
   * 
   */
  export const STATEMENTS: Array<types.Statement> = []

  /**
   * 
   */
  export function statements(): Array<types.Statement> {
    return STATEMENTS
  }

  /**
   * 
   */
  export const PROGRAM: types.Program = types.program(STATEMENTS)

  /**
   * 
   */
  export function program(): types.Program {
    return PROGRAM
  }

  /**
   * 
   */
  export const FILE: types.File = types.file(PROGRAM)

  /**
   * 
   */
  export function file(): types.File {
    return FILE
  }

  /**
   * 
   */
  export const IDENTIFIER: types.Identifier = types.identifier('none')

  /**
   * 
   */
  export function identifier(): types.Identifier {
    return IDENTIFIER
  }

  /**
   * 
   */
  export const BLOCK_STATEMENT: types.BlockStatement = types.blockStatement(STATEMENTS)

  /**
   * 
   */
  export function blockStatement(): types.BlockStatement {
    return BLOCK_STATEMENT
  }

  /**
   * 
   */
  export const PARAMETERS: Array<types.Identifier | types.Pattern | types.RestElement | types.TSParameterProperty> = []

  /**
   * 
   */
  export function parameters(): Array<types.Identifier | types.Pattern | types.RestElement | types.TSParameterProperty> {
    return PARAMETERS
  }

  /**
   * 
   */
  export const CLASS_METHOD: types.ClassMethod = types.classMethod('method', IDENTIFIER, PARAMETERS, BLOCK_STATEMENT)

  /**
   * 
   */
  export function classMethod(): types.ClassMethod {
    return CLASS_METHOD
  }
}