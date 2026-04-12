# Decision Log - 项目决策日志

**最后更新**：2026-04-12

本文档记录项目中重要的技术、产品和设计决策，包括背景、决定、理由及后续影响。  
新决策请按时间倒序追加在顶部。

## 2026-04-12
**决策主题**：长期品牌定位确认  
**决定**：将 `Investing · Self-Training · Sovereignty` 升级为整个项目的长期品牌定位，而非仅用于 Landing Page 的局部表达  
**理由**：用户已明确确认新的品牌方向；继续保留“仅限 Landing 文案层”的解释会让核心信念、需求文档、设计系统和后续实现失去统一标准  
**影响**：`core-beliefs.md`、`ROADMAP.md`、`overall-requirements.md`、`ui-design-system.md` 与后续 Landing 实现都需要以该主轴为准，并将旧约束改写为“避免导师化/权威化表达”而不是回避这三个主题本身  
**相关文件**：`docs/design-docs/core-beliefs.md`、`ROADMAP.md`、`docs/product-specs/overall-requirements.md`、`docs/design-docs/ui-design-system.md`

## 2026-04-12
**决策主题**：Landing Page 需求重启方式  
**决定**：以 `docs/product-specs/landing-requirements.md` 当前版本作为新的 Landing 输入源，先完成文档对齐与定位确认，再进入设计和代码实现  
**理由**：Landing 的定位、文案目标、视觉方向和转化目标已发生明显变化；若继续沿用旧文档和旧首页实现，会导致品牌叙事与执行脱节  
**影响**：需要重新检查并同步 `ROADMAP.md`、`docs/design-docs/core-beliefs.md`、`docs/product-specs/overall-requirements.md`、`docs/design-docs/ui-design-system.md`，并在文档统一后再重做首页实现  
**相关文件**：`docs/product-specs/landing-requirements.md`、`ROADMAP.md`、`docs/design-docs/core-beliefs.md`、`docs/product-specs/overall-requirements.md`


## 2026-03-14
**决策主题**：会员文章正文处理方式  
**决定**：采用 server-only + preview 机制（非会员仅返回前 300-500 字 + CTA）  
**理由**：防止 member-only 内容泄露到客户端 bundle，安全性和内容保护优先  
**影响**：需要修改 `routes/posts/$slug.tsx` 的 loader 逻辑，membership 判断必须在 server 端完成  
**相关文件**：ARCHITECTURE.md、overall-requirements.md

## 2026-03-10
**决策主题**：项目技术栈与部署方案  
**决定**：使用 TanStack Start 全栈框架，统一部署到 Cloudflare Workers + D1  
**理由**：简化架构、消除 CORS、充分利用 Edge 运行时和 SSR，适合个人项目快速迭代和维护  
**影响**：所有代码必须遵守 server/client 严格边界，敏感操作（如 Stripe、D1）仅在 server 执行  
**相关文件**：ARCHITECTURE.md、overall-requirements.md

## 2026-03-05
**决策主题**：文章存储方式  
**决定**：使用 MDX 文件存放在 `posts/` 目录，通过 frontmatter 控制 visibility (public | member)  
**理由**：便于内容创作者直接在仓库中写作和版本管理，SSR 友好且 SEO 效果好  
**影响**：内容解析逻辑集中在 features/posts/ 或 lib/posts.ts  
**相关文件**：overall-requirements.md

---

**Agent 指令**：
- 在提出新方案或修改现有功能时，请先阅读本日志中相关决策。
- 如果新方案与历史决策冲突，请在 Plan 中说明冲突点和修改理由。
- 每次做出重要决策后，建议立即追加记录到本文件（包括日期、主题、决定、理由、影响）。
