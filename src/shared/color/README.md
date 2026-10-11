# color

颜色转换，基于 [`tinycolor2`](https://github.com/bgrins/TinyColor) 封装。输入类型为 `ColorInput`，即 tinycolor2 接受的一切颜色表示（如 `'red'`、`'#FF0000'`、`'rgba(255, 0, 0, 0.5)'`）。

```ts
import { toHexString } from '@pzj01/utils/color'
```

## 导出

| 导出 | 说明 |
| --- | --- |
| `toColor(color)` | 转换为 tinycolor 实例 |
| `toRGB(color)` | 转换为 RGB 对象，如 `{ r: 255, g: 0, b: 0, a: 1 }` |
| `toRGBString(color)` | 转换为 RGB 字符串 |
| `toHex(color)` | 转换为 HEX 字符串 |
| `toHexString(color)` | 转换为 HEX 字符串 |
| `toHSL(color)` | 转换为 HSL 对象 |
| `toHSLString(color)` | 转换为 HSL 字符串 |
