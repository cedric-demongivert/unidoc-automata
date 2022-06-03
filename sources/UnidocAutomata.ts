
import { UnidocEvent, UnidocConsumer } from '@cedric-demongivert/unidoc'

/**
 * 
 */
export interface UnidocAutomata extends UnidocConsumer<UnidocEvent> {

}

/**
 * 
 */
export namespace UnidocAutomata {
  /**
   * 
   */
  function identity(target: any): any {
    return target
  }

  /**
   * 
   */
  function methodIdentity(target: any, name: string, descriptor: any): any {
    return target
  }

  /**
   * 
   */
  export function start() {
    return methodIdentity
  }

  /**
   * 
   */
  export function whitespaces(kind?: 'shallow' | 'deep' | 'everything') {
    return methodIdentity
  }

  /**
   * 
   */
  export function words(kind?: 'shallow' | 'deep' | 'everything') {
    return methodIdentity
  }

  /**
   * 
   */
  export function events(kind?: 'shallow' | 'deep' | 'everything') {
    return methodIdentity
  }

  /**
   * 
   */
  export function tagStarts(kind?: 'shallow' | 'deep' | 'everything') {
    return methodIdentity
  }

  /**
   * 
   */
  export function tagEnds(kind?: 'shallow' | 'deep' | 'everything') {
    return methodIdentity
  }

  /**
   * 
   */
  export function success() {
    return methodIdentity
  }

  /**
   * 
   */
  export function failure() {
    return methodIdentity
  }

  /**
   * 
   */
  export function result() {
    return methodIdentity
  }

  /**
   * 
   */
  export function generate(target?: unknown) {
    return identity
  }
}