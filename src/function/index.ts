import type { DropFirst } from '../types'

export { debounce, throttle } from 'throttle-debounce'

type Curried<Args extends unknown[], Return> =
  Args extends []
    ? () => Return
    : <T extends Partial<Args>>(...args: T) => T extends Args
        ? Return
        : Curried<DropFirst<Args, Exclude<T['length'], undefined>>, Return>

/**
 * @description Currying function / 柯里化函数
 * @example
 * ```
 * const add = curry((a: number, b: number) => a + b)
 * add(1)(2) // 3
 * add(1, 2) // 3
 * ```
 */
export function curry<T extends any[], R>(fn: (...args: T) => R) {
  const params: T = [] as any
  return function curried<This = any>(this: This, ...args: T) {
    params.push(...args)
    if (params.length >= fn.length) {
      return fn.apply(this, params)
    }
    else {
      return curried
    }
  } as Curried<T, R>
}
