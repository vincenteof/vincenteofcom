export const en = {
  meta: {
    title: 'Vincenteof — tech & investing',
  },
  nav: {
    home: 'Home',
    blog: 'Blog',
    about: 'About',
  },
  footer: {
    copyright: '© {year} Vincenteof. All rights reserved.',
    socialNav: 'Social links',
  },
  home: {
    titleLine1: 'Thoughts on tech,',
    titleLine2: 'investing, and the space between.',
    leadPrefix: 'A personal blog on',
    leadTech: 'building software',
    leadAnd: 'and',
    leadInvesting: 'investing',
    leadSuffix:
      '. Making things I\'m proud of, and swinging only when the pitch sits in the sweet spot.',
    meta: 'Tech · Investing',
    writing: 'Writing',
    viewAll: 'View all',
  },
  blog: {
    title: 'Blog',
    lead:
      'Notes on software development and investing. Experiments, mental models, and things worth keeping.',
    shortTakes: 'Short takes on Twitter →',
    back: '← Blog',
    translationFallback:
      'Chinese translation is not available yet — showing the English version.',
  },
  article: {
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Failed',
  },
  notFound: {
    code: '404',
    title: 'Page not found',
    lead: 'This page does not exist, or the post may have been moved.',
    home: '← Home',
    blog: 'Browse the blog →',
  },
  error: {
    code: 'Error',
    title: 'Something went wrong',
    lead: 'An unexpected error occurred. You can try again, or head home.',
    retry: 'Try again',
    home: '← Home',
  },
  about: {
    title: 'About',
    lead: "I'm Vincenteof.",
    bio: "I've spent nearly a decade writing code in tech and now work on security products at an exchange. In my spare time, I ship software of my own and keep investing notes.",
    introPrefix: 'This site is a personal blog. Most of what I publish lives under',
    introLink: 'Blog',
    introSuffix:
      ", where I collect notes I want to keep: things I'm learning, frameworks I'm testing, and mistakes worth remembering.",
    techTitle: 'Tech',
    techContext:
      "Daily work is mostly full-stack web apps. Lately I've also been exploring product work around AI agents.",
    techBody:
      'I tend to write simple code, and only reach for complex solutions once the problem is defined clearly enough. Outside work, I build products that match my own aesthetic, hoping to find niches where they can actually help people. I write about architecture, tooling, and the habits that make systems easier to trust.',
    investingTitle: 'Investing',
    investingOrigin:
      "It started with curiosity about crypto — a small bet that, with some luck, worked out. That led me to U.S. equities, where patience and process matter more than hot takes. Since then I've been studying systematically and reviewing every decision I make.",
    investingBody:
      "I only size up when I have real conviction in the underlying business — doing the work to understand it well enough to hold through noise. On top of that, I focus on process over prediction: position sizing, risk limits, and the psychology of sticking to a plan when markets get loud. These posts are written thinking, not financial advice.",
    whyTitle: 'Why this site',
    whyBody:
      "Writing forces clarity. Publishing here is a way to think in public, connect ideas across tech and markets, and build a record I can return to later. If something here is useful to you, that's a bonus.",
    elsewhereTitle: 'Elsewhere',
    cta: 'Read the blog →',
  },
  tags: {
    tech: 'tech',
    investing: 'investing',
    typescript: 'typescript',
    risk: 'risk',
  },
  language: {
    switchToEn: 'Switch to English',
    switchToZh: 'Switch to Chinese',
  },
} as const

/** Nested message shape matching `en`, with string leaves (not English string literals). */
export type MessageTree = {
  [Section in keyof typeof en]: {
    [Key in keyof (typeof en)[Section]]: string
  }
}