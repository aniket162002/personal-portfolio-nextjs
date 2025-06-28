'use client'

import { useEffect, useState } from 'react'
import { useThemeStore } from '@/store/themeStore'

interface VisitorData {
  id: string
  timestamp: number
  location?: string
  userAgent?: string
}

export default function RealTimeFeatures() {
  const [visitorCount, setVisitorCount] = useState(1)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isOnline, setIsOnline] = useState(true)
  const { backgroundEffects } = useThemeStore()

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Monitor online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Simulate visitor tracking (in real app, this would connect to analytics)
    const visitorInterval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3))
    }, 30000)

    // Cleanup
    return () => {
      clearInterval(timeInterval)
      clearInterval(visitorInterval)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!backgroundEffects) return null

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden md:block">
      <div className="space-y-2">
        {/* Online Status */}
        <div className="flex items-center gap-2 px-3 py-2 bg-black/20 backdrop-blur-md rounded-lg border border-white/10">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
          <span className="text-xs text-white/80">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        {/* Visitor Count */}
        <div className="flex items-center gap-2 px-3 py-2 bg-black/20 backdrop-blur-md rounded-lg border border-white/10">
          <span className="text-xs text-white/80">👥 {visitorCount} visitors</span>
        </div>

        {/* Current Time */}
        <div className="flex items-center gap-2 px-3 py-2 bg-black/20 backdrop-blur-md rounded-lg border border-white/10">
          <span className="text-xs text-white/80">
            🕒 {currentTime.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  )
}

// Live typing indicator component
export function LiveTypingIndicator({ isTyping }: { isTyping: boolean }) {
  if (!isTyping) return null

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span>Typing...</span>
    </div>
  )
}


