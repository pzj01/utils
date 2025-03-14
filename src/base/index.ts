/**
 * @description call Object.prototype.toString with value
 * @example
 * ```
 * toString(1) // '[object Number]'
 * ```
 */
export const toString = (value: unknown) => Object.prototype.toString.call(value)

/**
 * @description get type of value / 获取值的类型
 * @example
 * ```
 * getType(1) // 'number'
 * ```
 */
export const getType = (value: unknown) => toString(value).slice(8, -1).toLowerCase()
export const toBoolean = (value: unknown) => !!value
export const toNumber = (value: any) => +value