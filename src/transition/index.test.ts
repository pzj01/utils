import type { Fn } from '../types'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { transition } from '.'

// Mock requestAnimationFrame
function mockRaf(callback: Fn) {
  setTimeout(() => callback(performance.now()), 16) // 模拟 60fps，每帧约 16ms
}

describe('transition function', () => {
  beforeAll(() => vi.stubGlobal('requestAnimationFrame', mockRaf))
  afterAll(() => vi.unstubAllGlobals())
  beforeEach(() => vi.useFakeTimers()) // 启用假定时器
  afterEach(() => vi.useRealTimers()) // 恢复真实计时器

  it('transitions from start to end over duration', () => {
    const callback = vi.fn()
    const from = 0
    const to = 100
    const duration = 1000 // 1秒

    transition(from, to, duration, callback)

    // 初始调用（第一帧）
    vi.advanceTimersByTime(16) // 模拟一帧
    expect(callback).toHaveBeenCalledWith(1.6)

    // // 推进时间到一半
    vi.advanceTimersByTime(484)
    expect(callback).toHaveBeenCalledWith(49.6) // 500ms / 16ms = 31.25帧

    // // 推进时间到结束
    vi.advanceTimersByTime(508)
    expect(callback).toHaveBeenCalledWith(to)
  })

  it('stops after duration', () => {
    const callback = vi.fn()
    const from = 0
    const to = 100
    const duration = 1000 // 1秒

    transition(from, to, duration, callback)

    vi.advanceTimersByTime(1500)
    expect(callback).toHaveBeenCalledWith(to)

    expect(callback.mock.calls.length).toBe(63) // 1000ms / 16ms = 62.5帧 + 1帧（结束调用）
  })

  it('calls callback with correct interpolated values', () => {
    const callback = vi.fn()
    const from = -50
    const to = 50
    const duration = 1000 // 1秒

    transition(from, to, duration, callback)

    vi.advanceTimersByTime(16)
    expect(callback).toHaveBeenCalledWith(-48.4)

    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledWith(to)
  })
})
