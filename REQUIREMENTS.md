# Personal Sovereign Publishing System – MVP v1

## 项目目标

构建一个可持续变现的个人内容网站，形成最小闭环：

> 内容发布 → 用户订阅 → 支付 → 自动开通会员 → 解锁文章

本版本为 MVP（最小可行版本），优先保证可上线与可变现。

**技术原则**：采用 TanStack Start 全栈框架，统一部署到 Cloudflare Workers，简化架构、消除跨域问题、充分利用 SSR / Server Functions / Edge 运行时，让个人项目更快上线、更易维护。

---

# 一、需求定义

## 1. 功能需求

### 1.1 Landing Page（优先级最高）

* 个人定位
* 价值主张
* CTA（订阅 / 加入会员）
* 精选文章展示（public 文章，支持 SSR 以提升 SEO）

> Landing 页面完成后即可发布 v0.1，即使会员系统尚未完成。

---

### 1.2 内容系统

* 文章存储于仓库（MDX 文件）
* 支持 frontmatter 字段：

  * `title`
  * `date`
  * `tags`
  * `visibility: public | member`
* 文章列表页（SSR）
* 文章详情页（SSR）
* 会员文章支持预览模式（前 300–500 字 + 会员专享提示）

---

### 1.3 会员系统

* 邮箱登录（Magic Link 简化实现，MVP 可不发送真实邮件）
* Stripe 订阅支付
* 自动开通会员
* 会员状态查询（Server Function / loader 中执行）
* 会员到期自动失效（通过 current_period_end 判断）

---

### 1.4 支付系统

* Stripe Checkout
* Stripe Subscription
* Webhook 自动处理
* MVP 仅支持一个基础订阅 Plan（例如 Monthly）

---

## 2. 非功能需求

* 部署于 Cloudflare Workers（全栈应用）
* Edge 运行
* 使用 D1 数据库
* 支持 SSR（public 页面/文章）
* 结构具备扩展能力
* 保持代码简洁、可读
* Cookie 安全：HttpOnly + Secure + SameSite=Lax
* 时间字段统一使用 INTEGER（Unix timestamp 秒）

---

# 二、系统架构设计

## 2.1 整体架构

```
User
  ↓ (HTTPS / Edge)
Cloudflare Workers (TanStack Start 全栈应用)
  ├── SSR 页面
  ├── Server Functions / API Routes
      - /api/me
      - /api/login
      - /api/checkout
      - /api/stripe-webhook
  ├── D1 Database Binding
  └── Stripe
```

说明：整个应用作为一个 Worker 部署。无独立 Pages 项目，无 CORS。

---

## 2.2 前端层（全栈）

技术栈：

* TanStack Start
* TanStack Query
* MDX

职责：

* 页面 SSR 渲染
* loader 中执行权限判断
* 会员状态展示与文章预览控制

---

## 2.3 API 层（集成在 Worker 内）

负责：

* 登录（set HttpOnly cookie）
* 创建 Stripe Checkout Session
* 处理 Stripe Webhook
* 查询会员状态

所有敏感操作在 server 环境执行。

---

## 2.4 数据库设计（Cloudflare D1）

### users 表

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  created_at INTEGER NOT NULL,
  last_login_at INTEGER
);
```

---

### memberships 表（已简化）

```sql
CREATE TABLE memberships (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  stripe_subscription_id TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_end INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
```

**变更说明：**

* 删除 `stripe_customer_id`（避免冗余）
* 删除 `expires_at`
* 删除 `cancel_at_period_end`
* 所有时间字段使用 INTEGER

---

## 2.5 Stripe 交互逻辑

### 创建 Checkout

流程：

1. 用户点击「加入会员」
2. 调用 Server Function `/api/checkout`
3. Worker 创建 Stripe Checkout Session（mode: subscription）
4. 返回 { url }
5. 前端跳转

---

### Webhook 处理事件（已精简）

监听事件：

* `checkout.session.completed`
* `invoice.paid`

处理原则：

* 使用 raw body 校验签名
* 使用 `event.waitUntil()` 保证 Worker 生命周期内完成数据库更新
* 使用 `event.id` 作为幂等 key 防止重复处理
* 更新 memberships：

  * status = active
  * current_period_end = Stripe 提供的时间

不处理：

* subscription.updated
* payment_failed
* cancel_at_period_end

---

# 三、核心流程设计

## 3.1 登录流程（简化版）

1. 用户输入邮箱 → 调用 `/api/login`
2. Worker 创建或查找 user
3. set HttpOnly/Secure cookie
4. loader / Server Function 中校验 cookie 获取 user

---

## 3.2 支付流程

1. 用户点击订阅
2. 创建 Checkout Session
3. 支付成功
4. Stripe 触发 webhook
5. Worker 更新 membership
6. 页面刷新后解锁

---

## 3.3 文章访问控制

MDX 示例：

```yaml
---
title: 我的第一篇会员文章
visibility: member
---
```

在 loader 中：

* 查询 membership
* 判断：

```ts
isActive =
  membership.status === 'active' &&
  membership.current_period_end > now()
```

* public → 返回全文
* member + active → 返回全文
* member + inactive → 返回 preview + CTA

---

# 四、目录结构建议

```
my-app/
├── src/
│   ├── routes/                         # ← 核心：文件即路由（官方推荐）
│   │   ├── __root.tsx                  # 根布局（必须）
│   │   ├── index.tsx                   # Landing: /
│   │   ├── posts/
│   │   │   ├── index.tsx               # /posts 文章列表（SSR）
│   │   │   └── $slug.tsx               # /posts/:slug 文章详情（SSR + preview + 权限判断）
│   │   ├── account/
│   │   │   └── index.tsx               # /account 会员状态页（建议有，便于排查/展示）
│   │   └── api/                        # ← 服务端 API 路由（全栈关键）
│   │       ├── me/
│   │       │   └── index.ts            # GET  /api/me
│   │       ├── login/
│   │       │   └── index.ts            # POST /api/login
│   │       ├── checkout/
│   │       │   └── index.ts            # POST /api/checkout
│   │       └── stripe-webhook/
│   │           └── index.ts            # POST /api/stripe-webhook (raw body + signature)
│   │
│   ├── components/                     # 纯 UI 组件（可复用）
│   │   ├── ui/                         # shadcn/ui（可选）
│   │   ├── layout/                     # Header/Footer 等
│   │   └── feature-specific/           # SubscribeButton、ArticlePreview 等
│   │
│   ├── lib/                            # 工具函数、常量、格式化等（尽量无副作用）
│   │   ├── auth.ts                     # cookie/session helper（签名/解析等纯逻辑）
│   │   ├── env.ts                      # 环境变量读取与校验
│   │   ├── format.ts                   # 时间/文本格式化
│   │   └── posts.ts                    # 读取 posts/、frontmatter 解析、索引构建
│   │
│   ├── server/                         # 服务端专用逻辑（有副作用：D1、Stripe）
│   │   ├── stripe.ts                   # Stripe client + helpers
│   │   └── db/
│   │       ├── client.ts               # D1 binding 封装
│   │       ├── schema.sql              # D1 schema / migrations
│   │       └── queries.ts              # SQL 查询封装（getUser/upsertMembership等）
│   │
│   ├── hooks/                          # 自定义 hooks（可选）
│   │   └── useMe.ts
│   │
│   └── types/                          # 共享类型（可选）
│       └── index.ts
│
├── public/                             # 静态资源
├── posts/                              # MDX 内容（推荐放仓库根，便于读取与部署）
│   ├── hello-world.mdx
│   └── member-only.mdx
├── .env
├── wrangler.toml
├── vite.config.ts
├── package.json
├── tsconfig.json
└── routeTree.gen.ts                    # 自动生成，不要手动改
```

---

# 五、任务拆分（已调整顺序）

## 阶段 0：Landing Page（第一优先级）

### Task 0.1

* 初始化 TanStack Start
* 配置 wrangler.toml
* 成功部署到 Workers

### Task 0.2

* 实现 Landing 页面
* 实现 Hero + CTA
* 展示精选 public 文章
* 添加基础 SEO

完成即可上线 v0.1。

---

## 阶段 1：内容系统

### Task 1

* 集成 MDX
* 实现文章列表页
* 实现文章详情页
* 实现 preview 逻辑

上线 v0.2（可阅读 public 内容）。

---

## 阶段 2：数据库与登录

### Task 2

* 创建 D1
* 执行 schema
* 绑定 D1
* 实现 `/api/login`
* 实现 `/api/me`

上线 v0.3（可登录）。

---

## 阶段 3：Stripe 集成

### Task 3

* 创建 Stripe Product + Monthly 价格
* 实现 `/api/checkout`
* 实现 `/api/stripe-webhook`
* 使用 `event.waitUntil()`
* 测试完整订阅流程

上线 v1.0（完整闭环）。

---

# 六、上线 Checklist

* Stripe Webhook 验证通过
* D1 表创建完成
* Worker secrets 设置完成
* Cookie 安全配置正确
* public 页面 SSR 正常
* 支付成功后自动解锁
* 测试多浏览器登录与订阅

---

# 七、后续扩展方向（V2）

* 年费 / 终身 Plan
* 链上 USDC 直收
* 钱包绑定
* 自动续费邮件提醒
* X / YouTube 内容聚合
* SEO 深度优化
* 评论系统

---

# 八、MVP 成功标准

上线后满足：

* 能发布 MDX 文章
* 能通过 Stripe 收钱
* 支付成功自动开通会员
* 会员文章对非会员锁定
* Worker 在 Edge 稳定运行

---

# 战略说明

第一版不追求复杂架构。
你是内容创作者。

核心资产是：

> 内容 × 转化率 × 留存

技术只需要稳定可靠。