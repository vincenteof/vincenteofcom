# Exec Plan - Restart Landing Requirements

**日期**：2026-04-12  
**状态**：已完成  
**范围**：文档对齐与需求重启，不进入代码实现  

## 背景
- 用户已全面更新 `docs/product-specs/landing-requirements.md`，希望基于新版本重新开始 Landing Page 需求。
- 当前任务目标不是编码，而是先建立一份新的执行计划、记录本轮决策，并识别还需要同步修改的文档。

## 已阅读文档
- `AGENTS.md`
- `ROADMAP.md`
- `ARCHITECTURE.md`
- `docs/product-specs/overall-requirements.md`
- `docs/design-docs/core-beliefs.md`
- `docs/product-specs/landing-requirements.md`
- `docs/design-docs/decision-log.md`

## 当前观察
- `landing-requirements.md` 已升级为更明确的 Landing PRD，核心叙事转向：
  - `Building Sovereignty / 构建选择权`
  - `Investing · Self-Training · Sovereignty`
  - 强化 `Substack Newsletter / Letters` 转化目标
  - 明确深色、Deep Teal、中文优先排版
- 现有文档与首页实现仍保留上一版表达，例如：
  - `core-beliefs.md` 强调“不是专业投资/认知网站”
  - `ROADMAP.md` 将 Landing 视为已完成阶段
  - `overall-requirements.md` 只保留了较抽象的 Landing 描述
  - `ui-design-system.md` 和 `src/routes/index.tsx` 仍基于旧版首页内容

## 冲突与风险
- 与 `ROADMAP.md` 的阶段描述存在偏差：
  - 路线图当前写的是“阶段 0 已完成：Landing Page + 内容系统基础”。
  - 但用户已明确要求基于新 PRD 重新开始 Landing 需求。
  - 本次先执行“文档重启与对齐”，暂不视为推翻项目主线优先级，也暂不进入实现。
- 与 `core-beliefs.md` 存在语义张力：
  - 旧信念强调“长期学习者/实践者”，避免“专业投资/认知网站”定位。
  - 新 PRD 明确引入 `Investing / Self-Training / Sovereignty` 作为首页主轴。
  - 该问题现已确认：`Investing / Self-Training / Sovereignty` 升级为整个项目的长期品牌定位，不再只是 Landing 文案层表达。

## 本轮执行计划
1. 创建新的 active exec plan，固定本轮任务边界与影响范围。
2. 在 `docs/design-docs/decision-log.md` 追加一条“Landing 需求重启”的决策记录。
3. 盘点所有受影响文档，区分：
   - 必须修改
   - 建议修改
   - 暂不修改
4. 与用户确认新的品牌定位是否覆盖 `core-beliefs` 中旧表述，再进入文档批量修订。
5. 文档对齐完成后，再单独进入 Landing 设计/实现阶段。

## 新确认决策
- 用户已明确确认：`Investing / Self-Training / Sovereignty` 升级为整个项目的长期品牌定位。
- 后续所有品牌、文案、信息架构与视觉系统，都应以这一主轴为准。
- 旧表述中凡是可能否定该主轴的描述，都需要改写为“避免导师化、避免权威包装”，而不是回避这三个主题本身。

## 本轮涉及文件
- 新建：`docs/exec-plans/active/2026-04-12-restart-landing-requirements.md`
- 更新：`docs/design-docs/decision-log.md`
- 待评估：`ROADMAP.md`
- 待评估：`docs/design-docs/core-beliefs.md`
- 待评估：`docs/product-specs/overall-requirements.md`
- 待评估：`docs/design-docs/ui-design-system.md`
- 待评估：`src/routes/index.tsx`

## 预期后续文档调整
### 必须修改
- `docs/design-docs/core-beliefs.md`
  - 需要把“长期学习者/实践者”的基调重新表述为该品牌定位下的语气约束，而不是品牌否定项。
- `docs/product-specs/overall-requirements.md`
  - 需要把 Landing 部分升级为与 `landing-requirements.md` 一致的目标、模块、CTA、视觉方向。
- `ROADMAP.md`
  - 需要标记 Landing 进入“重定义/重做”状态，避免与当前执行现实不一致。

### 建议修改
- `docs/design-docs/ui-design-system.md`
  - 现有 Hero 文案和视觉意图需要同步到新的 Landing PRD。
- `ARCHITECTURE.md`
  - 若 Landing 的订阅目标正式改为 `Substack`，需要确认这是否影响当前“站内会员支付闭环”的产品表述。
- `docs/exec-plans/completed/2026-03-progress.md`
  - 如需保留历史阶段记录，建议补充一句“此版本为旧 Landing 方向，后续已重启”。

### 暂不修改
- 业务代码与页面实现
- 会员、支付、权限相关技术方案

## 当前结论
- 本轮适合先做“品牌定位与文档系统对齐”，不宜直接进入 UI 或代码重构。
- 在文档没有统一前，直接实现新的 Landing 容易造成定位反复、文案漂移和路线图失真。

## 完成结果
- `core-beliefs.md`、`overall-requirements.md`、`ui-design-system.md` 已完成与新品牌定位的对齐。
- `decision-log.md` 已记录“长期品牌定位确认”与“Landing Page 需求重启方式”两项关键决策。
- `ROADMAP.md` 已不再将该事项视为进行中，后续优先级转入咨询入口与会员闭环。
