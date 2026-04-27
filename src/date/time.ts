import { hasPerformance } from '../env'
import { timestamp } from './date'

export const now = () => hasPerformance ? performance.now() : timestamp()

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
