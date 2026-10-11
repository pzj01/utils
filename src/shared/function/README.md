# function

函数相关工具，跨浏览器与 Node 通用。

```ts
import { curry } from '@pzj01/utils/function'
```

## 导出

| 导出 | 说明 |
| --- | --- |
| `curry(fn)` | 柯里化函数，支持一次传部分参数；返回值可重复调用 |
| `debounce` | 防抖，re-export 自 [`throttle-debounce`](https://github.com/niksy/throttle-debounce) |
| `throttle` | 节流，re-export 自 [`throttle-debounce`](https://github.com/niksy/throttle-debounce) |

## 示例

```ts
const add = curry((a: number, b: number, c: number) => a + b + c)

add(1)(2)(3) // 6
add(1, 2)(3) // 6
add(1, 2, 3) // 6
```

> 参数累积的判定依据是 `fn.length`，因此带默认值的形参不会被计入。
