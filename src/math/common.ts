import { toNumber } from '../is'

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
 * @description Generate a random number within the specified range，including the boundary values / 生成指定范围内的随机数，包含边界值
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
/**
 * @description Truncate or round a number to a specified decimal places / 截断或四舍五入数字到指定小数位数
 * @param value Number to process / 要处理的数字
 * @param digit Number of decimal places / 小数位数
 * @param round Whether to round / 是否四舍五入
 * @example
 * ```
 * toDecimals(3.14159, 2) // 3.14
 * toDecimals(3.14159, 2, true) // 3.14
 * toDecimals(3.14559, 2, true) // 3.15
 * ```
 */
export function toDecimals(value: number, digit: number, round: boolean = false) {
  if (!Number.isFinite(value))
    return Number.NaN
  if (!Number.isInteger(digit) || digit < 0)
    throw new Error('Decimals must be a non-negative integer / 位数必须是一个正整数')

  if (round) {
    return toNumber(value.toFixed(digit))
  }

  const [integer, decimals] = value.toString().split('.')
  return toNumber(`${integer}.${decimals.slice(0, digit)}`)
}
