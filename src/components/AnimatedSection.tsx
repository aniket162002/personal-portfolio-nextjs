'use client'

import { useRef, ReactNode } from 'react'
import { useFadeInAnimation, useSlideInAnimation } from '@/hooks/useGSAPAnimations'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'slideDown'
  delay?: number
  duration?: number
  id?: string
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 1,
  id
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
    rootMargin: '50px'
  })

  // Apply animations based on type
  const shouldUseFadeIn = animation === 'fadeIn'
  const shouldUseSlide = animation.startsWith('slide')
  const slideDirection = shouldUseSlide ? animation.replace('slide', '').toLowerCase() as 'up' | 'down' | 'left' | 'right' : 'up'

  useFadeInAnimation(sectionRef, shouldUseFadeIn ? { delay, duration } : { delay: 0, duration: 0 })
  useSlideInAnimation(sectionRef, slideDirection, shouldUseSlide ? { delay, duration } : { delay: 0, duration: 0 })

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`transition-all duration-1000 ${className} ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </section>
  )
}

// Wrapper for animated containers
export function AnimatedContainer({
  children,
  className = '',
  delay = 0
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useFadeInAnimation(containerRef, { delay })

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

// Animated text component
export function AnimatedText({
  children,
  className = '',
  delay = 0,
  as = 'div'
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}) {
  const divRef = useRef<HTMLDivElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const h2Ref = useRef<HTMLHeadingElement>(null)
  const h3Ref = useRef<HTMLHeadingElement>(null)
  const h4Ref = useRef<HTMLHeadingElement>(null)
  const h5Ref = useRef<HTMLHeadingElement>(null)
  const h6Ref = useRef<HTMLHeadingElement>(null)

  // Use the appropriate ref for animation
  const activeRef = as === 'div' ? divRef :
                   as === 'span' ? spanRef :
                   as === 'p' ? pRef :
                   as === 'h1' ? h1Ref :
                   as === 'h2' ? h2Ref :
                   as === 'h3' ? h3Ref :
                   as === 'h4' ? h4Ref :
                   as === 'h5' ? h5Ref :
                   as === 'h6' ? h6Ref : divRef

  useFadeInAnimation(activeRef as any, { delay, duration: 0.8 })

  if (as === 'div') {
    return (
      <div ref={divRef} className={className}>
        {children}
      </div>
    )
  }

  if (as === 'span') {
    return (
      <span ref={spanRef} className={className}>
        {children}
      </span>
    )
  }

  if (as === 'p') {
    return (
      <p ref={pRef} className={className}>
        {children}
      </p>
    )
  }

  if (as === 'h1') {
    return (
      <h1 ref={h1Ref} className={className}>
        {children}
      </h1>
    )
  }

  if (as === 'h2') {
    return (
      <h2 ref={h2Ref} className={className}>
        {children}
      </h2>
    )
  }

  if (as === 'h3') {
    return (
      <h3 ref={h3Ref} className={className}>
        {children}
      </h3>
    )
  }

  if (as === 'h4') {
    return (
      <h4 ref={h4Ref} className={className}>
        {children}
      </h4>
    )
  }

  if (as === 'h5') {
    return (
      <h5 ref={h5Ref} className={className}>
        {children}
      </h5>
    )
  }

  if (as === 'h6') {
    return (
      <h6 ref={h6Ref} className={className}>
        {children}
      </h6>
    )
  }

  // Default fallback
  return (
    <div ref={divRef} className={className}>
      {children}
    </div>
  )
}
