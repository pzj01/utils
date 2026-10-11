# is

类型判断与基础转换，跨浏览器与 Node 通用。

```ts
import { isString } from '@pzj01/utils/is'
```

## 导出

### 基础转换

| 导出 | 说明 |
| --- | --- |
| `toString(value)` | `Object.prototype.toString` 的包装 |
| `getRawType(value)` | 获取原始类型名（小写），如 `'number'` / `'regexp'` |
| `toBoolean(value)` | 转换为布尔值 |
| `toNumber(value)` | 转换为数字 |

### 基础类型判断

`isString` / `isNumber` / `isBoolean` / `isBigInt` / `isSymbol` / `isFunction` 均基于 `typeof`，并带类型收窄。

### 对象与原始值

`isObject` / `isArray` / `isPrimitive`

> `isObject` 用 `getRawType` 判定，只有 `[object Object]` 才为 `true`，数组、`Date` 等不算。

### 内置对象与集合

`isDate` / `isRegExp` / `isPromise` / `isSet` / `isMap` / `isWeakSet` / `isWeakMap`

### 真假值

`isTruthy(value)` / `isFalsy(value)`
