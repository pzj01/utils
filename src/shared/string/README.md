# string

随机字符串/字符生成与路径分隔符转换，跨浏览器与 Node 通用。

```ts
import { randomString } from '@pzj01/utils/string'
```

## 导出

### 随机字符

`RANGE` 是导出的字符范围常量，每项为 `[起始码点, 结束码点]`，用于组合自定义字符集：

```ts
import { randomChar, randomRangeString, RANGE } from '@pzj01/utils/string'

randomChar([RANGE.UPPER]) // or 'A'
randomRangeString(6, [RANGE.UPPER, RANGE.DIGIT]) // or 'A3B1C2'
```

| 导出 | 说明 |
| --- | --- |
| `RANGE` | 字符范围常量：`UPPER` / `LOWER` / `DIGIT` / `BASIC_SYMBOL` / `EXTENDED_SYMBOL` / `BRACKET_SYMBOL` / `TAIL_SYMBOL` |
| `LetterRange` | `RANGE` 单个范围的类型 |
| `randomChar(ranges?)` | 从指定字符范围生成随机字符，默认全部可打印字符 |
| `randomIn(charset)` | 从字符集字符串或数组中随机取一个字符 |

按字符类别取字符：

| 导出 | 字符集 |
| --- | --- |
| `randomUpper` / `randomLower` | `A-Z` / `a-z` |
| `randomDigit` | `0-9` |
| `randomAlpha` | `A-Z a-z` |
| `randomAlphanumeric` | `A-Z a-z 0-9` |
| `randomHex` | `0-9 A-F` |
| `randomBasicSymbol` | `!` ~ `/` |
| `randomExtendedSymbol` | `:` ~ `@` |
| `randomBracketSymbol` | `[` ~ `` ` `` |
| `randomTailSymbol` | `{` ~ `~` |
| `randomSymbol` | 上述四类符号并集 |
| `randomPrintable` | 全部可打印 ASCII（`0x21` ~ `0x7E`） |

### 随机字符串

| 导出 | 说明 |
| --- | --- |
| `randomString(length, charset?)` | 生成指定长度的随机字符串，`charset` 支持字符串或数组，默认全部可打印字符 |
| `randomRangeString(length, ranges)` | 从指定字符范围生成指定长度的随机字符串 |

### 路径分隔符

纯字符串替换，不依赖 `node:path`，浏览器也可用。

| 导出 | 说明 |
| --- | --- |
| `slash(filepath)` | Windows 分隔符转 Unix：`a\b` → `a/b` |
| `unslash(filepath)` | Unix 分隔符转 Windows：`a/b` → `a\b` |
