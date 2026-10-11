# types

TypeScript 工具类型，**纯类型模块**，没有运行时产物。

```ts
import type { Fn } from '@pzj01/utils/types'
```

## 导出

### 基础

| 导出 | 说明 |
| --- | --- |
| `StringOrArray` | `string \| any[]` |
| `Fn` | `(...args: any[]) => any` |

### 元组

| 导出 | 说明 | 示例 |
| --- | --- | --- |
| `BuildTuple<N, E?>` | 按长度构建元组，元素默认 `0` | `BuildTuple<3>` → `[0, 0, 0]` |
| `Push<T, E>` | 末尾追加元素 | `Push<[1, 2], 3>` → `[1, 2, 3]` |
| `Pop<T>` | 删除末尾元素 | `Pop<[1, 2, 3]>` → `[1, 2]` |
| `Shift<T>` | 删除首个元素 | `Shift<[1, 2, 3]>` → `[2, 3]` |
| `Unshift<T, E>` | 开头插入元素 | `Unshift<[2, 3], 1>` → `[1, 2, 3]` |
| `DropFirst<T, N>` | 删除前 N 个元素 | `DropFirst<[1, 2, 3, 4, 5], 2>` → `[3, 4, 5]` |

## 测试

类型断言写在 `index.test-d.ts`，需要 `pnpm test:types`（`vitest --typecheck`）才会执行，常规的 `pnpm test` 会跳过该文件。
