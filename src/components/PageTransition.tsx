'use client'

import { useEffect, useState } from 'react'
import { useThemeStore } from '@/store/themeStore'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const { colorScheme, reducedMotion } = useThemeStore()

  const colorSchemes = {
    blue: 'from-blue-600 to-blue-800',
    purple: 'from-purple-600 to-purple-800',
    green: 'from-green-600 to-green-800',
    orange: 'from-orange-600 to-orange-800',
    pink: 'from-pink-600 to-pink-800',
    cyan: 'from-cyan-600 to-cyan-800'
  }

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), reducedMotion ? 100 : 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, reducedMotion ? 50 : 100)

    return () => clearInterval(interval)
  }, [reducedMotion])

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${colorSchemes[colorScheme]} opacity-20`} />
          
          {/* Animated particles */}
          {!reducedMotion && (
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Loading content */}
        <div className="relative z-10 text-center">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Aniket Shinde
            </h1>
            <p className="text-gray-300">Full Stack Developer</p>
          </div>

          {/* Progress bar */}
          <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
            <div
              className={`h-full bg-gradient-to-r ${colorSchemes[colorScheme]} transition-all duration-300 ease-out`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress text */}
          <p className="text-gray-400 text-sm">
            Loading... {Math.round(progress)}%
          </p>

          {/* Loading spinner */}
          {!reducedMotion && (
            <div className="mt-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto" />
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className={`transition-all duration-500 ${reducedMotion ? '' : 'animate-fadeIn'}`}>
      {children}
    </div>
  )
}

// Smooth scroll component
export function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
  const { reducedMotion } = useThemeStore()

  useEffect(() => {
    if (reducedMotion) return

    const initSmoothScroll = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default
        
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })

        const raf = (time: number) => {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
          lenis.destroy()
        }
      } catch (error) {
        console.warn('Lenis smooth scroll not available:', error)
      }
    }

    initSmoothScroll()
  }, [reducedMotion])

  return <>{children}</>
}
