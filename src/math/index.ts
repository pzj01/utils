/**
 * @description Clamp value within the specified range / 限制值在指定范围内
 * @param value Value to clamp / 要限制的值
 * @param min Minimum value / 最小值
 * @param max Maximum value / 最大值
 * @example
 * ```
 * clamp(5, 7, 10) // 7
 * ```
 */
export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(value, min))

/**
 * @description Calculate the sum of all arguments / 计算所有参数的和
 * @example
 * ```
 * sum(1, 2, 3) // 6
 * sum([1, 2, 3]) // 6
 * ```
 */
export const sum = (...args: number[] | number[][]) => args.flat().reduce((a, b) => a + b, 0)

/**
 * @description Linear interpolation / 线性插值
 * @param min Minimum value / 最小值
 * @param max Maximum value / 最大值
 * @param t Interpolation factor / 插值因子
 * @example
 * ```
 * lerp(0, 10, 0.5) // 5
 * ```
 */
export const lerp = (min: number, max: number, t: number) => min + (max - min) * clamp(t, 0, 1)

/**
 * @description Generate a random number within the specified range / 生成指定范围内的随机数
 * @param min Minimum value / 最小值
 * @param max Maximum value / 最大值
 * @example
 * ```
 * random(1, 10) // or 5
 * random(1, 10) // or 1
 * random(1, 10) // or 10
 * ```
 */
export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
