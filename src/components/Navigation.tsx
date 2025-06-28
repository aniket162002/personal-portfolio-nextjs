'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { personalData } from '@/lib/utils'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { label: 'Home', href: '#hero', section: 'hero' },
    { label: 'About', href: '#about', section: 'about' },
    { label: 'Skills', href: '#skills', section: 'skills' },
    { label: 'Experience', href: '#experience', section: 'experience' },
    { label: 'Education', href: '#education', section: 'education' },
    { label: 'Projects', href: '#projects', section: 'projects' },
    { label: 'Certificates', href: '#certificates', section: 'certificates' },
    { label: 'Contact', href: '#contact', section: 'contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
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

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-500 ${
          scrolled ? 'bg-black/80 backdrop-blur-lg py-3 shadow-lg' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <motion.a
              href="#hero"
              className="text-2xl font-bold text-white tracking-normal hover:text-primary-400 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {personalData.name.split(' ')[0]}<span className="text-primary-500">.</span>
            </motion.a>
            
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <a
                    href={item.href}
                    className={`relative text-sm font-medium transition-all duration-300 tracking-normal hover:scale-105 ${
                      activeSection === item.section
                        ? 'text-primary-400'
                        : 'text-white/80 hover:text-white'
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector(item.href)?.scrollIntoView({
                        behavior: 'smooth'
                      })
                    }}
                  >
                    {item.label}
                    {activeSection === item.section && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-400 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className={`p-4 transition-all duration-500 ${
          scrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}>
          <div className="flex justify-between items-center">
            <motion.a
              href="#hero"
              className="text-xl font-bold text-white tracking-normal hover:text-primary-400 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {personalData.name.split(' ')[0]}<span className="text-primary-500">.</span>
            </motion.a>
            
            <button
              onClick={() => setIsOpen(true)}
              className="text-white p-2"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gray-900/95 backdrop-blur-md z-50 flex flex-col"
            >
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white p-2"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex flex-col items-center justify-center flex-1">
                <ul className="flex flex-col items-center space-y-6">
                  {navItems.map((item) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <a 
                        href={item.href}
                        className={`text-xl font-medium tracking-normal ${
                          activeSection === item.section 
                            ? 'text-primary-400' 
                            : 'text-white/80'
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          document.querySelector(item.href)?.scrollIntoView({
                            behavior: 'smooth'
                          })
                          setIsOpen(false)
                        }}
                      >
                        {item.label}
                      </a>
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