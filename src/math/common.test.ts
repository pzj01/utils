import { describe, expect, it } from 'vitest'
import { clamp, random, sum, toDecimals } from '.'

describe('common', () => {
  it('clamp', () => {
    expect(clamp(5, 7, 10)).toBe(7)
  })

  it('sum', () => {
    expect(sum(1, 2, 3)).toBe(6)
    expect(sum([1, 2, 3])).toBe(6)
  })

  it('random', () => {
    const min = 0
    const max = 10
    const result = Array.from({ length: 10 }, () => random(min, max))
    for (const item of result) {
      expect(item).toBeGreaterThanOrEqual(min)
      expect(item).toBeLessThanOrEqual(max)
    }
  })

  it('roundToDecimal', () => {
    expect(toDecimals(3.1415926535, 3)).toBe(3.141)
    expect(toDecimals(3.1415926535, 3, true)).toBe(3.142) // round
  })
})
