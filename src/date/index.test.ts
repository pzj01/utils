import { expect, it, vi } from 'vitest'
import { createStopwatch, elapsed, now } from '.'

it('now', () => {
  expect(now()).toBe(Date.now())
  expect(typeof now()).toBe('number')
})

it('elapsed', () => {
  vi.stubGlobal('Date', { now: () => 1000 })
  expect(elapsed(500)).toBe(500)
  vi.unstubAllGlobals()
})

it('createStopwatch', () => {
  vi.stubGlobal('Date', { now: () => 1000 })
  const stopwatch = createStopwatch()
  vi.stubGlobal('Date', { now: () => 2000 })
  expect(stopwatch.read()).toBe(1000)
  stopwatch.stop()
  expect(stopwatch.read()).toBe(1000)
  vi.stubGlobal('Date', { now: () => 3000 })
  stopwatch.resume()
  expect(stopwatch.read()).toBe(2000)
  stopwatch.reset()
  expect(stopwatch.read()).toBe(0)
  vi.unstubAllGlobals()
})
