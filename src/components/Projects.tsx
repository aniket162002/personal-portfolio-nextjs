'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { personalData } from '@/lib/utils'
import { Code, Calendar, ExternalLink, Github } from 'lucide-react'

export default function Projects() {
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simple cleanup function for any future animations
    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <div ref={projectsRef} className="min-h-screen flex items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gray-900/15">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-white">
            Featured <span className="text-primary-400">Projects</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A showcase of my technical projects and development work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {personalData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6 hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105 h-full flex flex-col shadow-lg hover:shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-primary-600/20 p-2 sm:p-3 rounded-lg">
                    <Code className="text-primary-400" size={20} />
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar size={14} className="mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{project.date}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors break-words">
                  {project.title}
                </h3>

                <p className="text-gray-300 mb-4 flex-grow text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs hover:bg-primary-600/20 hover:text-primary-300 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-3 mt-auto">
                  <button className="flex items-center space-x-1.5 sm:space-x-2 text-gray-400 hover:text-primary-400 transition-colors">
                    <Github size={14} />
                    <span className="text-xs sm:text-sm">Code</span>
                  </button>
                  <button className="flex items-center space-x-1.5 sm:space-x-2 text-gray-400 hover:text-primary-400 transition-colors">
                    <ExternalLink size={14} />
                    <span className="text-xs sm:text-sm">Demo</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}