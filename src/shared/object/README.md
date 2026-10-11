# object

对象工具，跨浏览器与 Node 通用。

```ts
import { pick } from '@pzj01/utils/object'
```

## 导出

| 导出 | 说明 |
| --- | --- |
| `pick(obj, keys)` | 挑出指定键。只拷贝自有属性，原型链上的键（如 `toString`）不会被带上 |
| `omit(obj, keys)` | 排除指定键，返回新对象 |
| `hasOwn(obj, key)` | 是否为自有属性（不查原型链），带类型收窄 |
| `deepClone(obj)` | 深拷贝，支持 `Array` / `Date` / `RegExp` / `Map` / `Set`、循环引用与共享引用 |

## 深拷贝说明

内部用一张 `WeakMap` 记录「源对象 → 克隆体」，所以：

- **循环引用可用**：`a.self = a` 不再栈溢出，且克隆体内部的引用指向克隆体自身；
- **共享引用只克隆一次**：`{ a: shared, b: shared }` 克隆后 `a` 与 `b` 仍是同一个对象。

映射表每次调用新建，用 `WeakMap` 是为了随源对象一起被 GC 回收，不需要手动清理。

## 已知限制

- **不克隆 `Map` 的 key**：只克隆 value，key 保持原引用，这样「按引用查表」的写法在克隆后依然成立。
