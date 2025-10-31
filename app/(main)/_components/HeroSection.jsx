'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { BookOpen, Mic, BrainCircuit, CheckCircle } from 'lucide-react'

function HeroSection() {
  const router = useRouter()

  // animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const features = [
    { 
      title: "Mock Interview Simulations", 
      description: "Practice key roles like 'Nepali speaking' or 'Filmmaking' with instant feedback to perfect your delivery and confidence.", 
      icon: Mic, 
      color: "bg-rose-50 border-rose-300 text-rose-600 hover:bg-rose-100" 
    },
    { 
      title: "Topic-Based Lectures", 
      description: "Access deep-dive sessions across diverse fields, from 'World Football' strategies to advanced 'Language Classes'.", 
      icon: BookOpen, 
      color: "bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100" 
    },
    { 
      title: "Quiz Preparation", 
      description: "Test your knowledge on specific subjects like 'America' or general knowledge with rigorous quiz formats.", 
      icon: BrainCircuit, 
      color: "bg-emerald-50 border-emerald-300 text-emerald-600 hover:bg-emerald-100" 
    },
    { 
      title: "Ques & Ans Refinement", 
      description: "Dedicated sessions to sharpen your responses, ensuring you are ready for any academic or professional Q&A.", 
      icon: CheckCircle, 
      color: "bg-amber-50 border-amber-300 text-amber-600 hover:bg-amber-100" 
    },
  ]

  return (
    <div className="relative mt-10 text-gray-800 overflow-hidden">

      {/* HERO SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.15 }}
        className="text-center mb-16 px-4 sm:px-6 lg:px-24"
      >
        <motion.h1
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900"
        >
          Master Your Skills
          <br />
          <span className="text-indigo-600">With AI-Powered Coaching.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto mt-10 mb-8"
        >
          Your personalized dashboard for <strong>Topic-based Lectures</strong>, <strong>Mock Interviews</strong>, and <strong>Quiz Preparation</strong> "all in one place".
        </motion.p>

        <motion.div variants={fadeUp} className="flex justify-center mt-8">
          <Button
            onClick={() => router.push('/dashboard')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.03] transition-all duration-300 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
          >
            Start Your First Lecture
          </Button>
        </motion.div>
      </motion.section>

      {/* FEATURES SECTION */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-10 px-4 sm:px-6 lg:px-24"
      >
        <motion.h2
          variants={fadeUp}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800"
        >
          Everything You Need to Succeed
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`p-5 sm:p-6 rounded-2xl border ${feature.color} shadow-md transition-all duration-300 hover:shadow-xl`}
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="inline-block"
              >
                <feature.icon className={`w-8 h-8 sm:w-10 sm:h-10 mb-3 ${feature.color.split(' ')[2]}`} />
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-center py-12 sm:py-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl mx-4 sm:mx-6 lg:mx-24 my-16 shadow-2xl text-white"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Ready to Accelerate Your Learning?
        </h2>
        <p className="text-base sm:text-lg text-indigo-100 mb-8 max-w-xl sm:max-w-2xl mx-auto">
          Join thousands of learners like <span className="font-semibold text-white">Nishan</span> who are using personalized prep tools for real-world success.
        </p>
        <Button
          onClick={() => router.push('/dashboard')}
          className="bg-white text-indigo-700 font-semibold hover:bg-gray-100 hover:scale-[1.05] transform duration-300 shadow-md text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
        >
          Get Started Now
        </Button>
      </motion.section>
    </div>
  )
}

export default HeroSection
