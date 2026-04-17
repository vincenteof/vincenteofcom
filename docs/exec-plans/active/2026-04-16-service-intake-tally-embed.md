# Exec Plan - Service Intake 使用 Tally 嵌入方案

**日期**：2026-04-16  
**状态**：In Progress  
**负责人**：AI Agent + Human review

## 任务背景
咨询线索收集需求已定义（`service-intake-requirements.md`），经讨论决定当前验证阶段不自建表单，改用 Tally 免费嵌入方案，快速上线验证线索质量。

## 决策变更
- **原决策**：站内自建表单页 + D1 存储
- **新决策**：Phase 1 使用 Tally 嵌入 iframe，验证有效后再评估是否自建
- **理由**：当前目标是验证线索质量，Tally 免费版无品牌水印、支持暗色主题与 iframe 嵌入，开发成本从 1-2 天压缩到 30 分钟以内

## 执行步骤

### 1. 更新需求文档
- 修改 `service-intake-requirements.md` 中入口形态为 Tally 嵌入
- 添加 Tally 配置说明

### 2. 新建 `/consult` 路由页
- 文件：`src/routes/consult.tsx`
- 页面结构：标题 + 简短说明 + Tally iframe 嵌入
- 视觉风格与 Landing 保持一致（暗色、Deep Teal 强调色）
- iframe 预留 Tally URL 占位符（待用户创建表单后替换）

### 3. 更新 Landing CTA 链接
- `src/routes/index.tsx` 中 OFFERINGS 的 Software Consulting 和 Global Investing Advisory 的 `href` 从 `#about` 改为 `/consult`

### 4. 更新文档
- `decision-log.md`：记录方案变更
- `ROADMAP.md`：更新咨询入口任务状态
- `service-intake-requirements.md`：反映 Tally 方案

### 5. Build & Verify
- `pnpm build` 通过
- TypeScript 检查通过

## 涉及文件
- `src/routes/consult.tsx`（新建）
- `src/routes/index.tsx`（修改 CTA href）
- `docs/product-specs/service-intake-requirements.md`（更新入口形态）
- `docs/design-docs/decision-log.md`（追加决策）
- `ROADMAP.md`（更新进度）
