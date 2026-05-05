import { random } from '../math'

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
