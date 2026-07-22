---
title: "从数据库到浏览器的类型安全"
date: "2026-03-15"
tags:
  - tech
  - typescript
excerpt: "从 schema 到 UI 守住契约：类型共享、边界校验、小而纯的模块。"
cover: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80
coverAlt: "显示器上的代码特写"
---

现代全栈工作，重点往往不是选哪个框架，而是让边界上的契约始终诚实。

设计功能时，我会从数据边缘开始：schema 迁移、API 边界上的校验，以及把数据喂给 UI 的类型化 loader。TanStack Router 的 loader 模式很合适——服务端解析一次数据，客户端拿到类型结果，不必再包一层临时的 `fetch`。

几条帮我少踩深夜回归的习惯：

- **共享类型，而不是 DTO 汤。** 文章元数据、用户设置、交易日志等，尽量一个真相来源。
- **在边界校验。** 未知输入先 parse，再进业务逻辑。
- **小而纯的模块。** 排序文章、格式化日期、渲染 Markdown，最好不启服务也能测。

```typescript
type PostSummary = {
  slug: string
  title: string
  date: string
}

export function sortPostsByDate(posts: PostSummary[]) {
  return [...posts].sort(
    (left, right) => Date.parse(right.date) - Date.parse(left.date),
  )
}
```

目标不是第一天就完美，而是改一层时不会悄悄弄坏另一层。
