/**
 * 
 */
export function assertNotNull<Type>(value: Type | null | undefined): Type {
  if (value == null) {
    throw new Error('Expected value to be defined.')
  }

  return value
}