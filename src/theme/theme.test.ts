import { describe, expect, it } from 'vitest'
import {
  canUseThemeViewTransition,
  getHtmlThemeProps,
  resolveThemeMode,
} from './theme'

describe('resolveThemeMode', () => {
  it('returns stored theme modes when valid', () => {
    expect(resolveThemeMode('light')).toBe('light')
    expect(resolveThemeMode('dark')).toBe('dark')
    expect(resolveThemeMode('auto')).toBe('auto')
  })

  it('defaults to auto when nothing is stored', () => {
    expect(resolveThemeMode(null)).toBe('auto')
    expect(resolveThemeMode('sepia')).toBe('auto')
  })
})

describe('getHtmlThemeProps', () => {
  it('maps explicit modes to html attributes', () => {
    expect(getHtmlThemeProps('light')).toEqual({
      dataTheme: 'light',
      colorScheme: 'light',
    })
    expect(getHtmlThemeProps('dark')).toEqual({
      dataTheme: 'dark',
      colorScheme: 'dark',
    })
  })

  it('leaves auto to css media queries', () => {
    expect(getHtmlThemeProps('auto')).toEqual({
      dataTheme: undefined,
      colorScheme: 'light dark',
    })
  })
})

describe('canUseThemeViewTransition', () => {
  it('returns false when reduced motion is preferred', () => {
    expect(
      canUseThemeViewTransition(
        { startViewTransition: () => ({ finished: Promise.resolve() }) },
        true,
      ),
    ).toBe(false)
  })

  it('returns false when view transitions are unavailable', () => {
    expect(canUseThemeViewTransition({}, false)).toBe(false)
    expect(canUseThemeViewTransition(null, false)).toBe(false)
  })

  it('returns true when transitions are supported and motion is allowed', () => {
    expect(
      canUseThemeViewTransition(
        { startViewTransition: () => ({ finished: Promise.resolve() }) },
        false,
      ),
    ).toBe(true)
  })
})