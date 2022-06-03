/** eslint-env jest */

import * as babel from '@babel/core'
import * as types from '@babel/types'
import traverse, { NodePath } from '@babel/traverse'

import * as fileSystem from 'fs'
import * as path from 'path'

import { UnidocAutomataExtractor } from '../sources/UnidocAutomataExtractor'
import generate from '@babel/generator'

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
    const source: string = fileSystem.readFileSync(UnidocUTF32TextBuilder_PATH, 'utf-8')

    const ast: babel.ParseResult | null = babel.parseSync(source, {
      plugins: [
        ['@babel/plugin-syntax-typescript'],
        ['@babel/plugin-proposal-decorators', { legacy: true }]
      ],
      filename: path.basename(UnidocUTF32TextBuilder_PATH)
    })

    if (ast == null) return

    //console.log(ast)

    traverse(ast, {
      ClassDeclaration(path: NodePath<types.ClassDeclaration>) {
        const result: types.Node | undefined = UnidocAutomataExtractor.extract(path)

        if (result == null) {
          console.log('No automata defined.')
        } else {
          console.log('-------------------------------------------- automata :')
          console.log(generate(result).code)
        }
      }
    })

    //console.log('-------------------------------------------- from :')
    //console.log(generate(ast).code)
  })
})