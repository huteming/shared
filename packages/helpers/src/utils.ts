import { AnyFn, MaybeValueOrGetter } from './types'

export function isNil(data: any): data is null | undefined {
  if (data === null || data === undefined) {
    return true
  }
  return false
}

export function isDefined<T>(data: T | null | undefined): data is T {
  if (data === null || data === undefined) {
    return false
  }
  return true
}

export function toValue<T>(data: MaybeValueOrGetter<T>): T {
  return typeof data === 'function' ? (data as AnyFn)() : data
}

export function defaultTo<T>(defaults: MaybeValueOrGetter<T>, data: MaybeValueOrGetter<T | null | undefined>): T {
  const value = toValue(data)

  if (isDefined(value)) {
    return value
  }
  return toValue(defaults)
}
