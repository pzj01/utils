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

/**
 * @description Convert a value to boolean / 将值转换为布尔值
 * @example
 * ```
 * toBoolean(1) // true
 * toBoolean(0) // false
 * ```
 */
export const toBoolean = (value: unknown) => !!value

/**
 * @description Convert a value to number / 将值转换为数字
 * @example
 * ```
 * toNumber('123') // 123
 * toNumber(true) // 1
 * ```
 */
export const toNumber = (value: any) => +value

/**
 * @description Check if a value is a string / 检查是否为字符串
 */
export const isString = (value: unknown): value is string => typeof value === 'string'

/**
 * @description Check if a value is a number / 检查是否为数字
 */
export const isNumber = (value: unknown): value is number => typeof value === 'number'

/**
 * @description Check if a value is a boolean / 检查是否为布尔值
 */
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'

/**
 * @description Check if a value is a bigint / 检查是否为 BigInt
 */
export const isBigInt = (value: unknown): value is bigint => typeof value === 'bigint'

/**
 * @description Check if a value is a symbol / 检查是否为 Symbol
 */
export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol'

/**
 * @description Check if a value is a function / 检查是否为函数
 */
// eslint-disable-next-line ts/no-unsafe-function-type
export const isFunction = (value: unknown): value is Function => typeof value === 'function'

/**
 * @description Check if a value is a plain object / 检查是否为普通对象
 */
export const isObject = (value: unknown): value is Record<PropertyKey, any> => getRawType(value) === 'object'

/**
 * @description Check if a value is an array / 检查是否为数组
 */
export const isArray = Array.isArray

/**
 * @description Check if a value is a primitive / 检查是否为原始类型
 */
export function isPrimitive(value: unknown): value is string | number | boolean | bigint | symbol | null | undefined {
  return value == null || (typeof value !== 'object' && typeof value !== 'function')
}

/**
 * @description Check if a value is a Date / 检查是否为 Date 对象
 */
export const isDate = (value: unknown): value is Date => getRawType(value) === 'date'

/**
 * @description Check if a value is a RegExp / 检查是否为正则表达式
 */
export const isRegExp = (value: unknown): value is RegExp => getRawType(value) === 'regexp'

/**
 * @description Check if a value is a Promise / 检查是否为 Promise
 */
export const isPromise = <T = unknown>(value: unknown): value is Promise<T> => getRawType(value) === 'promise'

/**
 * @description Check if a value is a Set / 检查是否为 Set
 */
export const isSet = (value: unknown): value is Set<any> => getRawType(value) === 'set'

/**
 * @description Check if a value is a Map / 检查是否为 Map
 */
export const isMap = (value: unknown): value is Map<any, any> => getRawType(value) === 'map'

/**
 * @description Check if a value is a WeakSet / 检查是否为 WeakSet
 */
export const isWeakSet = (value: unknown): value is WeakSet<any> => getRawType(value) === 'weakset'

/**
 * @description Check if a value is a WeakMap / 检查是否为 WeakMap
 */
export const isWeakMap = (value: unknown): value is WeakMap<any, any> => getRawType(value) === 'weakmap'

/**
 * @description Check if a value is truthy / 检查是否为真值
 */
export const isTruthy = (value: unknown): boolean => toBoolean(value)

/**
 * @description Check if a value is falsy / 检查是否为假值
 */
export const isFalsy = (value: unknown): boolean => !isTruthy(value)
