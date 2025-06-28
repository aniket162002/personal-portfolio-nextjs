'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { personalData } from '@/lib/utils'
import { Calendar, Building } from 'lucide-react'

export default function Experience() {
  const experienceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simple cleanup function for any future animations
    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <div ref={experienceRef} className="min-h-screen flex items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gray-900/10">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-white">
            Work <span className="text-primary-400">Experience</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            My professional journey and key contributions in various roles
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500 hidden lg:block"></div>

          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {personalData.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 sm:left-6 w-3 h-3 sm:w-4 sm:h-4 bg-primary-500 rounded-full border-2 sm:border-4 border-gray-900 hidden lg:block"></div>

                <div className="lg:ml-16 xl:ml-20 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6 hover:border-primary-500/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="mb-3 lg:mb-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 break-words">
                        {exp.position}
                      </h3>
                      <div className="flex items-center text-primary-400 mb-2">
                        <Building size={14} className="mr-2 flex-shrink-0" />
                        <span className="font-medium text-sm sm:text-base break-words">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Calendar size={14} className="mr-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{exp.duration}</span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start text-gray-300">
                        <span className="text-primary-400 mr-2 mt-1.5 flex-shrink-0">•</span>
                        <span className="text-sm sm:text-base leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
