import { expect, it } from 'vitest'
import { clamp, lerp, random, sum } from '.'

it('clamp', () => {
  expect(clamp(5, 7, 10)).toBe(7)
})

it('sum', () => {
  expect(sum(1, 2, 3)).toBe(6)
  expect(sum([1, 2, 3])).toBe(6)
})

it('lerp', () => {
  expect(lerp(0, 10, 0.5)).toBe(5)
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
