'use client'

import { useState } from 'react'
import { useThemeStore } from '@/store/themeStore'
import { Settings, X, Palette, Zap, Type, CornerUpRight, Volume2, VolumeX } from 'lucide-react'

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    mode,
    colorScheme,
    animationSpeed,
    reducedMotion,
    fontSize,
    borderRadius,
    particlesEnabled,
    backgroundEffects,
    soundEnabled,
    setMode,
    setColorScheme,
    setAnimationSpeed,
    setReducedMotion,
    setFontSize,
    setBorderRadius,
    setParticlesEnabled,
    setBackgroundEffects,
    setSoundEnabled,
    resetToDefaults
  } = useThemeStore()

  const colorSchemes = [
    { name: 'blue', color: '#3b82f6', label: 'Blue' },
    { name: 'purple', color: '#8b5cf6', label: 'Purple' },
    { name: 'green', color: '#10b981', label: 'Green' },
    { name: 'orange', color: '#f59e0b', label: 'Orange' },
    { name: 'pink', color: '#ec4899', label: 'Pink' },
    { name: 'cyan', color: '#06b6d4', label: 'Cyan' }
  ]

  return (
    <>
      {/* Toggle Button - Positioned on the right side, adjusted for mobile */}
      <div className="fixed top-1/2 right-4 md:right-4 z-50 group" style={{ transform: 'translateY(-50%)' }}>
        <button
          onClick={() => setIsOpen(true)}
          className="relative p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-full shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-110 hover:from-blue-500/30 hover:to-purple-500/30"
          aria-label="Open theme customizer"
        >
          <Settings size={18} className="text-white animate-spin-slow md:w-5 md:h-5" />

          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 animate-ping" />
        </button>

        {/* Tooltip - only show on desktop */}
        <div className="hidden md:block absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Theme Settings
          </div>
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-black/80" />
        </div>
      </div>

      {/* Customizer Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 w-full max-w-md max-h-[90vh] overflow-y-auto mx-4">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                🎨 Theme Customizer
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400 group-hover:text-red-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Theme Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Theme Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['light', 'dark', 'system'] as const).map((themeMode) => (
                    <button
                      key={themeMode}
                      onClick={() => setMode(themeMode)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        mode === themeMode
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      {themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Scheme */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <Palette size={16} className="inline mr-2" />
                  Color Scheme
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {colorSchemes.map((scheme) => (
                    <button
                      key={scheme.name}
                      onClick={() => setColorScheme(scheme.name as any)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        colorScheme === scheme.name
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div 
                        className="w-4 h-4 rounded-full mx-auto mb-1"
                        style={{ backgroundColor: scheme.color }}
                      />
                      {scheme.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Animation Speed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <Zap size={16} className="inline mr-2" />
                  Animation Speed
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['slow', 'normal', 'fast'] as const).map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setAnimationSpeed(speed)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        animationSpeed === speed
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      {speed.charAt(0).toUpperCase() + speed.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <Type size={16} className="inline mr-2" />
                  Font Size: {Math.round(fontSize * 100)}%
                </label>
                <input
                  type="range"
                  min="0.8"
                  max="1.2"
                  step="0.1"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Border Radius */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <CornerUpRight size={16} className="inline mr-2" />
                  Border Radius: {Math.round(borderRadius * 100)}%
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Reduced Motion
                  </span>
                  <button
                    onClick={() => setReducedMotion(!reducedMotion)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      reducedMotion ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        reducedMotion ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Particle Effects
                  </span>
                  <button
                    onClick={() => setParticlesEnabled(!particlesEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      particlesEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        particlesEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Background Effects
                  </span>
                  <button
                    onClick={() => setBackgroundEffects(!backgroundEffects)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      backgroundEffects ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        backgroundEffects ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    {soundEnabled ? <Volume2 size={16} className="mr-2" /> : <VolumeX size={16} className="mr-2" />}
                    Sound Effects
                  </span>
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      soundEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        soundEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetToDefaults}
                className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
