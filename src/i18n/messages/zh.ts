import type { MessageTree } from './en'

// Same keys as English; values are free Chinese strings (not English literals).
export const zh: MessageTree = {
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
    bio: '在科技行业写了近十年代码，目前在一家交易所做全栈。业余时间写自己的软件，也记投资笔记。',
    introPrefix: '这是一个个人博客。大部分内容在',
    introLink: '博客',
    introSuffix:
      '里。我会把想留下的笔记放在这里：学到的东西、试过的框架，还有踩过的坑。',
    techTitle: '技术',
    techContext:
      '日常工作主要是全栈 Web 应用。最近也在研究 AI agents 相关的产品开发。',
    techBody:
      '我倾向于写简单的代码，直到把问题定义得足够清楚，再引入复杂的方案。工作之余做一些符合自己审美的产品，也希望能找到对应的利基市场，帮到别人。文章里会写架构、工具链，以及让系统更靠谱的那些习惯。',
    investingTitle: '投资',
    investingOrigin:
      '最早是对加密货币好奇，买了点币，运气不错，赚到第一笔利润。后来看美股，才意识到这是要耐心和方法的活。从那时起开始系统学习，也反复复盘自己的决策。',
    investingBody:
      '只在对标的本身有足够认知时才出手。做足功课、真正看懂一门生意，才愿意重仓，也才拿得住。此外更看重流程而不是预测：仓位、风险上限，以及市场嘈杂时还能按计划走的心理。文章是个人思考，不构成投资建议。',
    whyTitle: '为什么写这个站',
    whyBody:
      '写作逼着你把想法说清楚。发在这里，是一种公开思考：把技术和市场连起来，也给自己留一份以后能回看的记录。对你有用的话，那就更好了。',
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