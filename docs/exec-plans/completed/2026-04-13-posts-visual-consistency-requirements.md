# Exec Plan - Posts Visual Consistency Audit

**日期**：2026-04-13  
**状态**：Completed  
**负责人**：AI Agent

## 任务背景
Landing Page 已完成重做并形成新视觉语言（色彩、排版、交互节奏），`posts` 相关页面需要补做视觉与交互一致性修复，避免阅读体验出现明显断层。

## 本轮范围
- 按钮风格一致性
- 链接样式一致性（包括正文链接）
- 交互状态一致性（hover / focus-visible / active）
- 失效 CTA 修复

## 实际检查范围
- `src/routes/posts/index.tsx`
- `src/routes/posts/$slug.tsx`
- `src/lib/ui.ts`

## 审计结果
### P0
1. 会员预览 CTA 仍指向 `/#membership`，Landing 中该锚点已不存在，属于失效路径。

### P1
1. posts 页面缺少与 Landing 对齐的 focus-visible / active 状态体系。
2. 导航型返回操作和主 CTA 都使用盒状按钮，层级区分不够清楚。
3. 正文内链接缺少更统一的 hover / focus 表达，阅读中显得偏突兀。

### P2
1. 文章目录列表的 hover 反馈较弱，扫描节奏不够稳定。
2. 会员 badge 与列表卡片的交互节奏略显生硬。

## 已完成修复
1. 将 posts 共用按钮样式统一到 `src/lib/ui.ts`，补齐 focus-visible、active、无下划线和更稳定的边框/背景过渡。
2. 为 Markdown 正文链接增加统一的颜色、下划线、hover 和 focus-visible 状态。
3. 将 `/posts` 与 `/posts/:slug` 的返回导航改为更克制的文本链接，保留主要 CTA 的视觉优先级。
4. 将会员预览区的失效 CTA 替换为真实可用入口：`订阅长信` → Substack，并保留返回文章目录路径。
5. 优化文章目录列表项 hover 背景、标题响应和会员 badge 细节，使浏览节奏更接近 Landing 的编辑式气质。

## 验证结果
1. 代码检查：`src/routes/posts/index.tsx`、`src/routes/posts/$slug.tsx`、`src/lib/ui.ts` 无报错。
2. 构建验证：`pnpm build` 已通过。
3. 浏览器回归：`/posts` 与 `/posts/member-preview-note` 已确认新返回链接和会员 CTA 生效。

## 后续观察项
1. 真实会员支付入口上线后，将 `订阅长信` 临时 CTA 替换为正式会员转化入口。
2. 如果后续新增更多富文本元素，可继续沿用当前 `markdownProse` 的交互 token。
