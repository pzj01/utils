# browser/animation

**仅浏览器可用**，依赖 `requestAnimationFrame`。

```ts
import { transition } from '@pzj01/utils/browser'
```

## 导出

| 导出 | 说明 |
| --- | --- |
| `transition(from, to, duration, callback, easing?)` | 在 `duration` 毫秒内把值从 `from` 过渡到 `to`，每帧调用 `callback` |

`easing` 可传入 [`@pzj01/utils/math`](../../shared/math/README.md) 里的任意缓动函数，默认线性。

```ts
import { transition } from '@pzj01/utils/browser'
import { easeOut } from '@pzj01/utils/math'

transition(0, 100, 1000, value => console.log(value), easeOut)
```

> 实现基于 `requestAnimationFrame`，在 Node 下调用会抛 `ReferenceError`。测试中通过 `vi.stubGlobal` 打桩。
