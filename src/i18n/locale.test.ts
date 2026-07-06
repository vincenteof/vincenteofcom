import { describe, expect, it } from 'vitest'
import { localeFromLanguageTag, resolveLocale } from './locale'

describe('localeFromLanguageTag', () => {
  it('maps Chinese language tags to zh', () => {
    expect(localeFromLanguageTag('zh-CN')).toBe('zh')
    expect(localeFromLanguageTag('zh-TW')).toBe('zh')
  })

  it('maps other language tags to en', () => {
    expect(localeFromLanguageTag('en-US')).toBe('en')
    expect(localeFromLanguageTag('ja-JP')).toBe('en')
  })
})

describe('resolveLocale', () => {
  it('prefers stored locale over system language', () => {
    expect(resolveLocale('en', 'zh-CN')).toBe('en')
    expect(resolveLocale('zh', 'en-US')).toBe('zh')
  })

  it('falls back to system language when nothing is stored', () => {
    expect(resolveLocale(null, 'zh-CN')).toBe('zh')
    expect(resolveLocale(null, 'en-US')).toBe('en')
  })

  it('defaults to en without stored or system language', () => {
    expect(resolveLocale(null)).toBe('en')
  })
})