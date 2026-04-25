import { expect, it } from 'vitest'
import { getRawType, isBigInt, isBoolean, isDate, isFalsy, isFunction, isMap, isNumber, isObject, isPrimitive, isPromise, isRegExp, isSet, isString, isSymbol, isTruthy, isWeakMap, isWeakSet, toBoolean, toNumber, toString } from '.'

it('toString', () => {
  expect(toString(1)).toBe('[object Number]')
  expect(toString('')).toBe('[object String]')
  expect(toString(true)).toBe('[object Boolean]')
  expect(toString(null)).toBe('[object Null]')
  expect(toString(undefined)).toBe('[object Undefined]')
})

it('getRawType', () => {
  expect(getRawType(1)).toBe('number')
  expect(getRawType('')).toBe('string')
  expect(getRawType(true)).toBe('boolean')
  expect(getRawType(null)).toBe('null')
  expect(getRawType(undefined)).toBe('undefined')
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

it('isString', () => {
  const name = 'pzj01'
  expect(isString('hello')).toBe(true)
  expect(isString(`hello ${name}`)).toBe(true)
  expect(isString(1)).toBe(false)
})

it('isNumber', () => {
  expect(isNumber(1)).toBe(true)
  expect(isNumber(Infinity)).toBe(true)
  expect(isNumber('1')).toBe(false)
})

it('isBoolean', () => {
  expect(isBoolean(true)).toBe(true)
  expect(isBoolean(false)).toBe(true)
  expect(isBoolean(undefined)).toBe(false)
})

it('isBigInt', () => {
  // eslint-disable-next-line no-loss-of-precision
  expect(isBigInt(BigInt(9999999999999999))).toBe(true)
  // eslint-disable-next-line no-loss-of-precision
  expect(isBigInt(9999999999999999)).toBe(false)
})

it('isSymbol', () => {
  expect(isSymbol(Symbol('hello'))).toBe(true)
  expect(isSymbol('hello')).toBe(false)
})

it('isFunction', () => {
  expect(isFunction(() => {})).toBe(true)
  expect(isFunction(() => {})).toBe(true)
  // eslint-disable-next-line no-new-func
  expect(isFunction(new Function())).toBe(true)
})

it('isObject', () => {
  expect(isObject({})).toBe(true)
  expect(isObject([])).toBe(false)
  expect(isObject(null)).toBe(false)
  expect(isObject(undefined)).toBe(false)
})

it('isPrimitive', () => {
  expect(isPrimitive('hello')).toBe(true)
  expect(isPrimitive(1)).toBe(true)
  expect(isPrimitive(true)).toBe(true)
  // eslint-disable-next-line no-loss-of-precision
  expect(isPrimitive(BigInt(9999999999999999))).toBe(true)
  expect(isPrimitive(Symbol('hello'))).toBe(true)
  expect(isPrimitive(null)).toBe(true)
  expect(isPrimitive(undefined)).toBe(true)
  expect(isPrimitive({})).toBe(false)
  expect(isPrimitive([])).toBe(false)
  expect(isPrimitive(() => {})).toBe(false)
  expect(isPrimitive(new Date())).toBe(false)
})

it('isDate', () => {
  expect(isDate(new Date())).toBe(true)
  expect(isDate(Date.now())).toBe(false)
})

it('isRegExp', () => {
  expect(isRegExp(/hello/)).toBe(true)
  // eslint-disable-next-line prefer-regex-literals
  expect(isRegExp(new RegExp('hello'))).toBe(true)
})

it('isPromise', () => {
  const likePromise = {
    then: () => {},
    catch: () => {},
    finally: () => {},
  }
  expect(isPromise(new Promise(() => {}))).toBe(true)
  expect(isPromise(likePromise)).toBe(false)
})

it('isSet', () => {
  expect(isSet(new Set())).toBe(true)
})

it('isMap', () => {
  expect(isMap(new Map())).toBe(true)
})

it('isWeakSet', () => {
  expect(isWeakSet(new WeakSet())).toBe(true)
})

it('isWeakMap', () => {
  expect(isWeakMap(new WeakMap())).toBe(true)
})

it('isTruthy', () => {
  expect(isTruthy([])).toBe(true)
  expect(isTruthy({})).toBe(true)
  expect(isTruthy(1)).toBe(true)
  expect(isTruthy(0)).toBe(false)
  expect(isTruthy('')).toBe(false)
  expect(isTruthy(null)).toBe(false)
  expect(isTruthy(undefined)).toBe(false)
})

it('isFalsy', () => {
  expect(isFalsy([])).toBe(false)
  expect(isFalsy({})).toBe(false)
  expect(isFalsy(1)).toBe(false)
  expect(isFalsy(0)).toBe(true)
  expect(isFalsy('')).toBe(true)
  expect(isFalsy(null)).toBe(true)
  expect(isFalsy(undefined)).toBe(true)
})
