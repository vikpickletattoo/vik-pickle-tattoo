import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import Hero from '../components/Hero.jsx'
import mothAndFlameShopfront from '../assets/moth-and-flame.png'
import oldMagicShopfront from '../assets/old-magic.png'


const services = [
  { title: 'Traditional', desc: 'short descriptions' },
  { title: 'Japanese Traditional', desc: 'short descriptions' },
  { title: 'Neo-traditional', desc: 'short descriptions' },
  { title: 'Custom work', desc: 'short descriptions' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
}

export default function Home() {
  return (
    <PageTransition>
      <Hero />

      <section className="bg-cream py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 text-center">
            <h2 className="section-title">Vik Pickle Tattoo</h2>
            <p className="mt-5 mb-3">
              blurb text goes here
            </p>
          </div>

          <h2 className="text-3xl flex justify-center mb-10">Specialities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="border-t border-gold pt-6"
              >
                <h3 className="font-display text-xl text-ink mb-3">{s.title}</h3>
                <p className="text-ink/60 font-body font-light text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="relative">
          <img
            src={oldMagicShopfront}
            alt="Old Magic Shop"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white p-4">
            <h3 className="text-2xl font-display mb-4">Old Magic Tattoo</h3>
            <p className="text-sm font-body mb-4">83 St. Dunstans St, Canterbury, CT2 8AD</p>
            <p className="text-sm font-body underline"><a target="_blank" aria-label="Instagram" href="https://www.instagram.com/oldmagictattoo/">@oldmagictattoo</a></p>
          </div>
        </div>

        <div className="relative">
          <img
            src={mothAndFlameShopfront}
            alt="Moth and Flame Shop"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white p-4">
            <h3 className="text-2xl font-display mb-4">Moth and Flame Tattoo</h3>
            <p className="text-sm font-body mb-4">79 Bromley Common, Bromley, BR2 9LP</p>
            <p className="text-sm font-body underline"><a target="_blank" aria-label="Instagram" href="https://www.instagram.com/mothandflametattoo/">@mothandflametattoo</a></p>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}