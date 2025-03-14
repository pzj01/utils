import { expect, it } from 'vitest'
import { toHex, toHexString, toHSL, toHSLString, toRGB, toRGBString } from '.'

it('toRGB', () => {
  expect(toRGB('red')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
})

it('toRGBString', () => {
  expect(toRGBString('red')).toEqual('rgb(255, 0, 0)')
})

it('toHex', () => {
  expect(toHex('red')).toEqual('ff0000')
})

it('toHexString', () => {
  expect(toHexString('red')).toEqual('#ff0000')
})

it('toHSL', () => {
  expect(toHSL('red')).toEqual({ h: 0, s: 1, l: 0.5, a: 1 })
})

it('toHSLString', () => {
  expect(toHSLString('red')).toEqual('hsl(0, 100%, 50%)')
})
