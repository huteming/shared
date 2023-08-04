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
