import { Node } from "@babel/types"
import { NodePath } from "@babel/traverse"
import { UnidocAutomataSource } from "./UnidocAutomataSource"

/**
 * 
 */
export class UnidocAutomataExtractionContext<NodeType extends Node> {
  /**
   * 
   */
  public readonly source: UnidocAutomataSource

  /**
   * 
   */
  public readonly path: NodePath<NodeType>

  /**
   * 
   */
  public constructor(source: UnidocAutomataSource, path: NodePath<NodeType>) {
    this.source = source
    this.path = path
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof UnidocAutomataExtractionContext) {
      return (
        other.source.equals(this.source) &&
        other.path === this.path
      )
    }

    return false
  }
}

/**
 * 
 */
export namespace UnidocAutomataExtractionContext {
  /**
   * 
   */
  export function create<NodeType extends Node>(source: UnidocAutomataSource, path: NodePath<NodeType>): UnidocAutomataExtractionContext<NodeType> {
    return new UnidocAutomataExtractionContext(source, path)
  }
}