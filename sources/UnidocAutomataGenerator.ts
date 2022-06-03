import * as types from "@babel/types"
import { UnidocAutomataClass } from "./UnidocAutomataClass"
import { UnidocAutomataSchema } from "./UnidocAutomataSchema"

/**
 * 
 */
export namespace UnidocAutomataGenerator {
  /**
   * 
   */
  function generateImportDeclaration(schema: UnidocAutomataClass): types.ImportDeclaration {
    if (schema.default) {
      return types.importDeclaration(
        [types.importDefaultSpecifier(schema.identifier)],
        schema.source
      )
    } else {
      return types.importDeclaration(
        [types.importSpecifier(schema.identifier, schema.identifier)],
        schema.source
      )
    }
  }

  /**
   * 
   */
  function generateImports(schema: UnidocAutomataSchema): Array<types.Statement> {
    const statements: Array<types.Statement> = []

    statements.push(generateImportDeclaration(schema.base))

    return statements
  }

  /**
   * 
   */
  function generateClass(schema: UnidocAutomataSchema): types.ClassDeclaration {
    return types.classDeclaration(
      types.identifier(schema.builder.identifier.name + 'Automata'),
      schema.base.identifier,
      types.classBody([])
    )
  }

  /**
   * 
   */
  export function generate(schema: UnidocAutomataSchema): types.Node {
    const statements: Array<types.Statement> = []

    statements.concat(generateImports(schema))
    statements.push(generateClass(schema))

    return types.file(types.program(statements))
  }
}