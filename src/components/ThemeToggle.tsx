import { Moon, Sun } from 'lucide-react'
import { useTheme } from '#/theme/ThemeProvider'
import type { ThemeMode } from '#/theme/theme'

const modeLabels: Record<ThemeMode, string> = {
  light: 'Light mode. Click to switch to dark mode.',
  dark: 'Dark mode. Click to switch to light mode.',
}

const modeIcons: Record<ThemeMode, typeof Sun> = {
  light: Sun,
  dark: Moon,
}

export default function ThemeToggle() {
  const { mode, setMode } = useTheme()

  function toggleMode() {
    const nextMode: ThemeMode = mode === 'light' ? 'dark' : 'light'
    setMode(nextMode)
  }

  const label = modeLabels[mode]
  const Icon = modeIcons[mode]

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={label}
      title={label}
      className="theme-toggle"
    >
      <Icon aria-hidden="true" strokeWidth={1.75} />
    </button>
  )
}