# Vincenteof — Design Document

个人博客的设计规范。记录视觉方向、交互原则与实现约定，供后续迭代时保持一致。

---

## 1. 设计定位

### 一句话

**安静、精致、克制炫技** — 像 Apple 产品页那样干净，像工程师笔记那样可信。

### 内容主轴

**Tech · Investing**（软件开发 · 投资）

- **Tech**：类型安全、系统构建、可测试模块、工具链
- **Investing**：流程优于预测、仓位管理、风险意识

两个领域共享同一套视觉系统，仅用极轻的标签色区分语义，不做两套 UI。

### 设计原则

| 原则 | 含义 |
|---|---|
| **减法优先** | 能用一个元素解决的，不加第二个 |
| **克制炫技** | 动效、光晕、高亮服务于阅读，不抢内容 |
| **工艺感** | 细节要「凑近看才隐约察觉」，而非一眼看到特效 |
| **明确选择** | 语言、主题由用户手动切换，不自动猜系统偏好 |
| **阅读第一** | 文章页工艺（排版、代码、链接）比装饰更重要 |

### 刻意不做

- 阅读进度条（全局 accent 细线，偏 Medium 模板感）
- 跟随系统的主题模式（仅 light / dark 二选一）
- MDX / Twitter embed（以 .md 为主，保持构建简单）
- 粒子背景、鼠标光斑、全页 scroll-jacking
- Footer 定位标语重复（首页、About 已表达）

---

## 2. 视觉语言

### 2.1 色彩

所有颜色通过 CSS 变量定义，挂在 `:root` / `:root[data-theme="dark"]`。主题由 `<html data-theme>` 驱动，无 `prefers-color-scheme` 回退。

#### 浅色模式

| Token | 值 | 用途 |
|---|---|---|
| `--bg` | `#fbfbfd` | 页面背景 |
| `--bg-elevated` | `#ffffff` | 卡片、代码块底色 |
| `--text` | `#1d1d1f` | 主文字 |
| `--text-secondary` | `#6e6e73` | 正文、摘要 |
| `--text-tertiary` | `#86868b` | Meta、标签默认色 |
| `--accent` | `#0071e3` | 链接、Tech 标签、强调 |
| `--accent-hover` | `#0077ed` | Hover 态 |
| `--border` | `rgba(0,0,0,0.08)` | 分隔线 |
| `--header-bg` | `rgba(251,251,253,0.82)` | Sticky header + blur |
| `--tag-investing` | `#8f6b2f` | Investing 标签 |

#### 深色模式

| Token | 值 |
|---|---|
| `--bg` | `#000000` |
| `--bg-elevated` | `#1d1d1f` |
| `--text` | `#f5f5f7` |
| `--accent` | `#2997ff` |
| `--tag-investing` | `#c9a06a` |

#### 标签语义色

| Tag | 色调 | Class |
|---|---|---|
| `tech`, `typescript` | 冷蓝（accent） | `.tag--tech` |
| `investing`, `risk` | 暖琥珀 | `.tag--investing` |
| 其他 | 三级灰 | `.tag` |

### 2.2 字体

| Token | 栈 | 用途 |
|---|---|---|
| `--font-sans` | SF Pro Text → 系统 UI → 苹方/微软雅黑 | 正文、导航 |
| `--font-display` | SF Pro Display → 系统 UI → 苹方/微软雅黑 | 标题、Hero |
| `--font-mono` | JetBrains Mono → SF Mono → … | 代码、Footer 统计 |

- 代码块通过 `@fontsource/jetbrains-mono` 加载 400/500/700
- 代码启用 `font-feature-settings: "calt" 1`（连字）
- 正文代码字号 `0.8125rem`，行高 `1.65`

### 2.3 排版尺度

| 元素 | 规格 |
|---|---|
| 页面最大宽度 | `980px`（`.page-wrap`） |
| 文章栏宽 | `42rem`（`.page-wrap--narrow`） |
| Hero 标题 | `clamp(2.5rem, 6vw, 4.25rem)`，字重 600，字间距 `-0.04em` |
| 文章标题 | `clamp(2rem, 5vw, 3rem)` |
| 列表标题 | `clamp(1.25rem, 2.5vw, 1.5rem)` |
| 正文 | `1.0625rem`，行高 `1.75` |
| Section 标签 | `0.6875rem`，大写，字间距 `0.08em` |

### 2.4 间距与布局

- 主内容区上下留白：`clamp(3rem, 8vw, 5.5rem)`
- 移动端左右边距：`2rem`（`< 640px`）
- 列表项间距：`padding-block: 1.75rem` + 顶部分隔线
- Header：sticky，`backdrop-filter: saturate(180%) blur(20px)`

---

## 3. 动效

### 缓动曲线

默认：`cubic-bezier(0.22, 1, 0.36, 1)` — 干脆但不突兀，偏 Apple 质感。

### 动画清单

| 场景 | 实现 | 时长 / 节奏 |
|---|---|---|
| 首页 Hero 入场 | `.reveal-item` stagger | 间隔 ~90ms，`Reveal` 组件 |
| 文章正文入场 | `.article-prose--enter` 顶层块 stagger | 前 7 块错开 50ms，之后统一 400ms |
| 主题切换 | View Transition API cross-fade | 200ms |
| 链接 hover | 下划线从左向右绘制 | `background-size` 220ms |
| 列表 hover | 左侧 2px 竖线展开 + 标题字间距微扩 | 220ms |
| 代码复制反馈 | 背景淡 accent + `✓ Copied` 文案 | 1.8s 后恢复 |

### 无障碍

所有动效在 `prefers-reduced-motion: reduce` 下关闭或降级为即时显示。

### 首页氛围（Hero Atmosphere）

仅首页 Hero 区域：

- 双层 accent 冷光（右上主光 + 中上补光）
- 顶部渐隐细网格（暗色模式略加重）
- 存在感应「隐约察觉」，不是明显光斑

---

## 4. 页面与组件

### 4.1 信息架构

```
/           首页 — Hero + 近期文章
/blog       博客列表
/blog/$slug 文章详情
/about      关于
```

### 4.2 Header

- Logo：`Vincenteof`（左）
- 导航：Home / Blog / About
- 控件：语言切换（EN/中）、主题切换（☀️ / 🌙）
- 主题：仅 `light` ↔ `dark`，默认 `light`

### 4.3 Footer（极简）

```
© {year} Vincenteof. All rights reserved.          [GH] [X] [YT] [抖]
```

- 左侧版权一行；右侧单色社交图标（GitHub · X · YouTube · 抖音）
- 图标用 `--text-tertiary`，hover 为 accent + 轻微上移；不用平台品牌色
- 链接配置集中在 `src/lib/site/social.ts`；外链 `target="_blank"` + `rel="noopener noreferrer"`
- 不做 Footer 文章统计、定位标语或「Follow me」文案

### 4.4 About — Elsewhere

- 在「为什么写这个站」与 CTA 之间：`其他地方` / `Elsewhere`
- 正文内嵌文字链接（同一 `socialLinks` 配置），不用图标墙
- 中文：也可以在 A、B、C、D找到我。 / 英文：You can also find me on A, B, C, and D.

### 4.5 PostList

- 整行可点击（`Link` 包裹 meta + 标题 + 摘要）
- Hover：标题左侧竖线、标题变 accent 色
- 首页列表支持 `revealFrom` 错开入场

### 4.6 文章页

- **Header 区**：标题 + 日期 + 语义色标签（静态，无动效）
- **正文**：`ArticleProse` — Shiki 双主题高亮 + 块级 stagger 入场
- **代码块**：工具栏（语言标签 + Copy）+ JetBrains Mono 高亮
- **复制**：根节点事件委托（兼容 SPA 导航后 innerHTML 重建）

### 4.7 链接样式

- 默认无 underline
- Hover：accent 色 + 下划线从左向右绘制（`background-image` 技巧）
- 适用于：正文链接、`.back-link`、`.section-link`

---

## 5. 内容与技术约定

### Markdown

- 格式：`.md` + YAML frontmatter（`title`, `date`, `tags`）
- 渲染：`marked` → Shiki 代码高亮 → HTML
- 不引入 MDX；外部 embed（Twitter 等）暂不支持

### 代码高亮

- 主题：`github-light` / `github-dark` 双主题
- Shiki 输出 CSS 变量（`--shiki-light` / `--shiki-dark`），由 `data-theme` 切换
- 支持语言：typescript, tsx, javascript, bash, json, yaml, sql, css, html, markdown, text 等

### 国际化

| 项目 | 策略 |
|---|---|
| 语言 | `en`（默认）/ `zh`，手动切换 |
| 存储 | `locale` cookie，SSR 注入 |
| 文案 | `src/i18n/messages/{en,zh}.ts` |
| 日期 | `formatLocalizedDate()` 按 locale 格式化 |
| 标签 | `translateTag()` 映射显示名 |

### 主题

| 项目 | 策略 |
|---|---|
| 模式 | `light` / `dark` |
| 存储 | `theme` cookie，SSR 注入 `<html data-theme>` |
| 切换 | View Transition 200ms 淡入淡出 |

---

## 6. 文件地图

| 路径 | 设计相关职责 |
|---|---|
| `src/styles.css` | 全部设计 token、组件样式、动效 keyframes |
| `src/components/HeroAtmosphere.tsx` | 首页 Hero 氛围层 |
| `src/components/Reveal.tsx` | 通用入场动画包装 |
| `src/components/PostList.tsx` | 列表结构与整行链接 |
| `src/components/ArticleProse.tsx` | 正文渲染、代码复制 |
| `src/lib/posts/tag-tone.ts` | 标签语义色映射 |
| `src/lib/site/stats.ts` | Footer 写作统计 |
| `src/i18n/messages/*.ts` | 所有用户可见文案 |

---

## 7. 迭代记录

| 阶段 | 内容 | 状态 |
|---|---|---|
| Phase 1 | Hero 光晕、入场编排、主题 cross-fade | ✅ |
| Phase 2 | Shiki 高亮、链接动效、代码复制 | ✅ |
| Phase 3 | 列表 hover 竖线、tag 语义色、Footer 统计 | ✅ |
| — | 阅读进度条 | ❌ 已移除（不够高级） |
| — | Auto 主题 | ❌ 已移除（简化为二选一） |
| — | Footer 定位标语 | ❌ 已移除（极简 footer） |

---

## 8. 后续可考虑的方向

仅在**内容形态真正需要**时再引入：

- **阅读时间**（`4 min read`）— 比进度条更 editorial
- **RSS / GitHub 链接** — 放 Footer 右侧，实用且不破坏极简
- **显式 embed 语法**（`:::tweet`）— 仍用 .md，静态卡片，不用 MDX
- **路由淡入淡出** — 150ms opacity，全站空间感

新增任何视觉效果前，先问三个问题：

1. 它是否服务于阅读？
2. 去掉它，页面是否仍然完整？
3. 它是「只有这个站才有」的细节，还是「博客标配」？

若第 3 条答案是后者，大概率不该加。

---

*Last updated: 2026-03*