'use client'

import { motion } from 'framer-motion'
import { Heart, Github, Linkedin, Mail, Phone, Globe } from 'lucide-react'
import { personalData } from '@/lib/utils'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: `https://${personalData.github}`, label: 'GitHub' },
    { icon: Linkedin, href: `https://${personalData.linkedin}`, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${personalData.email}`, label: 'Email' },
    { icon: Phone, href: `tel:${personalData.phone}`, label: 'Phone' },
    { icon: Globe, href: `https://${personalData.website}`, label: 'Website' },
  ]

  return (
    <footer className="relative bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50 py-8 sm:py-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
              {personalData.name}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {personalData.subtitle} passionate about creating innovative solutions and bringing ideas to life.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
              Quick Links
            </h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-300 hover:text-primary-400 transition-colors text-sm sm:text-base px-2 py-1 rounded hover:bg-gray-800/50"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
              Connect With Me
            </h3>
            <div className="flex justify-center md:justify-end gap-3 sm:gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-800/50 hover:bg-primary-600/20 p-2 sm:p-3 rounded-full transition-all duration-300 group border border-gray-700/50 hover:border-primary-500/50"
                    aria-label={social.label}
                  >
                    <Icon 
                      size={16} 
                      className="text-gray-300 group-hover:text-primary-400 transition-colors sm:w-5 sm:h-5" 
                    />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/50 pt-6 sm:pt-8">
          {/* Made with Love Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <span className="text-gray-300 text-sm sm:text-base">Made with</span>
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="heart-beat"
              >
                <Heart
                  size={20}
                  className="text-red-500 fill-current sm:w-6 sm:h-6 drop-shadow-lg"
                />
              </motion.div>
              <span className="text-gray-300 text-sm sm:text-base">by</span>
              <motion.span
                whileHover={{ scale: 1.1, y: -2 }}
                className="font-bold text-sm sm:text-base gradient-text-animated cursor-pointer"
              >
                Aniket Shinde
              </motion.span>
            </div>
            
            <p className="text-gray-400 text-xs sm:text-sm">
              © {currentYear} All rights reserved. Built with Next.js, Tailwind CSS, and Framer Motion.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </footer>
  )
}
