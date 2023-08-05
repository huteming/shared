import { Serializer } from './types'

export function guessSerializerType(rawInit: any) {
  return rawInit == null
    ? 'any'
    : rawInit instanceof Set
    ? 'set'
    : rawInit instanceof Map
    ? 'map'
    : rawInit instanceof Date
    ? 'date'
    : typeof rawInit === 'boolean'
    ? 'boolean'
    : typeof rawInit === 'string'
    ? 'string'
    : typeof rawInit === 'object'
    ? 'object'
    : !Number.isNaN(rawInit)
    ? 'number'
    : 'any'
}

export function getSerializer<T extends string>(type: T): Serializer<T>
export function getSerializer<T extends number>(type: T): Serializer<T>
export function getSerializer<T extends boolean>(type: T): Serializer<T>
export function getSerializer<T extends Date>(type: T): Serializer<T>
export function getSerializer<T extends Map<any, any>>(type: T): Serializer<T>
export function getSerializer<T extends Set<any>>(type: T): Serializer<T>
export function getSerializer<T extends object>(type: T): Serializer<T>
export function getSerializer<T>(type: T): Serializer<any>
export function getSerializer<T>(data: T): Serializer<T> {
  const type = guessSerializerType(data)

  switch (type) {
    case 'string':
      return {
        read: (v: any) => v,
        write: (v: any) => String(v),
      }
    case 'number':
      return {
        read: (v: any) => Number.parseFloat(v),
        write: (v: any) => String(v),
      } as any
    case 'boolean':
      return {
        read: (v: any) => v === 'true',
        write: (v: any) => String(v),
      } as any
    case 'object':
      return {
        read: (v: any) => JSON.parse(v),
        write: (v: any) => JSON.stringify(v),
      }
    case 'map':
      return {
        read: (v: any) => new Map(JSON.parse(v)),
        write: (v: any) => JSON.stringify(Array.from((v as Map<any, any>).entries())),
      } as any
    case 'set':
      return {
        read: (v: any) => new Set(JSON.parse(v)),
        write: (v: any) => JSON.stringify(Array.from(v as Set<any>)),
      } as any
    case 'date':
      return {
        read: (v: any) => new Date(v),
        write: (v: any) => v.toISOString(),
      } as any
    default:
      return {
        read: (v: any) => v,
        write: (v: any) => String(v),
      }
  }
}

// const s1 = getSerializer(1)
// const s2 = getSerializer('1')
// const s3 = getSerializer(true)
// const s4 = getSerializer({})
// const s5 = getSerializer([])
// const s6 = getSerializer(new Date())
// const s7 = getSerializer(new Map())
// const s8 = getSerializer(new Set())
// const s9 = getSerializer(null)
