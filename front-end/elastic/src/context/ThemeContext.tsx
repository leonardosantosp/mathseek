import { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

type ThemeContextType = {
  isLight: boolean
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  isLight: false,
  toggleTheme: () => {}
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isLight, setIsLight] = useState(false)

  const toggleTheme = () => setIsLight(prev => !prev)

  useEffect(() => {
    document.body.classList.toggle('light-theme', isLight)
    document.body.classList.toggle('dark-theme', !isLight)
  }, [isLight])

  return (
    <ThemeContext.Provider value={{ isLight, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
