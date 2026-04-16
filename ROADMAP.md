# 项目路线图 (Roadmap)

**最后更新**：2026-04-16  
**当前版本**：MVP v1（Personal Sovereign Publishing System）

## 项目愿景
构建一个以 newsletter 为核心的个人内容网站，先建立稳定受众与信任，再进入商业化深化阶段。

当前阶段的实际主线是：  
**内容发布 → Newsletter 订阅 → 网站归档 → 渠道分发 → 早期线索收集**

在完成阶段里程碑后，再进入下一阶段的商业化规划：  
**内容发布 → 用户订阅 → 支付 → 自动开通会员 → 解锁文章**

核心资产：**内容 × 分发 × 信任**（阶段一）→ **内容 × 转化率 × 留存**（阶段二）  
长期品牌主轴：**Investing · Self-Training · Sovereignty**  
技术目标：采用 TanStack Start 全栈框架，统一部署到 Cloudflare Workers（Edge 运行），简化架构、消除跨域、充分利用 SSR / Server Functions，让个人项目快速上线和维护。

## 当前阶段

**阶段 0 已完成**：旧版 Landing Page + 内容系统基础  
已实现：TanStack Start 初始化、旧版 Landing Page、真实 MDX 文章渲染（列表页 + 详情页）、frontmatter 解析、preview 逻辑（stub 会员状态）、基础 SEO 与样式。

**当前补充状态**：Landing 品牌定位与核心文档已完成对齐，首页与 posts 视觉系统已切换到新的品牌表达。基于最新判断，项目当前进入 **Phase 1：免费 Newsletter 增长与早期受众积累阶段**。

**当前主要目标**：围绕 newsletter 建立最初的内容飞轮，积累第一批真实追随者，并为后续商业化打基础。

## 阶段一定位（当前）
- `Newsletter` 是当前主产品。
- 网站承担归档、品牌表达、SEO 与内容中枢角色。
- `X` 与 `YouTube` 是主要分发渠道。
- Software Consulting 与 Global Investing Advisory 暂以轻量表单收集线索，并通过公开作品/研究内容建立能力证明。
- 在达到阶段里程碑前，不开启付费 newsletter，不推进会员系统为当前主线。

## 阶段切换里程碑（进入下一阶段规划）
- Newsletter 订阅数达到 **300**。
- 连续 **8-12 周** 稳定发布。
- 至少获得 **3 条** 真实线索或高质量回复/私信。
- 至少产出 **2 个** 可公开展示的软件作品或研究型证明材料。
- `X` 与 `YouTube` 的增长作为辅助信号，不作为唯一判断标准。

## 优先级功能列表

### 已完成 (Done)
- 项目初始化 + Cloudflare Workers 部署验证
- 旧版 Landing Page（Hero、CTA、精选 public 文章）
- 内容系统：MDX 文件存储、解析、列表页、详情页 + 预览模式
- 可见性控制（public / member）
- 基础样式、SEO meta、文章 formatter
- **Landing Page 全新重做（2026-04-12）**
  - 基于 `landing-requirements.md` v2.1 完全重写首页
  - 新色彩系统（OKLCH，Deep Teal 主题色）
  - 新字体系统（Noto Serif SC + EB Garamond + Noto Sans SC）
  - 新页面结构：Hero → Letters → About → Footer
  - Substack 订阅 CTA 集成
  - 导航栏更新（Letters / 关于 / 订阅按钮）
- **Posts 页面视觉一致性修复（2026-04-13）**
   - 修复 member preview 失效 CTA
   - 统一 posts 按钮 / 返回链接 / focus-visible / active 状态
   - 统一文章正文链接的交互样式
   - 优化 `/posts` 列表 hover 节奏与会员 badge 细节
- **Landing 品牌文档全面对齐（2026-04-14）**
  - 对齐 `core-beliefs.md`、`overall-requirements.md` 与 `ui-design-system.md`
  - 确认 `Investing · Self-Training · Sovereignty` 为项目长期品牌主轴
  - 将 Landing 重启相关决策沉淀到 `decision-log.md`

- **阶段一战略重定义（2026-04-14）**
  - 确认当前主线为免费 newsletter 增长，而非会员闭环优先
  - 确认网站当前角色为归档、品牌与 SEO 中枢
  - 确认会员、付费 newsletter 与 Stripe 闭环延后到达到里程碑后再规划

### 下一步（Next - 高优先级）
1. **明确并执行 Newsletter 内容节奏**
   - 建立每周固定发布频率与主题支柱
   - 让网站首页与归档页明确服务于 newsletter 增长

2. **替换 Substack URL 为最终订阅地址**
   - 同步首页、Header 与 posts 中的订阅入口
   - 确保所有 CTA 最终都指向真实可用的 newsletter 订阅路径

3. **完成咨询线索收集方案确认并开发轻量入口** ✅ (Phase 1: Tally 嵌入)
   - ~~确认 `service-intake-requirements.md`（字段、入口形态、响应 SLA）~~
   - ~~将 Software/Advisory CTA 接入统一咨询入口~~
   - 已上线 `/consult` 页面（Tally iframe 嵌入），待创建 Tally 表单后替换 URL

4. **建立公开能力证明素材**
   - 规划并上线 1-2 个可展示的软件独立作品
   - 逐步形成 consulting 的公开证据链

5. **为阶段一增长建立基础衡量方式**
   - 记录 newsletter 订阅增长、内容发布连续性、回复/线索数量
   - 用这些信号判断何时进入下一阶段规划

6. **整理会员与支付闭环为阶段二预研项**
   - 保留架构方向，但不作为当前开发主线

### 中短期计划（v1.0 后）
- 在达到阶段里程碑后，决定是否开启付费 newsletter 或会员体系
- 视咨询线索质量决定是否拆分独立服务页或进一步产品化
- 完成上线 Checklist 与跨平台内容分发节奏优化

### 下一阶段候选（Phase 2）
- 接入真实会员状态查询
- 强化 Member 内容权限控制
- Stripe 支付闭环
- 登录流程完善（Magic Link + HttpOnly Cookie）
- 添加 `/account` 页面展示会员状态

### 未来扩展（V2+）
- 年费 / 终身 Plan
- 链上支付（USDC）
- 自动续费提醒、评论系统、内容聚合等

## 非功能要求提醒
- 部署于 Cloudflare Workers，D1 作为后续阶段可接入的数据层
- 所有时间字段使用 INTEGER（Unix timestamp 秒）
- Cookie 必须 HttpOnly + Secure + SameSite=Lax
- 严格 server/client 边界，保持代码简洁

## 详细迭代记录
请查看：`docs/exec-plans/completed/`

**Agent 指令**：  
任何新任务开始前，必须先阅读本文件、ARCHITECTURE.md 和 `docs/product-specs/overall-requirements.md`。规划时严格参考当前 Next 优先级；若任务与该优先级不冲突，则先输出 Plan 再执行；如有冲突，请先输出 Plan 并等待人类确认。
