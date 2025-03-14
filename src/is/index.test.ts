import { expect, it } from 'vitest'
import { isBigInt, isBoolean, isDate, isFalsy, isFunction, isMap, isNumber, isObject, isPrimitive, isPromise, isRegExp, isSet, isString, isSymbol, isTruthy, isWeakMap, isWeakSet } from '.'

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
  expect(isBigInt(BigInt(9999999999999999))).toBe(true)
  expect(isBigInt(9999999999999999)).toBe(false)
})

it('isSymbol', () => {
  expect(isSymbol(Symbol('hello'))).toBe(true)
  expect(isSymbol('hello')).toBe(false)
})

it('isFunction', () => {
  expect(isFunction(() => {})).toBe(true)
  expect(isFunction(() => {})).toBe(true)
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
