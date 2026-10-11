import { defineConfig } from 'tsdown'

/**
 * 每个入口独立打包，配合 package.json 的 exports 支持按需引入。
 * 模块清单需与 src/shared 下的目录保持一致。
 */
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    node: 'src/node/index.ts',
    browser: 'src/browser/index.ts',
    array: 'src/shared/array/index.ts',
    color: 'src/shared/color/index.ts',
    date: 'src/shared/date/index.ts',
    env: 'src/shared/env/index.ts',
    function: 'src/shared/function/index.ts',
    is: 'src/shared/is/index.ts',
    math: 'src/shared/math/index.ts',
    object: 'src/shared/object/index.ts',
    string: 'src/shared/string/index.ts',
    types: 'src/shared/types/index.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  // 依据产物自动生成 package.json 的 exports，避免手工维护时漏项。
  // tsdown 默认只生成裸字符串映射（如 "./math": "./dist/math.mjs"），
  // 这样 TS 解析不到子路径的类型声明，因此补成 types + default 条件形式。
  exports: {
    customExports(exports) {
      for (const [key, target] of Object.entries(exports)) {
        if (typeof target !== 'string' || !target.endsWith('.mjs'))
          continue
        exports[key] = {
          types: target.replace(/\.mjs$/, '.d.mts'),
          default: target,
        }
      }
      return exports
    },
  },
  publint: true,
})
