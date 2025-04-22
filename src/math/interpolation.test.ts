import { describe, expect, it } from 'vitest'
import { easeIn } from './easing'
import { inverseLerp, lerp, lerpWithEasing } from './interpolation'

describe('interpolation', () => {
  const min = 0; const max = 10; const t = 0.5; const value = 5

  it('lerp', () => {
    expect(lerp(min, max, t)).toBe(value)
  })

  it('inverseLerp', () => {
    expect(inverseLerp(min, max, value)).toBe(t)
  })

  it('lerpWithEasing', () => {
    expect(lerpWithEasing(min, max, t, easeIn)).toBe(easeIn(t) * 10)
  })
})
