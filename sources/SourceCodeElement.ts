import * as babel from '@babel/core'

import { SourceCode } from './SourceCode'

/**
 * 
 */
export class SourceCodeElement<NodeType extends babel.types.Node = any> {
  /**
   * 
   */
  public readonly source: SourceCode

  /**
   * 
   */
  public readonly path: babel.NodePath<NodeType>

  /**
   * 
   */
  public get node(): NodeType {
    return this.path.node
  }

  /**
   * 
   */
  public constructor(source: SourceCode, path: babel.NodePath<NodeType>) {
    this.source = source
    this.path = path
  }

  /**
   * 
   */
  public sibling<NodeType extends babel.types.Node>(path: babel.NodePath<NodeType>): SourceCodeElement<NodeType>
  /**
   * 
   */
  public sibling<NodeType extends babel.types.Node>(path: babel.NodePath<NodeType> | null): SourceCodeElement<NodeType> | null
  /**
   * 
   */
  public sibling<NodeType extends babel.types.Node>(path: babel.NodePath<NodeType> | undefined): SourceCodeElement<NodeType> | undefined
  /**
   * 
   */
  public sibling<NodeType extends babel.types.Node>(path: babel.NodePath<NodeType> | null | undefined): SourceCodeElement<NodeType> | null | undefined
  /**
   * 
   */
  public sibling<NodeType extends babel.types.Node>(path: babel.NodePath<NodeType> | null | undefined): SourceCodeElement<NodeType> | null | undefined {
    if (path == null) {
      return path
    }

    return new SourceCodeElement(this.source, path)
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof SourceCodeElement) {
      return (
        other.source.equals(this.source) &&
        other.path === this.path
      )
    }

    return false
  }
}
