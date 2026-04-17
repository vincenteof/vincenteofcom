# 系统架构 (Architecture)

**最后更新**：2026-04-17  
**项目**：Personal Sovereign Publishing System (MVP v1)

## 整体架构概述
整个应用作为一个 **Cloudflare Worker** 部署（TanStack Start 全栈）。  
无独立 Pages 项目，无 CORS 问题，所有请求在 Edge 运行。

当前阶段（Phase 1）以免费 newsletter 增长为核心，因此架构优先服务以下能力：
- Landing / posts / archive 的 SSR 渲染
- newsletter 订阅承接与归档展示
- 轻量 service intake 入口
- 为未来会员与支付阶段保留扩展边界，但不提前引入不必要复杂度

```
User (HTTPS) 
   ↓
Cloudflare Workers (TanStack Start)
  ├── SSR 页面渲染（Landing、/posts、/posts/$slug）
  ├── Server Routes / Server Functions（订阅承接、线索提交、后续扩展）
  ├── 可选数据层（当前阶段可最小化）
  └── 外部服务集成（Newsletter、后续 Stripe）
```

**核心原则**：
- 严格 server/client 边界：敏感操作（D1 查询、Stripe 调用、会员状态判断、member 正文返回）必须在 server 环境执行。
- public 页面优先 SSR，提升 SEO。
- 若未来恢复 member-only 内容，正文**绝不能**进入客户端 bundle，未授权用户仅返回 preview（300–500 字 + CTA）。
- 时间字段统一使用 **INTEGER（Unix timestamp 秒）**。
- 当前阶段不为未验证的会员与支付能力提前增加系统复杂度。

## 技术栈分层

### 前端层（Client + SSR）
- TanStack Start + TanStack Query + MDX + Tailwind
- 职责：
  - SSR 页面渲染（Landing、posts、归档）
  - 使用 TanStack Query 管理 client state
  - UI 展示与交互（newsletter CTA、service intake CTA、归档浏览）

### API 层（Server-only）
- 使用 TanStack Start 的 **Server Routes**（推荐放在 `src/routes/api/` 下）或 **Server Functions**。
- 负责：
  - newsletter 订阅相关跳转或承接逻辑
  - service intake 表单提交
  - 未来阶段预留：`/api/me`、`/api/login`、`/api/checkout`、`/api/stripe-webhook`

### 数据库层（Cloudflare D1，Phase 2 预留）
```sql
-- users 表
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  created_at INTEGER NOT NULL,
  last_login_at INTEGER
);

-- memberships 表
CREATE TABLE memberships (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  stripe_subscription_id TEXT NOT NULL,
  status TEXT NOT NULL,           -- 'active' / 'inactive' 等
  current_period_end INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
```

封装建议：放在 `src/server/db/` 或 `src/lib/server/db/` 中，使用 D1 binding 直接查询。

当前阶段若无明确存储需求，可先不引入上述表结构的实际依赖。

## 关键技术流程

### 1. Newsletter 与公开内容承接（当前阶段）
- Landing、posts、归档内容优先 SSR，服务搜索与转化。
- 所有核心 CTA 应优先指向 newsletter 订阅，而不是未上线的会员入口。
- 外部分发渠道（X / YouTube）负责导流，网站负责沉淀与归档。

### 2. 服务咨询线索收集（当前阶段）
- 通过 `/consult` 页面收集结构化线索，当前使用 Tally 免费版 iframe 嵌入（Phase 1 验证期）。
- Landing Offerings 中 Software Consulting 与 Advisory CTA 均指向 `/consult`。
- 保持低摩擦，不引入注册流程。
- 验证线索质量后再评估是否自建表单（Phase 2 候选）。

### 3. 文章访问控制（未来阶段，在 loader / Server Function 中执行）
```ts
const membership = await getMembership(userId);  // 从 D1 查询
const isActive = membership?.status === 'active' 
                 && membership.current_period_end > Date.now() / 1000;

if (post.visibility === 'public' || (post.visibility === 'member' && isActive)) {
  return { content: fullMDXContent };   // server-only 返回全文
} else if (post.visibility === 'member') {
  return { content: previewContent, showCTA: true };
}
```

**重要**：member 正文必须在 server 端过滤后再返回，禁止把全文直接传给 client。

### 4. Stripe 交互逻辑（未来阶段）
- **创建 Checkout**：
  1. 用户点击订阅 → 调用 `/api/checkout`（Server Function/Route）
  2. 创建 Stripe Subscription Session（mode: subscription）
  3. 返回 { url } → 前端跳转

- **Webhook 处理**（`/api/stripe-webhook`）：
  - 监听事件：`checkout.session.completed`、`invoice.paid`
  - 使用 raw body 校验签名
  - 使用 `event.waitUntil()` 确保 Worker 生命周期内完成数据库更新
  - 以 `event.id` 作为幂等 key
  - 更新 memberships 表：status = 'active'，current_period_end = Stripe 返回时间

**MVP 范围**：暂不处理 `subscription.updated`、`payment_failed` 等复杂事件。

### 5. 登录流程（未来阶段，简化版）
1. 用户输入邮箱 → 调用 `/api/login`
2. 创建或查找 user，set HttpOnly + Secure + SameSite=Lax Cookie
3. 后续请求在 loader / Server Function 中解析 cookie 获取 userId

## 代码组织建议
- `src/routes/` → 文件路由 + Server Routes（保持 TanStack Start 原生）
- `src/lib/posts.ts` → MDX 解析与 frontmatter 处理（共享）
- `src/lib/membership.ts` → 未来会员状态查询（若当前阶段保留 stub，应明确不作为主流程依赖）
- `src/server/` 或 `src/lib/server/` → 纯 server 逻辑（D1、Stripe helpers）

## Agent 指令
- 任何涉及会员判断、支付、数据库或权限的变更，必须先阅读本文件。
- 当前阶段若进行 newsletter 或 service intake 相关开发，应优先保持实现轻量，避免提前引入会员系统复杂度。
- API 路由统一放在 `src/routes/api/` 下；优先使用 Server Routes 处理 webhook 等需要 raw body 或明确 HTTP 边界的场景，普通 server-side mutation 可使用 `createServerFn`。
- 发现架构漂移或可复用模式时，主动建议更新本文件或 overall-requirements.md。
- 始终遵守 server/client 边界，保护 member-only 内容安全。
