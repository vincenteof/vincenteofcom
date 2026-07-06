import type { en } from './en'

export const zh: Record<keyof typeof en, (typeof en)[keyof typeof en]> = {
  meta: {
    title: 'Vincenteof — 技术与投资',
  },
  nav: {
    home: '首页',
    blog: '博客',
    about: '关于',
  },
  footer: {
    topics: '技术 · 投资',
  },
  home: {
    titleLine1: '关于技术、',
    titleLine2: '投资，以及二者之间的思考。',
    leadPrefix: '个人博客，专注于',
    leadTech: '软件开发',
    leadAnd: '与',
    leadInvesting: '投资',
    leadSuffix: '——构建可靠系统，做出有风险意识的决策。',
    meta: '技术 · 投资',
    writing: '写作',
    viewAll: '查看全部',
  },
  blog: {
    title: '博客',
    lead: '关于软件开发与投资的笔记——实验、思维模型，以及值得留存的想法。',
    back: '← 博客',
  },
  article: {
    copy: '复制',
    copied: '已复制',
    copyFailed: '失败',
  },
  about: {
    title: '关于',
    lead: '我是 Vincenteof，一个撰写软件开发与投资思考的作者。',
    introPrefix: '这是一个个人博客。大部分内容在',
    introLink: '博客',
    introSuffix:
      '里——记录我想保留的笔记：正在学习的东西、正在验证的框架，以及值得记住的教训。',
    techTitle: '技术',
    techBody:
      '在软件开发方面，我关注全栈实践——跨边界的类型安全、可测试的小模块，以及随规模增长仍可理解的系统。我会写架构、工具链，以及让代码库更值得信任的习惯。',
    investingTitle: '投资',
    investingBody:
      '在投资方面，我更看重流程而非预测：仓位管理、风险上限，以及市场嘈杂时仍坚持计划的心理素质。这些文章是思考记录，不构成投资建议。',
    whyTitle: '为什么写这个站',
    whyBody:
      '写作迫使你把想法说清楚。在这里发布，是一种公开思考的方式——连接技术与市场，并留下日后可以回看的记录。如果对你也有帮助，那是额外的收获。',
    cta: '阅读博客 →',
  },
  tags: {
    tech: '技术',
    investing: '投资',
    typescript: 'TypeScript',
    risk: '风险',
  },
  language: {
    switchToEn: '切换到英文',
    switchToZh: '切换到中文',
  },
}