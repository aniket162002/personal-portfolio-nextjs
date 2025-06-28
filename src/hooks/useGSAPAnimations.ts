import { useEffect, useRef, RefObject } from 'react'
import { useThemeStore } from '@/store/themeStore'

interface AnimationOptions {
  trigger?: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  markers?: boolean
  onComplete?: () => void
  onStart?: () => void
  delay?: number
  duration?: number
}

export function useGSAPAnimations() {
  const { reducedMotion, animationSpeed } = useThemeStore()

  const createTimeline = async (options: AnimationOptions = {}) => {
    if (reducedMotion) return null

    try {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap.registerPlugin(ScrollTrigger)
      
      const tl = gsap.timeline({
        scrollTrigger: options.trigger ? {
          trigger: options.trigger,
          start: options.start || 'top 80%',
          end: options.end || 'bottom 20%',
          scrub: options.scrub || false,
          pin: options.pin || false,
          markers: options.markers || false,
        } : undefined,
        onComplete: options.onComplete,
        onStart: options.onStart,
        delay: options.delay || 0,
      })

      // Adjust timeline speed based on user preference
      const speedMultiplier = animationSpeed === 'fast' ? 0.5 : animationSpeed === 'slow' ? 1.5 : 1
      tl.timeScale(1 / speedMultiplier)

      return tl
    } catch (error) {
      console.warn('GSAP not available:', error)
      return null
    }
  }

  return { createTimeline, reducedMotion }
}

export function useFadeInAnimation(ref: RefObject<HTMLElement>, options: AnimationOptions = {}) {
  const { createTimeline } = useGSAPAnimations()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const initAnimation = async () => {
      const tl = await createTimeline({
        trigger: element,
        ...options
      })

      if (tl) {
        tl.fromTo(element, 
          { 
            opacity: 0, 
            y: 50,
            scale: 0.9
          },
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: options.duration || 1,
            ease: 'power2.out'
          }
        )
      }
    }

    initAnimation()
  }, [ref, createTimeline, options])
}

export function useSlideInAnimation(
  ref: RefObject<HTMLElement>, 
  direction: 'left' | 'right' | 'up' | 'down' = 'up',
  options: AnimationOptions = {}
) {
  const { createTimeline } = useGSAPAnimations()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const initAnimation = async () => {
      const tl = await createTimeline({
        trigger: element,
        ...options
      })

      if (tl) {
        const fromProps: any = { opacity: 0 }
        const distance = 100

        switch (direction) {
          case 'left':
            fromProps.x = -distance
            break
          case 'right':
            fromProps.x = distance
            break
          case 'up':
            fromProps.y = distance
            break
          case 'down':
            fromProps.y = -distance
            break
        }

        tl.fromTo(element,
          fromProps,
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: options.duration || 1,
            ease: 'power2.out'
          }
        )
      }
    }

    initAnimation()
  }, [ref, direction, createTimeline, options])
}

export function useStaggerAnimation(
  refs: RefObject<HTMLElement>[],
  options: AnimationOptions & { stagger?: number } = {}
) {
  const { createTimeline } = useGSAPAnimations()

  useEffect(() => {
    const elements = refs.map(ref => ref.current).filter(Boolean)
    if (elements.length === 0) return

    const initAnimation = async () => {
      const tl = await createTimeline({
        trigger: elements[0] as HTMLElement,
        ...options
      })

      if (tl) {
        tl.fromTo(elements,
          {
            opacity: 0,
            y: 50,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: options.duration || 0.8,
            stagger: options.stagger || 0.1,
            ease: 'power2.out'
          }
        )
      }
    }

    initAnimation()
  }, [refs, createTimeline, options])
}

export function useParallaxAnimation(
  ref: RefObject<HTMLElement>,
  speed: number = 0.5,
  options: AnimationOptions = {}
) {
  const { createTimeline } = useGSAPAnimations()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const initAnimation = async () => {
      const tl = await createTimeline({
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        ...options
      })

      if (tl) {
        tl.fromTo(element,
          { y: -100 * speed },
          { y: 100 * speed, ease: 'none' }
        )
      }
    }

    initAnimation()
  }, [ref, speed, createTimeline, options])
}

export function useHoverAnimation(ref: RefObject<HTMLElement>) {
  const { reducedMotion } = useThemeStore()

  useEffect(() => {
    const element = ref.current
    if (!element || reducedMotion) return

    const initAnimation = async () => {
      const { gsap } = await import('gsap')

      const handleMouseEnter = () => {
        gsap.to(element, {
          scale: 1.05,
          y: -5,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      const handleMouseLeave = () => {
        gsap.to(element, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    initAnimation()
  }, [ref, reducedMotion])
}

export function useTextRevealAnimation(ref: RefObject<HTMLElement>, options: AnimationOptions = {}) {
  const { createTimeline } = useGSAPAnimations()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const initAnimation = async () => {
      try {
        const { gsap } = await import('gsap')

        const tl = await createTimeline({
          trigger: element,
          ...options
        })

        if (tl) {
          // Simple text reveal without SplitText
          tl.fromTo(element,
            {
              opacity: 0,
              y: 50,
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: options.duration || 1,
              ease: 'power2.out'
            }
          )
        }
      } catch (error) {
        console.warn('GSAP text animation not available:', error)
      }
    }

    initAnimation()
  }, [ref, createTimeline, options])
}
