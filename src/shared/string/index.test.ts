import { describe, expect, it } from 'vitest'
import {
  randomAlphanumeric,
  randomBasicSymbol,
  randomBracketSymbol,
  randomChar,
  randomDigit,
  randomExtendedSymbol,
  randomHex,
  randomIn,
  randomLower,
  randomPrintable,
  randomRangeString,
  randomString,
  randomSymbol,
  randomTailSymbol,
  randomUpper,
  RANGE,
  slash,
  unslash,
} from '.'

/** 按码点范围展开成字符数组，用于断言随机结果落在预期字符集内 */
function chars(start: string, end: string) {
  const from = start.charCodeAt(0)
  return Array.from({ length: end.charCodeAt(0) - from + 1 }, (_, i) => String.fromCharCode(from + i))
}

const UPPER = chars('A', 'Z')
const LOWER = chars('a', 'z')
const DIGIT = chars('0', '9')
const SYMBOL = [...chars('!', '/'), ...chars(':', '@'), ...chars('[', '`'), ...chars('{', '~')]
const ALPHANUMERIC = [...UPPER, ...LOWER, ...DIGIT]
const PRINTABLE = [...ALPHANUMERIC, ...SYMBOL]

// 随机函数无法断言具体取值，统一用「多次采样 + 成员断言」验证字符集范围
function expectAllIn(fn: () => string, allowed: string[], times = 100) {
  for (let i = 0; i < times; i++) {
    const char = fn()
    expect(allowed, `got unexpected character ${JSON.stringify(char)}`).toContain(char)
  }
}

describe('string', () => {
  describe('randomIn', () => {
    it('picks a character from the charset string', () => {
      expectAllIn(() => randomIn('abc'), ['a', 'b', 'c'])
    })

    it('accepts an array charset', () => {
      expectAllIn(() => randomIn(['a', 'b', 'c']), ['a', 'b', 'c'])
    })
  })

  describe('randomChar', () => {
    it('defaults to all printable characters', () => {
      expectAllIn(() => randomChar(), PRINTABLE)
    })

    it('respects the exported RANGE constants', () => {
      expectAllIn(() => randomChar([RANGE.UPPER]), UPPER)
      expectAllIn(() => randomChar([RANGE.DIGIT]), DIGIT)
    })
  })

  describe('character category helpers', () => {
    const cases: [string, () => string, string[]][] = [
      ['randomUpper', randomUpper, UPPER],
      ['randomLower', randomLower, LOWER],
      ['randomDigit', randomDigit, DIGIT],
      ['randomHex', randomHex, [...DIGIT, ...chars('A', 'F')]],
      ['randomAlphanumeric', randomAlphanumeric, ALPHANUMERIC],
      ['randomBasicSymbol', randomBasicSymbol, chars('!', '/')],
      ['randomExtendedSymbol', randomExtendedSymbol, chars(':', '@')],
      ['randomBracketSymbol', randomBracketSymbol, chars('[', '`')],
      ['randomTailSymbol', randomTailSymbol, chars('{', '~')],
      ['randomSymbol', randomSymbol, SYMBOL],
      ['randomPrintable', randomPrintable, PRINTABLE],
    ]

    for (const [name, fn, allowed] of cases) {
      it(name, () => expectAllIn(fn, allowed))
    }
  })

  describe('randomString', () => {
    it('generates a string of the requested length', () => {
      expect(randomString(8)).toHaveLength(8)
      expect(randomString(0)).toBe('')
    })

    it('defaults to printable characters', () => {
      expectAllIn(() => randomString(1), PRINTABLE, 64)
    })

    it('respects a custom charset', () => {
      expectAllIn(() => randomString(1, 'ABC123'), [...chars('A', 'C'), ...chars('1', '3')], 64)
      expect(randomString(32, ['a', 'b'])).toMatch(/^[ab]{32}$/)
    })
  })

  describe('randomRangeString', () => {
    it('generates from the given ranges', () => {
      expect(randomRangeString(6, [RANGE.UPPER, RANGE.DIGIT])).toMatch(/^[A-Z0-9]{6}$/)
    })
  })

  describe('path helpers', () => {
    it('slash converts Windows separators to Unix', () => {
      expect(slash('C:\\Users\\user\\file.txt')).toBe('C:/Users/user/file.txt')
      expect(slash('/already/unix')).toBe('/already/unix')
    })

    it('unslash converts Unix separators to Windows', () => {
      expect(unslash('C:/Users/user/file.txt')).toBe('C:\\Users\\user\\file.txt')
    })
  })
})
