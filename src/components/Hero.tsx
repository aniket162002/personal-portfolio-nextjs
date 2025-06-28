'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, Globe, Download, ChevronDown } from 'lucide-react'
import { personalData } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')

        gsap.registerPlugin(ScrollTrigger)

        // Wait for DOM to be ready
        await new Promise(resolve => setTimeout(resolve, 100))

        // Subtle parallax effect for hero content
        if (heroRef.current) {
          gsap.to('.hero-content', {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              refreshPriority: -1
            }
          })
        }

        // Floating animation for contact links with delay
        setTimeout(() => {
          gsap.to('.contact-link', {
            y: -8,
            duration: 3,
            ease: 'power2.inOut',
            stagger: 0.1,
            repeat: -1,
            yoyo: true
          })
        }, 1500)

        // Refresh ScrollTrigger after initialization
        ScrollTrigger.refresh()
      } catch (error) {
        console.warn('GSAP not available:', error)
      }
    }

    // Delay initialization to ensure DOM is ready
    const timer = setTimeout(() => {
      initGSAP()
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  const contactLinks = [
    { icon: Mail, href: `mailto:${personalData.email}`, label: 'Email' },
    { icon: Phone, href: `tel:${personalData.phone}`, label: 'Phone' },
    { icon: Github, href: `https://${personalData.github}`, label: 'GitHub' },
    { icon: Linkedin, href: `https://${personalData.linkedin}`, label: 'LinkedIn' },
    { icon: Globe, href: `https://${personalData.website}`, label: 'Website' },
  ]

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 md:pt-16">
      <div className="hero-content z-10 px-4 sm:px-6 md:px-8 max-w-7xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Profile Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Animated background elements */}
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-3xl opacity-25 animate-pulse"></div>
              <div className="absolute -inset-3 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full blur-2xl opacity-35 animate-spin-slow"></div>

              {/* Profile image container */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500"></div>

                {/* Profile Image */}
                <div className="relative w-full h-full">
                  <Image
                    src="/images/profile.png"
                    alt={personalData.name}
                    fill
                    className="object-contain object-center z-10 relative"
                    priority
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                    style={{
                      objectPosition: 'center center',
                      objectFit: 'contain',
                      transform: 'scale(0.85)'
                    }}
                  />

                  {/* Fallback content - shows if image fails to load */}
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 z-0">
                    <div className="text-center">
                      <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-2">👨‍💻</div>
                      <div className="text-white text-sm sm:text-base font-medium">{personalData.name}</div>
                    </div>
                  </div>
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-20"></div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-purple-500 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-cyan-500 rounded-full animate-bounce opacity-70" style={{ animationDelay: '1s' }}></div>
            </div>
          </motion.div>

          {/* Text Content Section */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #d946ef 50%, #0ea5e9 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradient 3s ease infinite'
              }}
            >
              {personalData.name}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl mt-1 sm:mt-2 text-white/90 font-medium"
            >
              {personalData.subtitle}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-white/80 max-w-2xl lg:max-w-none mx-auto lg:mx-0 leading-relaxed px-1 sm:px-0"
            >
              {personalData.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
              className="mt-4 sm:mt-6 md:mt-8 flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-2 md:gap-3 px-1 sm:px-0"
            >
              {contactLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link flex items-center gap-1.5 sm:gap-2 bg-white/10 hover:bg-white/20 px-2 sm:px-4 py-2 rounded-full transition-all duration-300 text-xs sm:text-base backdrop-blur-sm border border-white/10 hover:border-white/20"
                  >
                    <Icon size={14} className="sm:w-[18px] sm:h-[18px]" />
                    <span className="hidden sm:inline">{link.label}</span>
                    <span className="sm:hidden text-xs">{link.label.charAt(0)}</span>
                  </a>
                )
              })}

              <Link
                href="/generate-resume"
                className="contact-link flex items-center gap-1.5 sm:gap-2 bg-primary-600 hover:bg-primary-700 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 text-xs sm:text-base backdrop-blur-sm border border-primary-500/20 hover:border-primary-400/40 shadow-lg"
              >
                <Download size={14} className="sm:w-[18px] sm:h-[18px]" />
                <span>Resume</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll down button - centered below both sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
          className="mt-8 sm:mt-10 md:mt-12 flex justify-center"
        >
          <button
            onClick={scrollToNext}
            className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 animate-bounce"
            aria-label="Scroll down"
          >
            <ChevronDown className="text-white w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}