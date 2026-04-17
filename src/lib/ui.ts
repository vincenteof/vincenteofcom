export const ui = {
  shell: 'mx-auto max-w-[780px] px-5 pb-[100px] pt-11',
  shellPosts: 'mx-auto max-w-[780px] px-5 pb-[100px] pt-11',
  section:
    'border-t border-[color:color-mix(in_oklab,var(--line)_72%,transparent)] py-[58px]',
  heroSection: 'border-t-0 pt-[52px]',
  postsHeroSection: 'border-t-0 pt-[52px] pb-[38px]',
  reveal: 'translate-y-3 opacity-0 animate-[revealUp_640ms_ease_forwards]',
  kicker:
    'm-0 text-[0.78rem] uppercase tracking-[0.12em] text-[var(--text-soft)]',
  heroTitle:
    'mt-[18px] mb-1 text-[clamp(2.35rem,7.5vw,4.25rem)] leading-[1.2] font-medium tracking-[0.04em]',
  heroEnglish:
    'm-0 text-[clamp(1.05rem,3vw,1.35rem)] tracking-[0.08em] text-[var(--text-soft)]',
  lede: 'mt-[34px] text-[clamp(1.08rem,2.8vw,1.32rem)] leading-[2]',
  sectionTitle:
    'm-0 mb-6 text-[clamp(1.42rem,2.9vw,1.78rem)] font-medium tracking-[0.04em]',
  sectionSubtitle: 'mt-[-15px] mb-6 text-[var(--text-soft)]',
  copyBlock:
    '[&_p:last-child]:mb-0 [&_p]:mb-4 [&_p]:text-[color:color-mix(in_oklab,var(--text)_94%,var(--text-soft))]',
  markdownProse:
    'prose prose-invert max-w-none prose-p:my-0 prose-p:leading-[2] prose-p:text-[color:color-mix(in_oklab,var(--text)_94%,var(--text-soft))] prose-headings:mb-5 prose-headings:mt-10 prose-headings:scroll-mt-24 prose-headings:font-medium prose-headings:tracking-[0.03em] prose-headings:text-[var(--text)] prose-h1:mt-0 prose-h2:text-[1.55rem] prose-h3:text-[1.22rem] prose-strong:font-semibold prose-strong:text-[color:color-mix(in_oklab,var(--text)_88%,#fff_12%)] prose-strong:[text-shadow:0_0_0.01px_currentColor] prose-code:rounded-[2px] prose-code:bg-[color:color-mix(in_oklab,var(--bg-soft)_90%,transparent)] prose-code:px-[0.3em] prose-code:py-[0.12em] prose-code:text-[0.92em] prose-code:text-[var(--text)] prose-pre:border prose-pre:border-[color:color-mix(in_oklab,var(--line)_80%,transparent)] prose-pre:bg-[color:color-mix(in_oklab,var(--bg-soft)_92%,transparent)] prose-pre:text-[var(--text)] prose-blockquote:border-l-[var(--accent)] prose-blockquote:pl-4 prose-blockquote:text-[color:color-mix(in_oklab,var(--text-soft)_92%,var(--text))] prose-hr:border-[color:color-mix(in_oklab,var(--line)_72%,transparent)] prose-ul:my-6 prose-ol:my-6 prose-li:my-1.5 prose-li:text-[color:color-mix(in_oklab,var(--text)_92%,var(--text-soft))] prose-th:text-[var(--text)] prose-td:text-[color:color-mix(in_oklab,var(--text)_90%,var(--text-soft))] prose-table:my-8 prose-table:w-full prose-thead:border-b prose-thead:border-[color:color-mix(in_oklab,var(--line)_76%,transparent)] prose-tr:border-b prose-tr:border-[color:color-mix(in_oklab,var(--line)_58%,transparent)] prose-img:my-8 prose-img:w-full prose-img:rounded-[10px] prose-img:border prose-img:border-[color:color-mix(in_oklab,var(--line)_76%,transparent)] prose-img:bg-[color:color-mix(in_oklab,var(--bg-soft)_88%,transparent)] [&_a]:border-b [&_a]:border-[color:color-mix(in_oklab,var(--line)_85%,transparent)] [&_a]:pb-[3px] [&_a]:text-[var(--text-soft)] [&_a]:no-underline [&_a]:transition-[color,border-color,outline-color] [&_a]:duration-180 [&_a:hover]:border-[var(--accent)] [&_a:hover]:text-[var(--text)] [&_a:focus-visible]:rounded-[2px] [&_a:focus-visible]:outline [&_a:focus-visible]:outline-1 [&_a:focus-visible]:outline-offset-[3px] [&_a:focus-visible]:outline-[var(--accent)] [&_code::before]:content-none [&_code::after]:content-none',
  buttonPrimary:
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-[2px] border border-[var(--accent)] bg-[var(--accent)] px-[19px] py-[11px] text-[0.95rem] leading-[1.2] text-[oklch(0.97_0.005_186)] no-underline transition-[background-color,border-color,color,transform,outline-color] duration-180 hover:border-[var(--accent-hover)] hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)] active:translate-y-px',
  buttonOutline:
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-[2px] border border-[var(--accent)] bg-transparent px-[19px] py-[11px] text-[0.95rem] leading-[1.2] text-[var(--text)] no-underline transition-[background-color,border-color,color,transform,outline-color] duration-180 hover:border-[color:color-mix(in_oklab,var(--accent)_85%,#fff_15%)] hover:bg-[color:color-mix(in_oklab,var(--bg-soft)_82%,#fff_18%)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)] active:translate-y-px',
  subtleButton:
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-[2px] border border-[color:color-mix(in_oklab,var(--line)_88%,var(--accent))] bg-transparent px-[19px] py-[11px] text-[0.95rem] leading-[1.2] text-[var(--text-soft)] no-underline transition-[background-color,border-color,color,transform,outline-color] duration-180 hover:border-[color:color-mix(in_oklab,var(--accent)_85%,#fff_15%)] hover:bg-[color:color-mix(in_oklab,var(--bg-soft)_82%,#fff_18%)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)] active:translate-y-px',
  essayList:
    'm-0 list-none p-0 [&_a:hover]:text-[color:color-mix(in_oklab,var(--text)_74%,var(--accent))] [&_a]:text-[var(--text)] [&_a]:no-underline [&_a]:transition-colors [&_li:last-child]:border-b [&_li:last-child]:border-[color:color-mix(in_oklab,var(--line)_70%,transparent)] [&_li]:border-t [&_li]:border-[color:color-mix(in_oklab,var(--line)_70%,transparent)] [&_li]:py-[13px]',
  sectionLink:
    'border-b border-[color:color-mix(in_oklab,var(--line)_85%,transparent)] pb-[3px] text-[var(--text-soft)] no-underline transition-[color,border-color,outline-color] duration-180 hover:border-[var(--accent)] hover:text-[var(--text)] focus-visible:rounded-[2px] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)]',
} as const
