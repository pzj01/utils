import { describe, expect, it } from 'vitest'
import { deepClone, hasOwn, omit, pick } from '.'

describe('object', () => {
  describe('pick', () => {
    it('picks the given keys', () => {
      expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 })
    })

    it('ignores keys that are not own properties', () => {
      expect(pick({ a: 1 }, ['b'] as any)).toEqual({})
      // 'toString' 来自原型链，不应被拷贝
      expect(Object.keys(pick({ a: 1 }, ['toString'] as any))).toEqual([])
    })

    it('keeps falsy values', () => {
      expect(pick({ a: 0, b: '', c: null }, ['a', 'b', 'c'])).toEqual({ a: 0, b: '', c: null })
    })
  })

  describe('omit', () => {
    it('omits the given keys', () => {
      expect(omit({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({ a: 1, c: 3 })
    })

    it('returns a copy rather than the original object', () => {
      const source = { a: 1 }
      const result = omit(source, [])
      expect(result).toEqual(source)
      expect(result).not.toBe(source)
    })
  })

  describe('hasOwn', () => {
    it('detects own properties', () => {
      expect(hasOwn({ a: 1 }, 'a')).toBe(true)
      expect(hasOwn({ a: 1 }, 'b')).toBe(false)
    })

    it('ignores inherited properties', () => {
      expect(hasOwn({ a: 1 }, 'toString')).toBe(false)
    })
  })

  describe('deepClone', () => {
    it('returns primitives unchanged', () => {
      expect(deepClone(1)).toBe(1)
      expect(deepClone('a')).toBe('a')
      expect(deepClone(null)).toBe(null)
      expect(deepClone(undefined)).toBe(undefined)
    })

    it('clones nested objects and arrays without sharing references', () => {
      const source = { a: 1, b: { c: [2, 3] } }
      const cloned = deepClone(source)
      expect(cloned).toEqual(source)
      expect(cloned).not.toBe(source)
      expect(cloned.b).not.toBe(source.b)
      expect(cloned.b.c).not.toBe(source.b.c)
    })

    it('clones built-in types', () => {
      const date = new Date('2024-01-01')
      expect(deepClone(date).getTime()).toBe(date.getTime())
      expect(deepClone(date)).not.toBe(date)

      const regexp = /ab+c/gi
      const clonedRegExp = deepClone(regexp)
      expect(clonedRegExp.source).toBe(regexp.source)
      expect(clonedRegExp.flags).toBe(regexp.flags)

      const map = new Map([['a', { b: 1 }]])
      expect(deepClone(map).get('a')).toEqual({ b: 1 })
      expect(deepClone(map).get('a')).not.toBe(map.get('a'))

      const set = new Set([{ a: 1 }])
      expect([...deepClone(set)]).toEqual([{ a: 1 }])
    })

    it('does not mutate the source when the clone changes', () => {
      const source = { a: { b: 1 } }
      const cloned = deepClone(source)
      cloned.a.b = 2
      expect(source.a.b).toBe(1)
    })

    it('clones circular references instead of overflowing the stack', () => {
      const source: any = { name: 'root' }
      source.self = source
      source.list = [source]

      const cloned = deepClone(source)
      expect(cloned.name).toBe('root')
      // 克隆体内部的循环必须指向克隆体自身，而不是指回源对象
      expect(cloned.self).toBe(cloned)
      expect(cloned.list[0]).toBe(cloned)
    })

    it('clones a shared reference only once', () => {
      const shared = { n: 1 }
      const source = { a: shared, b: shared }
      const cloned = deepClone(source)
      expect(cloned.a).not.toBe(shared)
      // 源对象里是同一引用，克隆后也应保持共享关系
      expect(cloned.a).toBe(cloned.b)
    })

    it('does not leak the seen map across calls', () => {
      const source: any = { name: 'root' }
      source.self = source
      // 第二次调用必须重新建表，不能被上一次的映射污染
      expect(deepClone(source)).not.toBe(deepClone(source))
      expect(deepClone(source).self.name).toBe('root')
    })

    it('handles circular references inside Map and Set', () => {
      const map = new Map<string, any>()
      map.set('self', map)
      const clonedMap = deepClone(map)
      expect(clonedMap.get('self')).toBe(clonedMap)

      const set = new Set<any>()
      set.add(set)
      const clonedSet = deepClone(set)
      expect([...clonedSet][0]).toBe(clonedSet)
    })
  })
})
