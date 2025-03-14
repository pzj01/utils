import { expect, it } from 'vitest'
import { getType, toBoolean, toNumber, toString } from '.'

it('toString', () => {
  expect(toString(1)).toBe('[object Number]')
  expect(toString('')).toBe('[object String]')
  expect(toString(true)).toBe('[object Boolean]')
  expect(toString(null)).toBe('[object Null]')
  expect(toString(undefined)).toBe('[object Undefined]')
})

it('getType', () => {
  expect(getType(1)).toBe('number')
  expect(getType('')).toBe('string')
  expect(getType(true)).toBe('boolean')
  expect(getType(null)).toBe('null')
  expect(getType(undefined)).toBe('undefined')
})

it('toBoolean', () => {
  expect(toBoolean(1)).toBeTruthy()
  expect(toBoolean('')).toBeFalsy()
  expect(toBoolean({})).toBeTruthy()
  expect(toBoolean(null)).toBeFalsy()
  expect(toBoolean(undefined)).toBeFalsy()
})

it('toNumber', () => {
  expect(toNumber('1')).toBe(1)
  expect(toNumber('')).toBe(0)
  expect(toNumber(true)).toBe(1)
  expect(toNumber(false)).toBe(0)
  expect(toNumber(null)).toBe(0)
  expect(toNumber(undefined)).toBeNaN()
})
