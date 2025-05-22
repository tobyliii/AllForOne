'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { google } from 'googleapis' // ⛔ remove this

export default function HomePage() {
  const [showNavbar, setShowNavbar] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Toggle navbar when scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > window.innerHeight - 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSubmission = () => {
    const section = document.getElementById('submit')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="bg-black text-white overflow-x-hidden">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          showNavbar ? 'opacity-100 backdrop-blur-md' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-3 bg-black">
          <div className="w-1/3" />
          <motion.div 
            className="w-1/3 flex justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/images/AllForOneLogo.jpg"
              alt="All for One Logo"
              width={50}
              height={50}
              className="object-contain rounded-full"
            />
          </motion.div>
          <div className="w-1/3 flex justify-end">
            <motion.button
              onClick={scrollToSubmission}
              className="px-6 py-2 bg-blue-700 rounded-full text-white font-semibold hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Submit your photo for spaceflight"
            >
              Submit Photo
            </motion.button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6">
        <Image
          src="/images/ns22_earthview.jpg"
          alt="Earth from Blue Origin flight"
          fill
          priority
          className="object-cover object-center z-0 brightness-[0.5]"
          sizes="100vw"
        />
        <motion.div 
          className="relative z-10 w-full flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Image
            src="/images/AllForOneTitlePage.png"
            alt="All For One Initiative - Send Your Photo to Space"
            width={700}
            height={200}
            className="object-contain max-w-full h-auto"
            priority
          />
        </motion.div>
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
        <p className="absolute bottom-4 right-4 text-sm text-white/70 z-10">
          Image credit: Blue Origin
        </p>
      </section>

      {/* RETURN */}
      <motion.section 
        className="bg-gradient-to-r from-blue-700 to-blue-800 text-white px-6 py-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <h2 className="text-4xl font-bold mb-6">
          Your Photo. Flown to Space. Returned to You.
        </h2>
        
      </motion.section>

      {/* HOW IT WORKS */}
      <motion.section 
        className="bg-gradient-to-r from-blue-800 to-blue-900 text-white px-6 py-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2 className="text-5xl font-bold mb-16 text-center" variants={fadeInUp}>
          How It Works
        </motion.h2>
        
        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 max-w-7xl mx-auto">
          <motion.div 
            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 shadow-xl"
            whileHover={{ scale: 1.05, y: -10 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg">
              1
            </div>
            <h4 className="font-bold text-white mb-3 text-xl">Submit</h4>
            <p className="text-blue-100">Upload your photo</p>
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 shadow-xl"
            whileHover={{ scale: 1.05, y: -10 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg">
              2
            </div>
            <h4 className="font-bold text-white mb-3 text-xl">Prepare</h4>
            <p className="text-blue-100">We print & pack for flight</p>
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 shadow-xl"
            whileHover={{ scale: 1.05, y: -10 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg">
              3
            </div>
            <h4 className="font-bold text-white mb-3 text-xl">Launch</h4>
            <p className="text-blue-100">Crosses Kármán Line - The internationally recognized boundary of space</p>
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 shadow-xl"
            whileHover={{ scale: 1.05, y: -10 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg">
              4
            </div>
            <h4 className="font-bold text-white mb-3 text-xl">Return</h4>
            <p className="text-blue-100">Photo is mailed back to you with an official "space-flown" stamp</p>
          </motion.div>
        </div>
      </motion.section>

      {/* CAMPAIGN */}
      <motion.section 
        className="bg-gray-900 text-white px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto">
          <motion.h2 className="text-4xl font-bold mb-12 text-center" variants={fadeInUp}>
            About the Initiative
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div 
              className="relative"
              variants={fadeInUp}
            >
              <div className="relative group">
                <Image
                  src="/images/Spacesuit.jpg"
                  alt="Child in astronaut spacesuit representing the future of space exploration"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </motion.div>
            
            {/* Text Content */}
            <motion.div className="space-y-6 text-lg leading-relaxed" variants={staggerContainer}>
              <motion.p variants={fadeInUp}>
                The All for One Initiative is a global spaceflight-inspired campaign dedicated to empowering the next generation of explorers. At its core, the initiative aims to ignite imagination, foster belonging, and build confidence in young people—especially those from historically underrepresented communities—by helping them see a future for themselves in space and STEM.
              </motion.p>
              <motion.p variants={fadeInUp}>
                Through emotionally resonant storytelling and bold, symbolic actions, the initiative provides children with a tangible connection to humanity's journey beyond Earth. It serves as a reminder that space is not just for astronauts or the elite, but for all of us—dreamers, doers, and future pioneers.
              </motion.p>
              <motion.p variants={fadeInUp}>
                All for One is about representation, inspiration, and building an inclusive vision of space exploration where every child can see themselves among the stars.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* SUBMISSION */}
      <motion.section 
        id="submit" 
        className="px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 className="text-4xl font-bold mb-6 text-center" variants={fadeInUp}>
            Join the Mission
          </motion.h2>
          
          {/* Enhanced CTA */}
          <motion.div className="flex flex-col items-center" variants={fadeInUp}>
            <div className="w-full max-w-4xl bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl shadow-2xl overflow-hidden p-12 text-center border border-blue-700/50">
              <div className="space-y-8">
                <motion.div 
                  className="bg-blue-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-12 h-12 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-4">Ready to Send Your Photo to Space?</h3>
                <p className="text-blue-200 mb-8 max-w-md mx-auto text-lg leading-relaxed">
                  Click below to open our submission form and upload your photo. Your photo will cross the Kármán Line and return to you as a space-flown keepsake.
                </p>
                <motion.a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfIaCToE_Oj742ji99ltppbhSloce6HArkC3B4JYGcpPUFfNg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full hover:from-blue-700 hover:to-blue-600 font-bold text-xl shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  aria-label="Submit your photo for Blue Origin spaceflight"
                >
                  Submit Your Photo →
                </motion.a>
                
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FOUNDER */}
      <motion.section 
        className="flex flex-col lg:flex-row items-center px-6 py-20 max-w-6xl mx-auto gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div className="w-full lg:w-1/2" variants={fadeInUp}>
          <div className="relative group">
            <Image
              src="/images/Founder.jpg"
              alt="Toby Li, Founder of All for One Initiative"
              width={500}
              height={500}
              className="rounded-lg object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          </div>
        </motion.div>
        <motion.div className="w-full lg:w-1/2 space-y-6" variants={fadeInUp}>
          <h2 className="text-4xl font-bold">Our Founder</h2>
          <p className="leading-relaxed text-lg">
            <strong>Toby Li</strong> is an incoming Master of Science in Astronautical Engineering student at the University of Southern California and a soon-to-be Bachelor of Science in Aerospace Engineering graduate from UC Davis, with a proven track record of advancing equity in human spaceflight through research and outreach. His technical accomplishments include building an analog full-scale astronaut space habitat mockup for NASA-funded research and conducting bioastronautics research focused on understanding how the human body changes during spaceflight. Beyond academia, Toby has established himself as a prominent voice in space media, building a human spaceflight platform that reached over 16 million impressions in 2023 alone and earning interviews with major outlets including the BBC.
          </p>
          <p className="leading-relaxed text-lg">
            This platform has led to significant industry engagement - receiving media credentials to attend exclusive events by aerospace giants and served as a panelist speaker at the 2025 Canadian Space Conference discussing Canada's future in spaceflight. Toby also loves to seek adrenaline in his free time and has solo skydiver and PADI rescue scuba diver certifications.
          </p>
        </motion.div>
      </motion.section>

      {/* WATCH */}
      <motion.section 
        className="bg-black text-white px-6 py-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <h2 className="text-4xl font-bold mb-8 text-white">
          Watch Blue Origin's Last Human Spaceflight Mission
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/igQpRHCTd6s"
              title="Blue Origin Human Spaceflight Mission"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </motion.section>
      
      {/* FOOTER */}
      <footer className="bg-black text-center py-8">
        <div className="max-w-4xl mx-auto px-6">
          <p className="mb-4 text-gray-400">© 2025 All for One Initiative. Making space accessible for everyone.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors text-gray-400">Terms of Service</a>
            <a href="mailto:contact@allforone.space" className="hover:text-blue-400 transition-colors text-gray-400">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}