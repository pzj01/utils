import { expect, it } from 'vitest'
import { curry } from '.'

it('curry', () => {
  const add = (a: number, b: number, c: number) => a + b + c

  expect(curry(add)(1)(2)(3)).toBe(6)
  expect(curry(add)(1, 2)(3)).toBe(6)
  expect(curry(add)(1, 2, 3)).toBe(6)
})

// 回归测试：累积参数曾放在 curry 外层的共享数组里，
// 导致同一个柯里化函数第二次调用会串上一次的参数
it('curry is reusable', () => {
  const add = (a: number, b: number) => a + b
  const curried = curry(add)

  expect(curried(1)(2)).toBe(3)
  expect(curried(3)(4)).toBe(7)
  expect(curried(5)(6)).toBe(11)
})

it('curry re-exports debounce and throttle', async () => {
  const mod = await import('.')
  expect(typeof mod.debounce).toBe('function')
  expect(typeof mod.throttle).toBe('function')
})
