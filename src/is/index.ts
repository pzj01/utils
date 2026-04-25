export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'
// eslint-disable-next-line node/prefer-global/process
export const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null

/**
 * @description call Object.prototype.toString with value
 * @example
 * ```
 * toString(1) // '[object Number]'
 * ```
 */
export const toString = (value: unknown) => Object.prototype.toString.call(value)

/**
 * @description get raw type of value / 获取值的原始类型
 * @example
 * ```
 * getRawType(1) // 'number'
 * ```
 */
export const getRawType = (value: unknown) => toString(value).slice(8, -1).toLowerCase()

export const toBoolean = (value: unknown) => !!value
export const toNumber = (value: any) => +value

export const isString = (value: unknown): value is string => typeof value === 'string'
export const isNumber = (value: unknown): value is number => typeof value === 'number'
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'
export const isBigInt = (value: unknown): value is bigint => typeof value === 'bigint'
export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol'
// eslint-disable-next-line ts/no-unsafe-function-type
export const isFunction = (value: unknown): value is Function => typeof value === 'function'
export const isObject = (value: unknown): value is Record<PropertyKey, any> => getRawType(value) === 'object'
export const isArray = Array.isArray
export function isPrimitive(value: unknown): value is string | number | boolean | bigint | symbol | null | undefined {
  return value == null || (typeof value !== 'object' && typeof value !== 'function')
}
export const isDate = (value: unknown): value is Date => getRawType(value) === 'date'
export const isRegExp = (value: unknown): value is RegExp => getRawType(value) === 'regexp'
export const isPromise = <T = unknown>(value: unknown): value is Promise<T> => getRawType(value) === 'promise'
export const isSet = (value: unknown): value is Set<any> => getRawType(value) === 'set'
export const isMap = (value: unknown): value is Map<any, any> => getRawType(value) === 'map'
export const isWeakSet = (value: unknown): value is WeakSet<any> => getRawType(value) === 'weakset'
export const isWeakMap = (value: unknown): value is WeakMap<any, any> => getRawType(value) === 'weakmap'
export const isTruthy = (value: unknown): boolean => toBoolean(value)
export const isFalsy = (value: unknown): boolean => !isTruthy(value)
