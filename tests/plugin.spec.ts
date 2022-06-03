/** eslint-env jest */

import * as babel from '@babel/core'
import * as types from '@babel/types'
import traverse, { NodePath } from '@babel/traverse'
import generate from '@babel/generator'

import * as fileSystem from 'fs'
import * as path from 'path'

import { UnidocAutomataSource } from '../sources/UnidocAutomataSource'
import { UnidocAutomataExtractor } from '../sources/UnidocAutomataExtractor'
import { ParseResult } from '@babel/parser'

/**
 * 
 */
const UnidocUTF32TextBuilder_PATH: string = path.resolve(__dirname, '../sources/UnidocUTF32TextBuilder.ts')


/**
 * 
 */
describe('plugin', function () {
  /**
   * 
   */
  it('does something', function () {
    const code: string = fileSystem.readFileSync(UnidocUTF32TextBuilder_PATH, 'utf-8')
    const file: ParseResult<types.File> | null = babel.parse(code, {
      plugins: [
        ['@babel/plugin-syntax-typescript'],
        ['@babel/plugin-proposal-decorators', { legacy: true }]
      ],
      filename: path.basename(UnidocUTF32TextBuilder_PATH)
    })

    if (file == null) throw new Error('Result is null...')

    traverse(file, {
      Program(path: NodePath<types.Program>): void {
        const source: UnidocAutomataSource = new UnidocAutomataSource(UnidocUTF32TextBuilder_PATH, file, path)
        const result: Array<types.File> = UnidocAutomataExtractor.extract(source)

        for (const automata of result) {
          console.log('-------------------------------------------- automata :')
          console.log(generate(automata).code)
        }
      }
    })

    //console.log('-------------------------------------------- from :')
    //console.log(generate(ast).code)
  })
})