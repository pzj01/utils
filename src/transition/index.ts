import { lerpWithEasing } from '../math'
import { createStopwatch } from '../time'

/**
 * @description Transition from one value to another over a period of time / 在一段时间内从一个值过渡到另一个值
 * @param from Start value / 开始值
 * @param to End value / 结束值
 * @param duration Duration / 持续时间
 * @param callback Callback function / 回调函数
 * @example
 * ```
 * transition(0, 100, 1000, value => console.log(value))
 * ```
 */
export function transition(
  from: number,
  to: number,
  duration: number,
  callback: (value: number) => void,
  easing?: (t: number) => number,
) {
  const stopwatch = createStopwatch()
  function frame() {
    const elapsed = stopwatch.read()
    callback(lerpWithEasing(from, to, elapsed / duration, easing))
    if (elapsed >= duration)
      return
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}
