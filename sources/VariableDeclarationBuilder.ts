import * as babel from '@babel/core'

import { equals } from '@cedric-demongivert/gl-tool-utils'

import { NodeBuilder } from './NodeBuilder'
import { NodeType } from './NodeType'
import { VariableType } from './VariableType'

/**
 * 
 */
export class VariableDeclarationBuilder implements NodeBuilder<babel.types.VariableDeclaration> {
  /**
   * 
   */
  public kind: VariableType

  /**
   * 
   */
  public readonly declarations: Array<NodeBuilder<babel.types.VariableDeclarator>>

  /**
   * 
   */
  public declare: boolean

  /**
   * 
   */
  public constructor() {
    this.kind = VariableType.DEFAULT
    this.declarations = []
    this.declare = false
  }

  /**
   * 
   */
  public setConst(): this {
    this.kind = VariableType.CONST
    return this
  }

  /**
   * 
   */
  public setLet(): this {
    this.kind = VariableType.LET
    return this
  }

  /**
   * 
   */
  public setVar(): this {
    this.kind = VariableType.VAR
    return this
  }

  /**
   * 
   */
  public setKind(kind: VariableType): this {
    this.kind = kind
    return this
  }

  /**
   * 
   */
  public setDeclarations(declarations: Iterable<NodeBuilder<babel.types.VariableDeclarator>>): this {
    this.declarations.length = 0
    this.declarations.push(...declarations)
    return this
  }

  /**
   * 
   */
  public setDeclare(value: boolean): this {
    this.declare = value
    return this
  }

  /**
   * 
   */
  public build(): babel.types.VariableDeclaration {
    return {
      type: NodeType.VARIABLE_DECLARATION,
      kind: this.kind,
      declarations: this.declarations.map(NodeBuilder.build),
      declare: this.declare
    }
  }

  /**
   * 
   */
  public copy(toCopy: VariableDeclarationBuilder): this {
    this.kind = toCopy.kind
    this.declarations.length = 0
    this.declarations.push(...toCopy.declarations)
    this.declare = toCopy.declare
    return this
  }

  /**
   * 
   */
  public clone(): VariableDeclarationBuilder {
    return new VariableDeclarationBuilder().copy(this)
  }

  /**
   * 
   */
  public clear(): this {
    this.kind = VariableType.DEFAULT
    this.declarations.length = 0
    this.declare = false
    return this
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof VariableDeclarationBuilder) {
      return (
        this.kind === other.kind &&
        equals.arrays(this.declarations, other.declarations) &&
        this.declare
      )
    }

    return false
  }
}

/**
 * 
 */
export namespace VariableDeclarationBuilder {
  /**
   * 
   */
  export function create(): VariableDeclarationBuilder {
    return new VariableDeclarationBuilder()
  }
}