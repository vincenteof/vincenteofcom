# Personal Sovereign Publishing System

基于 TanStack Start 的个人内容网站，部署于 Cloudflare Workers。

品牌主轴：**Investing · Self-Training · Sovereignty**

## Tech Stack

- TanStack Start + React + Tailwind CSS
- Cloudflare Workers
- MDX 文章系统
- Tally（咨询表单）

## 当前阶段

Newsletter 增长与早期受众积累。网站承担归档、品牌表达、SEO 与线索收集角色。

进入下一阶段的里程碑：
- Newsletter 订阅数达到 300
- 连续 8–12 周稳定发布
- 至少 3 条真实线索或高质量回复
- 至少 2 个可公开展示的能力证明作品

## 已上线功能

- Landing Page（Hero → Letters → About → Footer）
- 文章归档与详情页（`/posts`）
- 咨询线索收集（`/consult`，Tally 嵌入）
- Substack newsletter 订阅 CTA
- SSR + SEO 优化

## Local Development

```bash
pnpm install
pnpm dev
```

## Build & Deploy

```bash
pnpm build
pnpm deploy
```

## Docs

- `ROADMAP.md` — 阶段目标与优先级
- `ARCHITECTURE.md` — 系统架构
- `docs/product-specs/overall-requirements.md` — 需求说明
- `docs/design-docs/decision-log.md` — 决策记录
