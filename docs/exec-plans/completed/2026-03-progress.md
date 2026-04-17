# 2026-03 迭代详细记录 (Completed)

**迭代日期**：2026-03-14  
**对应阶段**：阶段 0（Landing Page + 内容系统基础）  
**状态**：已完成

## 当前阶段状态总结
- 已完成 Phase 0 / Task 0.1：TanStack Start 项目初始化、Tailwind 配置、Cloudflare Workers 部署验证。
- 已完成 Landing Page + `/posts` 基础路由与视觉系统。
- 本轮重点完成内容系统从 mock 数据切换为真实 MDX 文件，并统一文章渲染与预览逻辑。

## 本轮已完成内容

1. **文章内容源切换**
   - 新增 `posts/` 目录，存放真实 MDX 文章（当前包含 2 篇 public + 1 篇 member-only）。
   - frontmatter 字段已对齐：`title`、`subtitle`、`date`、`tags`、`visibility`、`excerpt`。

2. **内容读取与解析层**
   - 新增 `src/lib/posts.ts`
   - 实现功能：frontmatter 解析、按日期排序、slug 查询、摘要提取、预览文本生成（300-500 字）、tag 格式化。

3. **首页精选文章更新**
   - `src/routes/index.tsx` 从 `src/lib/posts.ts` 读取真实 public 文章，不再使用 mock 数据。

4. **文章列表页改造**
   - `src/routes/posts/index.tsx` 使用真实文章数据。
   - 显示会员文章标识（“会员专享”标签）。
   - tag 展示统一为首字母大写格式。
   - 补充基础 SEO meta（title、description、canonical）。

5. **文章详情页改造**
   - `src/routes/posts/$slug.tsx` 使用真实 slug 查询。
   - 落地可见性控制逻辑：
     - `public` → 显示全文
     - `member` + 非会员 → 显示预览 + CTA
   - 接入 `react-markdown + remark-gfm` 渲染 markdown 正文。
   - 接入 `@tailwindcss/typography`，并按当前站点视觉风格进行定制。
   - 文章头部支持 `subtitle`，tag 降级为较弱的 metadata 展示。
   - 补充详情页基础 SEO meta。

6. **会员状态占位实现**
   - 新增 `src/lib/membership.ts`，当前返回固定 `isActive: false`（用于跑通页面流程，后续替换为真实 D1 + Stripe 查询）。

7. **样式与视觉优化**
   - `src/styles.css` 新增会员预览提示区块样式。
   - 列表页会员文章标识改为独立标签，提升识别度同时保持克制风格。
   - 详情页预览收尾区优化为简洁状态提示（“加入会员 / 返回文章目录”并排）。
   - markdown 正文样式定制（强调、链接、列表、引用、代码块、表格等）。

8. **内容格式统一**
   - 所有文章补充统一 formatter：`subtitle`、tag 规范。
   - 移除部分文章中与页面头部重复的一级标题。

9. **清理旧代码**
   - 删除已废弃的 `src/data/posts.ts`。

## 当前关键文件位置
- `posts/*.mdx`（内容源）
- `src/lib/posts.ts`（内容解析核心）
- `src/lib/membership.ts`（会员状态 stub）
- `src/routes/index.tsx`（首页）
- `src/routes/posts/index.tsx`（文章列表）
- `src/routes/posts/$slug.tsx`（文章详情）
- `src/components/Header.tsx`
- `src/styles.css`
- `src/routes/__root.tsx`
- `public/manifest.json`

## 当前路由状态
- `/` → Landing Page（首页）
- `/posts` → 文章列表页
- `/posts/$slug` → 文章详情页（支持 preview）

## 构建与验证状态
- `pnpm build` 可正常通过（client + server 产物均生成）。
- 已知非阻塞问题：Wrangler 日志目录出现 `EPERM` 权限警告，不影响构建和部署。

## 已知限制（重要）
1. 会员鉴权仍为 stub 状态
   - 未接入真实登录态、D1 `memberships` 表和 Stripe 订阅状态。
2. Member 文章正文当前仍可能进入客户端构建产物
   - 目前是“展示层预览控制”，并非真正的 server-only 权限隐藏。
   - 存在潜在泄露风险，需要后续改为 server-only 数据通路。

## 下阶段建议（按优先级排序）
1. **接入真实会员状态查询**
   - 使用 `/api/me` + D1 查询替换 `src/lib/membership.ts` 中的 stub。
2. **强化 Member 内容传输策略**
   - 将 member 正文改为 server-only，仅在授权情况下返回全文，未授权用户仅返回 preview。
3. **接入支付流程**
   - 把会员 CTA 从 “Coming Soon” 改为调用 `/api/checkout`。
4. **完成 Stripe Webhook 闭环**
   - 实现 `/api/stripe-webhook`，处理关键事件，支付成功后自动更新 membership 并解锁文章。

---

**Harness 记录**：  
本次迭代重点完成了内容系统的真实化与预览逻辑落地，为后续会员与支付闭环奠定了基础。下一迭代的核心风险是会员权限的 server-only 实现，需要严格遵守 ARCHITECTURE.md 中的 server/client 边界。

**更新日期**：2026-04-10（迁移至 Harness 结构时补充）