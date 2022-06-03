import * as types from '@babel/types'

import { UnidocAutomataSchema } from './UnidocAutomataSchema'
import { UnidocAutomataSchemaExtractor } from './UnidocAutomataSchemaExtractor'
import { UnidocAutomataGenerator } from './UnidocAutomataGenerator'
import { UnidocAutomataSource } from './UnidocAutomataSource'

/**
 * 
 */
export namespace UnidocAutomataExtractor {
  /**
   * 
   */
  export function extract(source: UnidocAutomataSource): Array<types.File> {
    return UnidocAutomataSchemaExtractor.extractFromSource(source).map(UnidocAutomataGenerator.generate)
  }
}
