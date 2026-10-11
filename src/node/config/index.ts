import fs from 'node:fs'
import { createJiti } from 'jiti'
import { absolutize } from '../path'

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
