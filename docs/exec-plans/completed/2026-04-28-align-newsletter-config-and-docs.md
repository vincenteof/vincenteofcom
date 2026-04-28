# 对齐 Newsletter 配置与文档 - 2026-04-28

## 任务
反映已明确的产品方向，并修复重复的 newsletter URL 配置。

## 用户决策
- 短期内不建设站内付费会员/支付流程。
- 短期内以免费内容、粉丝量和影响力增长为主要优先级。
- 未来商业化可以依赖外部平台。
- 暂时不把代码重组到 `features/`。
- 修复重复的 newsletter URL。
- 更新过度强调站内支付/会员解锁流程的文档表述。

## 范围
- 为 newsletter URL 增加共享配置常量。
- 替换 Header 和 Landing 中硬编码的 Substack URL。
- 更新 `core-beliefs.md`，并按需更新 `ROADMAP.md` / `overall-requirements.md`，反映已明确的短期方向。
- 保持产品代码改动最小。

## 验证
- 运行 `pnpm exec tsc --noEmit`。
- 运行 `pnpm build`。

## 完成内容
- 新增 `src/lib/site-config.ts`，作为 `siteUrl` 和 `newsletterUrl` 的单一来源。
- 更新 Landing 和 Header，改为使用共享 newsletter 配置。
- 更新 `AGENTS.md`、`ROADMAP.md`、`docs/product-specs/overall-requirements.md` 和 `docs/design-docs/core-beliefs.md`，反映已明确的短期策略：
  - 免费内容增长优先；
  - 短期内不建设站内付费流程；
  - 先用外部平台验证商业化，再考虑站内会员/支付。
- 为 2026-04-28 的产品方向新增 decision log 记录。

## 验证结果
- `pnpm exec tsc --noEmit` 通过。
- `pnpm build` 退出码为 0。Wrangler 在尝试写入 `~/Library/Preferences/.wrangler/logs` 时仍然输出沙盒 `EPERM` 警告，但构建产物已生成。
