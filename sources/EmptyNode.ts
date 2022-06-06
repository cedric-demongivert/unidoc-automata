import * as types from "@babel/types"

import { Empty } from '@cedric-demongivert/gl-tool-utils'
import { MethodArgument } from "./MethodArgument"
import { MethodParameter } from "./MethodParameter"

/**
 * 
 */
export namespace EmptyNode {
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
  export const PARAMETERS: Array<MethodParameter> = []

  /**
   * 
   */
  export function parameters(): Array<MethodParameter> {
    return PARAMETERS
  }

  /**
   * 
   */
  export const ARGUMENTS: Array<MethodArgument> = []

  /**
   * 
   */
  export function args(): Array<MethodArgument> {
    return ARGUMENTS
  }

  /**
   * 
   */
  export const DECORATORS: Array<types.Decorator> = []

  /**
   * 
   */
  export function decorators(): Array<types.Decorator> {
    return DECORATORS
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