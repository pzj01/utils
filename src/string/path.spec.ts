import path from 'node:path'
import { describe, expect, it } from 'vitest'
import test from '../../test.config'
import { absolutize, readConfigFile, slash } from './path'

describe('path', () => {
  it('slash', () => {
    const path = 'C:\\AppData\\Roaming\\a.js'
    const result = slash(path)
    expect(result).toBe('C:/AppData/Roaming/a.js')
  })

  it('absolutize', () => {
    const relativePath = 'a.js'
    const absolutePath = absolutize(relativePath)
    expect(absolutePath).toBe(path.resolve(relativePath))
  })

  it('readConfigFile', async () => {
    const configFiles = ['test.config.json', 'test.config.ts', 'test.config.js']
    const result = await readConfigFile<typeof test>(configFiles)
    expect(result).toEqual(test)
  })
})
