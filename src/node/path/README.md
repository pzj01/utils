# node/path

**仅 Node 可用**，依赖 `node:path`。

```ts
import { absolutize } from '@pzj01/utils/node'
```

## 导出

| 导出 | 说明 |
| --- | --- |
| `absolutize(filepath)` | 相对路径转绝对路径（基于 `process.cwd()`），已是绝对路径时原样返回 |

> 纯字符串的分隔符转换（`slash` / `unslash`）不依赖 Node，已归入 [`@pzj01/utils/string`](../../shared/string/README.md)。
