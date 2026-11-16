import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import Hero from '../components/Hero.jsx'
import mothAndFlameShopfront from '../assets/moth-and-flame.png'
import oldMagicShopfront from '../assets/old-magic.jpeg'


const services = [
  { title: 'Traditional', desc: 'short descriptions' },
  { title: 'Japanese Traditional', desc: 'short descriptions' },
  { title: 'Fine line', desc: 'short descriptions' },
  { title: 'Custom work', desc: 'short descriptions' },
]

const studios = [
  {
    name: "Old Magic Tattoo",
    days: "Thursday - Saturday",
    address: "83 St. Dunstans St, Canterbury, CT2 8AD",
    instagram: "https://www.instagram.com/oldmagictattoo/",
    image: oldMagicShopfront,
  },
  {
    name: "Moth and Flame Tattoo",
    days: "Sunday - Tuesday",
    address: "79 Bromley Common, Bromley, BR2 9LP",
    instagram: "https://www.instagram.com/mothandflametattoo/",
    image: mothAndFlameShopfront,
  },
];

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
              I started in 2018 having developed my style in Japanese as well as traditional tattooing, dotwork and fine line. I work in both colour and black and grey, with custom pieces and flash work. Getting a tattoo is a personal experience with trust, communication and qiality of work being essential elements in my process and the experience I offer.
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
                {/* <p className="text-ink/60 font-body font-light text-sm leading-relaxed">{s.desc}</p> */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-0">
        {studios.map((studio, index) => (
          <div className="relative" key={index}>
            <div
              style={{
                backgroundImage: `url(${studio.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "500px", // Set a fixed height
              }}
              className="w-full"
            ></div>
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white p-4">
              <h3 className="text-2xl font-display mb-4">{studio.name}</h3>
              <p className="text-sm font-body mb-4">{studio.days}</p>
              <p className="text-sm font-body mb-4">{studio.address}</p>
              <p className="text-sm font-body underline">
                <a target="_blank" aria-label="Instagram" href={studio.instagram}>
                  @{studio.instagram.split("/").slice(-2, -1)}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </PageTransition>
  )
}