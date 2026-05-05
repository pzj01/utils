import { expect, it } from 'vitest'
import { randomDate, timestamp } from '.'

it('timestamp', () => {
  const ts = timestamp()
  expect(ts).toBeLessThanOrEqual(Date.now())
  expect(ts).toBeTypeOf('number')
})

it('randomDate', () => {
  const startTime = new Date('2020-01-01')
  const endTime = new Date('2020-12-31')
  const date = randomDate(startTime, endTime)
  expect(date.getTime()).toBeGreaterThanOrEqual(startTime.getTime())
  expect(date.getTime()).toBeLessThanOrEqual(endTime.getTime())
})
