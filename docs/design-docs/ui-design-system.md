# **UI Design System – 构建选择权个人网站**

**版本**：v1.0  
**核心理念**：构建选择权（Investing. Self-Training. Sovereignty.）  
**整体风格**：深沉、冷静、人文、高级，像一本数字哲学书  
**主要语言**：中文（中英混排）

## 1. 配色系统（Color Palette）

**基础颜色**
- **Background Primary**：#0F0F0F（主背景，最深黑灰）
- **Background Secondary**：#1A1A1A（卡片、区块背景）
- **Text Primary**：#F0EDE8（主要文字，柔和暖白）
- **Text Secondary**：#A8A8A8（次要文字、描述）
- **Text Muted**：#6B6B6B（最弱文字、日期等）

**强调色（Accent）**
- **Deep Teal Primary**：#0A7C7E（主强调色，用于按钮、链接、图标）
- **Deep Teal Hover**：#2A9D9F（鼠标悬停亮化）
- **Deep Teal Light**：#4ECDC4（极少使用，用于极弱强调或图标）

**其他功能色**
- **Success**：#4ECDC4（浅 teal，用于成功状态）
- **Border**：#2A2A2A（卡片边框、分割线）

## 2. 字体系统（Typography）

**标题字体（Heading）**
- 中文：**Noto Serif SC / Noto Serif TC**（思源宋体）
- 英文：**Playfair Display**（优雅 serif）
- 字重推荐：
  - H1（主标题）：Regular / Medium，字号 52–72px（移动端 38–48px）
  - H2（区块标题）：Medium，字号 36–44px

**正文字体（Body）**
- 中文：**Noto Sans SC / Noto Sans TC**（思源黑体）
- 英文 / 数字：**Inter**
- 字重推荐：
  - 正文：Regular，字号 18–20px，行高 1.75–1.85
  - 小字 / 描述：Regular，字号 15–16px，行高 1.7
  - 按钮文字：Medium，字号 16–17px

**排版原则**
- 大标题：中英混排时，中文用思源宋体，英文用 Playfair Display
- 正文：统一使用思源黑体 + Inter，确保中英协调
- 所有文字在深色背景上保持充足对比度

## 3. 组件系统（Components）

**按钮（Buttons）**
- **Primary Button**（主按钮）：
  - 背景：#0A7C7E
  - 文字：#F0EDE8
  - 圆角：12px
  - 高度：52px（桌面） / 48px（移动）
  - Hover：背景变为 #2A9D9F + 轻微放大
- **Secondary Button**（次按钮）：
  - 背景：透明
  - 边框：1px solid #0A7C7E
  - 文字：#0A7C7E
  - Hover：背景变为 #0A7C7E，文字变白

**卡片（Cards）**
- 背景：#1A1A1A
- 边框：1px solid #2A2A2A 或无边框 + 柔和阴影
- 圆角：16px
- 内边距：24–32px
- Hover 效果：轻微上浮 + 阴影加深

**Header（导航栏）**
- 高度：80px
- 背景：#0F0F0F + 轻微模糊（backdrop-blur）
- Logo 左侧，菜单居中或右侧
- 右侧 Subscribe 按钮固定为 Primary Button

**Hero 区**
- 高度：90–100vh
- 垂直居中对齐
- 最大文字宽度：720px
- 按钮间距：20px

**Letters 文章卡片**
- 3 列布局（桌面），移动端 1 列
- 每张卡片包含：标题、摘要（2 行）、日期、阅读按钮

## 4. 间距与布局原则（Spacing）
- **基础间距单位**：8px（推荐使用 8 的倍数：8、16、24、32、48、64、80px）
- **区块垂直间距**：80–120px（Hero 到 Letters 可使用 100px）
- **内容最大宽度**：1080px（居中）
- **大留白**：Hero 区上下留白至少 120px

## 5. 图标与装饰
- 图标风格：线条简洁、重量中等，颜色使用 Deep Teal #0A7C7E
- 装饰元素：极少使用，可在 Hero 区或分割线处使用极淡的几何线条或柔和渐变

## 6. 响应式断点（Responsive）
- Mobile： ≤ 768px
- Tablet： 769–1024px
- Desktop： ≥ 1025px