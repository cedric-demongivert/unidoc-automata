import * as types from '@babel/types'
import { NodePath } from '@babel/traverse'
import { UnidocAutomataSchema } from './UnidocAutomataSchema'
import { UnidocAutomataSchemaExtractor } from './UnidocAutomataSchemaExtractor'
import { UnidocAutomataGenerator } from './UnidocAutomataGenerator'

/**
 * 
 */
export namespace UnidocAutomataExtractor {
  /**
   * 
   */
  export function extract(classPath: NodePath<types.ClassDeclaration>, schema: UnidocAutomataSchema = new UnidocAutomataSchema()): types.Node | undefined {
    const extractedSchema: UnidocAutomataSchema | undefined = UnidocAutomataSchemaExtractor.extract(classPath, schema)

    if (extractedSchema == null) return undefined

    return UnidocAutomataGenerator.generate(extractedSchema)
  }
}
