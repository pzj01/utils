# node/config

**仅 Node 可用**，依赖 `node:fs` 与 [`jiti`](https://github.com/unjs/jiti)。

```ts
import { readConfigFile } from '@pzj01/utils/node'
```

## 导出

| 导出 | 说明 |
| --- | --- |
| `readConfigFile<T>(configFiles)` | 依次查找并读取第一个存在的配置文件 |

按传入顺序查找，读取规则由扩展名决定：

| 扩展名 | 读取方式 |
| --- | --- |
| `.json` | `JSON.parse(fs.readFileSync(...))` |
| `.ts` | 用 `jiti` 转译后取 `default` 导出 |
| 其它 | 原生 `import()` 后取 `default` 导出 |

相对路径基于 `process.cwd()` 解析（内部使用 [`absolutize`](../path/README.md)）。全部文件都不存在时返回 `undefined`。

```ts
const config = await readConfigFile<{ port: number }>(['config.json', 'config.ts', 'config.js'])
```

## 依赖说明

`jiti` 被声明为**可选 peer dependency**：只有用到 `.ts` / `.js` 配置文件的读取才需要它。

```bash
pnpm add jiti
```
