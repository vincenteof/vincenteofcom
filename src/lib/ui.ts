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
  buttonOutline:
    'inline-flex items-center border border-[var(--accent)] bg-transparent px-[19px] py-[11px] text-[0.95rem] leading-[1.2] text-[var(--text)] transition-[background-color,border-color,color] duration-180 hover:border-[color:color-mix(in_oklab,var(--accent)_85%,#fff_15%)] hover:bg-[color:color-mix(in_oklab,var(--bg-soft)_82%,#fff_18%)]',
  subtleButton:
    'inline-flex items-center border border-[color:color-mix(in_oklab,var(--line)_88%,var(--accent))] bg-transparent px-[19px] py-[11px] text-[0.95rem] leading-[1.2] text-[var(--text-soft)] transition-[background-color,border-color,color] duration-180 hover:border-[color:color-mix(in_oklab,var(--accent)_85%,#fff_15%)] hover:bg-[color:color-mix(in_oklab,var(--bg-soft)_82%,#fff_18%)] hover:text-[var(--text)]',
  essayList:
    'm-0 list-none p-0 [&_a:hover]:text-[color:color-mix(in_oklab,var(--text)_74%,var(--accent))] [&_a]:text-[var(--text)] [&_a]:no-underline [&_a]:transition-colors [&_li:last-child]:border-b [&_li:last-child]:border-[color:color-mix(in_oklab,var(--line)_70%,transparent)] [&_li]:border-t [&_li]:border-[color:color-mix(in_oklab,var(--line)_70%,transparent)] [&_li]:py-[13px]',
  sectionLink:
    'border-b border-[color:color-mix(in_oklab,var(--line)_85%,transparent)] pb-[3px] text-[var(--text-soft)] no-underline transition-[color,border-color] duration-180 hover:border-[var(--accent)] hover:text-[var(--text)]',
} as const
