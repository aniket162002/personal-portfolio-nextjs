import { useEffect, useState, RefObject } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
): boolean {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = elementRef.current

    if (!element) return

    // If we've already intersected and should freeze, don't create a new observer
    if (freezeOnceVisible && isIntersecting) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting
        setIsIntersecting(isElementIntersecting)

        // If we should freeze once visible and element is intersecting, disconnect
        if (freezeOnceVisible && isElementIntersecting) {
          observer.disconnect()
        }
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible, isIntersecting])

  return isIntersecting
}

// Hook for multiple elements
export function useIntersectionObserverMultiple(
  elementRefs: RefObject<Element>[],
  options: UseIntersectionObserverOptions = {}
): boolean[] {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false
  } = options

  const [intersections, setIntersections] = useState<boolean[]>(
    new Array(elementRefs.length).fill(false)
  )

  useEffect(() => {
    const elements = elementRefs.map(ref => ref.current).filter(Boolean)
    
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = elements.indexOf(entry.target as Element)
          if (index !== -1) {
            setIntersections(prev => {
              const newIntersections = [...prev]
              newIntersections[index] = entry.isIntersecting
              return newIntersections
            })

            if (freezeOnceVisible && entry.isIntersecting) {
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold, root, rootMargin }
    )

    elements.forEach(element => {
      if (element) observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [elementRefs, threshold, root, rootMargin, freezeOnceVisible])

  return intersections
}
