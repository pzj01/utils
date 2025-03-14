export const now = () => Date.now()

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
  let start = now()
  let isPaused = false
  let pausedTime = 0
  const reset = () => start = now()
  const read = () => isPaused ? pausedTime : elapsed(start)
  const stop = () => {
    if (!isPaused) {
      pausedTime = elapsed(start)
      isPaused = true
    }
  }
  const resume = () => {
    if (isPaused) {
      pausedTime = 0
      isPaused = false
    }
  }
  return {
    reset,
    read,
    stop,
    resume,
  }
}
