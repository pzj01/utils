import { random } from '../math'

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
    const charset: string[] = []
    for (const [start, end] of ranges) {
      for (let code = start; code <= end; code++) {
        charset.push(String.fromCodePoint(code))
      }
    }
    CHARSET_CACHE.set(cacheKey, charset.join())
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

/**
 * @description Get a random character from a charset string / 从字符集中随机获取一个字符
 * @param charset Charset string or array / 字符集字符串或数组
 * @example
 * ```
 * randomIn('abc') // or 'a'
 * randomIn(['a', 'b', 'c']) // or 'b'
 * ```
 */
export function randomIn(charset: string | string[]) {
  const charsetString = Array.isArray(charset) ? charset.join('') : charset
  return charsetString.charAt(random(0, charsetString.length - 1))
}

/**
 * @description Generate a random uppercase letter / 生成随机大写字母
 */
export const randomUpper = () => randomChar([RANGE.UPPER])

/**
 * @description Generate a random lowercase letter / 生成随机小写字母
 */
export const randomLower = () => randomChar([RANGE.LOWER])

/**
 * @description Generate a random digit / 生成随机数字
 */
export const randomDigit = () => randomChar([RANGE.DIGIT])

/**
 * @description Generate a random basic symbol / 生成随机基本符号
 */
export const randomBasicSymbol = () => randomChar([RANGE.BASIC_SYMBOL])

/**
 * @description Generate a random extended symbol / 生成随机扩展符号
 */
export const randomExtendedSymbol = () => randomChar([RANGE.EXTENDED_SYMBOL])

/**
 * @description Generate a random bracket symbol / 生成随机括号符号
 */
export const randomBracketSymbol = () => randomChar([RANGE.BRACKET_SYMBOL])

/**
 * @description Generate a random tail symbol / 生成随机尾部符号
 */
export const randomTailSymbol = () => randomChar([RANGE.TAIL_SYMBOL])

/**
 * @description Generate a random letter (upper or lower case) / 生成随机字母（大写或小写）
 */
export const randomAlpha = () => randomChar(ALPHA)

/**
 * @description Generate a random alphanumeric character / 生成随机字母数字字符
 */
export const randomAlphanumeric = () => randomChar(ALPHANUMERIC)

/**
 * @description Generate a random symbol / 生成随机符号
 */
export const randomSymbol = () => randomChar(SYMBOL)

/**
 * @description Generate a random hex character (0-9, A-F) / 生成随机十六进制字符
 */
export const randomHex = () => randomChar(HEX)

/**
 * @description Generate a random printable character / 生成随机可打印字符
 */
export const randomPrintable = () => randomChar(PRINTABLE)

/**
 * @description Generate a random string of a given length / 生成指定长度的随机字符串
 * @param length Length of the string / 字符串长度
 * @param charset Charset string or array / 字符集字符串或数组
 * @example
 * ```
 * randomString(8) // or 'a3B!c9Dx'
 * randomString(6, 'ABC123') // or 'A1B2C3'
 * ```
 */
export function randomString(length: number, charset: string | string[]) {
  const charsetString = Array.isArray(charset) ? charset.join('') : charset
  const result = []
  for (let i = 0; i < length; i++) {
    result.push(randomIn(charsetString))
  }
  return result.join('')
}

/**
 * @description Generate a random string of a given length from specified character ranges / 从指定字符范围生成指定长度的随机字符串
 * @param length Length of the string / 字符串长度
 * @param ranges Character ranges to select from / 可选字符范围
 * @example
 * ```
 * randomRangeString(6, [RANGE.UPPER, RANGE.DIGIT]) // or 'A3B1C2'
 * ```
 */
export const randomRangeString = (length: number, ranges: LetterRange[]) => randomString(length, ensureCharset(ranges))
