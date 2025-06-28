'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { personalData } from '@/lib/utils'

export default function Skills() {
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simple cleanup function for any future animations
    return () => {
      // Cleanup if needed
    }
  }, [])

  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: personalData.skills.programming,
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Web Frameworks',
      skills: personalData.skills.webFrameworks,
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'Mobile Development',
      skills: personalData.skills.mobile,
      color: 'from-orange-500 to-red-600'
    },
    {
      title: 'Databases',
      skills: personalData.skills.database,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Tools & Technologies',
      skills: personalData.skills.tools,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'Concepts',
      skills: personalData.skills.concepts,
      color: 'from-indigo-500 to-purple-600'
    }
  ]

  return (
    <div ref={skillsRef} className="min-h-screen flex items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gray-900/10">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-white text-center tracking-normal">
            Technical <span className="text-primary-400">Skills</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-primary-400/50 hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {category.skills && category.skills.length > 0 ? (
                    category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={`${skill}-${skillIndex}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-gradient-to-r ${category.color} text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default`}
                      >
                        {skill}
                      </motion.span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">No skills listed</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700/50"
          >
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
              I&apos;m passionate about learning new technologies and staying up-to-date with the latest trends in software development.
              My diverse skill set allows me to work on full-stack projects and adapt to various technical challenges.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
