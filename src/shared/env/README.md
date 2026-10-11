# env

运行环境检测，跨浏览器与 Node 通用。

```ts
import { isNode } from '@pzj01/utils/env'
```

所有导出在模块加载时求值，因此都是常量而非函数。

## 导出

### 具体运行时

| 导出 | 说明 |
| --- | --- |
| `isBrowser` | 浏览器（同时存在 `window` 与 `document`） |
| `isNode` | Node |
| `isDeno` | Deno |
| `isWebWorker` | Dedicated Web Worker |
| `isElectron` | Electron 主进程/渲染进程 |
| `isReactNative` | React Native |

### 归类与能力

| 导出 | 说明 |
| --- | --- |
| `isServer` | `isNode \|\| isDeno \|\| isElectron` |
| `isClient` | `isBrowser \|\| isWebWorker \|\| isReactNative` |
| `isProduction` | `NODE_ENV === 'production'` |
| `isDevelopment` | `NODE_ENV === 'development'` |
| `hasPerformance` | 存在全局 `performance` |

## 实现说明

- 所有探测都用 `typeof` 守卫，因此本模块可以在任何运行时安全加载。这是它被归入 `shared/` 的前提。
- `isProduction` / `isDevelopment` 依赖 `NODE_ENV`。Vite/Webpack 会在构建期把该表达式内联为字面量；裸浏览器下没有 `process`，两者都退化为 `false`。
