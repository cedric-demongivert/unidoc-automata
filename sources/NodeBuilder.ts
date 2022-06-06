import { Comparable, Clonable, Clearable } from '@cedric-demongivert/gl-tool-utils'

/**
 * 
 */
export interface NodeBuilder<Node> extends Clearable, Comparable, Clonable<NodeBuilder<Node>> {
  /**
   * 
   */
  build(): Node
}

/**
 * 
 */
export namespace NodeBuilder {
  /**
   * 
   */
  export function build<Node>(builder: NodeBuilder<Node>): Node {
    return builder.build()
  }
}
