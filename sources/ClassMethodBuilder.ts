import * as babel from '@babel/core'

import { equals } from '@cedric-demongivert/gl-tool-utils'

import { assertNotNull } from './assertNotNull'

import { Accessibility } from './Accessibility'
import { MethodParameter } from './MethodParameter'
import { MethodType } from "./MethodType"
import { NodeType } from './NodeType'
import { StatementsBuilder } from './StatementsBuilder'

/**
 * 
 */
const CONSTRUCTOR: babel.types.Identifier = babel.types.identifier('constructor')

/**
 * @see https://babeljs.io/docs/en/babel-types#classmethod
 */
export class ClassMethodBuilder {
  /**
   * 
   */
  public kind: MethodType

  /**
   * 
   */
  public key: babel.types.Expression | null

  /**
   * 
   */
  public readonly params: Array<MethodParameter>

  /**
   * 
   */
  public readonly statements: StatementsBuilder

  /**
   * 
   */
  public computed: boolean

  /**
   * 
   */
  public static: boolean

  /**
   * 
   */
  public generator: boolean

  /**
   * 
   */
  public async: boolean

  /**
   * 
   */
  public abstract: boolean

  /**
   * 
   */
  public accessibility: Accessibility | null

  /**
   * 
   */
  public readonly decorators: Array<babel.types.Decorator>

  /**
   * 
   */
  public optional: boolean

  /**
   * 
   */
  public override: boolean

  /**
   * 
   */
  public returnType: babel.types.TypeAnnotation | babel.types.TSTypeAnnotation | babel.types.Noop | null

  /**
   * 
   */
  public typeParameters: babel.types.TypeParameterDeclaration | babel.types.TSTypeParameterDeclaration | babel.types.Noop | null

  /**
   * 
   */
  public constructor() {
    this.kind = MethodType.DEFAULT
    this.key = null
    this.params = []
    this.statements = new StatementsBuilder()
    this.computed = false
    this.static = false
    this.generator = false
    this.async = false
    this.abstract = false
    this.accessibility = null
    this.decorators = []
    this.optional = false
    this.override = false
    this.returnType = null
    this.typeParameters = null
  }

  /**
   * 
   */
  public asConstructor(): this {
    this.kind = MethodType.DEFAULT
    this.key = CONSTRUCTOR
    return this
  }

  /**
   * 
   */
  public setPublic(): this {
    this.accessibility = Accessibility.PUBLIC
    return this
  }

  /**
   * 
   */
  public setPrivate(): this {
    this.accessibility = Accessibility.PRIVATE
    return this
  }

  /**
   * 
   */
  public setProtected(): this {
    this.accessibility = Accessibility.PROTECTED
    return this
  }

  /**
   * 
   */
  public setStatements(statements: StatementsBuilder): this {
    this.statements.copy(statements)
    return this
  }

  /**
   * 
   */
  public setKey(key: babel.types.Expression): this {
    this.key = key
    return this
  }

  /**
   * 
   */
  public setParams(parameters: Iterable<MethodParameter>): this {
    this.params.length = 0
    this.params.push(...parameters)
    return this
  }

  /**
   * 
   */
  public setDecorators(decorators: Iterable<babel.types.Decorator>): this {
    this.decorators.length = 0
    this.decorators.push(...decorators)
    return this
  }

  /**
   * 
   */
  public setKind(kind: MethodType): this {
    this.kind = kind
    return this
  }

  /**
   * 
   */
  public setComputed(value: boolean): this {
    this.computed = value
    return this
  }

  /**
   * 
   */
  public setStatic(value: boolean): this {
    this.static = value
    return this
  }

  /**
   * 
   */
  public setGenerator(value: boolean): this {
    this.generator = value
    return this
  }

  /**
   * 
   */
  public setAsync(value: boolean): this {
    this.async = value
    return this
  }

  /**
   * 
   */
  public setAbstract(value: boolean): this {
    this.abstract = value
    return this
  }

  /**
   * 
   */
  public setAccessibility(accessibility: Accessibility): this {
    this.accessibility = accessibility
    return this
  }

  /**
   * 
   */
  public setOptional(optional: boolean): this {
    this.optional = optional
    return this
  }

  /**
   * 
   */
  public setOverride(override: boolean): this {
    this.override = override
    return this
  }

  /**
   * 
   */
  public setReturnType(returnType: babel.types.TypeAnnotation | babel.types.TSTypeAnnotation | babel.types.Noop | null): this {
    this.returnType = returnType
    return this
  }

  /**
   * 
   */
  public setTypeParameters(typeParameters: babel.types.TypeParameterDeclaration | babel.types.TSTypeParameterDeclaration | babel.types.Noop | null): this {
    this.typeParameters = typeParameters
    return this
  }

  /**
   * 
   */
  public returnVoid(): this {
    this.returnType = babel.types.tsTypeAnnotation(babel.types.tsVoidKeyword())
    return this
  }

  /**
   * 
   */
  public build(): babel.types.ClassMethod {
    return {
      type: NodeType.CLASS_METHOD,
      kind: this.kind,
      key: assertNotNull(this.key),
      params: [...this.params],
      body: babel.types.blockStatement(this.statements.build()),
      computed: this.computed,
      static: this.static,
      generator: this.generator,
      async: this.async,
      abstract: this.abstract,
      accessibility: this.accessibility,
      decorators: [...this.decorators],
      optional: this.optional,
      override: this.override,
      returnType: this.returnType,
      typeParameters: this.typeParameters
    }
  }

  /**
   * 
   */
  public clear(): this {
    this.kind = MethodType.DEFAULT
    this.key = null
    this.params.length = 0
    this.statements.clear()
    this.computed = false
    this.static = false
    this.generator = false
    this.async = false
    this.abstract = false
    this.accessibility = null
    this.decorators.length = 0
    this.optional = false
    this.override = false
    this.returnType = null
    this.typeParameters = null
    return this
  }

  /**
   * 
   */
  public copy(toCopy: ClassMethodBuilder): this {
    this.kind = toCopy.kind
    this.key = toCopy.key
    this.params.length = 0
    this.params.push(...toCopy.params)
    this.statements.copy(toCopy.statements)
    this.computed = toCopy.computed
    this.static = toCopy.static
    this.generator = toCopy.generator
    this.async = toCopy.async
    this.abstract = toCopy.abstract
    this.accessibility = toCopy.accessibility
    this.decorators.length = 0
    this.decorators.push(...toCopy.decorators)
    this.optional = toCopy.optional
    this.override = toCopy.override
    this.returnType = toCopy.returnType
    this.typeParameters = toCopy.typeParameters
    return this
  }

  /**
   * 
   */
  public clone(): ClassMethodBuilder {
    return new ClassMethodBuilder().copy(this)
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof ClassMethodBuilder) {
      return (
        this.kind === other.kind &&
        this.key === other.key &&
        equals.arrays(this.params, other.params) &&
        this.statements.equals(other.statements) &&
        this.computed === other.computed &&
        this.static === other.static &&
        this.generator === other.generator &&
        this.async === other.async &&
        this.abstract === other.abstract &&
        this.accessibility === other.accessibility &&
        equals.arrays(this.decorators, other.decorators) &&
        this.optional === other.optional &&
        this.override === other.override &&
        this.returnType === other.returnType &&
        this.typeParameters === other.typeParameters
      )
    }

    return false
  }
}

/**
 * 
 */
export namespace ClassMethodBuilder {
  /**
   * 
   */
  export function create(): ClassMethodBuilder {
    return new ClassMethodBuilder()
  }
}