import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  applyThemeMode,
  setClientThemeCookie,
  type ThemeMode,
} from './theme'

type ThemeContextValue = {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

type ThemeProviderProps = {
  initialMode: ThemeMode
  children: ReactNode
}

export function ThemeProvider({ initialMode, children }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(initialMode)

  useEffect(() => {
    const legacyTheme = window.localStorage.getItem('theme')
    if (
      legacyTheme === 'light' ||
      legacyTheme === 'dark' ||
      legacyTheme === 'auto'
    ) {
      window.localStorage.removeItem('theme')
      setClientThemeCookie(legacyTheme)
      setModeState(legacyTheme)
      applyThemeMode(legacyTheme)
      return
    }

    setModeState(initialMode)
    applyThemeMode(initialMode)
  }, [initialMode])

  useEffect(() => {
    if (mode !== 'auto') {
      return
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyThemeMode('auto')

    media.addEventListener('change', onChange)
    return () => {
      media.removeEventListener('change', onChange)
    }
  }, [mode])

  const value = useMemo(
    () => ({
      mode,
      setMode(nextMode: ThemeMode) {
        setModeState(nextMode)
        setClientThemeCookie(nextMode)
        applyThemeMode(nextMode)
      },
    }),
    [mode],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}