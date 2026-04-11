# Personal Sovereign Publishing System

一个基于 TanStack Start 的个人内容网站 MVP，目标是跑通最小变现闭环：

`内容发布 → 用户订阅 → 支付 → 自动开通会员 → 解锁会员文章`

这个项目服务于独立内容创作者，重点不是功能堆叠，而是把内容、转化和会员体验连接成一个清晰、可维护的系统。

## Tech Stack

- TanStack Start
- React
- Tailwind CSS
- Cloudflare Workers + D1
- Stripe

## Focus

- 内容发布与展示
- 会员文章预览与解锁
- 订阅支付闭环
- 简洁、可维护的全栈架构

## Local Development

```bash
pnpm install
pnpm dev
```

默认本地地址：`http://localhost:3000`

## Build

```bash
pnpm build
```

可选命令：

```bash
pnpm test
pnpm preview
pnpm deploy
```

## Docs

- `AGENTS.md`：agent 导航与执行约束
- `ROADMAP.md`：当前阶段与下一步优先级
- `ARCHITECTURE.md`：系统架构与权限边界
- `docs/product-specs/overall-requirements.md`：权威需求说明
