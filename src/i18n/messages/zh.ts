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
    stats: '{count} 篇 · {topics} 个主题 · 自 {year} 年',
  },
  home: {
    titleLine1: '关于技术、',
    titleLine2: '投资，以及二者之间的思考。',
    leadPrefix: '个人博客，关于',
    leadTech: '打造出色的软件',
    leadAnd: '与',
    leadInvesting: '投资',
    leadSuffix:
      '——做值得留下的作品；耐心等待，只在击球区内的机会出现时，打出完美一击。',
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
    lead: '我是 Vincenteof。',
    bio: '在科技行业写了近十年代码，目前在一家交易所做前端开发。业余时间里，我写自己的软件，也记投资笔记。',
    introPrefix: '这是一个个人博客。大部分内容在',
    introLink: '博客',
    introSuffix:
      '里——记录我想保留的笔记：正在学习的东西、正在验证的框架，以及值得记住的教训。',
    techTitle: '技术',
    techContext:
      '我日常主要设计各类复杂的 Web 应用——性能、状态管理，以及一整套前端工程化，都是绕不开的功课。',
    techBody:
      '我更偏向简单优于复杂：定义问题，优于急于找方案。业余项目是我按自己审美做产品的地方——也希望借此发掘某些利基市场，做出对别人真正有用的小东西。我会写架构、工具链，以及让系统更值得信任的习惯。',
    investingTitle: '投资',
    investingOrigin:
      '投资始于对加密货币的好奇——买了一些币，运气好，赚到了第一笔利润。后来把目光转向美股，才发现那是一个需要耐心与方法的战场。从那时起，我开始系统学习，并反复复盘每一次决策。',
    investingBody:
      '我只在对标的本身有足够认知时才会出手——做足功课，真正看懂一门生意，才愿意重仓、也才拿得住。在此之上，我更看重流程而非预测：仓位管理、风险上限，以及市场嘈杂时仍坚持计划的心理素质。这些文章是思考记录，不构成投资建议。',
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