export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'
// eslint-disable-next-line node/prefer-global/process
export const isNode = typeof process !== 'undefined' && process.versions && process.versions.node
export const isDeno = typeof Deno !== 'undefined' && typeof Deno.version !== 'undefined' && typeof Deno.version.deno !== 'undefined'
export const isWebWorker = typeof globalThis === 'object' && globalThis.constructor?.name === 'DedicatedWorkerGlobalScope' && typeof globalThis.importScripts === 'function'
// eslint-disable-next-line node/prefer-global/process
export const isElectron = typeof process !== 'undefined' && process.versions != null && process.versions.electron != null
export const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative'

export const isServer = isNode || isDeno || isElectron
export const isClient = isBrowser || isWebWorker || isReactNative
// eslint-disable-next-line node/prefer-global/process
export const isProduction = isServer || process.env.NODE_ENV === 'production'
// eslint-disable-next-line node/prefer-global/process
export const isDevelopment = isServer || process.env.NODE_ENV === 'development'

export const hasPerformance = typeof performance !== 'undefined'
