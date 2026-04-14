# Exec Plan - Remove Membership Language From Site

**日期**：2026-04-14  
**状态**：已完成  
**负责人**：AI Agent

## 任务背景
项目已明确进入 Phase 1：免费 newsletter 增长阶段，但站内仍残留早期会员模型的用户可见文案与路径，包括：
- `/posts` 列表中的会员数量与徽标
- 会员预览页提示与订阅引导
- 通过 slug 直接访问 member 内容时的页面暴露

这些内容会让当前产品心智继续停留在“会员网站”，与新的阶段目标冲突。

## 任务目标
- 从当前公开站点中移除所有面向用户的“会员”文案
- 不再向访客暴露 member-only 路径与预览页
- 保留内容模型中的未来扩展空间，但不让 Phase 1 站点继续展示旧战略残留

## 涉及文件
- `src/routes/posts/index.tsx`
- `src/routes/posts/$slug.tsx`
- `docs/design-docs/decision-log.md`

## 预期结果
- `/posts` 仅表现为公开写作归档
- member 类型内容不再通过公共页面暴露
- 站点语言与当前 newsletter-first 阶段一致