import * as babel from '@babel/core'

import { camelCase } from 'lodash'

import { equals } from '@cedric-demongivert/gl-tool-utils'

import { SourceCodeElement } from './SourceCodeElement'
import { TypeSchema } from './TypeSchema'
import { SourcePath } from './SourcePath'

/**
 * 
 */
export class DefaultTypeSchema implements TypeSchema {
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
  public readonly camel: babel.types.Identifier

  /**
   * 
   */
  public constructor(origin: SourceCodeElement | undefined, source: SourcePath, identifier: babel.types.Identifier) {
    this.origin = origin
    this.source = source
    this.identifier = identifier
    this.camel = babel.types.identifier(camelCase(identifier.name))
  }

  /**
   * 
   */
  public import(origin: string): babel.types.ImportDeclaration {
    return babel.types.importDeclaration(
      [babel.types.importDefaultSpecifier(this.identifier)],
      this.source.resolveAsLiteral(origin)
    )
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof DefaultTypeSchema) {
      return (
        other.identifier === this.identifier &&
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
export namespace DefaultTypeSchema {
  /**
   * 
   */
  export function create(origin: SourceCodeElement | undefined, source: SourcePath, identifier: babel.types.Identifier): DefaultTypeSchema {
    return new DefaultTypeSchema(origin, source, identifier)
  }
}