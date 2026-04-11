# 系统架构 (Architecture)

**最后更新**：2026-04-10  
**项目**：Personal Sovereign Publishing System (MVP v1)

## 整体架构概述
整个应用作为一个 **Cloudflare Worker** 部署（TanStack Start 全栈）。  
无独立 Pages 项目，无 CORS 问题，所有请求在 Edge 运行。

```
User (HTTPS) 
   ↓
Cloudflare Workers (TanStack Start)
   ├── SSR 页面渲染（Landing、/posts、/posts/$slug）
   ├── Server Routes / Server Functions（API 逻辑）
   ├── D1 Database Binding（直接 in-process，无网络开销）
   └── Stripe Integration（Checkout + Webhook）
```

**核心原则**：
- 严格 server/client 边界：敏感操作（D1 查询、Stripe 调用、会员状态判断、member 正文返回）必须在 server 环境执行。
- public 页面优先 SSR，提升 SEO。
- Member-only 文章正文**绝不能**进入客户端 bundle，未授权用户仅返回 preview（300–500 字 + CTA）。
- 时间字段统一使用 **INTEGER（Unix timestamp 秒）**。

## 技术栈分层

### 前端层（Client + SSR）
- TanStack Start + TanStack Query + MDX + Tailwind
- 职责：
  - SSR 页面渲染（loader 中可执行权限判断）
  - 使用 TanStack Query 管理 client state
  - UI 展示与交互（CTA、预览提示等）

### API 层（Server-only）
- 使用 TanStack Start 的 **Server Routes**（推荐放在 `src/routes/api/` 下）或 **Server Functions**。
- 负责：
  - `/api/me` —— 查询当前用户会员状态
  - `/api/login` —— Magic Link 登录 + set HttpOnly cookie
  - `/api/checkout` —— 创建 Stripe Subscription Session
  - `/api/stripe-webhook` —— 处理 Stripe 事件（raw body + signature 验证）

### 数据库层（Cloudflare D1）
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

## 关键技术流程

### 1. 文章访问控制（在 loader / Server Function 中执行）
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

### 2. Stripe 交互逻辑
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

### 3. 登录流程（简化版）
1. 用户输入邮箱 → 调用 `/api/login`
2. 创建或查找 user，set HttpOnly + Secure + SameSite=Lax Cookie
3. 后续请求在 loader / Server Function 中解析 cookie 获取 userId

## 代码组织建议
- `src/routes/` → 文件路由 + Server Routes（保持 TanStack Start 原生）
- `src/lib/posts.ts` → MDX 解析与 frontmatter 处理（共享）
- `src/lib/membership.ts` → 会员状态查询（当前 stub，后续替换为真实 D1 调用）
- `src/server/` 或 `src/lib/server/` → 纯 server 逻辑（D1、Stripe helpers）

## Agent 指令
- 任何涉及会员判断、支付、数据库或权限的变更，必须先阅读本文件。
- API 路由统一放在 `src/routes/api/` 下；优先使用 Server Routes 处理 webhook 等需要 raw body 或明确 HTTP 边界的场景，普通 server-side mutation 可使用 `createServerFn`。
- 发现架构漂移或可复用模式时，主动建议更新本文件或 overall-requirements.md。
- 始终遵守 server/client 边界，保护 member-only 内容安全。
