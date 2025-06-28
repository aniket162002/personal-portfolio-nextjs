import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark' | 'system'
export type ColorScheme = 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'cyan'
export type AnimationSpeed = 'slow' | 'normal' | 'fast'
export type ReducedMotion = boolean

export interface ThemeConfig {
  mode: ThemeMode
  colorScheme: ColorScheme
  animationSpeed: AnimationSpeed
  reducedMotion: ReducedMotion
  fontSize: number // Base font size multiplier (0.8 - 1.2)
  borderRadius: number // Border radius multiplier (0.5 - 2)
  particlesEnabled: boolean
  backgroundEffects: boolean
  soundEnabled: boolean
}

export interface ThemeStore extends ThemeConfig {
  // Actions
  setMode: (mode: ThemeMode) => void
  setColorScheme: (scheme: ColorScheme) => void
  setAnimationSpeed: (speed: AnimationSpeed) => void
  setReducedMotion: (reduced: ReducedMotion) => void
  setFontSize: (size: number) => void
  setBorderRadius: (radius: number) => void
  setParticlesEnabled: (enabled: boolean) => void
  setBackgroundEffects: (enabled: boolean) => void
  setSoundEnabled: (enabled: boolean) => void
  resetToDefaults: () => void
  
  // Computed
  isDark: boolean
  currentTheme: 'light' | 'dark'
  cssVariables: Record<string, string>
}

const defaultConfig: ThemeConfig = {
  mode: 'system',
  colorScheme: 'blue',
  animationSpeed: 'normal',
  reducedMotion: false,
  fontSize: 1,
  borderRadius: 1,
  particlesEnabled: true,
  backgroundEffects: true,
  soundEnabled: false
}

const colorSchemes = {
  blue: {
    primary: '#3b82f6',
    primaryDark: '#1e40af',
    secondary: '#8b5cf6',
    accent: '#06b6d4'
  },
  purple: {
    primary: '#8b5cf6',
    primaryDark: '#5b21b6',
    secondary: '#ec4899',
    accent: '#f59e0b'
  },
  green: {
    primary: '#10b981',
    primaryDark: '#047857',
    secondary: '#3b82f6',
    accent: '#f59e0b'
  },
  orange: {
    primary: '#f59e0b',
    primaryDark: '#d97706',
    secondary: '#ef4444',
    accent: '#8b5cf6'
  },
  pink: {
    primary: '#ec4899',
    primaryDark: '#be185d',
    secondary: '#8b5cf6',
    accent: '#06b6d4'
  },
  cyan: {
    primary: '#06b6d4',
    primaryDark: '#0891b2',
    secondary: '#10b981',
    accent: '#f59e0b'
  }
}

const animationSpeeds = {
  slow: 1.5,
  normal: 1,
  fast: 0.5
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      ...defaultConfig,
      
      // Computed properties
      get isDark() {
        const { mode } = get()
        if (mode === 'system') {
          return typeof window !== 'undefined' 
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
            : false
        }
        return mode === 'dark'
      },
      
      get currentTheme() {
        return get().isDark ? 'dark' : 'light'
      },
      
      get cssVariables() {
        const state = get()
        const colors = colorSchemes[state.colorScheme]
        const speedMultiplier = animationSpeeds[state.animationSpeed]
        
        return {
          '--color-primary': colors.primary,
          '--color-primary-dark': colors.primaryDark,
          '--color-secondary': colors.secondary,
          '--color-accent': colors.accent,
          '--font-size-multiplier': state.fontSize.toString(),
          '--border-radius-multiplier': state.borderRadius.toString(),
          '--animation-speed': speedMultiplier.toString(),
          '--reduced-motion': state.reducedMotion ? '1' : '0'
        }
      },
      
      // Actions
      setMode: (mode) => set({ mode }),
      setColorScheme: (colorScheme) => set({ colorScheme }),
      setAnimationSpeed: (animationSpeed) => set({ animationSpeed }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setFontSize: (fontSize) => set({ fontSize: Math.max(0.8, Math.min(1.2, fontSize)) }),
      setBorderRadius: (borderRadius) => set({ borderRadius: Math.max(0.5, Math.min(2, borderRadius)) }),
      setParticlesEnabled: (particlesEnabled) => set({ particlesEnabled }),
      setBackgroundEffects: (backgroundEffects) => set({ backgroundEffects }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      resetToDefaults: () => set(defaultConfig)
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({
        mode: state.mode,
        colorScheme: state.colorScheme,
        animationSpeed: state.animationSpeed,
        reducedMotion: state.reducedMotion,
        fontSize: state.fontSize,
        borderRadius: state.borderRadius,
        particlesEnabled: state.particlesEnabled,
        backgroundEffects: state.backgroundEffects,
        soundEnabled: state.soundEnabled
      })
    }
  )
)
