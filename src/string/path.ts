import fs from 'node:fs'
import path from 'node:path'
import { createJiti } from 'jiti'

/**
 * @description Convert a Windows path to a Unix path / 将 Windows 路径转换为 Unix 路径
 * @example
 * ```
 * slash('C:\\Users\\user\\Desktop\\file.txt') // 'C:/Users/user/Desktop/file.txt'
 * ```
 */
export const slash = (path: string) => path.replace(/\\/g, '/')

/**
 * @description Convert a Unix path to a Windows path / 将 Unix 路径转换为 Windows 路径
 * @example
 * ```
 * unslash('C:/Users/user/Desktop/file.txt') // 'C:\\Users\\user\\Desktop\\file.txt'
 * ```
 */
export const unslash = (path: string) => path.replace(/\//g, '\\')

/**
 * @description Convert a relative path to an absolute path / 将文件路径转换为绝对路径
 * @example
 * ```
 * absolutize('file.txt') // '/Users/user/Desktop/file.txt'
 * ```
 */
export const absolutize = (filepath: string) => path.isAbsolute(filepath) ? filepath : path.resolve(filepath)

/**
 * @description Read a configuration file / 读取当前工作目录下的配置文件，
 * 读取优先级为 json > ts > js
 * @example
 * ```
 * readConfigFile(['config.json']) // { key: 'value' }
 * ```
 */
export async function readConfigFile<T extends object>(configFiles: string[]) {
  for (const configFile of configFiles) {
    const absolutePath = absolutize(configFile)

    if (fs.existsSync(absolutePath)) {
      if (absolutePath.endsWith('.json')) {
        return JSON.parse(fs.readFileSync(absolutePath, 'utf-8')) as T
      }

      if (absolutePath.endsWith('.ts')) {
        const jiti = createJiti(import.meta.url, {
          fsCache: true,
          moduleCache: true,
        })
        return (await jiti.import<{ default: T }>(absolutePath)).default
      }

      return (await import(absolutePath)).default as T
    }
  }
}
