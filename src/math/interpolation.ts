import { clamp } from './common'
import { linear } from './easing'

/**
 * @description Inverse linear interpolation: map a value in [min, max] to a normalized t in [0, 1] / 反向线性插值：将 [min, max] 范围内的值映射到 [0, 1] 的 t
 * @example
 * ```
 * inverseLerp(0, 10, 5) // 0.5
 * ```
 */
export const inverseLerp = (min: number, max: number, value: number) => (value - min) / (max - min)

/**
 * @description Linear interpolation with easing function / 带缓动函数的线性插值
 * @param min Start value / 开始值
 * @param max End value / 结束值
 * @param t Normalized time (0-1) / 归一化时间（0-1）
 * @param easing Easing function / 缓动函数
 * @example
 * ```
 * lerpWithEasing(0, 100, 0.5) // 50
 * lerpWithEasing(0, 100, 0.5, easeIn) // 25
 * ```
 */
export const lerpWithEasing = (min: number, max: number, t: number, easing: (t: number) => number = linear) => min + (max - min) * easing(clamp(t, 0, 1))

/**
 * @description Linear interpolation / 线性插值
 * @param min Start value / 开始值
 * @param max End value / 结束值
 * @param t Normalized time (0-1) / 归一化时间（0-1）
 * @example
 * ```
 * lerp(0, 100, 0.5) // 50
 * ```
 */
export const lerp = (min: number, max: number, t: number) => lerpWithEasing(min, max, t)
