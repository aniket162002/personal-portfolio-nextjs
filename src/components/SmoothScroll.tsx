'use client'

import { useEffect, useRef } from 'react'

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let lenis: any = null;

    const initLenis = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default

        lenis = new Lenis({
          duration: 0.8,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })

        const raf = (time: number) => {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // GSAP integration
        const setupGSAP = async () => {
          try {
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')

            gsap.registerPlugin(ScrollTrigger)
            
            lenis.on('scroll', ScrollTrigger.update)
            
            gsap.ticker.add((time) => {
              lenis.raf(time * 1000)
            })

            gsap.ticker.lagSmoothing(0)
          } catch (error) {
            console.warn('GSAP integration failed:', error)
          }
        }

        setupGSAP()
      } catch (error) {
        console.warn('Lenis not available, falling back to native scroll:', error)
      }
    }

    // Initialize with a delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initLenis();
    }, 200);

    return () => {
      clearTimeout(timer);
      if (lenis) {
        lenis.destroy()
      }
    }
  }, [])

  return (
    <div ref={scrollRef}>
      {children}
    </div>
  )
}