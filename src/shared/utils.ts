export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

export function isTest(): boolean {
  return process.env.NODE_ENV === 'test'
}

export function logError(err: string | Error, info: string): void {
  if (!isDevelopment()) {
    return
  }

  console.warn(`Error in ${info}: "${err.toString()}"`)
  console.error(err)
}
