export type Fn = (...args: any[]) => any

/**
 * @description Construct a tuple of the specified length based on the length / 根据长度构建一个指定长度的元组
 * @example
 * ```
 * type Tuple = BuildTuple<3> // [0, 0, 0]
 * type Tuple = BuildTuple<3, 1> // [1, 1, 1]
 * ```
 */
export type BuildTuple<N, E = 0, Tuple extends unknown[] = []> =
  Tuple['length'] extends N
    ? Tuple
    : BuildTuple<N, E, [...Tuple, E]>

export type Push<T extends unknown[], E> = [...T, E]
export type Pop<T extends unknown[]> = T extends [...infer Pre, infer _] ? Pre : never

export type Shift<T extends unknown[]> = T extends [infer _, ...infer Rest] ? Rest : never
export type Unshift<T extends unknown[], E> = [E, ...T]

/**
 * @description Drop the first N elements of the tuple / 删除元组的前 N 个元素
 * @example
 * ```
 * type Tuple = DropFirst<[1, 2, 3, 4, 5], 2> // [3, 4, 5]
 * ```
 */
export type DropFirst<T extends unknown[], N extends number, Count extends unknown[] = []> =
  Count['length'] extends N
    ? T
    : T extends [infer F, ...infer Rest]
      ? DropFirst<Rest, N, Push<Count, F>>
      : T
