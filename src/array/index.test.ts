import { expect, it } from 'vitest'
import { flattenDeep } from '.'

it('flatten', () => {
  expect(flattenDeep([1, [2, [3]]])).toEqual([1, 2, 3])
})
