import type * as Babel from '@babel/core'

/**
 * 
 */
export function plugin(babel: typeof Babel): Babel.PluginObj {
  return {
    visitor: {
      Class(path: Babel.NodePath, state): void {
        console.log(path.node.body)
      }
    }
  }
}