'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useThemeStore } from '@/store/themeStore'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

export default function EnhancedParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const { particlesEnabled, colorScheme, isDark, reducedMotion } = useThemeStore()

  const colorSchemes = {
    blue: { primary: 'rgba(59, 130, 246', secondary: 'rgba(139, 92, 246' },
    purple: { primary: 'rgba(139, 92, 246', secondary: 'rgba(236, 72, 153' },
    green: { primary: 'rgba(16, 185, 129', secondary: 'rgba(59, 130, 246' },
    orange: { primary: 'rgba(245, 158, 11', secondary: 'rgba(239, 68, 68' },
    pink: { primary: 'rgba(236, 72, 153', secondary: 'rgba(139, 92, 246' },
    cyan: { primary: 'rgba(6, 182, 212', secondary: 'rgba(16, 185, 129' }
  }

  const createParticle = useCallback((x?: number, y?: number): Particle => {
    const canvas = canvasRef.current
    if (!canvas) return {} as Particle

    const colors = colorSchemes[colorScheme]
    const baseOpacity = isDark ? 0.6 : 0.4
    
    return {
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (reducedMotion ? 0.1 : 0.5),
      vy: (Math.random() - 0.5) * (reducedMotion ? 0.1 : 0.5),
      size: Math.random() * 3 + 1,
      opacity: Math.random() * baseOpacity + 0.1,
      color: Math.random() > 0.5 ? colors.primary : colors.secondary,
      life: 1,
      maxLife: Math.random() * 200 + 100
    }
  }, [colorScheme, isDark, reducedMotion])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !particlesEnabled || reducedMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createParticles()
    }

    const createParticles = () => {
      particlesRef.current = []
      const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 8000))
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle())
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      
      // Add particles near mouse occasionally
      if (Math.random() < 0.1) {
        particlesRef.current.push(createParticle(
          e.clientX + (Math.random() - 0.5) * 50,
          e.clientY + (Math.random() - 0.5) * 50
        ))
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= 1

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx += (dx / distance) * force * 0.01
          particle.vy += (dy / distance) * force * 0.01
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        const alpha = (particle.life / particle.maxLife) * particle.opacity
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}, ${alpha})`
        ctx.fill()

        // Add glow effect near mouse
        if (distance < 50) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `${particle.color}, ${alpha * 0.3})`
          ctx.fill()
        }

        return particle.life > 0
      })

      // Draw connections between nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x
          const dy = particlesRef.current[i].y - particlesRef.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const alpha = (1 - distance / 120) * 0.2
            ctx.beginPath()
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
            ctx.strokeStyle = `${colorSchemes[colorScheme].primary}, ${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Maintain particle count
      while (particlesRef.current.length < 50) {
        particlesRef.current.push(createParticle())
      }

      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [particlesEnabled, colorScheme, isDark, reducedMotion, createParticle])

  if (!particlesEnabled || reducedMotion) {
    return (
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-blue-900/5 to-purple-900/5 dark:from-blue-900/10 dark:to-purple-900/10" />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  )
}
