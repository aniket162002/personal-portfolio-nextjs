'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { personalData } from '@/lib/utils'
import { Award, Trophy, Calendar } from 'lucide-react'

export default function Certificates() {
  const certificatesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simple cleanup function for any future animations
    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <div ref={certificatesRef} className="min-h-screen flex items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gray-900/20">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-white">
            Certificates & <span className="text-primary-400">Achievements</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Professional certifications and notable achievements in my career
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Certificates Section */}
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 md:mb-6 flex items-center">
              <Award className="text-primary-400 mr-2 sm:mr-3" size={20} />
              Certificates
            </h3>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {personalData.certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 sm:p-4 md:p-6 hover:border-primary-500/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2 break-words">
                      {cert.title}
                    </h4>
                    <div className="flex items-center text-gray-400">
                      <Calendar size={12} className="mr-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{cert.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 md:mb-6 flex items-center">
              <Trophy className="text-accent-400 mr-2 sm:mr-3" size={20} />
              Achievements
            </h3>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {personalData.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 sm:p-4 md:p-6 hover:border-accent-500/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2 break-words">
                      {achievement.title}
                    </h4>
                    <div className="flex items-center text-gray-400">
                      <Calendar size={12} className="mr-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{achievement.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}