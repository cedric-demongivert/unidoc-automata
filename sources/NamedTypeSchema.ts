import * as babel from '@babel/core'

import { equals } from '@cedric-demongivert/gl-tool-utils'

import { camelCase } from 'lodash'

import { SourceCodeElement } from './SourceCodeElement'
import { TypeSchema } from './TypeSchema'
import { SourcePath } from './SourcePath'

/**
 * 
 */
export class NamedTypeSchema implements TypeSchema {
  /**
   * 
   */
  public readonly origin: SourceCodeElement | undefined

  /**
   * 
   */
  public readonly source: SourcePath

  /**
   * 
   */
  public readonly identifier: babel.types.Identifier

  /**
   * 
   */
  public readonly imported: babel.types.Identifier | babel.types.StringLiteral

  /**
   * 
   */
  public readonly camel: babel.types.Identifier

  /**
   * 
   */
  public constructor(origin: SourceCodeElement | undefined, source: SourcePath, identifier: babel.types.Identifier, imported: babel.types.Identifier | babel.types.StringLiteral) {
    this.origin = origin
    this.source = source
    this.identifier = identifier
    this.imported = imported
    this.camel = babel.types.identifier(camelCase(identifier.name))
  }

  /**
   * 
   */
  public import(origin: string): babel.types.ImportDeclaration {
    return babel.types.importDeclaration(
      [babel.types.importSpecifier(this.identifier, this.imported)],
      this.source.resolveAsLiteral(origin)
    )
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof NamedTypeSchema) {
      return (
        other.identifier === this.identifier &&
        other.imported === this.imported &&
        other.source.equals(this.source) &&
        equals(other.origin, this.origin)
      )
    }

    return false
  }
}

/**
 * 
 */
export namespace NamedTypeSchema {
  /**
   * 
   */
  export function create(origin: SourceCodeElement | undefined, source: SourcePath, identifier: babel.types.Identifier, imported: babel.types.Identifier | babel.types.StringLiteral): NamedTypeSchema {
    return new NamedTypeSchema(origin, source, identifier, imported)
  }
}