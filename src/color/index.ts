import type { ColorInput } from 'tinycolor2'
import tinycolor from 'tinycolor2'

export const toColor = (color: ColorInput) => tinycolor(color)

/**
 * @description convert color to RGB object / 将颜色转换为 RGB 对象
 * @param color color value / 颜色值
 * @example
 * ```
 * toRGB('red') // { r: 255, g: 0, b: 0, a: 1 }
 * toRGB('rgba(255, 0, 0, 0.5)') // { r: 255, g: 0, b: 0, a: 0.5 }
 * toRGB('#FF0000') // { r: 255, g: 0, b: 0, a: 0.5 }
 * ```
 */
export const toRGB = (color: ColorInput) => toColor(color).toRgb()

/**
 * @description convert color to RGB string / 将颜色转换为 RGB 字符串
 * @param color color value / 颜色值
 * @example
 * ```
 * toRGBString('red') // 'rgb(255, 0, 0)'
 * toRGBString('#FF0000') // 'rgb(255, 0, 0)'
 * ```
 */
export const toRGBString = (color: ColorInput) => toColor(color).toRgbString()

/**
 * @description convert color to HEX string / 将颜色转换为 Hex 字符串
 * @param color color value / 颜色值
 * @example
 * ```
 * toHex('red') // 'ff0000'
 * ```
 */
export const toHex = (color: ColorInput) => toColor(color).toHex()

/**
 * @description convert color to HEX string / 将颜色转换为 Hex 字符串
 * @param color color value / 颜色值
 * @example
 * ```
 * toHexString('red') // '#ff0000'
 * ```
 */
export const toHexString = (color: ColorInput) => toColor(color).toHexString()

/**
 * @description convert color to HSL object / 将颜色转换为 HSL 对象
 * @param color color value / 颜色值
 * @example
 * ```
 * toHSL('red') // { h: 0, s: 1, l: 0.5, a: 1 }
 * ```
 */
export const toHSL = (color: ColorInput) => toColor(color).toHsl()

/**
 * @description convert color to HSL string / 将颜色转换为 HSL 字符串
 * @param color color value / 颜色值
 * @example
 * ```
 * toHSLString('red') // 'hsl(0, 100%, 50%)'
 * ```
 */
export const toHSLString = (color: ColorInput) => toColor(color).toHslString()
