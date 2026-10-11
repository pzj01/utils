# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Test Commands

- `pnpm build` — build with tsdown (outputs to dist/)，同时自动生成 package.json 的 `exports` 并跑 publint 校验
- `pnpm dev` — tsdown --watch
- `pnpm test` — run all tests with vitest
- `pnpm test:types` — 运行 `*.test-d.ts` 里的类型断言（`vitest --typecheck --run`），常规 `pnpm test` 会跳过
- `pnpm test -- -t "test name"` — run a single test by name pattern
- `pnpm lint` — lint with @antfu/eslint-config
- `pnpm lint:fix` — lint and auto-fix
- `pnpm release` — bump version with bumpp + publish

## Project Architecture

A TypeScript utility library (`@pzj01/utils`) organized by **runtime capability** first, feature second:

| 目录 | 运行时 | 说明 |
|------|--------|------|
| `src/shared/` | 浏览器 + Node | 通用代码，只允许依赖标准 ECMAScript |
| `src/node/` | 仅 Node | 依赖 `node:fs` / `node:path` / `jiti` 的能力 |
| `src/browser/` | 仅浏览器 | 依赖 `requestAnimationFrame` 等浏览器 API 的能力 |
| `src/index.ts` | — | 主入口，内容只有 `export * from './shared'` |

### 硬约束

**主入口（`src/index.ts`）的依赖图里永远不允许出现 `node:*`、`jiti`、`requestAnimationFrame`。**
一旦出现，浏览器打包会直接解析失败。新增环境特定能力时，必须放进 `src/node/` 或 `src/browser/`。

`src/shared/env/index.ts` 用 `typeof` 守卫探测全局量（而非 `import 'node:process'`），
这是它能在浏览器运行的前提，因此该文件带有 `eslint-disable node/prefer-global/process`。

### 模块与导出

- 顶层 barrel：`src/shared/index.ts`、`src/node/index.ts`、`src/browser/index.ts`
- 每个功能模块是一个目录，含 `index.ts` barrel，可选实现文件与测试
- 包对外提供子路径入口（`@pzj01/utils/math`、`@pzj01/utils/node` 等），
  清单由 `tsdown.config.ts` 的 `entry` 决定，`package.json` 的 `exports` 由构建自动生成、不要手改
- 新增 `src/shared/` 下的模块时，需要同步在 `tsdown.config.ts` 的 `entry` 里加一行

### Modules

| Module | Subpath | Description | Key dependencies |
|--------|---------|-------------|-----------------|
| `shared/array/` | `./array` | `flattenDeep` | none |
| `shared/color/` | `./color` | 颜色转换 (RGB, HEX, HSL) | tinycolor2 |
| `shared/date/` | `./date` | 时间戳、秒表、随机日期、格式化 | `shared/env` |
| `shared/env/` | `./env` | 运行时检测（browser, node, deno 等） | none |
| `shared/function/` | `./function` | `curry`，re-export `debounce`/`throttle` | throttle-debounce |
| `shared/is/` | `./is` | 类型判断与基础转换 | none |
| `shared/math/` | `./math` | `clamp`, `sum`, `random`, `toDecimals`, 缓动函数, 插值 | `shared/is` |
| `shared/object/` | `./object` | `pick`, `omit`, `hasOwn`, `deepClone`（支持循环引用） | none |
| `shared/string/` | `./string` | 随机字符串/字符生成、`slash`/`unslash` | `shared/math` |
| `shared/types/` | `./types` | 工具类型 (`BuildTuple`, `Push`, `DropFirst`, `Fn` 等) | none |
| `node/path/` | `./node` | `absolutize` | `node:path` |
| `node/config/` | `./node` | `readConfigFile` | `node:fs`, jiti |
| `browser/animation/` | `./browser` | `transition` | `requestAnimationFrame` |

### Conventions

- Tests use vitest with `import { expect, it, describe } from 'vitest'`, co-located as `*.test.ts` / `*.spec.ts`
- **每个模块目录都必须有测试文件**；纯类型模块用 `index.test-d.ts` + `expectTypeOf`（需 `pnpm test:types`）
- **每个模块目录都必须有 `README.md`**，写该模块的完整导出说明；根 `README.md` 只做索引入口，不罗列各模块的函数细节
- All exports are named (no default exports); ES module
- 跨分区引用用 `~/*` 别名（映射到 `src/*`，见 tsconfig `paths` 与 vitest.config.ts）；同分区内用相对路径
- Functions are pure where possible; avoid classes/prefer standalone functions
- JSDoc 为双语（英文 + 中文 `@description` + `@example`）；JSDoc 里出现的常量必须已导出，否则示例无法被使用
- Pre-commit hook runs `pnpm test && lint-staged`
