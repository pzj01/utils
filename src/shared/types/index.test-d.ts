import type { BuildTuple, DropFirst, Fn, Pop, Push, Shift, StringOrArray, Unshift } from '.'
import { expectTypeOf } from 'vitest'

// 纯类型模块没有运行时表现，只能用类型断言验证。
// 需要 `pnpm test:types`（vitest --typecheck）才会真正执行，`pnpm test` 默认跳过该文件。
expectTypeOf<StringOrArray>().toEqualTypeOf<string | any[]>()
expectTypeOf<Fn>().toEqualTypeOf<(...args: any[]) => any>()

expectTypeOf<BuildTuple<3>>().toEqualTypeOf<[0, 0, 0]>()
expectTypeOf<BuildTuple<3, 1>>().toEqualTypeOf<[1, 1, 1]>()
expectTypeOf<BuildTuple<0>>().toEqualTypeOf<[]>()

expectTypeOf<Push<[1, 2], 3>>().toEqualTypeOf<[1, 2, 3]>()
expectTypeOf<Pop<[1, 2, 3]>>().toEqualTypeOf<[1, 2]>()
expectTypeOf<Shift<[1, 2, 3]>>().toEqualTypeOf<[2, 3]>()
expectTypeOf<Unshift<[2, 3], 1>>().toEqualTypeOf<[1, 2, 3]>()

expectTypeOf<DropFirst<[1, 2, 3, 4, 5], 2>>().toEqualTypeOf<[3, 4, 5]>()
expectTypeOf<DropFirst<[1, 2, 3], 0>>().toEqualTypeOf<[1, 2, 3]>()
