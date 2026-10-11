import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { readConfigFile } from '.'

// readConfigFile 用 absolutize 解析路径（绝对路径原样使用），
// 因此这里传 __fixtures__ 下的绝对路径，避免依赖测试运行时的 cwd
const fixtureDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '__fixtures__')
const fixture = (name: string) => path.join(fixtureDir, name)

describe('readConfigFile', () => {
  it('reads a .json config', async () => {
    expect(await readConfigFile<{ from: string, n: number }>([fixture('config.json')])).toEqual({ from: 'json', n: 1 })
  })

  it('reads a .ts config through jiti', async () => {
    expect(await readConfigFile<{ from: string, n: number }>([fixture('config.ts')])).toEqual({ from: 'ts', n: 2 })
  })

  it('reads a .js config through dynamic import', async () => {
    expect(await readConfigFile<{ from: string, n: number }>([fixture('config.js')])).toEqual({ from: 'js', n: 3 })
  })

  it('uses the first existing file in the given order', async () => {
    const result = await readConfigFile<{ from: string }>([
      fixture('not-exist.json'),
      fixture('config.json'),
      fixture('config.ts'),
    ])
    expect(result).toEqual({ from: 'json', n: 1 })
  })

  it('returns undefined when no config file exists', async () => {
    expect(await readConfigFile([fixture('not-exist.json')])).toBeUndefined()
  })
})
