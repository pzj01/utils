export const linear = (t: number) => t

/**
 * @description ease-in (starts slow, accelerates) / 缓入（开始缓慢，然后加速）
 */
export const easeIn = (t: number) => t * t

/**
 * @description ease-out (starts fast, decelerates) / 缓出（开始快速，然后减速）
 */
export const easeOut = (t: number) => t * (2 - t)
/**
 * @description ease-in-out (smooth acceleration and deceleration) / 缓入缓出（平滑加速和减速）
 */
export const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

/**
 * @description Sine ease-in (starts slow with a sinusoidal curve) / 正弦缓入（以正弦曲线缓慢开始）
 */
export const easeInSine = (t: number) => 1 - Math.cos((t * Math.PI) / 2)

/**
 * @description Sine ease-out (starts fast with a sinusoidal curve) / 正弦缓出（以正弦曲线快速开始）
 */
export const easeOutSine = (t: number) => Math.sin((t * Math.PI) / 2)

/**
 * @description Sine ease-in-out (smooth sinusoidal acceleration and deceleration) / 正弦缓入缓出（平滑的正弦曲线加速和减速）
 */
export const easeInOutSine = (t: number) => -(Math.cos(t * Math.PI) - 1) / 2

/**
 * @description Bounce ease-out (simulates a bouncing effect at the end) / 弹跳缓出（模拟最后的弹跳效果）
 */
export function easeOutBounce(t: number) {
  const n1 = 7.5625
  const d1 = 2.75
  if (t < 1 / d1) {
    return n1 * t * t
  }
  else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75
  }
  else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375
  }
  else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375
  }
}

/**
 * @description Bounce ease-in (simulates a bouncing effect at the start) / 弹跳缓入（模拟开始的弹跳效果）
 */
export const easeInBounce = (t: number) => 1 - easeOutBounce(1 - t)

/**
 * @description Bounce ease-in-out (bouncing effect at both start and end) / 弹跳缓入缓出（开始和结束的弹跳效果）
 */
export const easeInOutBounce = (t: number) => t < 0.5 ? (1 - easeOutBounce(1 - 2 * t)) / 2 : (1 + easeOutBounce(2 * t - 1)) / 2
