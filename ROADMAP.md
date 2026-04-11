# 项目路线图 (Roadmap)

**最后更新**：2026-04-10  
**当前版本**：MVP v1（Personal Sovereign Publishing System）

## 项目愿景
构建一个可持续变现的个人内容网站，形成最小闭环：  
**内容发布 → 用户订阅 → 支付 → 自动开通会员 → 解锁文章**

核心资产：**内容 × 转化率 × 留存**  
技术目标：采用 TanStack Start 全栈框架，统一部署到 Cloudflare Workers（Edge 运行），简化架构、消除跨域、充分利用 SSR / Server Functions，让个人项目快速上线和维护。

## 当前阶段
**阶段 0 已完成**：Landing Page + 内容系统基础  
已实现：TanStack Start 初始化、Landing Page、真实 MDX 文章渲染（列表页 + 详情页）、frontmatter 解析、preview 逻辑（stub 会员状态）、基础 SEO 与样式。

**当前主要目标**：完成会员与支付闭环，达成可变现 MVP v1.0。

## 优先级功能列表

### 已完成 (Done)
- 项目初始化 + Cloudflare Workers 部署验证
- Landing Page（Hero、CTA、精选 public 文章）
- 内容系统：MDX 文件存储、解析、列表页、详情页 + 预览模式
- 可见性控制（public / member）
- 基础样式、SEO meta、文章 formatter

### 下一步（Next - 高优先级）
1. **接入真实会员状态查询**  
   - 实现 `/api/me` + D1 查询，替换 `src/lib/membership.ts` stub  
   - 在 loader / Server Functions 中正确判断会员状态

2. **强化 Member 内容权限控制**  
   - Member 正文改为 server-only（避免泄露到客户端 bundle）  
   - 未授权用户仅返回 preview + CTA

3. **Stripe 支付闭环**  
   - 实现 `/api/checkout`（创建 Subscription Session）  
   - 实现 `/api/stripe-webhook`（处理关键事件，使用 `event.waitUntil()` + 幂等）  
   - 支付成功后自动更新 membership 并解锁文章

4. **登录流程完善**  
   - Magic Link + HttpOnly Cookie（`/api/login`）

### 中短期计划（v1.0 后）
- 添加 `/account` 页面展示会员状态
- 完成上线 Checklist
- 测试多浏览器 + 完整订阅流程

### 未来扩展（V2+）
- 年费 / 终身 Plan
- 链上支付（USDC）
- 自动续费提醒、评论系统、内容聚合等

## 非功能要求提醒
- 部署于 Cloudflare Workers + D1
- 所有时间字段使用 INTEGER（Unix timestamp 秒）
- Cookie 必须 HttpOnly + Secure + SameSite=Lax
- 严格 server/client 边界，保持代码简洁

## 详细迭代记录
请查看：`docs/exec-plans/completed/`

**Agent 指令**：  
任何新任务开始前，必须先阅读本文件、ARCHITECTURE.md 和 `docs/product-specs/overall-requirements.md`。规划时严格参考当前 Next 优先级；若任务与该优先级不冲突，则先输出 Plan 再执行；如有冲突，请先输出 Plan 并等待人类确认。
