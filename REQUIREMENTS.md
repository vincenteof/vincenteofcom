# Personal Sovereign Publishing System – MVP v1

## 项目目标

构建一个可持续变现的个人内容网站，形成最小闭环：

> 内容发布 → 用户订阅 → 支付 → 自动开通会员 → 解锁文章

本版本为 MVP（最小可行版本），优先保证可上线与可变现。

---

# 一、需求定义

## 1. 功能需求

### 1.1 Landing Page

* 个人定位
* 价值主张
* CTA（订阅 / 加入会员）
* 精选文章展示

---

### 1.2 内容系统

* 文章存储于仓库（MDX）
* 支持 frontmatter 字段：

  * `title`
  * `date`
  * `tags`
  * `visibility: public | member`
* 文章列表页
* 文章详情页
* 会员文章支持预览模式

---

### 1.3 会员系统

* 邮箱登录（Magic Link 简化实现）
* Stripe 订阅支付
* 自动开通会员
* 会员状态查询
* 会员到期自动失效

---

### 1.4 支付系统

* Stripe Checkout
* Stripe Subscription
* Webhook 自动处理
* MVP 仅支持一个基础订阅 Plan（例如 Monthly）

---

## 2. 非功能需求

* 部署于 Cloudflare
* Edge 运行（Cloudflare Worker）
* 使用 D1 数据库
* 结构具备扩展能力
* 保持代码简洁

---

# 二、系统架构设计

## 2.1 整体架构

```
User
  ↓
Cloudflare Pages (TanStack App)
  ↓
Cloudflare Worker (API Layer)
  ↓
D1 Database
  ↓
Stripe (Payment + Webhook)
```

---

## 2.2 前端层

技术栈：

* TanStack Router
* TanStack Query
* MDX
* Cloudflare Pages

职责：

* 页面渲染
* API 调用
* 展示会员状态
* 文章预览逻辑控制

---

## 2.3 API 层（Cloudflare Worker）

负责：

* 登录接口
* 创建 Stripe Checkout
* 处理 Stripe Webhook
* 查询会员状态
* 返回用户信息

敏感逻辑全部放在 Worker 层。

---

## 2.4 数据库设计（Cloudflare D1）

### users 表

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  created_at TEXT
);
```

---

### memberships 表

```sql
CREATE TABLE memberships (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT,
  expires_at TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
```

---

## 2.5 Stripe 交互逻辑

### 创建 Checkout

流程：

1. 前端点击「加入会员」
2. 调用 `/api/checkout`
3. Worker 创建 Stripe Checkout Session
4. 返回 redirect URL
5. 用户跳转支付

---

### Webhook 处理事件

监听事件：

* `checkout.session.completed`
* `invoice.paid`
* `customer.subscription.deleted`

Webhook 处理逻辑：

* 更新 `membership.status`
* 更新 `expires_at`

---

# 三、核心流程设计

## 3.1 登录流程（简化版）

第一阶段使用最简单实现：

1. 用户输入邮箱
2. Worker 创建 user（如不存在）
3. 返回 signed cookie
4. 后续通过 cookie 校验身份

不引入第三方 Auth 服务。

---

## 3.2 支付流程

1. 用户点击订阅
2. Worker 创建 Stripe Session
3. 用户支付
4. Stripe Webhook 通知
5. Worker 写入 membership 状态
6. 用户刷新页面即可解锁

---

## 3.3 文章访问控制

MDX 示例：

```yaml
visibility: member
```

页面逻辑：

* 前端请求 `/api/me`
* 判断是否为 active 会员
* 非会员 → 显示 preview
* 会员 → 显示全文

会员判断必须通过服务端接口完成。

---

# 四、目录结构建议

```
apps/
  web/
    src/
      routes/
      components/
      posts/ (mdx)
  worker/
    index.ts
    stripe.ts
    db.ts
```

---

# 五、任务拆分

## 阶段 1：内容站基础

### Task 1

* 初始化 TanStack 项目
* 部署到 Cloudflare Pages

### Task 2

* 集成 MDX
* 实现文章列表
* 实现文章详情页

### Task 3

* 实现 frontmatter visibility
* 添加 preview block

---

## 阶段 2：数据库与 API

### Task 4

* 创建 D1 数据库
* 创建 users 表
* 创建 memberships 表

### Task 5

* 搭建 Cloudflare Worker
* 实现：

  * `/api/me`
  * `/api/login`

---

## 阶段 3：Stripe 集成

### Task 6

* 创建 Stripe 产品与价格
* 实现 `/api/checkout`
* 实现 Stripe Webhook
* 本地测试 webhook

---

## 阶段 4：会员解锁

### Task 7

* 前端接入 `/api/me`
* 实现文章权限控制
* 测试订阅 → 解锁流程

---

## 阶段 5：Landing 打磨

### Task 8

* 设计 landing
* CTA 接 checkout
* 添加精选文章

---

# 六、上线 Checklist

* Stripe Webhook 验证通过
* D1 migration 已执行
* Worker 绑定 secret
* 环境变量设置完成
* 文章访问正常
* 会员文章锁定正常
* 支付后自动解锁正常

---

# 七、后续扩展方向（V2）

* 链上 USDC 直收
* 钱包绑定
* 年费 / 终身
* 自动续费提醒
* X / YouTube 聚合
* 标签系统
* 搜索
* SEO 优化
* 邮件通知系统

---

# 八、MVP 成功标准

上线后满足：

* 能发布文章
* 能收钱
* 能自动开通会员
* 能锁会员文章
* 系统稳定运行

---

# 战略说明

第一版不追求复杂架构。

你是内容创作者。
核心资产是：

> 内容 × 转化率 × 留存

技术只需要稳定可靠。
