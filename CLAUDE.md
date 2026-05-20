# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Test Commands

- `pnpm build` — build with tsdown (outputs to dist/)
- `pnpm dev` — unbuild --stub for development
- `pnpm test` — run all tests with vitest
- `pnpm test -- -t "test name"` — run a single test by name pattern
- `pnpm lint` — lint with @antfu/eslint-config
- `pnpm lint:fix` — lint and auto-fix
- `pnpm release` — bump version with bumpp + publish

## Project Architecture

A TypeScript utility library (`@pzj01/utils`) organized as flat modules under `src/`:

- `src/index.ts` — barrel export re-exporting all modules
- Each module is a directory with `index.ts` + optional test files and sub-modules
- Functions are bilingual documented (English + Chinese `@description` + `@example` JSDoc)

### Modules

| Module | Description | Key dependencies |
|--------|-------------|-----------------|
| `array/` | `flattenDeep` | none |
| `color/` | Color conversion (RGB, HEX, HSL) | tinycolor2 |
| `date/` | Timestamp, stopwatch, random date, formatting | — |
| `env/` | Runtime detection (browser, node, deno, etc.) | — |
| `function/` | `curry`, re-exports `debounce`/`throttle` from throttle-debounce | throttle-debounce |
| `is/` | Type checks (`isString`, `isNumber`, `isObject`, `isPromise`, etc.) | — |
| `math/` | `clamp`, `sum`, `random`, `toDecimals`, easing functions, interpolation, `transition` | — |
| `string/` | Random string/char generation with configurable charsets | — |
| `types/` | Utility types (`BuildTuple`, `DropFirst`, `Fn`, `StringOrArray`) | — |

### Conventions

- Tests use vitest with `import { expect, it, describe } from 'vitest'`, co-located as `*.test.ts`
- All exports are named (no default exports); ES module
- Imports between modules use relative paths within src/
- Functions are pure where possible; avoid classes/prefer standalone functions
- Pre-commit hook runs `pnpm test && lint-staged`
