/** eslint-env jest */

import babel from '@babel/core'
import generate from '@babel/generator'

import { resolve as resolvePath, basename } from 'path'

import { SourceCode } from '../sources/SourceCode'
import { FilePath } from '../sources/FilePath'
import { UnidocAutomataSchema } from '../sources/UnidocAutomataSchema'
import { UnidocAutomataSchemaExtractor } from '../sources/UnidocAutomataSchemaExtractor'
import { UnidocAutomataGenerator } from '../sources/UnidocAutomataGenerator'

/**
 * 
 */
const UnidocUTF32TextBuilder_PATH: FilePath = new FilePath(resolvePath(__dirname, '../sources/UnidocUTF32TextBuilder.ts'))

/**
 * 
 */
describe('plugin', function () {
  /**
   * 
   */
  it('does something', function () {
    const source: SourceCode = new SourceCode(UnidocUTF32TextBuilder_PATH, {
      plugins: [
        ['@babel/plugin-syntax-typescript'],
        ['@babel/plugin-proposal-decorators', { legacy: true }]
      ],
      filename: basename(UnidocUTF32TextBuilder_PATH.value)
    })

    const schemas: Array<UnidocAutomataSchema> = UnidocAutomataSchemaExtractor.extractFromSource(source)

    for (const schema of schemas) {
      const directory: string = resolvePath(__dirname, '../sources/generated')
      const fileName: string = schema.builder.identifier.name + 'Automata.ts'
      const automata: babel.types.File = UnidocAutomataGenerator.generate(directory, schema)
      console.log(generate(automata).code)
    }

    //console.log('-------------------------------------------- from :')
    //console.log(generate(ast).code)
  })
})