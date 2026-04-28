# AGENTS.md - Navigation Map for Coding Agents

**项目名称**：Personal Sovereign Publishing System (MVP v1)  
**技术栈**：TanStack Start 全栈框架，部署于 Cloudflare Workers；D1 + Stripe 为长期候选能力  
**当前核心闭环**：内容发布 → 免费 Newsletter 订阅 → 网站归档 → 渠道分发 → 早期线索收集  
**长期商业化候选**：优先评估外部平台承接付费内容或服务转化；仅在必要时再建设站内会员与支付系统。

## 必须遵守的读取顺序（每次任务开始时优先阅读）
1. 本文件（AGENTS.md）
2. ROADMAP.md（当前优先级和阶段目标）
3. ARCHITECTURE.md（整体架构、数据库、server/client 边界、Stripe 逻辑）
4. docs/product-specs/overall-requirements.md（整体功能需求、非功能需求、任务拆分）

## 项目核心原则
- 保持简洁、可读、易维护。个人内容创作者项目，技术只为内容 × 转化率 × 留存 服务。
- 严格 server/client 边界：敏感操作（D1、Stripe、会员判断）仅在 server 执行。
- Member-only 文章正文必须 server-only，未授权用户仅返回 preview（前 300-500 字 + CTA）。
- 时间字段统一使用 INTEGER（Unix timestamp 秒）。
- Cookie 必须 HttpOnly + Secure + SameSite=Lax。
- 所有变更后必须通过 `pnpm build` 和 TypeScript 检查。
- 优先使用 TanStack Query + loader 进行 SSR 友好数据获取。

## 代码组织原则
- 业务特性优先使用 `features/` 垂直切片（components、hooks、api、types）。
- routes/ 只负责页面组装和路由声明。
- 通用工具放在 `features/shared/utils/` 或 `lib/`。
- 新功能优先在对应 features/ 下组织（posts、membership、landing 等）。

## UI 与设计系统
- UI 风格必须遵循轻微人文感、克制、诚实的视觉语言（参考 core-beliefs.md）。
- Landing Page 相关修改必须在 `features/landing/` 下进行，文案优先修改 constants.ts。
- 组件优先复用 `features/shared/ui/` 或 shadcn/ui（如果已集成）。

## 任务执行流程（必须严格遵守）
1. **开始任务前**：
   - 先阅读 ROADMAP.md 中的当前 Next 优先级和 core-beliefs.md。
   - 在 `docs/exec-plans/active/` 目录下创建一个新的 Markdown 文件（建议以任务名称或日期命名，例如 `2026-04-11-implement-membership-query.md`），记录任务 Plan。

2. **执行阶段**：
   - 输出详细 Plan（包含具体步骤、涉及文件、预期变更）。
   - 进行代码修改。
   - 严格遵守 server/client 边界和核心信念。

3. **任务完成后**：
   - 将 `docs/exec-plans/active/` 中的对应文件移动到 `docs/exec-plans/completed/` 目录。
   - 更新 ROADMAP.md 中的进度状态（已完成 / 下一步）。
   - 如果有新决策，追加到 `docs/design-docs/decision-log.md`。
   - 更新任何受影响的文档（core-beliefs.md、ARCHITECTURE.md 等）。
   - 运行 `pnpm build` 和 TypeScript 检查，确保一切通过。

4. **Verify**：
   - 检查权限逻辑、SSR 输出、会员预览是否正确。
   - 确认 UI 风格与设计系统一致。
   - 如发现重复问题，提出永久修复建议并写入对应文档。

## 知识库位置（Docs 目录地图）
- **ROADMAP.md** → 当前阶段、优先级列表、下一步任务
- **ARCHITECTURE.md** → 架构、数据库、权限控制
- **docs/product-specs/** → 功能规格（overall-requirements.md 是总需求，其余文件是独立功能的详细说明）
- **docs/design-docs/core-beliefs.md** → 项目核心信念、设计哲学、语气风格
- **docs/design-docs/decision-log.md** → 重要决策历史记录
- **docs/exec-plans/ui-design-system.md** → UI 设计系统、视觉规范、组件风格
- **docs/exec-plans/active/** → 当前正在进行的任务计划
- **docs/exec-plans/completed/** → 历史迭代详细记录

## TanStack Start 专属指引
- 保留 `src/routes/` 文件路由原生结构（createFileRoute）。
- Server Functions / API 路由放在 `src/routes/api/` 下。
- MDX 文章处理统一通过 features/posts/。

**Agent 指令**：  
本文件是导航地图，不是完整规则。请严格按照「任务执行流程」操作 exec-plans 文件夹。  
如果任务与 core-beliefs.md、ROADMAP.md 或历史决策冲突，请在 Plan 中明确指出并等待确认。  
发现新模式或需要永久修复的问题时，主动建议更新对应 docs/ 文件。

---

**最后更新**：2026-04-28
