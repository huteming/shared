export type MaybeValueOrGetter<T> = T | (() => T)

export type AnyFn = (...args: any[]) => any
