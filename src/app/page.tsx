'use client'

import { useEffect } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Projects from '@/components/Projects'
import Certificates from '@/components/Certificates'
import Contact from '@/components/Contact'
import EnhancedNavigation from '@/components/EnhancedNavigation'
import EnhancedParticleBackground from '@/components/EnhancedParticleBackground'

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

export default function Home() {
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

          <AnimatedSection id="hero" className="min-h-screen relative" animation="fadeIn">
            <Hero />
          </AnimatedSection>

          <AnimatedSection id="about" className="min-h-screen relative" animation="slideUp" delay={0.2}>
            <About />
          </AnimatedSection>

          <AnimatedSection id="skills" className="min-h-screen relative" animation="slideLeft" delay={0.3}>
            <Skills />
          </AnimatedSection>

          <AnimatedSection id="experience" className="min-h-screen relative" animation="slideRight" delay={0.4}>
            <Experience />
          </AnimatedSection>

          <AnimatedSection id="education" className="min-h-screen relative" animation="slideUp" delay={0.5}>
            <Education />
          </AnimatedSection>

          <AnimatedSection id="projects" className="min-h-screen relative" animation="fadeIn" delay={0.6}>
            <Projects />
          </AnimatedSection>

          {/* Freelancing CTA Section */}
          <AnimatedSection id="freelancing-cta" className="relative py-16" animation="slideUp" delay={0.65}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-cyan-900/40 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 animate-pulse"></div>
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-xl"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-xl"></div>

                <div className="relative z-10">
                  <div className="inline-block mb-6">
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
                      💼 Available for Hire
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                    Need a <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      Freelance Developer?
                    </span>
                  </h2>

                  <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                    I create stunning web applications, mobile apps, and AI-powered solutions.
                    Let's bring your vision to life with cutting-edge technology and exceptional design.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                      href="/freelancing"
                      className="group px-8 py-4 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:scale-105"
                    >
                      <span className="text-xl">🚀</span>
                      View Freelance Work
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>

                    <a
                      href="mailto:shindeaniketa7328@gmail.com"
                      className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2 hover:scale-105"
                    >
                      <span className="text-xl">📧</span>
                      Get Quote
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection id="certificates" className="min-h-screen relative" animation="slideLeft" delay={0.7}>
            <Certificates />
          </AnimatedSection>

          <AnimatedSection id="contact" className="min-h-screen relative" animation="slideUp" delay={0.8}>
            <Contact />
          </AnimatedSection>

          <Footer />
        </main>
      </SmoothScrollWrapper>
    </PageTransition>
  )
}