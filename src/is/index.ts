import { getType, toBoolean } from '../base'

export const isString = (value: unknown): value is string => typeof value === 'string'
export const isNumber = (value: unknown): value is number => typeof value === 'number'
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'
export const isBigInt = (value: unknown): value is bigint => typeof value === 'bigint'
export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol'
// eslint-disable-next-line ts/no-unsafe-function-type
export const isFunction = (value: unknown): value is Function => typeof value === 'function'
export const isObject = (value: unknown): value is Record<PropertyKey, any> => getType(value) === 'object'
export const isArray = Array.isArray
export function isPrimitive(value: unknown): value is string | number | boolean | bigint | symbol | null | undefined {
  return value == null || (typeof value !== 'object' && typeof value !== 'function')
}
export const isDate = (value: unknown): value is Date => getType(value) === 'date'
export const isRegExp = (value: unknown): value is RegExp => getType(value) === 'regexp'
export const isPromise = <T = unknown>(value: unknown): value is Promise<T> => getType(value) === 'promise'
export const isSet = (value: unknown): value is Set<any> => getType(value) === 'set'
export const isMap = (value: unknown): value is Map<any, any> => getType(value) === 'map'
export const isWeakSet = (value: unknown): value is WeakSet<any> => getType(value) === 'weakset'
export const isWeakMap = (value: unknown): value is WeakMap<any, any> => getType(value) === 'weakmap'
export const isTruthy = (value: unknown): boolean => toBoolean(value)
export const isFalsy = (value: unknown): boolean => !isTruthy(value)
