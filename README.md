# Personal Sovereign Publishing System

一个基于 TanStack Start 的个人内容网站 MVP，当前目标是先建立免费 newsletter 的内容飞轮与最初受众，再进入商业化深化阶段。

当前阶段主线：

`内容发布 → Newsletter 订阅 → 网站归档 → 渠道分发 → 早期线索收集`

后续阶段候选闭环：

`内容发布 → 用户订阅 → 支付 → 自动开通会员 → 解锁会员文章`

这个项目服务于独立内容创作者，重点不是功能堆叠，而是把内容、分发、信任和后续转化连接成一个清晰、可维护的系统。

## Tech Stack

- TanStack Start
- React
- Tailwind CSS
- Cloudflare Workers + D1
- Stripe

## Focus

- 内容发布与 newsletter 归档
- 订阅承接与早期受众积累
- 轻量咨询线索收集
- 简洁、可维护的全栈架构

## Current Phase

- 免费 newsletter 是当前主产品
- 网站承担归档、品牌表达与 SEO 中枢角色
- X 与 YouTube 是外部分发渠道
- 会员、付费 newsletter 与 Stripe 支付闭环延后到达到阶段里程碑后再规划

当前推荐里程碑：
- newsletter 订阅达到 300
- 连续 8-12 周稳定发布
- 至少获得 3 条真实线索或高质量回复/私信
- 至少产出 2 个可公开展示的能力证明作品

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
