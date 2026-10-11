# date

时间相关工具，跨浏览器与 Node 通用。

```ts
import { createStopwatch } from '@pzj01/utils/date'
```

## 导出

### 时间戳与计时

| 导出 | 说明 |
| --- | --- |
| `timestamp()` | 当前时间戳，即 `Date.now()` |
| `now()` | 高精度时间戳；当前环境支持 `performance` 时用 `performance.now()`，否则降级为 `timestamp()` |
| `elapsed(start)` | 计算从 `start` 到现在的耗时 |
| `createStopwatch()` | 创建秒表 |

`createStopwatch()` 返回：

| 成员 | 说明 |
| --- | --- |
| `read()` | 当前累计毫秒数 |
| `stop()` | 暂停计时 |
| `resume()` | 恢复计时 |
| `reset()` | 归零并重新开始 |
| `isPaused` | 是否处于暂停状态 |

### 日期

| 导出 | 说明 |
| --- | --- |
| `randomDate(startTime, endTime)` | 生成指定范围内的随机日期 |
| `formatDate(date)` | 格式化为本地日期字符串 |
