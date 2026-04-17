# Exec Plan - Service Intake Requirements (Pre-Dev)

**日期**：2026-04-13  
**状态**：Completed（需求已确认，后续实施见 2026-04-16-service-intake-tally-embed.md）  
**负责人**：AI Agent + Human review

## 任务背景
当前 Landing 已有三类 Offerings，其中 Software Consulting 与 Global Investing Advisory 的 CTA 仍停留在页内跳转，缺少明确线索收集路径。

用户已确认方向：
- 先整理需求并更新文档
- 待确认后再进入开发

## 任务目标
在不引入复杂注册流程的前提下，定义一个可落地的「服务咨询线索收集」MVP 方案，支持后续低风险迭代。

## 约束与原则
- 语气遵循 core-beliefs：诚实、克制、人文，不做压迫式营销。
- 技术复杂度服务于转化闭环，不先做重流程注册。
- 先验证线索质量，再决定是否拆分为双落地页或复杂 funnel。

## 执行范围
1. 新增需求文档：`docs/product-specs/service-intake-requirements.md`
2. 更新总需求文档：`docs/product-specs/overall-requirements.md`
3. 更新路线图优先级：`ROADMAP.md`
4. 记录产品决策：`docs/design-docs/decision-log.md`

## 需求草案摘要（供确认）
### 方案选择
- 当前阶段采用 **1 个统一咨询入口（Service Intake Form）**
- 不立即拆成 2 个独立服务落地页
- 不立即进入注册流程
- 入口形态确定为 **站内自建表单页**（不依赖第三方付费服务）

### MVP 收集字段（5 项）
1. 你是谁（姓名/称呼）
2. 需求类型（软件开发 / 出海投资 / 暂不确定）
3. 当前阶段与目标（简述）
4. 预算区间（枚举）
5. 联系方式（邮箱必填，可选微信/Telegram）

### 成功标准（MVP）
- 访客 2 分钟内可完成提交
- 每条线索能支持一次有效筛选（是否匹配、是否跟进）
- 提交后用户明确知道下一步与预计响应时间

## 待你确认的问题
1. 预算区间枚举是否保留（会提高筛选效率，但可能降低提交率）？
2. 响应承诺是否写明（例如 48 小时内回复）？

## 下一步（确认后）
1. 输出开发实施方案（前端入口 + 表单页/外链 + 提交成功态）
2. 更新 Landing CTA 跳转与文案
3. 按 MVP 先上线，2-4 周后复盘线索质量
