# Decision Log - 项目决策日志

**最后更新**：2026-04-14

本文档记录项目中重要的技术、产品和设计决策，包括背景、决定、理由及后续影响。  
新决策请按时间倒序追加在顶部。

## 2026-04-14
**决策主题**：Phase 1 公共站点移除会员语言与路径  
**决定**：在当前 newsletter-first 阶段，`/posts` 仅展示公开文章；member 类型内容不再通过列表页、详情页预览或用户可见徽标对外暴露。  
**理由**：继续保留“会员文章”“会员归档”“预览开放通知”等用户可见语言，会让网站心智停留在尚未启动的会员产品上，削弱当前免费 newsletter 的单一主线。  
**影响**：`/posts` 页面改为纯公开归档；直接访问 member slug 时返回 404；现阶段公开站点不再出现会员提示与相关入口。  
**相关文件**：`src/routes/posts/index.tsx`、`src/routes/posts/$slug.tsx`

## 2026-04-14
**决策主题**：当前阶段从“会员闭环优先”调整为“Newsletter 增长优先”  
**决定**：将项目当前阶段明确为免费 newsletter 增长与受众积累阶段。网站当前承担归档、品牌表达、SEO 与轻量线索收集角色；会员、付费 newsletter 与 Stripe 支付闭环延后到达到阶段里程碑后再规划。  
**理由**：当前真实约束不是支付能力不足，而是受众规模与信任资产尚未建立。对早期个人品牌而言，优先验证稳定输出、订阅增长与高质量互动，比提前建设付费闭环更现实。  
**影响**：`ROADMAP.md`、`overall-requirements.md`、`ARCHITECTURE.md` 与 `README.md` 需要统一改写当前阶段目标；咨询入口继续保留，但只作为辅助承接；会员系统相关工作下沉为下一阶段候选。  
**相关文件**：`ROADMAP.md`、`ARCHITECTURE.md`、`README.md`、`docs/product-specs/overall-requirements.md`、`docs/product-specs/service-intake-requirements.md`

## 2026-04-13
**决策主题**：Posts 页面一致性修复策略  
**决定**：将 posts 页面中的导航型返回操作统一为更克制的文本链接；会员预览区在正式会员入口完成前，临时使用 `订阅长信` 作为有效 CTA，并统一 posts 交互状态与正文链接 token。  
**理由**：当前阶段的目标是修复视觉断层与失效路径，而不是提前扩展会员支付流。导航与主 CTA 分层更清楚后，页面气质也更接近新的 Landing。  
**影响**：`/posts` 与 `/posts/:slug` 的返回路径不再使用同级盒状按钮；member preview 中 `/#membership` 被真实可用入口替代；后续真实会员入口上线时需要替换该临时 CTA。  
**相关文件**：`src/lib/ui.ts`、`src/routes/posts/index.tsx`、`src/routes/posts/$slug.tsx`

## 2026-04-13
**决策主题**：新增 Posts 视觉一致性审计需求  
**决定**：在 Landing 重做后，将 `/posts` 与 `/posts/:slug` 的视觉与交互一致性检查升级为正式需求，并以独立规格文档管理。  
**理由**：品牌视觉系统已升级，若 posts 页面不做系统性审计，容易出现视觉断层、交互状态漂移与路径不连通问题。  
**影响**：ROADMAP Next 新增 posts 审计任务；overall requirements 增加对应条目；后续将按 P0-P3 分级修复。  
**相关文件**：`docs/product-specs/posts-visual-consistency-requirements.md`、`docs/product-specs/overall-requirements.md`、`ROADMAP.md`

## 2026-04-13
**决策主题**：咨询入口形态选择（站内自建）  
**决定**：Service Intake Form 采用站内自建，不依赖第三方表单服务。  
**理由**：需求复杂度低，站内实现成本可控；避免第三方潜在付费与平台约束，保持数据与体验一致性。  
**影响**：后续开发将新增站内咨询表单页与提交成功态；Offerings 中咨询 CTA 统一指向站内入口。  
**相关文件**：`docs/product-specs/service-intake-requirements.md`、`docs/exec-plans/active/2026-04-13-service-intake-requirements.md`

## 2026-04-13
**决策主题**：咨询转化路径采用统一表单（先文档确认，后开发）  
**决定**：Software Consulting 与 Global Investing Advisory 暂不拆成两个独立落地页，也不立即引入注册流程；先采用统一 `Service Intake Form` 收集结构化线索，并在确认需求后开发。  
**理由**：当前阶段优先验证线索质量与匹配效率。直接上注册流程摩擦高；立即拆双页会增加维护与文案成本。统一表单可在低复杂度下快速建立闭环。  
**影响**：新增规格文档 `service-intake-requirements.md`；ROADMAP Next 新增“咨询线索收集方案确认”；后续 Landing 的 Software/Advisory CTA 将指向统一咨询入口而非仅页内锚点。  
**相关文件**：`docs/product-specs/service-intake-requirements.md`、`docs/product-specs/overall-requirements.md`、`ROADMAP.md`

## 2026-04-12
**决策主题**：Landing Page 全新实现  
**决定**：基于 `landing-requirements.md` v2.1 完全重写 Landing Page，采用 OKLCH 色彩系统、新字体系统（Noto Serif SC + EB Garamond + Noto Sans SC）、新页面结构（Hero → Letters → About → Footer）  
**理由**：旧版首页与更新后的品牌定位（Investing · Self-Training · Sovereignty）不匹配，且视觉系统需要升级为中文优先的编辑式暗色主题  
**影响**：`src/styles.css` 全局色彩变量已从 hex 切换到 OKLCH 并改为 Deep Teal 色调，所有使用 `--accent` 的页面（包括 posts 页面）会自动继承新的强调色；Header 导航已更新；`#membership` 锚点已从首页移除（post 详情页中的会员 CTA 链接暂时指向不存在的锚点，需后续处理）  
**相关文件**：`src/styles.css`、`src/routes/index.tsx`、`src/components/Header.tsx`、`src/routes/__root.tsx`

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
