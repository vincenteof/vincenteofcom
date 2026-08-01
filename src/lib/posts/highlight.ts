import '@tanstack/react-start/server-only'

import { createHighlighter, type Highlighter } from 'shiki'

const LIGHT_THEME = 'github-light'
const DARK_THEME = 'github-dark'

const SUPPORTED_LANGS = [
  'bash',
  'css',
  'html',
  'javascript',
  'json',
  'markdown',
  'shell',
  'sql',
  'text',
  'tsx',
  'typescript',
  'yaml',
] as const

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [LIGHT_THEME, DARK_THEME],
      langs: [...SUPPORTED_LANGS],
    })
  }

  return highlighterPromise
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function wrapCodeBlock(innerHtml: string, lang: string) {
  const label = lang.trim() || 'text'

  return `<div class="code-block" data-code-block><div class="code-block__toolbar"><span class="code-block__lang">${escapeHtml(label)}</span><button type="button" class="code-block__copy" data-copy-button aria-live="polite"><span class="code-block__copy-label">Copy</span></button></div><div class="code-block__body">${innerHtml}</div></div>`
}

export async function highlightCodeBlock(code: string, lang: string) {
  const highlighter = await getHighlighter()
  const language = lang.trim() || 'text'
  const resolvedLang = highlighter.getLoadedLanguages().includes(language)
    ? language
    : 'text'

  const highlighted = highlighter.codeToHtml(code, {
    lang: resolvedLang,
    themes: {
      light: LIGHT_THEME,
      dark: DARK_THEME,
    },
    defaultColor: false,
  })

  return wrapCodeBlock(highlighted, resolvedLang)
}