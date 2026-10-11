# utils

我的个人工具库。按**运行时能力**组织：主入口只包含浏览器与 Node 都能跑的通用的代码，环境特定能力走独立子入口。

每个模块的详细说明见对应目录下的 `README.md`。

## 安装

```bash
pnpm add @pzj01/utils
```

## 使用

主入口，通用代码：

```ts
import { clamp, flattenDeep, isString } from '@pzj01/utils'
```

按模块子路径引入，适合不经过打包器的场景（Node 原生 ESM、Deno）：

```ts
import { isString } from '@pzj01/utils/is'
import { clamp } from '@pzj01/utils/math'
```

环境特定能力走独立子入口：

```ts
import { transition } from '@pzj01/utils/browser'
import { readConfigFile } from '@pzj01/utils/node'
```

## 模块

| 子路径 | 运行时 | 说明 | 文档 |
| --- | --- | --- | --- |
| `@pzj01/utils` | 通用 | 主入口，等价于全部通用模块 | — |
| `@pzj01/utils/array` | 通用 | 数组 | [README](src/shared/array/README.md) |
| `@pzj01/utils/color` | 通用 | 颜色转换 | [README](src/shared/color/README.md) |
| `@pzj01/utils/date` | 通用 | 时间戳、秒表、日期 | [README](src/shared/date/README.md) |
| `@pzj01/utils/env` | 通用 | 运行环境检测 | [README](src/shared/env/README.md) |
| `@pzj01/utils/function` | 通用 | 柯里化、防抖、节流 | [README](src/shared/function/README.md) |
| `@pzj01/utils/is` | 通用 | 类型判断与基础转换 | [README](src/shared/is/README.md) |
| `@pzj01/utils/math` | 通用 | 数学、缓动函数、插值 | [README](src/shared/math/README.md) |
| `@pzj01/utils/object` | 通用 | 对象操作 | [README](src/shared/object/README.md) |
| `@pzj01/utils/string` | 通用 | 随机字符串、路径分隔符 | [README](src/shared/string/README.md) |
| `@pzj01/utils/types` | 通用 | TypeScript 工具类型 | [README](src/shared/types/README.md) |
| `@pzj01/utils/node` | 仅 Node | 路径与配置文件 | [path](src/node/path/README.md) · [config](src/node/config/README.md) |
| `@pzj01/utils/browser` | 仅浏览器 | 过渡动画 | [README](src/browser/animation/README.md) |

## 环境隔离

主入口（`src/index.ts`）及其依赖图里**不会出现** `node:*`、`jiti` 或 `requestAnimationFrame`，因此前端项目引用主入口或通用子路径时，打包器不会遇到任何 Node 内置模块。

这条约束由目录结构保证，而不是靠约定：

```
src/
├── shared/    通用，只依赖标准 ECMAScript
├── node/      仅 Node：node:fs / node:path / jiti
├── browser/   仅浏览器：requestAnimationFrame
└── index.ts   只 export * from './shared'
```

## 开发

```bash
pnpm test        # 单元测试
pnpm test:types  # 类型断言测试（src/shared/types/index.test-d.ts）
pnpm lint        # 代码检查
pnpm build       # 构建，同时生成 exports 字段并跑 publint 校验
```

## License

MIT
