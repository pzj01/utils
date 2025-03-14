import { expect, it } from 'vitest'
import { curry } from '.'

it('curry', () => {
  const add = (a: number, b: number, c: number) => a + b + c

  expect(curry(add)(1)(2)(3)).toBe(6)
  expect(curry(add)(1, 2)(3)).toBe(6)
  expect(curry(add)(1, 2, 3)).toBe(6)
})
