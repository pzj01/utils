import { random } from '../math'
import { StringOrArray } from '../types'

const RANGE = {
  UPPER: ['A'.charCodeAt(0), 'Z'.charCodeAt(0)] as const, // A-Z
  LOWER: ['a'.charCodeAt(0), 'z'.charCodeAt(0)] as const, // a-z
  DIGIT: ['0'.charCodeAt(0), '9'.charCodeAt(0)] as const, // 0-9
  BASIC_SYMBOL: ['!'.charCodeAt(0), '/'.charCodeAt(0)] as const, // !-/
  EXTENDED_SYMBOL: [':'.charCodeAt(0), '@'.charCodeAt(0)] as const, // :-@
  BRACKET_SYMBOL: ['['.charCodeAt(0), '`'.charCodeAt(0)] as const, // [-`

  TAIL_SYMBOL: ['{'.charCodeAt(0), '~'.charCodeAt(0)] as const,
}

const ALPHA = [RANGE.UPPER, RANGE.LOWER] as const // A-Z, a-z
const ALPHANUMERIC = [...ALPHA, RANGE.DIGIT] as const // A-Z, a-z, 0-9
const SYMBOL = [RANGE.BASIC_SYMBOL, RANGE.EXTENDED_SYMBOL, RANGE.BRACKET_SYMBOL, RANGE.TAIL_SYMBOL] as const
const HEX = [RANGE.DIGIT, ['A'.charCodeAt(0), 'F'.charCodeAt(0)]] as const // 0-9, A-F
const PRINTABLE = [...ALPHANUMERIC, ...SYMBOL] as const
const ALL = [...ALPHANUMERIC, ...SYMBOL] as const

type LetterRange = typeof RANGE.UPPER

const CHARSET_CACHE = new Map<string, string>()

function ensureCharset(ranges: readonly LetterRange[]) {
  const cacheKey = ranges.map(([start, end]) => `${start}-${end}`).join(',')

  if (!CHARSET_CACHE.has(cacheKey)) {
    let charset = ''
    for (const [start, end] of ranges) {
      for (let code = start; code <= end; code++) {
        charset += String.fromCodePoint(code)
      }
    }
    CHARSET_CACHE.set(cacheKey, charset)
  }

  return CHARSET_CACHE.get(cacheKey)!
}

/**
 * @description Generate a random letter within the specified range / 生成指定范围内的随机字母
 * @param ranges Letter ranges to select from / 可选的字母范围
 * @returns A random letter from the specified ranges / 从指定范围内随机生成的字母
 * @example
 * ```
 * randomChar() // or 'a'
 * randomChar() // or 'Z'
 * randomChar([RANGE.UPPER]) // or 'A'
 * randomChar([RANGE.LOWER]) // or 'z'
 * randomChar([RANGE.DIGIT]) // or '0'
 * randomChar([RANGE.BASIC_SYMBOL]) // or '!'
 * randomChar([RANGE.Extended_SYMBOL]) // or ':'
 * randomChar([RANGE.BRACKET_SYMBOL]) // or '['
 * randomChar([RANGE.TAIL_SYMBOL]) // or '{'
 * ```
 */
export function randomChar(ranges: readonly LetterRange[] = ALL) {
  const charset = ensureCharset(ranges)
  return randomIn(charset)
}

export function randomIn(charset: string | string[]) {
  const charsetString = Array.isArray(charset) ? charset.join('') : charset
  return charsetString.charAt(random(0, charsetString.length - 1))
}

export const randomUpper = () => randomChar([RANGE.UPPER])
export const randomLower = () => randomChar([RANGE.LOWER])
export const randomDigit = () => randomChar([RANGE.DIGIT])
export const randomBasicSymbol = () => randomChar([RANGE.BASIC_SYMBOL])
export const randomExtendedSymbol = () => randomChar([RANGE.EXTENDED_SYMBOL])
export const randomBracketSymbol = () => randomChar([RANGE.BRACKET_SYMBOL])
export const randomTailSymbol = () => randomChar([RANGE.TAIL_SYMBOL])

export const randomAlpha = () => randomChar(ALPHA)
export const randomAlphanumeric = () => randomChar(ALPHANUMERIC)
export const randomSymbol = () => randomChar(SYMBOL)
export const randomHex = () => randomChar(HEX)
export const randomPrintable = () => randomChar(PRINTABLE)
