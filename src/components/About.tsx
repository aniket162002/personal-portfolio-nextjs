'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { personalData } from '@/lib/utils'

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simple cleanup function for any future animations
    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <div ref={aboutRef} className="min-h-screen flex items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gray-900/20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-white tracking-normal text-center"
          >
            About <span className="text-primary-400">Me</span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-300 text-base sm:text-lg leading-relaxed text-center lg:text-left"
              >
                {personalData.summary}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-3 sm:space-y-4 bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
                  <span className="text-primary-400 font-semibold text-sm sm:text-base min-w-[80px]">Name:</span>
                  <span className="text-white text-sm sm:text-base">{personalData.name}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
                  <span className="text-primary-400 font-semibold text-sm sm:text-base min-w-[80px]">Email:</span>
                  <span className="text-white text-sm sm:text-base break-all">{personalData.email}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
                  <span className="text-primary-400 font-semibold text-sm sm:text-base min-w-[80px]">Phone:</span>
                  <span className="text-white text-sm sm:text-base">{personalData.phone}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
                  <span className="text-primary-400 font-semibold text-sm sm:text-base min-w-[80px]">Website:</span>
                  <span className="text-white text-sm sm:text-base break-all">{personalData.website}</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative order-1 lg:order-2 flex justify-center"
            >
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
                {/* Animated background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-400 via-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>

                {/* Main card */}
                <div className="relative w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105">
                  <div className="absolute inset-0 w-full h-full bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl flex items-center justify-center border border-gray-700/50">
                    <div className="text-center">
                      <span className="text-4xl sm:text-5xl md:text-6xl mb-2 block">👨‍💻</span>
                      <div className="text-white text-sm font-medium opacity-80">Full Stack Developer</div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-400 rounded-full animate-bounce opacity-80"></div>
                <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-purple-500 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}