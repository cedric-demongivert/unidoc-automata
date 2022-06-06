import * as babel from "@babel/core"

import { EmptyNode } from "./EmptyNode"

import { UnidocAutomataSchema } from "./UnidocAutomataSchema"
import { StreamHookSchema } from "./StreamHookSchema"
import { StreamHookType } from "./StreamHookType"
import { Accessibility } from "./Accessibility"
import { NodeType } from "./NodeType"
import { Types } from "./Types"
import { MethodType } from "./MethodType"
import { ClassMethodBuilder } from "./ClassMethodBuilder"

/**
 * 
 */
const ASSIGN_OPERATOR: string = '='

/**
 * 
 */
const _BUILDER: babel.types.Expression = babel.types.identifier('_builder')

/**
 * 
 */
const _DEPTH_MARK: babel.types.Expression = babel.types.identifier('_depthMark')

/**
 * 
 */
const RESULT: babel.types.Expression = babel.types.identifier('result')

/**
 * 
 */
const CONSTRUCTOR: babel.types.Identifier = babel.types.identifier('constructor')

/**
 * 
 */
const THIS_DEPTH_MARK: babel.types.Expression & babel.types.LVal = babel.types.memberExpression(babel.types.thisExpression(), _DEPTH_MARK)

/**
 * 
 */
const THIS_BUILDER: babel.types.Expression & babel.types.LVal = babel.types.memberExpression(babel.types.thisExpression(), _BUILDER)

/**
 * 
 */
const THIS_RESULT: babel.types.Expression & babel.types.LVal = babel.types.memberExpression(babel.types.thisExpression(), RESULT)

/**
 * 
 */
const BUILDER: babel.types.Expression = babel.types.identifier('builder')

/**
 * 
 */
const CONST_BUILDER: babel.types.Expression = babel.types.variableDeclaration('const', [babel.types.variableDeclarator(LOCAL_BUILDER, THIS_BUILDER)])

/**
 * 
 */
const START: babel.types.Expression = babel.types.identifier('start')

/**
 * 
 */
const FAILURE: babel.types.Expression = babel.types.identifier('failure')

/**
 * 
 */
const SUCCESS: babel.types.Expression = babel.types.identifier('success')

/**
 * 
 */
const ERROR: babel.types.Expression = babel.types.identifier('error')

/**
 * 
 */
const ERROR_PARAMETER: Array<babel.types.Identifier> = [ERROR]

/**
 * 
 */
export namespace UnidocAutomataGenerator {
  /**
   * 
   */
  function pushIfDefined<Value>(value: Value | undefined, container: Array<Value>): void {
    if (value) container.push(value)
  }

  /**
   * 
   */
  function generateConstructor(schema: UnidocAutomataSchema): babel.types.ClassMethod {
    const method: ClassMethodBuilder = ClassMethodBuilder.create()

    method.asConstructor().setPublic()
    method.statements.thenCallSuperConstructor()
    method.statements.thenAssignNew(THIS_BUILDER, schema.builder.identifier, EmptyNode.ARGUMENTS)

    if (schema.resultProvider != null) {
      method.statements.thenAssign(THIS_RESULT, babel.types.nullLiteral())
    }

    if (schema.needsDepth()) {
      method.statements.thenAssign(THIS_DEPTH_MARK, babel.types.valueToNode(0))
    }

    return method.build()
  }

  /**
   * 
   */
  function generateStartMethod(schema: UnidocAutomataSchema): babel.types.ClassMethod | undefined {
    const method: ClassMethodBuilder = ClassMethodBuilder.create()

    method.setKey(START)
    method.setPublic()
    method.statements.thenCallSuperMethod(START)

    const hooks: Array<StreamHookSchema> = schema.getStreamHooksOfType(StreamHookType.START)

    let builder: babel.types.Expression

    if (hooks.length < 3) {
      builder = THIS_BUILDER
    } else {
      builder = LOCAL_BUILDER
      method.thenAssign(BUIL,)
    }

    for (const hook of hooks) {
      statements.push(hook.callStatement(builder, EmptyNode.ARGUMENTS))
    }

    return {
      type: NodeType.CLASS_METHOD,
      kind: MethodType.METHOD,
      key: START,
      params: EmptyNode.PARAMETERS,
      body: babel.types.blockStatement(statements),
      returnType: babel.types.tsTypeAnnotation(babel.types.tsVoidKeyword()),
      accessibility: Accessibility.PUBLIC
    }
  }

  /**
   * 
   */
  function generateSuccessMethod(schema: UnidocAutomataSchema): babel.types.ClassMethod | undefined {
    const hooks: Array<StreamHookSchema> = schema.getStreamHooksOfType(StreamHookType.SUCCESS)

    if (hooks.length == 0 && schema.resultProvider == null) return

    const statements: Array<babel.types.Statement> = [CALL_SUPER_SUCCESS]
    let builder: babel.types.Expression

    if (hooks.length < 3) {
      builder = THIS_BUILDER
    } else {
      builder = LOCAL_BUILDER
      statements.push(ASSIGN_BUILDER)
    }

    for (const hook of hooks) {
      statements.push(hook.callStatement(builder, EmptyNode.ARGUMENTS))
    }

    if (schema.resultProvider != undefined) {
      statements.push(
        babel.types.expressionStatement(
          babel.types.assignmentExpression(
            ASSIGN_OPERATOR,
            THIS_RESULT,
            schema.resultProvider.call(builder, EmptyNode.ARGUMENTS)
          )
        )
      )
    }

    return {
      type: NodeType.CLASS_METHOD,
      kind: MethodType.METHOD,
      key: SUCCESS,
      params: EmptyNode.PARAMETERS,
      body: babel.types.blockStatement(statements),
      returnType: babel.types.tsTypeAnnotation(babel.types.tsVoidKeyword()),
      accessibility: Accessibility.PUBLIC
    }
  }

  /**
   * 
   */
  function generateFailureMethod(schema: UnidocAutomataSchema): babel.types.ClassMethod | undefined {
    const hooks: Array<StreamHookSchema> = schema.getStreamHooksOfType(StreamHookType.FAILURE)

    if (hooks.length == 0) return

    const statements: Array<babel.types.Statement> = [CALL_SUPER_FAILURE]
    let builder: babel.types.Expression

    if (hooks.length < 3) {
      builder = THIS_BUILDER
    } else {
      builder = LOCAL_BUILDER
      statements.push(ASSIGN_BUILDER)
    }

    for (const hook of hooks) {
      statements.push(hook.callStatement(builder, ERROR_PARAMETER))
    }

    return {
      type: NodeType.CLASS_METHOD,
      kind: MethodType.METHOD,
      key: FAILURE,
      params: EmptyNode.PARAMETERS,
      body: babel.types.blockStatement(statements),
      returnType: babel.types.tsTypeAnnotation(babel.types.tsVoidKeyword()),
      accessibility: Accessibility.PUBLIC
    }
  }

  /**
   * 
   */
  function generateResultProperty(schema: UnidocAutomataSchema): babel.types.ClassProperty | undefined {
    if (schema.resultProvider != null) {
      return {
        type: NodeType.CLASS_PROPERTY,
        key: RESULT,
        typeAnnotation: Types.orNull(schema.resultProvider.type),
        accessibility: Accessibility.PUBLIC
      }
    }

    return undefined
  }

  /**
   * 
   */
  function generateBuilderProperty(schema: UnidocAutomataSchema): babel.types.ClassProperty {
    return {
      type: NodeType.CLASS_PROPERTY,
      key: _BUILDER,
      typeAnnotation: babel.types.tsTypeAnnotation(babel.types.tsTypeReference(schema.builder.identifier)),
      accessibility: Accessibility.PRIVATE,
      readonly: true
    }
  }

  /**
   * 
   */
  function generateDepthProperty(schema: UnidocAutomataSchema): babel.types.ClassProperty | undefined {
    if (schema.needsDepth()) {
      return {
        type: NodeType.CLASS_PROPERTY,
        key: _DEPTH_MARK,
        typeAnnotation: babel.types.tsTypeAnnotation(babel.types.tsNumberKeyword()),
        accessibility: Accessibility.PRIVATE
      }
    }

    return undefined
  }

  /**
   * 
   */
  function generateClass(schema: UnidocAutomataSchema): babel.types.ClassDeclaration {
    const body: Array<babel.types.ClassMethod | babel.types.ClassProperty> = []

    pushIfDefined(generateBuilderProperty(schema), body)
    pushIfDefined(generateResultProperty(schema), body)
    pushIfDefined(generateDepthProperty(schema), body)

    pushIfDefined(generateConstructor(schema), body)

    pushIfDefined(generateStartMethod(schema), body)
    pushIfDefined(generateFailureMethod(schema), body)
    pushIfDefined(generateSuccessMethod(schema), body)

    return babel.types.classDeclaration(
      babel.types.identifier(schema.builder.identifier.name + 'Automata'),
      schema.automata.identifier,
      babel.types.classBody(body)
    )
  }

  /**
   * 
   */
  export function generate(directory: string, schema: UnidocAutomataSchema): babel.types.File {
    const statements: Array<babel.types.Statement> = []

    statements.push(schema.automata.import(directory))
    statements.push(schema.builder.import(directory))

    statements.push(generateClass(schema))

    return babel.types.file(babel.types.program(statements))
  }
}