'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import { useSound } from '@/hooks/useSound'
import { useCursorAware } from '@/components/CursorTracker'

export default function EnhancedNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const { colorScheme, isDark } = useThemeStore()
  const { playHoverSound, playClickSound } = useSound()
  const isHovered = useCursorAware(navRef)

  const navItems = [
    { label: 'Home', href: '#hero', section: 'hero', icon: '🏠' },
    { label: 'About', href: '#about', section: 'about', icon: '👨‍💻' },
    { label: 'Skills', href: '#skills', section: 'skills', icon: '🛠️' },
    { label: 'Experience', href: '#experience', section: 'experience', icon: '💼' },
    { label: 'Education', href: '#education', section: 'education', icon: '🎓' },
    { label: 'Projects', href: '#projects', section: 'projects', icon: '🚀' },
    { label: 'Freelancing', href: '/freelancing', section: 'freelancing', icon: '💰', isExternal: true },
    { label: 'Certificates', href: '#certificates', section: 'certificates', icon: '🏆' },
    { label: 'Contact', href: '#contact', section: 'contact', icon: '📧' },
  ]

  const colorSchemes = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    pink: 'from-pink-500 to-pink-600',
    cyan: 'from-cyan-500 to-cyan-600'
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // Determine active section
      const sections = navItems.map(item => item.section)
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems])

  const handleNavClick = (href: string, isExternal?: boolean) => {
    playClickSound()
    if (isExternal) {
      window.location.href = href
    } else {
      document.querySelector(href)?.scrollIntoView({
        behavior: 'smooth'
      })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        ref={navRef}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-500 ${
          scrolled 
            ? `bg-white/10 dark:bg-black/20 backdrop-blur-xl border-b border-white/10 dark:border-white/5 shadow-2xl` 
            : 'bg-transparent'
        } ${isHovered ? 'scale-105' : 'scale-100'}`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <motion.a
              href="#hero"
              className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hover:from-blue-400 hover:to-purple-400 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={playHoverSound}
              onClick={() => handleNavClick('#hero', false)}
            >
              Aniket<span className={`bg-gradient-to-r ${colorSchemes[colorScheme]} bg-clip-text text-transparent`}>.</span>
            </motion.a>
            
            <ul className="flex space-x-1">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.a
                    href={item.href}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      item.label === 'Freelancing'
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg border border-purple-400/50'
                        : activeSection === item.section
                        ? `bg-gradient-to-r ${colorSchemes[colorScheme]} text-white shadow-lg`
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={playHoverSound}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href, item.isExternal)
                    }}
                  >
                    <span className="text-xs">{item.icon}</span>
                    {item.label}
                    {item.label === 'Freelancing' && (
                      <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded text-xs">New</span>
                    )}

                    {activeSection === item.section && item.label !== 'Freelancing' && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-white/20 rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className={`p-4 transition-all duration-500 ${
          scrolled ? 'bg-white/10 dark:bg-black/20 backdrop-blur-xl border-b border-white/10 dark:border-white/5' : 'bg-transparent'
        }`}>
          <div className="flex justify-between items-center">
            <motion.a
              href="#hero"
              className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('#hero', false)}
            >
              Aniket<span className={`bg-gradient-to-r ${colorSchemes[colorScheme]} bg-clip-text text-transparent`}>.</span>
            </motion.a>
            
            <motion.button
              onClick={() => {
                playClickSound()
                setIsOpen(true)
              }}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </motion.button>
          </div>
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex flex-col"
            >
              <div className="flex justify-end p-4">
                <motion.button
                  onClick={() => {
                    playClickSound()
                    setIsOpen(false)
                  }}
                  className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </motion.button>
              </div>
              
              <div className="flex flex-col items-center justify-center flex-1 px-8">
                <ul className="flex flex-col items-center space-y-6 w-full max-w-sm">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="w-full"
                    >
                      <motion.a
                        href={item.href}
                        className={`flex items-center gap-4 w-full p-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                          item.label === 'Freelancing'
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-xl border border-purple-400/50'
                            : activeSection === item.section
                            ? `bg-gradient-to-r ${colorSchemes[colorScheme]} text-white shadow-xl`
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={playHoverSound}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavClick(item.href, item.isExternal)
                        }}
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <div className="flex items-center gap-2">
                          {item.label}
                          {item.label === 'Freelancing' && (
                            <span className="px-2 py-1 bg-white/20 rounded text-sm">New</span>
                          )}
                        </div>
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
