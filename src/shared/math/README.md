# math

数学工具，跨浏览器与 Node 通用。

```ts
import { clamp, lerp } from '@pzj01/utils/math'
```

## 导出

| 导出 | 说明 |
| --- | --- |
| `clamp(value, min, max)` | 限制数值在指定范围内 |
| `sum(...args)` | 求和，支持展开参数或数组 |
| `random(min, max)` | 生成指定范围内的随机整数（含边界） |
| `toDecimals(value, digit, round?)` | 截断或四舍五入到指定小数位；`round` 为 `true` 时四舍五入，否则截断 |

### 缓动函数

`t` 取值 `0 ~ 1`。

| 导出 | 说明 |
| --- | --- |
| `linear` | 线性 |
| `easeIn` / `easeOut` / `easeInOut` | 二次缓动 |
| `easeInSine` / `easeOutSine` / `easeInOutSine` | 正弦缓动 |
| `easeInBounce` / `easeOutBounce` / `easeInOutBounce` | 弹跳缓动 |

### 插值

| 导出 | 说明 |
| --- | --- |
| `lerp(min, max, t)` | 线性插值 |
| `lerpWithEasing(min, max, t, easing?)` | 带缓动函数的插值，`t` 会被 `clamp` 到 `0 ~ 1` |
| `inverseLerp(min, max, value)` | 反向插值，由值求出 `t` |

基于 `requestAnimationFrame` 的 `transition` 在 [`@pzj01/utils/browser`](../../browser/animation/README.md)。
