# CLAUDE_zh.md (项目开发指南 - 中文版)

本文档用于记录 `@pzj01/utils` 项目的构建命令、架构设计与开发规范，方便日常维护与查阅。

## 常用开发命令

- `pnpm build` — 使用 tsdown 进行打包构建（输出至 `dist/` 目录）
- `pnpm dev` — 启动开发模式（使用 unbuild --stub 生成开发代理存根）
- `pnpm test` — 使用 vitest 运行所有单元测试
- `pnpm test -- -t "测试名称"` — 根据名称匹配运行单个或特定单元测试
- `pnpm lint` — 使用 ESLint 检查代码规范（基于 @antfu/eslint-config）
- `pnpm lint:fix` — 检查并自动修复代码规范问题
- `pnpm release` — 使用 bumpp 自动更新版本号并发布

---

## 项目架构设计

这是一个基于 TypeScript 的工具库（`@pzj01/utils`），采用紧凑的**扁平化模块**结构，所有代码均存放在 `src/` 目录下：

- `src/index.ts` — 统一入口文件（Barrel Export），负责导出所有子模块。
- 每个子模块都是 `src/` 下的一个独立目录，包含其自身的 `index.ts`、测试文件及必要的子文件。
- **双语注释规范**：所有导出的函数必须编写 JSDoc 注释，包含英文与中文的 `@description` 及 `@example`。

### 核心模块一览

| 模块名称 | 功能描述 | 核心第三方依赖 |
|--------|-------------|-----------------|
| `array/` | 数组操作（如数组深度扁平化 `flattenDeep`） | 无依赖 |
| `color/` | 颜色转换与处理（支持 RGB, HEX, HSL 互转） | `tinycolor2` |
| `date/` | 时间戳处理、秒表计时器、随机日期生成、格式化 | 无依赖 |
| `env/` | 运行环境检测（判断当前是 Browser, Node, Deno 等） | 无依赖 |
| `function/` | 函数式编程工具（柯里化 `curry`，并从第三方引入 `debounce`/`throttle`） | `throttle-debounce` |
| `is/` | 类型全方位检测（如 `isString`, `isNumber`, `isObject`, `isPromise` 等） | 无依赖 |
| `math/` | 数学工具（`clamp`, `sum`, `random`, 精度处理 `toDecimals`，缓动函数与插值，`transition` 等） | 无依赖 |
| `string/` | 字符串处理（支持配置字符集的随机字符串/字符生成） | 无依赖 |
| `types/` | 常用 TypeScript 类型体操工具（如 `BuildTuple`, `DropFirst`, `Fn`, `StringOrArray`） | 无依赖 |

---

## 团队开发规范 (Conventions)

### 1. 单元测试
- 统一使用 Vitest 框架，测试文件采用同名邻近原则（Co-located），命名为 `*.test.ts`。
- 测试代码中统一显式引入：`import { expect, it, describe } from 'vitest'`。

### 2. 代码组织
- **严格禁止默认导出 (Default Export)**：所有函数和变量必须使用**具名导出 (Named Export)**。
- 整个项目基于标准的 **ES Module (ESM)** 规范。
- 内部模块之间的相互引用，在 `src/` 目录内统一使用**相对路径**（如 `../is` 或 `./utils`）。
- **函数式优先**：保持函数尽可能“纯净”（Pure Function），避免使用 Class 类，优先采用独立的组合式函数。

### 3. Git 提交流水线
- 项目配置了 Pre-commit Hook（预提交钩子），在每次执行 `git commit` 前会自动触发：
  ```bash
  pnpm test && lint-staged
  ```
