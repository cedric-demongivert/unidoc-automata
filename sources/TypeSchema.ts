import babel from '@babel/core'

import { Comparable } from '@cedric-demongivert/gl-tool-utils'

import { SourcePath } from './SourcePath'
import { SourceCodeElement } from './SourceCodeElement'
import { NamedTypeSchema } from './NamedTypeSchema'
import { DefaultTypeSchema } from './DefaultTypeSchema'

/**
 * 
 */
export interface TypeSchema extends Comparable {
  /**
   * 
   */
  readonly identifier: babel.types.Identifier

  /**
   * 
   */
  readonly camel: babel.types.Identifier

  /**
   * 
   */
  readonly source: SourcePath

  /**
   * 
   */
  readonly origin: SourceCodeElement | undefined

  /**
   * 
   */
  import(origin: string): babel.types.ImportDeclaration
}

/**
 * 
 */
export namespace TypeSchema {
  /**
   * 
   */
  export function fromImportSpecifier(element: SourceCodeElement): TypeSchema | undefined {
    const parentElement: SourceCodeElement | null = element.parent()

    if (parentElement == null) return undefined

    const declaration: babel.NodePath<babel.types.Node> = parentElement.path

    if (!declaration.isImportDeclaration()) return undefined

    const specifier: babel.NodePath = element.path

    if (specifier.isImportSpecifier()) {
      return NamedTypeSchema.create(
        parentElement,
        SourcePath.derivate(element.source, declaration.node.source.value),
        specifier.node.local,
        specifier.node.imported
      )
    }

    if (specifier.isImportDefaultSpecifier()) {
      return DefaultTypeSchema.create(
        parentElement,
        SourcePath.derivate(element.source, declaration.node.source.value),
        specifier.node.local
      )
    }

    return undefined
  }
}