'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Globe, Send } from 'lucide-react';
import { personalData } from '@/lib/utils';

export default function Contact() {
  const contactRef = useRef<HTMLDivElement>(null);

  const contactInfo = [
    { icon: Mail, label: 'Email', value: personalData.email, href: `mailto:${personalData.email}` },
    { icon: Phone, label: 'Phone', value: personalData.phone, href: `tel:${personalData.phone}` },
    { icon: Github, label: 'GitHub', value: personalData.github, href: `https://${personalData.github}` },
    { icon: Linkedin, label: 'LinkedIn', value: personalData.linkedin, href: `https://${personalData.linkedin}` },
    { icon: Globe, label: 'Website', value: personalData.website, href: `https://${personalData.website}` },
  ];

  return (
    <div ref={contactRef} className="min-h-screen flex items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gray-900/25">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Get In <span className="text-primary-400">Touch</span></h2>
          <p className="text-gray-300 max-w-xl mx-auto">Let's discuss opportunities and bring your ideas to life.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-50px' }}
            className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Contact Info</h3>
            <div className="space-y-5">
              {contactInfo.map(({ icon: Icon, label, value, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 hover:bg-gray-700/50 p-3 rounded-lg transition"
                >
                  <div className="bg-primary-600/20 p-3 rounded-lg">
                    <Icon className="text-primary-400" size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{label}</p>
                    <p className="text-white break-all">{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-50px' }}
            className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form
              action="https://getform.io/f/0167c781-398a-4e0e-ac0c-9e5b282d4ab9"
              method="POST"
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="text-gray-300 block mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full bg-gray-700/50 border border-gray-600 text-white px-4 py-2 rounded-lg placeholder-gray-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-gray-300 block mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full bg-gray-700/50 border border-gray-600 text-white px-4 py-2 rounded-lg placeholder-gray-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-gray-300 block mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Your message..."
                  className="w-full bg-gray-700/50 border border-gray-600 text-white px-4 py-2 rounded-lg placeholder-gray-400 focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2"
              >
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
