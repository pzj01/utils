/**
 * 主入口只导出跨运行时通用代码。
 * 这里（及其依赖图）永远不允许出现 node:fs / jiti / requestAnimationFrame 等环境特定能力，
 * 否则浏览器打包会直接失败。环境专属能力见 `src/node` 与 `src/browser`。
 */
export * from './shared'
