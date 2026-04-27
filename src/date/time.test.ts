import { expect, it, vi } from 'vitest'
import { createStopwatch, elapsed, now } from '.'

it('now', () => {
  expect(now()).toBeLessThanOrEqual(performance ? performance.now() : Date.now())
  expect(typeof now()).toBe('number')
})

it('createStopwatch', () => {
  vi.stubGlobal('performance', { now: () => 1000 })
  const stopwatch = createStopwatch()
  vi.stubGlobal('performance', { now: () => 2000 })
  expect(stopwatch.read()).toBe(1000)
  stopwatch.stop()
  expect(stopwatch.read()).toBe(1000)
  vi.stubGlobal('performance', { now: () => 3000 })
  stopwatch.resume()
  expect(stopwatch.read()).toBe(1000)
  stopwatch.reset()
  expect(stopwatch.read()).toBe(0)
  vi.unstubAllGlobals()
})
