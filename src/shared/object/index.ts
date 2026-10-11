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
    // 用 hasOwn 而非 `key in obj`，否则 'toString' 这类原型链上的键会被一起拷进来
    if (hasOwn(obj, key))
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
 * @description Deep clone an object, circular references supported / 深拷贝对象，支持循环引用
 * @param obj Object to clone / 要克隆的对象
 * @example
 * ```
 * const obj = { a: 1, b: { c: 2 } }
 * const cloned = deepClone(obj) // { a: 1, b: { c: 2 } }
 * obj.b === cloned.b // false
 *
 * // 循环引用不会栈溢出，且克隆体内部的引用指向克隆体自身
 * const circular: any = { name: 'root' }
 * circular.self = circular
 * const clonedCircular = deepClone(circular)
 * clonedCircular.self === clonedCircular // true
 * ```
 */
export function deepClone<T>(obj: T): T {
  // seen 表每次调用新建：跨调用复用会随调用次数无界增长，还会把不同调用里
  // 碰巧相等（同一引用）的对象错误地当成同一份克隆体
  return clone(obj, new WeakMap())
}

/**
 * deepClone 的内部实现。`seen` 存的是「源对象 → 对应克隆体」，有两个作用：
 * 1. 循环引用时直接返回已建好的克隆体，不再往下递归（否则栈溢出）；
 * 2. 同一对象被多处引用时只克隆一次，克隆体之间仍保持共享关系。
 *
 * 关键顺序：任何容器（数组/Map/Set/普通对象）都必须 **先建成空壳并登记**，
 * 再去递归填充子元素。若先递归再登记，自引用结构在登记前就已经无限递归了。
 *
 * 用 WeakMap 而非 Map，是让映射随源对象一起被 GC 回收，省掉手动清理。
 */
function clone<T>(value: T, seen: WeakMap<object, any>): T {
  if (value === null || typeof value !== 'object')
    return value

  const cached = seen.get(value)
  if (cached !== undefined)
    return cached

  if (value instanceof Date) {
    const cloned = new Date(value.getTime())
    seen.set(value, cloned)
    return cloned as any
  }

  if (value instanceof RegExp) {
    const cloned = new RegExp(value.source, value.flags)
    seen.set(value, cloned)
    return cloned as any
  }

  if (value instanceof Map) {
    const cloned = new Map()
    seen.set(value, cloned)
    // key 保持原引用不克隆：克隆 key 会让「按引用查表」的写法失效
    value.forEach((v, k) => cloned.set(k, clone(v, seen)))
    return cloned as any
  }

  if (value instanceof Set) {
    const cloned = new Set()
    seen.set(value, cloned)
    value.forEach(v => cloned.add(clone(v, seen)))
    return cloned as any
  }

  if (Array.isArray(value)) {
    // 预分配等长数组再逐项填充，而不是 map：
    // map 会等所有子项递归完才返回新数组，循环引用撑不到那一刻
    const cloned = Array.from({ length: value.length }) as any[]
    seen.set(value, cloned)
    value.forEach((item, index) => {
      cloned[index] = clone(item, seen)
    })
    return cloned as any
  }

  const clonedObj: Record<string, any> = {}
  seen.set(value, clonedObj)
  for (const key in value) {
    if (hasOwn(value, key))
      clonedObj[key] = clone((value as Record<string, any>)[key], seen)
  }
  return clonedObj as T
}
