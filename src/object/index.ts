/**
 * @description Pick specified keys from an object / 从对象中选取指定的属性
 * @param obj Source object / 源对象
 * @param keys Keys to pick / 要选取的键
 * @example
 * ```
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
 * ```
 */
export function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    if (key in obj)
      result[key] = obj[key]
  }
  return result
}

/**
 * @description Omit specified keys from an object / 从对象中排除指定的属性
 * @param obj Source object / 源对象
 * @param keys Keys to omit / 要排除的键
 * @example
 * ```
 * omit({ a: 1, b: 2, c: 3 }, ['b']) // { a: 1, c: 3 }
 * ```
 */
export function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  for (const key of keys)
    delete result[key]
  return result
}

/**
 * @description Check if an object has a specific own property / 检查对象是否拥有指定的自有属性（不继承原型链）
 * @param obj Target object / 目标对象
 * @param key Property key / 属性键名
 * @example
 * ```
 * hasOwn({ a: 1 }, 'a') // true
 * hasOwn({ a: 1 }, 'toString') // false
 * ```
 */
export function hasOwn<T extends Record<string, any>, K extends PropertyKey>(obj: T, key: K): obj is T & Record<K, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * @description Deep clone an object / 深拷贝对象
 * @param obj Object to clone / 要克隆的对象
 * @example
 * ```
 * const obj = { a: 1, b: { c: 2 } }
 * deepClone(obj) // { a: 1, b: { c: 2 } }
 * ```
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object')
    return obj
  if (obj instanceof Date)
    return new Date(obj.getTime()) as any
  if (obj instanceof RegExp)
    return new RegExp(obj.source, obj.flags) as any
  if (obj instanceof Map) {
    const cloned = new Map()
    obj.forEach((value, key) => cloned.set(key, deepClone(value)))
    return cloned as any
  }
  if (obj instanceof Set) {
    const cloned = new Set()
    obj.forEach(value => cloned.add(deepClone(value)))
    return cloned as any
  }
  if (Array.isArray(obj))
    return obj.map(item => deepClone(item)) as any
  const clonedObj: Record<string, any> = {}
  for (const key in obj) {
    if (hasOwn(obj, key))
      clonedObj[key] = deepClone((obj as Record<string, any>)[key])
  }
  return clonedObj as T
}

/**
 * @description Deep merge multiple objects / 深度合并多个对象
 * @param objects Objects to merge / 要合并的对象
 * @example
 * ```
 * merge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 })
 * // { a: 1, b: { c: 2, d: 3 }, e: 4 }
 * ```
 */
export function merge<T extends Record<PropertyKey, any>>(...objects: T[]): T {
  const result = {} as T
  for (const obj of objects) {
    if (!obj || typeof obj !== 'object')
      continue
    for (const key in obj) {
      if (hasOwn(obj, key)) {
        const val = obj[key] as any
        if (val !== null && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date) && !(val instanceof RegExp)) {
          result[key] = merge(result[key], val)
        }
        else {
          result[key] = val
        }
      }
    }
  }
  return result
}
