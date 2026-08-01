import { describe, expect, it } from 'vitest'
import { resolveLocale } from './locale'

describe('resolveLocale', () => {
  it('returns stored locale when valid', () => {
    expect(resolveLocale('en')).toBe('en')
    expect(resolveLocale('zh')).toBe('zh')
  })

  it('defaults to English when nothing is stored', () => {
    expect(resolveLocale(null)).toBe('en')
    expect(resolveLocale(undefined)).toBe('en')
    expect(resolveLocale('fr')).toBe('en')
  })
})