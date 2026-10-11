import path from 'node:path'

/**
 * @description Convert a relative path to an absolute path / 将文件路径转换为绝对路径
 * @example
 * ```
 * absolutize('file.txt') // '/Users/user/Desktop/file.txt'
 * ```
 */
export const absolutize = (filepath: string) => path.isAbsolute(filepath) ? filepath : path.resolve(filepath)
