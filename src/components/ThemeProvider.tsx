'use client'

import { useEffect, ReactNode } from 'react'
import { useThemeStore } from '@/store/themeStore'

interface ThemeProviderProps {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { 
    mode, 
    isDark, 
    currentTheme, 
    cssVariables, 
    reducedMotion,
    particlesEnabled,
    backgroundEffects 
  } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement
    
    // Apply theme class
    root.classList.remove('light', 'dark')
    root.classList.add(currentTheme)
    
    // Apply CSS variables
    Object.entries(cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })
    
    // Apply reduced motion preference
    if (reducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms')
      root.style.setProperty('--animation-iteration-count', '1')
    } else {
      root.style.removeProperty('--animation-duration')
      root.style.removeProperty('--animation-iteration-count')
    }
    
    // Apply meta theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', cssVariables['--color-primary'])
    }
    
    // Apply particles and background effects classes
    root.classList.toggle('particles-disabled', !particlesEnabled)
    root.classList.toggle('background-effects-disabled', !backgroundEffects)
    
  }, [currentTheme, cssVariables, reducedMotion, particlesEnabled, backgroundEffects])

  useEffect(() => {
    // Listen for system theme changes
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleChange = () => {
        // Force re-render by updating the store
        useThemeStore.getState().setMode('system')
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [mode])

  useEffect(() => {
    // Listen for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    const handleChange = () => {
      useThemeStore.getState().setReducedMotion(mediaQuery.matches)
    }
    
    // Set initial value
    if (mediaQuery.matches) {
      useThemeStore.getState().setReducedMotion(true)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return <>{children}</>
}

// Hook to get theme-aware styles
export function useThemeStyles() {
  const { currentTheme, cssVariables, isDark } = useThemeStore()
  
  return {
    theme: currentTheme,
    isDark,
    colors: {
      primary: cssVariables['--color-primary'],
      primaryDark: cssVariables['--color-primary-dark'],
      secondary: cssVariables['--color-secondary'],
      accent: cssVariables['--color-accent']
    },
    variables: cssVariables
  }
}

// Component for theme-aware conditional rendering
export function ThemeConditional({ 
  light, 
  dark, 
  children 
}: { 
  light?: ReactNode
  dark?: ReactNode
  children?: (isDark: boolean) => ReactNode
}) {
  const { isDark } = useThemeStore()
  
  if (children) {
    return <>{children(isDark)}</>
  }
  
  return <>{isDark ? dark : light}</>
}
