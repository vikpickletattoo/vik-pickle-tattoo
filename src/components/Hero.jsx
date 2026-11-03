import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { slides } from '../data/slides.js'

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[index]

  return (
    <div className="relative w-full h-screen overflow-hidden bg-ink">
      <AnimatePresence mode="sync">
        <motion.img
          key={slide.id}
          src={slide.src}
          alt={slide.alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 0.55, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/70" />

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        {/* <motion.h1
          className="font-display text-5xl md:text-7xl text-cream leading-tight max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          Banner <em className="text-gold">text</em>
        </motion.h1>
        <motion.p
          className="mt-6 text-cream/70 font-body font-light text-lg max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Subtitle text
        </motion.p> */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          <Link className="btn-secondary" to="/gallery">View Gallery</Link>
          <Link className="btn-secondary" to="/contact">Get in touch</Link>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-8 transition-all duration-500 h-6 rounded-xl ${i === index ? 'bg-gold' : 'bg-cream/40'}`}
          />
        ))}
      </div>
    </div>
  )
}
