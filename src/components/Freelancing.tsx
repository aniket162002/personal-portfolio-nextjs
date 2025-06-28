'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalData } from '@/lib/utils'
import { 
  Star, 
  ExternalLink, 
  FileText, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Award, 
  Clock,
  Briefcase,
  Mail,
  Phone,
  Calendar
} from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'

export default function Freelancing() {
  const freelancingRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState('projects')
  const [selectedProject, setSelectedProject] = useState(0)
  const { colorScheme } = useThemeStore()

  const colorSchemes = {
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-emerald-500',
    orange: 'from-orange-500 to-red-500',
    pink: 'from-pink-500 to-rose-500',
    cyan: 'from-cyan-500 to-blue-500'
  }

  const tabs = [
    { id: 'projects', label: 'Featured Projects', icon: '🚀' },
    { id: 'services', label: 'Services', icon: '⚡' },
    { id: 'testimonials', label: 'Testimonials', icon: '💬' },
    { id: 'process', label: 'Process', icon: '🔄' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedProject((prev) =>
        (prev + 1) % personalData.freelancing.projects.length
      )
    }, 5000)

    // Add floating animation to background elements
    const initFloatingAnimation = async () => {
      try {
        const { gsap } = await import('gsap')

        // Animate floating elements
        gsap.to('.floating-element', {
          y: -20,
          duration: 3,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.5
        })

        // Animate gradient backgrounds
        gsap.to('.gradient-bg', {
          backgroundPosition: '200% center',
          duration: 8,
          ease: "none",
          repeat: -1
        })
      } catch (error) {
        console.error("Failed to initialize floating animations:", error)
      }
    }

    initFloatingAnimation()

    return () => clearInterval(interval)
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
        }`}
      />
    ))
  }

  return (
    <div ref={freelancingRef} className="min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-xl"></div>
        <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-green-500/10 rounded-full blur-lg"></div>
        <div className="floating-element absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
        <div className="floating-element absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-xl"></div>
        <div className="floating-element absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
              💼 Available for Freelance Projects
            </span>
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Freelance <span className={`bg-gradient-to-r ${colorSchemes[colorScheme]} bg-clip-text text-transparent`}>
              Development
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Transform your ideas into powerful digital solutions. I specialize in creating 
            high-quality web applications, mobile apps, and AI-powered systems that drive business growth.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {[
              { label: 'Projects Completed', value: personalData.freelancing.stats.projectsCompleted, icon: '🚀' },
              { label: 'Happy Clients', value: personalData.freelancing.stats.clientsSatisfied, icon: '😊' },
              { label: 'Years Experience', value: personalData.freelancing.stats.yearsExperience, icon: '⭐' },
              { label: 'Technologies', value: personalData.freelancing.stats.technologiesUsed, icon: '🛠️' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-xl md:text-2xl mb-2">{stat.icon}</div>
                <div className={`text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${colorSchemes[colorScheme]} bg-clip-text text-transparent`}>
                  {stat.value}+
                </div>
                <div className="text-gray-400 text-xs md:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r ${colorSchemes[colorScheme]} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-sm md:text-base`}
            >
              <Mail size={20} />
              Start Your Project
              <ArrowRight size={16} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 md:px-8 py-3 md:py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2 text-sm md:text-base"
            >
              <Calendar size={20} />
              Schedule Consultation
            </motion.button>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 text-sm md:text-base ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${colorSchemes[colorScheme]} text-white shadow-lg`
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'projects' && (
              <div className="space-y-8">
                {/* Featured Project Carousel */}
                <div className="relative">
                  <motion.div
                    key={selectedProject}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`px-3 py-1 bg-gradient-to-r ${personalData.freelancing.projects[selectedProject].color} text-white text-sm rounded-full`}>
                            {personalData.freelancing.projects[selectedProject].category}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {personalData.freelancing.projects[selectedProject].date}
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          {personalData.freelancing.projects[selectedProject].title}
                        </h3>

                        <p className="text-gray-300 mb-6 leading-relaxed">
                          {personalData.freelancing.projects[selectedProject].description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {personalData.freelancing.projects[selectedProject].technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-sm hover:bg-purple-600/20 hover:text-purple-300 transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            <ExternalLink size={16} />
                            View Live
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <FileText size={16} />
                            Case Study
                          </motion.button>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                          <div className="text-6xl">
                            {personalData.freelancing.projects[selectedProject].category === 'Mobile Development' ? '📱' :
                             personalData.freelancing.projects[selectedProject].category === 'Web Development' ? '🌐' :
                             personalData.freelancing.projects[selectedProject].category === 'Machine Learning' ? '🤖' : '💼'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Project Navigation */}
                  <div className="flex justify-center gap-2 mt-6">
                    {personalData.freelancing.projects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedProject(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === selectedProject
                            ? `bg-gradient-to-r ${colorSchemes[colorScheme]}`
                            : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {personalData.freelancing.services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                    <div className="flex items-center gap-4 mb-4 relative z-10">
                      <div className={`text-4xl p-3 bg-gradient-to-r ${service.color} rounded-xl`}>
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                          {service.title}
                        </h3>
                        <p className={`text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                          {service.pricing}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed relative z-10">
                      {service.description}
                    </p>

                    <div className="space-y-2 mb-6 relative z-10">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3 bg-gradient-to-r ${service.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 relative z-10`}
                    >
                      Get Quote
                      <ArrowRight size={16} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {personalData.freelancing.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.position}</p>
                        <p className="text-gray-500 text-xs">{testimonial.company}</p>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-purple-400">{testimonial.project}</span>
                      <span className="text-gray-500">{testimonial.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'process' && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    My Development Process
                  </h3>
                  <p className="text-gray-300 max-w-2xl mx-auto">
                    A proven methodology that ensures quality delivery and client satisfaction
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {personalData.freelancing.process.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 text-center">
                        <div className={`w-16 h-16 bg-gradient-to-r ${colorSchemes[colorScheme]} rounded-full flex items-center justify-center text-2xl mx-auto mb-4`}>
                          {step.icon}
                        </div>

                        <div className={`text-sm font-bold bg-gradient-to-r ${colorSchemes[colorScheme]} bg-clip-text text-transparent mb-2`}>
                          Step {step.step}
                        </div>

                        <h4 className="text-white font-semibold mb-3">{step.title}</h4>

                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                          {step.description}
                        </p>

                        <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                          <Clock size={12} />
                          {step.duration}
                        </div>
                      </div>

                      {index < personalData.freelancing.process.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's discuss your ideas and create something amazing together.
              I'm available for new projects and would love to hear about your vision.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-6 md:mb-8">
              <motion.a
                href="mailto:shindeaniketa7328@gmail.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r ${colorSchemes[colorScheme]} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-sm md:text-base w-full sm:w-auto justify-center`}
              >
                <Mail size={20} />
                Get In Touch
                <ArrowRight size={16} />
              </motion.a>

              <motion.a
                href="tel:+919819394470"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 md:px-8 py-3 md:py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2 text-sm md:text-base w-full sm:w-auto justify-center"
              >
                <Phone size={20} />
                Call Now
              </motion.a>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                Free Consultation
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                Quick Response
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                Quality Guaranteed
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
