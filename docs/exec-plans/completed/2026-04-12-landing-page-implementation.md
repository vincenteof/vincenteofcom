# Exec Plan - Landing Page 全新实现

**日期**：2026-04-12  
**状态**：已完成  
**范围**：基于 landing-requirements.md v2.1，完全重写 Landing Page

## 设计方向

**品牌词**: calm, resolute, curious  
**美学**: 暗色编辑式，沉思感，中文优先阅读体验，Deep Teal 点缀  
**差异化**: 不像 landing page，像一封安静的哲学宣言——深色中浮现一行有力的中文标题

### 字体选择
- **中文标题**: Noto Serif SC（思源宋体）— 最佳免费中文衬线体，书卷气
- **英文展示**: EB Garamond — 人文主义衬线，历史感，与宋体气质互补
- **中文正文**: Noto Sans SC（思源黑体）— 清晰现代，屏幕阅读优秀
- **拒绝字体**: Inter, Playfair Display, DM Sans, Space Grotesk 等 reflex fonts

### 色彩系统 (OKLCH)
- --bg: oklch(0.13 0.005 186) — 深暗底色，微妙 teal 调
- --text: oklch(0.94 0.01 75) — 温暖离白
- --accent: oklch(0.52 0.09 186) — Deep Teal
- 全部中性色向 teal 色相倾斜（hue 186）

### 页面结构
1. Header（固定顶部，半透明）
2. Hero（100dvh，居中哲学宣言）
3. Letters（文章列表，编辑式排版）
4. About Me（个人叙事）
5. Footer（极简）

## 涉及文件
- 重写: `src/styles.css`
- 重写: `src/routes/index.tsx`
- 重写: `src/components/Header.tsx`
- 修改: `src/routes/__root.tsx`（meta 更新）
- 保持: `src/lib/ui.ts`（posts 页面依赖，CSS 变量自动继承新色彩）

## 设计决策
- 使用 OKLCH 颜色空间（感知均匀，现代浏览器全面支持）
- Hero 居中排版（参考 Dan Koe），Letters/About 左对齐（创造节奏变化）
- 按钮 2px 圆角（编辑式锐利感，避免 AI 圆角模板）
- 入场动画：staggered reveal，使用 ease-out 缓动
- CTA 指向 Substack（placeholder URL，后续替换）
- 遵守 prefers-reduced-motion
