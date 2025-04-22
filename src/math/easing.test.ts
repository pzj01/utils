import { describe, expect, it } from 'vitest'
import { toDecimals } from './common'
import { easeIn, easeInBounce, easeInOut, easeInOutBounce, easeInOutSine, easeInSine, easeOut, easeOutBounce, easeOutSine, linear } from './easing'

describe('easing', () => {
  const before = 0.3
  const middle = 0.5
  const after = 0.7
  const digits = 3
  const round = true

  it('linear', () => {
    expect(linear(before)).toBe(before)
    expect(linear(middle)).toBe(middle)
    expect(linear(after)).toBe(after)
  })

  it('easeIn', () => {
    expect(easeIn(before)).toBe(0.09)
    expect(easeIn(middle)).toBe(0.25)
    expect(toDecimals(easeIn(after), digits, round)).toBe(0.49)
  })

  it('easeOut', () => {
    expect(easeOut(before)).toBe(0.51)
    expect(easeOut(0.5)).toBe(0.75)
    expect(toDecimals(easeOut(after), digits, round)).toBe(0.91)
  })

  it('easeInOut', () => {
    expect(easeInOut(before)).toBe(0.18)
    expect(easeInOut(middle)).toBe(0.5)
    expect(toDecimals(easeInOut(after), digits, round)).toBe(0.82)
  })

  it('easeSineOut', () => {
    expect(toDecimals(easeOutSine(before), digits, round)).toBe(0.454)
    expect(toDecimals(easeOutSine(middle), digits, round)).toBe(0.707)
    expect(toDecimals(easeOutSine(after), digits, round)).toBe(0.891)
  })

  it('easeSineIn', () => {
    expect(toDecimals(easeInSine(before), digits, round)).toBe(0.109)
    expect(toDecimals(easeInSine(middle), digits, round)).toBe(0.293)
    expect(toDecimals(easeInSine(after), digits, round)).toBe(0.546)
  })

  it('easeSineInOut', () => {
    expect(toDecimals(easeInOutSine(before), digits, round)).toBe(0.206)
    expect(toDecimals(easeInOutSine(middle), digits, round)).toBe(0.5)
    expect(toDecimals(easeInOutSine(after), digits, round)).toBe(0.794)
  })

  it('easeOutBounce', () => {
    expect(toDecimals(easeOutBounce(before), digits, round)).toBe(0.681)
    expect(toDecimals(easeOutBounce(middle), digits, round)).toBe(0.766)
    expect(toDecimals(easeOutBounce(after), digits, round)).toBe(0.931)
  })

  it('easeInBounce', () => {
    expect(toDecimals(easeInBounce(before), digits, round)).toBe(0.069)
    expect(toDecimals(easeInBounce(middle), digits, round)).toBe(0.234)
    expect(toDecimals(easeInBounce(after), digits, round)).toBe(0.319)
  })

  it('easeInOutBounce', () => {
    expect(toDecimals(easeInOutBounce(before), digits, round)).toBe(0.045)
    expect(toDecimals(easeInOutBounce(middle), digits, round)).toBe(0.5)
    expect(toDecimals(easeInOutBounce(after), digits, round)).toBe(0.955)
  })
})
