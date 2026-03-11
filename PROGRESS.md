# Progress Handover (Updated: 2026-03-11)

## 当前阶段状态
- 用户已完成：Phase 0 / Task 0.1（TanStack Start 初始化、Tailwind 配置、Cloudflare 部署验证）。
- 已完成：Landing Page + `/posts` 基础路由与视觉系统落地。
- 本轮已完成：`mock posts` -> 真实 `posts/*.mdx` 内容源切换，并打通列表页、详情页、会员预览逻辑。

## 本轮已完成内容
1. 文章内容源从 mock 切换为 MDX 文件
   - 新增 `posts/` 目录与示例文章（4 篇 public + 1 篇 member）
   - frontmatter 字段已对齐：`title` / `date` / `tags` / `visibility` / `excerpt`

2. 新增内容读取与解析层
   - 新增 `src/lib/posts.ts`
   - 实现：frontmatter 解析、按日期排序、slug 查询、摘要提取、预览文本生成

3. 首页精选文章改为真实数据
   - `src/routes/index.tsx` 从内容层读取 public 文章，不再依赖 mock

4. `/posts` 列表页改造
   - `src/routes/posts/index.tsx` 使用真实文章摘要数据
   - 已显示会员文章标识（`会员专享`）
   - 已补基础 SEO meta（title / description / canonical）

5. `/posts/$slug` 详情页改造
   - `src/routes/posts/$slug.tsx` 改为真实 slug 查询
   - 落地可见性逻辑：
     - `public` -> 全文
     - `member` + 非会员 -> 预览 + CTA
   - 已补详情页基础 SEO meta（title / description / canonical）

6. 会员状态 stub 占位
   - 新增 `src/lib/membership.ts`
   - 当前返回固定 `isActive: false`，用于先跑通页面流程，后续替换为真实会员查询

7. 样式补充
   - `src/styles.css` 新增会员预览提示区块样式（与现有视觉系统一致）

8. 清理旧数据层
   - 删除 `src/data/posts.ts`（已不再使用）

## 当前代码位置（关键文件）
- `posts/*.mdx`
- `src/lib/posts.ts`
- `src/lib/membership.ts`
- `src/routes/index.tsx`
- `src/routes/posts/index.tsx`
- `src/routes/posts/$slug.tsx`
- `src/components/Header.tsx`
- `src/styles.css`
- `src/routes/__root.tsx`
- `public/manifest.json`

## 路由现状
- 首页：`/`
- 全量文章：`/posts`
- 文章详情：`/posts/$slug`

## 构建/验证状态
- `pnpm build` 可通过（client + server 产物均生成）。
- 常见非阻塞提示：Wrangler 写日志到 `~/Library/Preferences/.wrangler/logs` 出现 `EPERM`。
  - 不影响构建成功与产物输出。

## 已知限制（重要）
1. 当前会员鉴权仍是 stub
   - 还未接入真实登录态 / D1 membership / Stripe 订阅状态。
2. 当前 member 正文仍会进入客户端构建产物
   - 现在是“展示层预览控制”，不是“强权限隐藏”。
   - 要避免正文泄露，member 正文需要改为仅服务端按权限返回。

## 下阶段建议（按优先级）
1. 接入真实会员状态查询
   - 用 `/api/me` + D1 `memberships` 替换 `src/lib/membership.ts` 的 stub。
2. 调整 member 内容传输策略
   - member 正文改为 server-only 数据通路，未授权用户仅返回 preview。
3. 接入支付流程
   - 将会员 CTA 从 `Coming Soon` 接入 `/api/checkout`。
4. 完成 webhook 闭环
   - 用 Stripe webhook 更新 membership，验证支付成功后自动解锁文章。
