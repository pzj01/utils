import { clamp } from './common'
import { linear } from './easing'

export const inverseLerp = (min: number, max: number, value: number) => (value - min) / (max - min)
export const lerpWithEasing = (min: number, max: number, t: number, easing: (t: number) => number = linear) => min + (max - min) * easing(clamp(t, 0, 1))
export const lerp = (min: number, max: number, t: number) => lerpWithEasing(min, max, t)
