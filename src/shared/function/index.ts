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
  // 内部用 any[] 累积参数：泛型元组展开（[...args, ...rest]）无法回赋给 T，
  // 对外类型由返回处的 Curried<T, R> 断言给出
  return function curried(this: any, ...args: any[]): any {
    // 累积参数必须放在每次返回的新闭包里，而不是外层共享的数组。
    // 共享数组会让同一个柯里化函数的第二次调用读到上一次的残留参数。
    if (args.length >= fn.length) {
      return fn.apply(this, args as T)
    }
    else {
      return (...rest: any[]) => curried.apply(this, [...args, ...rest])
    }
  } as Curried<T, R>
}
