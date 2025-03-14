/**
 * @description Flatten any dimension array / 将任意维数组扁平化
 * @param array array to flatten / 要扁平化的数组
 * @example
 * ```
 * flatten([1, [2, [3]]]) // [1, 2, 3]
 * ```
 */
export const flattenDeep = <T = number>(array: any[]): T[] => array.flat(Infinity)
