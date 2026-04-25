import { random } from '../math'

const _now = performance
  ? () => performance.now()
  : () => Date.now()

export const now = () => _now()
/**
 * @description Calculate the elapsed time / 计算经过的时间
 * @param start Start time / 开始时间
 * @example
 * ```
 * const start = now()
 * // do something
 * console.log(elapsed(start)) // 1000
 * ```
 */
export const elapsed = (start: number) => now() - start

/**
 * @description Create a stopwatch / 创建一个秒表
 * @example
 * ```
 * const stopwatch = createStopwatch()
 * stopwatch.read() // 0
 * stopwatch.stop()
 * stopwatch.read() // 1000
 * stopwatch.resume()
 * stopwatch.read() // 1000
 * stopwatch.reset()
 * stopwatch.read() // 0
 * ```
 */
export function createStopwatch() {
  let startTime = now()
  let isPaused = false
  let accumulatedTime = 0

  const reset = () => {
    startTime = now()
    accumulatedTime = 0
    isPaused = false
  }
  const read = () => isPaused ? accumulatedTime : elapsed(startTime) + accumulatedTime
  const stop = () => {
    if (!isPaused) {
      accumulatedTime += elapsed(startTime)
      isPaused = true
    }
  }
  const resume = () => {
    if (isPaused) {
      startTime = now()
      isPaused = false
    }
  }
  return {
    reset,
    read,
    stop,
    resume,
    get isPaused() {
      return isPaused
    },
  }
}

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
