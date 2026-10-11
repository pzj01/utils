import { random } from '../math'

/**
 * @description Get the current timestamp / 获取当前时间戳
 * @example
 * ```
 * timestamp() // 1700000000000
 * ```
 */
export const timestamp = () => Date.now()

/**
 * @description Generate a random date within the specified range / 生成指定范围内的随机日期
 * @param startTime Start time / 开始时间
 * @param endTime End time / 结束时间
 * @example
 * ```
 * const startTime = new Date('2020-01-01')
 * const endTime = new Date('2020-12-31')
 * const randomDate = randomDate(startTime, endTime)
 * ```
 */
export function randomDate(startTime: Date, endTime: Date) {
  const startTimestamp = startTime.getTime()
  const endTimestamp = endTime.getTime()
  const randomTimestamp = random(startTimestamp, endTimestamp)
  return new Date(randomTimestamp)
}

/**
 * @description Format a date to a locale date string / 将日期格式化为本地日期字符串
 * @param date Date to format / 要格式化的日期
 * @example
 * ```
 * formatDate(new Date('2024-01-01')) // '1/1/2024'
 * ```
 */
export function formatDate(date: Date) {
  return date.toLocaleDateString()
}
