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

/**
 * @description Push an element to the end of a tuple / 在元组末尾添加一个元素
 * @example
 * ```
 * type Arr = Push<[1, 2], 3> // [1, 2, 3]
 * ```
 */
export type Push<T extends unknown[], E> = [...T, E]

/**
 * @description Remove the last element of a tuple / 删除元组的最后一个元素
 * @example
 * ```
 * type Arr = Pop<[1, 2, 3]> // [1, 2]
 * ```
 */
export type Pop<T extends unknown[]> = T extends [...infer Pre, infer _] ? Pre : never

/**
 * @description Remove the first element of a tuple / 删除元组的第一个元素
 * @example
 * ```
 * type Arr = Shift<[1, 2, 3]> // [2, 3]
 * ```
 */
export type Shift<T extends unknown[]> = T extends [infer _, ...infer Rest] ? Rest : never

/**
 * @description Add an element to the beginning of a tuple / 在元组开头添加一个元素
 * @example
 * ```
 * type Arr = Unshift<[2, 3], 1> // [1, 2, 3]
 * ```
 */
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
