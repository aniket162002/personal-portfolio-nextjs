'use client'

import { useEffect } from 'react'

interface PerformanceMetrics {
  fcp?: number
  lcp?: number
  fid?: number
  cls?: number
  ttfb?: number
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    const metrics: PerformanceMetrics = {}

    // First Contentful Paint (FCP)
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          metrics.fcp = entry.startTime
          console.log('FCP:', entry.startTime)
        }
      }
    })
    observer.observe({ entryTypes: ['paint'] })

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      metrics.lcp = lastEntry.startTime
      console.log('LCP:', lastEntry.startTime)
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        metrics.fid = (entry as any).processingStart - entry.startTime
        console.log('FID:', metrics.fid)
      }
    })
    fidObserver.observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift (CLS)
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value
        }
      }
      metrics.cls = clsValue
      console.log('CLS:', clsValue)
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })

    // Time to First Byte (TTFB)
    const navigationObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        metrics.ttfb = (entry as any).responseStart - (entry as any).requestStart
        console.log('TTFB:', metrics.ttfb)
      }
    })
    navigationObserver.observe({ entryTypes: ['navigation'] })

    // Send metrics to analytics (you can replace this with your analytics service)
    const sendMetrics = () => {
      if (Object.keys(metrics).length > 0) {
        // Example: Send to Google Analytics, Vercel Analytics, etc.
        console.log('Performance Metrics:', metrics)
        
        // You can send to your analytics service here
        // gtag('event', 'web_vitals', metrics)
        // or
        // analytics.track('Performance Metrics', metrics)
      }
    }

    // Send metrics after page load
    window.addEventListener('load', () => {
      setTimeout(sendMetrics, 1000)
    })

    // Send metrics before page unload
    window.addEventListener('beforeunload', sendMetrics)

    // Cleanup observers
    return () => {
      observer.disconnect()
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clsObserver.disconnect()
      navigationObserver.disconnect()
    }
  }, [])

  return null
}

// Hook for component-level performance monitoring
export function usePerformanceMonitor(componentName: string) {
  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render time:`, renderTime.toFixed(2), 'ms')
      }
    }
  })
}

// Component for measuring specific interactions
export function measureInteraction(name: string, fn: () => void) {
  const startTime = performance.now()
  fn()
  const endTime = performance.now()
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`${name} interaction time:`, (endTime - startTime).toFixed(2), 'ms')
  }
}
