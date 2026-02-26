# Personal Sovereign Publishing System – MVP v1

## 项目目标
构建一个可持续变现的个人内容网站，形成最小闭环：  
> 内容发布 → 用户订阅 → 支付 → 自动开通会员 → 解锁文章  

本版本为 MVP（最小可行版本），优先保证可上线与可变现。  
**技术原则**：采用 TanStack Start 全栈框架，**统一部署到 Cloudflare Workers**，简化架构、消除跨域问题、充分利用 SSR/Server Functions/Edge 运行时，让个人项目更快上线、更易维护。

---

# 一、需求定义

## 1. 功能需求

### 1.1 Landing Page
- 个人定位
- 价值主张
- CTA（订阅 / 加入会员）
- 精选文章展示（public 文章，支持 SSR 以提升 SEO）

### 1.2 内容系统
- 文章存储于仓库（MDX 文件）
- 支持 frontmatter 字段：
  - `title`
  - `date`
  - `tags`
  - `visibility: public | member`
- 文章列表页（SSR + 动态加载）
- 文章详情页（SSR public / 动态 streaming member）
- 会员文章支持预览模式（前 300–500 字 + 会员专享提示）

### 1.3 会员系统
- 邮箱登录（Magic Link 简化实现）
- Stripe 订阅支付
- 自动开通会员
- 会员状态查询（Server Function / loader 中执行）
- 会员到期自动失效

### 1.4 支付系统
- Stripe Checkout
- Stripe Subscription
- Webhook 自动处理
- MVP 仅支持一个基础订阅 Plan（例如 Monthly ¥980 或 $9.9）

## 2. 非功能需求
- 部署于 **Cloudflare Workers**（全栈应用）
- Edge 运行（Cloudflare Worker）
- 使用 D1 数据库（绑定到 Worker）
- 支持 SSR（public 页面/文章）以提升首屏速度和 SEO
- 结构具备扩展能力（未来可加多 Plan、链上支付等）
- 保持代码简洁、可读
- Cookie 安全：HttpOnly + Secure + SameSite=Lax/Strict
- 时间字段统一使用 INTEGER（Unix timestamp 秒）

---

# 二、系统架构设计

## 2.1 整体架构
```
User
  ↓ (HTTPS / Edge)
Cloudflare Workers (TanStack Start 全栈应用)
  ├── SSR / Streaming Pages (Landing, 文章列表、详情、预览)
  ├── Server Functions / API Routes
      - /api/me (会员状态)
      - /api/login (Magic Link + set cookie)
      - /api/checkout (创建 Stripe Session)
      - /api/stripe-webhook (处理支付事件)
  ├── D1 Database Binding
  ├── KV / R2 (可选：静态资产、缓存)
  └── Stripe (Payment + Webhook)
```

**说明**：整个应用作为一个 Worker 部署。无独立 Pages 项目，无 CORS，无额外跳跃。静态资源（MDX 编译产物）由 Worker serve，动态逻辑（权限、支付）在 Server Functions 中执行。

## 2.2 前端层（全栈）
技术栈：
- **TanStack Start**（核心框架，基于 TanStack Router + Vinxi + Nitro）
- TanStack Query（数据获取与缓存）
- MDX（文章内容）
- Cloudflare Vite Plugin（Workers 适配）

职责：
- 页面渲染（SSR for public，Streaming for member content）
- Loader 中执行权限判断（直接访问 D1）
- Server Functions 调用（无需 fetch，直接调用）
- 会员状态展示与文章预览控制

## 2.3 API 层（集成在 Worker 内）
负责：
- 登录（Magic Link + set HttpOnly cookie）
- 创建 Stripe Checkout Session
- 处理 Stripe Webhook（立即 200 返回 + 异步/幂等处理）
- 查询会员状态（/api/me 或 loader）
- 返回用户信息

使用 TanStack Start 的 `createServerFn` 或自定义 route handler。所有敏感操作（D1、Stripe secret）在 server 环境中执行。

## 2.4 数据库设计（Cloudflare D1）

### users 表
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  created_at INTEGER NOT NULL,          -- Unix timestamp
  last_login_at INTEGER
);
```

### memberships 表
```sql
CREATE TABLE memberships (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT NOT NULL,                 -- 'active', 'canceled', 'past_due' 等
  current_period_end INTEGER,           -- Unix timestamp
  expires_at INTEGER,                   -- Unix timestamp，冗余字段便于快速判断
  cancel_at_period_end BOOLEAN DEFAULT 0,
  created_at INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
```

**说明**：时间字段全部用 INTEGER（Unix timestamp），避免时区问题，便于比较。

## 2.5 Stripe 交互逻辑

### 创建 Checkout
流程：
1. 用户点击「加入会员」
2. 调用 Server Function `/api/checkout`
3. Worker 创建 Stripe Checkout Session（mode: subscription）
4. 返回 { url: redirectUrl }
5. 前端 redirect 或 window.location = url

### Webhook 处理事件
监听事件：
- `checkout.session.completed`
- `invoice.paid`
- `invoice.payment_failed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

处理原则：
- 收到请求 → 立即读取 raw body → 校验签名（constructEventAsync）
- 校验通过后 **立即返回 200 OK**
- 事件处理异步执行（或同步但加 timeout 保护）
- 使用 event.id 作为 idempotency key 防重
- 更新 memberships 表（status、current_period_end、expires_at 等）

---

# 三、核心流程设计

## 3.1 登录流程（简化版）
1. 用户在前端输入邮箱 → 调用 Server Function `/api/login`
2. Worker 发送 Magic Link（或直接创建 user + set cookie，MVP 可先跳过邮件验证）
3. Worker set HttpOnly/Secure/SameSite cookie（signed 或 JWT）
4. 后续请求自动带 cookie，loader / Server Function 中校验并获取 user

## 3.2 支付流程
1. 用户点击订阅 → 调用 Server Function 创建 Checkout Session
2. 返回 redirect URL → 前端跳转支付
3. 支付成功 → Stripe 触发 webhook
4. Worker 收到 webhook → 更新 membership 记录
5. 用户返回页面 → loader 重新获取 /api/me → 解锁内容
6. 优化：success_url 带 ?session_id=xxx → 前端调用 verify-checkout Server Function 主动补齐（防 webhook 延迟）

## 3.3 文章访问控制
MDX 示例：
```yaml
---
title: 我的第一篇会员文章
date: 2025-10-01
tags: [crypto, web3]
visibility: member
---
```

页面逻辑（在 loader 中）：
- 获取 cookie → 校验 user
- 查询 memberships → 判断 isActive = status === 'active' && current_period_end > now()
- visibility === 'public' → 返回全文（SSR）
- visibility === 'member' && isActive → 返回全文
- visibility === 'member' && !isActive → 返回 preview + 订阅 CTA

---

# 四、目录结构建议
```
src/
  app/                        # TanStack Start 路由
    routes/
      __root.tsx
      index.tsx               # Landing
      posts/
        index.tsx             # 文章列表
        [slug].tsx            # 文章详情页
  components/
    ArticlePreview.tsx
    SubscribeButton.tsx
    ...
  posts/                      # .mdx 文件
    hello-world.mdx
    member-only.mdx
    ...
server/
  functions/
    login.ts
    checkout.ts
    me.ts
  webhook/
    stripe.ts                 # webhook handler
  db/
    queries.ts                # D1 查询封装
    schema.ts
app.config.ts                 # Vinxi 配置
vite.config.ts                # Vite + Cloudflare plugin
wrangler.toml                 # Worker 配置（D1 binding、secrets）
package.json
tsconfig.json
```

---

# 五、任务拆分

## 阶段 1：内容站基础
### Task 1
- 初始化 TanStack Start 项目：`npm create cloudflare@latest my-app -- --framework=tanstack-start`
- 配置 wrangler.toml（添加 D1 binding）
- 本地开发：`npm run dev`
- 首次部署：`npm run deploy`

### Task 2
- 集成 MDX（TanStack Start 支持 import .mdx）
- 实现文章列表页（file-based routing + loader 读取 posts/ 目录）
- 实现文章详情页（[slug].tsx + loader 按 slug 加载 MDX）

### Task 3
- 解析 frontmatter（visibility 等）
- 实现 preview 逻辑（截取内容 + CTA）

## 阶段 2：数据库与 API
### Task 4
- 创建 D1 数据库（dashboard 或 wrangler）
- 执行 schema migration（users & memberships 表）
- 在 wrangler.toml 中绑定 D1

### Task 5
- 实现 Server Functions：
  - `/api/me` → 返回 { user, membership }
  - `/api/login` → 创建/查找 user + set cookie
- 在 loader 中使用这些函数判断权限

## 阶段 3：Stripe 集成
### Task 6
- 在 Stripe dashboard 创建产品 + Monthly 价格
- 实现 `/api/checkout` Server Function
- 实现 `/api/stripe-webhook` route
  - 使用 stripe.webhooks.constructEventAsync(rawBody, signature, secret)
  - 立即 res.status(200).send()
  - 异步/同步处理事件（更新 D1）
- 本地测试 webhook：wrangler dev --remote + stripe listen --forward-to localhost:8787/api/stripe-webhook

## 阶段 4：会员解锁
### Task 7
- loader 集成会员状态判断
- 文章详情页根据 visibility + isActive 渲染全文/预览
- 测试端到端流程：订阅 → 支付 → webhook → 刷新解锁

## 阶段 5：Landing 打磨
### Task 8
- 完善 Landing 页面（SSR）
- CTA 按钮调用 checkout Server Function
- 展示精选 public 文章（loader 预加载）

---

# 六、上线 Checklist
- Stripe Webhook Endpoint 已验证（dashboard 显示绿色）
- D1 表已创建，binding 配置正确
- Worker secrets 已设置（STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET）
- 环境变量区分（preview / production）
- public 文章 SSR 正常，SEO meta 正确
- 会员文章非会员时显示预览 + CTA
- 支付成功后 webhook 更新 D1，页面刷新可见会员内容
- Cookie 设置正确（HttpOnly/Secure/SameSite）
- 部署命令执行：`npm run build && wrangler deploy`
- 确认使用 live Stripe key（非 test）
- 测试不同浏览器/设备登录 & 订阅

---

# 七、后续扩展方向（V2）
- 链上 USDC 直收 + 钱包绑定
- 年费 / 终身会员 Plan
- 自动续费邮件提醒
- X / YouTube 内容聚合展示
- 高级标签 & 搜索
- SEO 深度优化（sitemap, rss）
- 会员专属评论区
- 内容统计（阅读量、转化漏斗）

---

# 八、MVP 成功标准
上线后满足：
- 能轻松发布 MDX 文章
- 能通过 Stripe 收钱
- 支付后自动开通会员（Webhook 更新）
- 会员文章对非会员锁定（预览模式）
- 系统在 Edge 稳定运行，无明显延迟
- 登录 & 订阅体验顺畅

---

# 战略说明
第一版不追求复杂架构。  
你是内容创作者。  
核心资产是：  
> 内容 × 转化率 × 留存  

技术只需要稳定可靠。  
**全 Worker + TanStack Start** 是 2026 年个人内容变现项目的最优起点：部署一次、零运维、全球边缘加速、开发体验接近 Next.js。

如果你在实际编码中遇到具体问题（例如 webhook 签名失败、D1 查询慢、MDX loader 写法等），可以随时贴代码片段，我可以继续帮你细化。

祝项目顺利，早日收到第一笔会员费！