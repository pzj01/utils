import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// vitest 默认不读 tsconfig 的 paths，`~/*` 需要在这里单独映射一份
export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
