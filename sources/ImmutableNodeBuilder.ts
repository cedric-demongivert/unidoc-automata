import * as babel from '@babel/core'

import { NodeBuilder } from './NodeBuilder'

/**
 * 
 */
export class ImmutableNodeBuilder<NodeType extends babel.types.Node> implements NodeBuilder<NodeType> {
  /**
   * 
   */
  private _node: NodeType | null

  /**
   * 
   */
  public constructor() {
    this._node = null
  }

  /**
   * 
   */
  public set(node: NodeType | null): this {
    this._node = node
    return this
  }

  /**
   * 
   */
  public build(): NodeType {
    return this._node
  }

  /**
   * 
   */
  public copy(toCopy: ImmutableNodeBuilder<NodeType>): this {
    this._node = toCopy._node
    return this
  }

  /**
   * 
   */
  public clone(): ImmutableNodeBuilder<NodeType> {
    return new ImmutableNodeBuilder<NodeType>().copy(this)
  }

  /**
   * 
   */
  public clear(): this {
    this._node = null
    return this
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof ImmutableNodeBuilder) {
      return other._node === this._node
    }

    return false
  }
}

/**
 * 
 */
export namespace ImmutableNodeBuilder {
  /**
   * 
   */
  export function create<NodeType extends babel.types.Node>(): ImmutableNodeBuilder<NodeType> {
    return new ImmutableNodeBuilder()
  }

  /**
   * 
   */
  export function wrap<NodeType extends babel.types.Node>(node: NodeType): ImmutableNodeBuilder<NodeType> {
    return new ImmutableNodeBuilder<NodeType>().set(node)
  }
}