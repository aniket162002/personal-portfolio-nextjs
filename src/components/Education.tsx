'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { personalData } from '@/lib/utils'
import { GraduationCap, Calendar, Award } from 'lucide-react'

export default function Education() {
  const educationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simple cleanup function for any future animations
    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <div ref={educationRef} className="min-h-screen flex items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gray-900/5">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-white">
            My <span className="text-primary-400">Education</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Academic background and qualifications that shaped my technical foundation
          </p>
        </motion.div>

        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {personalData.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6 hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start space-x-3 sm:space-x-4 mb-4 lg:mb-0">
                    <div className="bg-primary-600/20 p-2 sm:p-3 rounded-lg flex-shrink-0">
                      <GraduationCap className="text-primary-400" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 break-words">
                        {edu.degree}
                      </h3>
                      <p className="text-gray-300 font-medium text-sm sm:text-base break-words">
                        {edu.institution}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-0 lg:space-y-2">
                    <div className="flex items-center text-gray-400">
                      <Calendar size={14} className="mr-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{edu.duration}</span>
                    </div>
                    <div className="flex items-center text-primary-400">
                      <Award size={14} className="mr-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium">{edu.grade}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
