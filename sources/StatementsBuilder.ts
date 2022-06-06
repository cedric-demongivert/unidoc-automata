import * as babel from '@babel/core'

import { equals } from '@cedric-demongivert/gl-tool-utils'
import { EmptyNode } from './EmptyNode'
import { ImmutableNodeBuilder } from './ImmutableNodeBuilder'
import { MethodArgument } from './MethodArgument'

import { NodeBuilder } from './NodeBuilder'
import { Operator } from './Operator'
import { VariableDeclarationBuilder } from './VariableDeclarationBuilder'

/**
 * 
 */
export class StatementsBuilder implements NodeBuilder<Array<babel.types.Statement>> {
  /**
   * 
   */
  public readonly statements: Array<NodeBuilder<babel.types.Statement>>

  /**
   * 
   */
  public constructor() {
    this.statements = []
  }

  /**
   * 
   */
  public then(...statements: Array<babel.types.Statement>): this {
    for (const statement of statements) {
      this.statements.push(ImmutableNodeBuilder.wrap(statement))
    }

    return this
  }

  /**
   * 
   */
  public thenBuild(...statements: Array<NodeBuilder<babel.types.Statement>>): this {
    this.statements.push(...statements)
    return this
  }

  /**
   * 
   */
  public thenCallSuperMethod(expression: babel.types.Expression | null | undefined, parameters: Array<MethodArgument> = EmptyNode.ARGUMENTS): this {
    this.then(
      babel.types.expressionStatement(
        babel.types.callExpression(
          babel.types.memberExpression(
            babel.types.super(),
            expression
          ), parameters
        )
      )
    )

    return this
  }

  /**
   * 
   */
  public thenCallSuperConstructor(parameters: Array<MethodArgument> = EmptyNode.ARGUMENTS): this {
    this.then(
      babel.types.expressionStatement(
        babel.types.callExpression(
          babel.types.super(),
          parameters
        )
      )
    )

    return this
  }

  /**
   * 
   */
  public thenAssign(target: babel.types.LVal, value: babel.types.Expression): this {
    this.then(
      babel.types.expressionStatement(
        babel.types.assignmentExpression(
          Operator.ASSIGN,
          target,
          value
        )
      )
    )

    return this
  }

  /**
   * 
   */
  public thenAssignNew(target: babel.types.LVal, type: babel.types.Expression, parameters: Array<MethodArgument> = EmptyNode.ARGUMENTS): this {
    this.thenAssign(target, babel.types.newExpression(type, parameters))
    return this
  }

  /**
   * 
   */
  public thenDeclareVariable(): VariableDeclarationBuilder {
    const builder: VariableDeclarationBuilder = VariableDeclarationBuilder.create()
    this.thenBuild(builder)
    return builder
  }

  /**
   * 
   */
  public build(): Array<babel.types.Statement> {
    return this.statements.map(NodeBuilder.build)
  }

  /**
   * 
   */
  public copy(toCopy: StatementsBuilder): this {
    this.statements.length = 0
    this.statements.push(...toCopy.statements)
    return this
  }

  /**
   * 
   */
  public clone(): StatementsBuilder {
    return new StatementsBuilder().copy(this)
  }

  /**
   * 
   */
  public clear(): this {
    this.statements.length = 0
    return this
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof StatementsBuilder) {
      return equals.arrays(other.statements, this.statements)
    }

    return false
  }
}

/**
 * 
 */
export namespace StatementsBuilder {
  /**
   * 
   */
  export function create(): StatementsBuilder {
    return new StatementsBuilder()
  }
}