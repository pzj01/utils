import { afterEach, describe, expect, it, vi } from 'vitest'

describe('env', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.resetModules()
  })

  it('exposes only booleans in the current runtime', async () => {
    const env = await import('.')

    expect(env.isNode).toBe(true)
    expect(env.isBrowser).toBe(false)
    expect(env.isServer).toBe(true)
    expect(env.isClient).toBe(false)
    expect(env.hasPerformance).toBe(true)

    for (const [name, value] of Object.entries(env))
      expect(typeof value, `${name} should be a boolean`).toBe('boolean')
  })

  it('derives isProduction / isDevelopment from NODE_ENV', async () => {
    const env = await import('.')

    expect(env.isProduction).toBe(process.env.NODE_ENV === 'production')
    expect(env.isDevelopment).toBe(process.env.NODE_ENV === 'development')
  })

  // 回归测试：原来 isProduction/isDevelopment 直接在模块顶层读 process.env，
  // 浏览器里 isServer 为 false 时右侧仍会被求值，导致加载即抛 ReferenceError
  it('loads without throwing when process is unavailable (browser)', async () => {
    vi.resetModules()
    vi.stubGlobal('process', undefined)

    const env = await import('.')

    expect(env.isNode).toBe(false)
    expect(env.isServer).toBe(false)
    expect(env.isProduction).toBe(false)
    expect(env.isDevelopment).toBe(false)
  })
})
