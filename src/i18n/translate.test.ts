import { describe, expect, it } from 'vitest'
import { formatLocalizedDate, translate, translateTag } from './translate'

describe('translate', () => {
  it('returns English navigation labels', () => {
    expect(translate('en', 'nav.home')).toBe('Home')
    expect(translate('en', 'nav.blog')).toBe('Blog')
  })

  it('returns Chinese navigation labels', () => {
    expect(translate('zh', 'nav.home')).toBe('首页')
    expect(translate('zh', 'nav.blog')).toBe('博客')
  })

  it('falls back to the key for missing paths', () => {
    expect(translate('en', 'missing.key')).toBe('missing.key')
  })
})

describe('translateTag', () => {
  it('localizes known tags per locale', () => {
    expect(translateTag('en', 'tech')).toBe('tech')
    expect(translateTag('zh', 'tech')).toBe('技术')
    expect(translateTag('zh', 'investing')).toBe('投资')
  })
})

describe('formatLocalizedDate', () => {
  it('formats dates for English and Chinese locales', () => {
    expect(formatLocalizedDate('en', '2026-03-15', 'long')).toContain('2026')
    expect(formatLocalizedDate('zh', '2026-03-15', 'long')).toMatch(/2026/)
  })
})