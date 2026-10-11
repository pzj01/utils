/* eslint-disable node/prefer-global/process -- 这里必须探测全局 process 是否存在；改成 import 'node:process' 会让浏览器端加载即崩溃，守卫也就失去意义 */
export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'
export const isNode = typeof process !== 'undefined' && !!process.versions?.node
export const isDeno = typeof Deno !== 'undefined' && typeof Deno.version !== 'undefined' && typeof Deno.version.deno !== 'undefined'
export const isWebWorker = typeof globalThis === 'object' && globalThis.constructor?.name === 'DedicatedWorkerGlobalScope' && typeof globalThis.importScripts === 'function'
export const isElectron = typeof process !== 'undefined' && process.versions != null && process.versions.electron != null
export const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative'

export const isServer = isNode || isDeno || isElectron
export const isClient = isBrowser || isWebWorker || isReactNative

/**
 * 浏览器等没有 `process` 的运行时下必须先用 `typeof` 守卫再取值，
 * 否则模块顶层求值会直接抛 ReferenceError。
 * Vite/Webpack 这类打包器会在构建期把该表达式内联为字面量；裸浏览器下退化为 undefined。
 */
const nodeEnv = typeof process !== 'undefined' ? process.env?.NODE_ENV : undefined

export const isProduction = nodeEnv === 'production'
export const isDevelopment = nodeEnv === 'development'

export const hasPerformance = typeof performance !== 'undefined'
