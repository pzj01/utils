import nodePath from 'node:path'
import { describe, expect, it } from 'vitest'
import { absolutize } from '.'

describe('path', () => {
  it('absolutize', () => {
    const relativePath = 'a.js'
    expect(absolutize(relativePath)).toBe(nodePath.resolve(relativePath))
  })

  it('absolutize keeps an already absolute path unchanged', () => {
    const absolutePath = nodePath.resolve('a.js')
    expect(absolutize(absolutePath)).toBe(absolutePath)
  })
})
