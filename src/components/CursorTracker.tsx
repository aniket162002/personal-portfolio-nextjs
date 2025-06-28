'use client'

import { useEffect, useState, useRef } from 'react'
import { useThemeStore } from '@/store/themeStore'

interface CursorPosition {
  x: number
  y: number
}

export default function CursorTracker() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const { backgroundEffects, reducedMotion } = useThemeStore()

  useEffect(() => {
    if (reducedMotion || !backgroundEffects) return

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isHoverable = target.matches('a, button, [role="button"], input, textarea, select, .cursor-pointer')
      setIsHovering(isHoverable)
    }

    document.addEventListener('mousemove', updateCursor)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [reducedMotion, backgroundEffects])

  // Smooth cursor animation
  useEffect(() => {
    if (!cursorRef.current || !trailRef.current) return

    const cursor = cursorRef.current
    const trail = trailRef.current

    const animateCursor = () => {
      cursor.style.transform = `translate(${position.x}px, ${position.y}px)`
      
      // Animate trail with delay
      setTimeout(() => {
        trail.style.transform = `translate(${position.x}px, ${position.y}px)`
      }, 100)
    }

    animateCursor()
  }, [position])

  if (reducedMotion || !backgroundEffects || !isVisible) return null

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`
          fixed top-0 left-0 w-4 h-4 pointer-events-none z-50 mix-blend-difference
          transition-all duration-200 ease-out
          ${isClicking ? 'scale-75' : isHovering ? 'scale-150' : 'scale-100'}
        `}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          marginLeft: '-8px',
          marginTop: '-8px',
        }}
      >
        <div className="w-full h-full bg-white rounded-full opacity-80" />
      </div>

      {/* Cursor trail */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-40 mix-blend-difference transition-all duration-300 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          marginLeft: '-16px',
          marginTop: '-16px',
        }}
      >
        <div 
          className={`
            w-full h-full border-2 border-white rounded-full opacity-40
            ${isClicking ? 'scale-50' : isHovering ? 'scale-125' : 'scale-100'}
            transition-all duration-200 ease-out
          `} 
        />
      </div>

      {/* Cursor particles */}
      <CursorParticles position={position} isClicking={isClicking} />
    </>
  )
}

// Particle effect for cursor
function CursorParticles({ position, isClicking }: { position: CursorPosition; isClicking: boolean }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; life: number }>>([])
  const { backgroundEffects } = useThemeStore()

  useEffect(() => {
    if (!backgroundEffects || !isClicking) return

    const interval = setInterval(() => {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: position.x + (Math.random() - 0.5) * 20,
        y: position.y + (Math.random() - 0.5) * 20,
        life: 1
      }

      setParticles(prev => [...prev, newParticle])

      // Remove particle after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id))
      }, 1000)
    }, 50)

    return () => clearInterval(interval)
  }, [isClicking, position, backgroundEffects])

  return (
    <>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed w-2 h-2 bg-blue-400 rounded-full pointer-events-none z-30 animate-ping"
          style={{
            left: particle.x - 4,
            top: particle.y - 4,
            animationDuration: '1s',
            animationFillMode: 'forwards'
          }}
        />
      ))}
    </>
  )
}

// Hook for cursor-aware animations
export function useCursorAware(ref: React.RefObject<HTMLElement>) {
  const [isHovered, setIsHovered] = useState(false)
  const { backgroundEffects } = useThemeStore()

  useEffect(() => {
    const element = ref.current
    if (!element || !backgroundEffects) return

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, backgroundEffects])

  return isHovered
}
