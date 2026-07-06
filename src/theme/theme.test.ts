import { describe, expect, it } from 'vitest'
import { getHtmlThemeProps, resolveThemeMode } from './theme'

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