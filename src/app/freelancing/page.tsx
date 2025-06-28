'use client'

import { useEffect } from 'react'
import Freelancing from '@/components/Freelancing'
import EnhancedNavigation from '@/components/EnhancedNavigation'
import EnhancedParticleBackground from '@/components/EnhancedParticleBackground'
import SmoothScroll from '@/components/SmoothScroll'
import Footer from '@/components/Footer'
import PageTransition, { SmoothScrollWrapper } from '@/components/PageTransition'
import AnimatedSection from '@/components/AnimatedSection'
import RealTimeFeatures from '@/components/RealTimeFeatures'
import PWAInstaller from '@/components/PWAInstaller'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import ThemeCustomizer from '@/components/ThemeCustomizer'
import PerformanceMonitor from '@/components/PerformanceMonitor'
import Enhanced3DScene from '@/components/Enhanced3DScene'
import CursorTracker from '@/components/CursorTracker'

export default function FreelancingPage() {
  useEffect(() => {
    // Initialize GSAP animations
    const initAnimations = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')

        gsap.registerPlugin(ScrollTrigger)

        // Configure ScrollTrigger defaults
        ScrollTrigger.defaults({
          toggleActions: "play none none reverse",
          start: "top 85%",
          end: "bottom 15%",
        })

        // Refresh ScrollTrigger on load and resize
        ScrollTrigger.refresh()

        // Handle resize events
        const handleResize = () => {
          ScrollTrigger.refresh()
        }

        window.addEventListener('resize', handleResize)

        return () => {
          window.removeEventListener('resize', handleResize)
        }
      } catch (error) {
        console.error("Failed to initialize GSAP:", error)
      }
    }

    // Fix for hydration issues
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      initAnimations();
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 500);
  }, [])

  return (
    <PageTransition>
      <SmoothScrollWrapper>
        <main className="relative overflow-x-hidden">
          <PerformanceMonitor />
          <ServiceWorkerRegistration />
          <PWAInstaller />
          <ThemeCustomizer />
          <CursorTracker />
          <Enhanced3DScene />
          <EnhancedParticleBackground />
          <EnhancedNavigation />
          <RealTimeFeatures />

          <AnimatedSection id="freelancing" className="min-h-screen relative" animation="fadeIn">
            <Freelancing />
          </AnimatedSection>

          <Footer />
        </main>
      </SmoothScrollWrapper>
    </PageTransition>
  )
}
