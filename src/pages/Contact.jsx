import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import PageTransition from '../components/PageTransition.jsx'

// EmailJS values are read from .env (see .env.example)
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const PROJECT_TYPES = [
  'Traditional',
  'Japanese',
  'Neo-traditional',
  'Custom work',
  'Other',
]

const EMPTY = { from_name: '', from_email: '', project_type: '', message: '' }

const labelClass = 'block text-xs tracking-widest uppercase text-ink/50 mb-2'

export default function Contact() {
  const formRef = useRef(null)
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      setStatus('success')
      setForm(EMPTY)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <PageTransition>
      <div className="bg-ink pt-40 pb-24 px-6 text-center">
        <h1 className="font-display text-5xl md:text-6xl text-cream leading-tight">Get in touch</h1>
      </div>

      <section className="bg-cream py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <p className="section-label mb-6">Enquiry form</p>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-gold pt-8"
              >
                <p className="font-display text-2xl text-ink mb-3">Thank you.</p>
                <p className="text-ink/60 font-body font-light text-sm leading-relaxed">
                  Your message is on its way. We aim to reply within two working days.
                </p>
                <button onClick={() => setStatus('idle')} className="mt-8 btn-primary">
                  Send another
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className={labelClass} htmlFor="from_name">Your name</label>
                  <input id="from_name" name="from_name" type="text" required value={form.from_name} onChange={handleChange} placeholder="Jane Smith" className="input-field" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="from_email">Email address</label>
                  <input id="from_email" name="from_email" type="email" required value={form.from_email} onChange={handleChange} placeholder="jane@example.com" className="input-field" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="message">Tell me about your tattoo idea - describe your idea, approximate size, colour or black/grey, availability, as much detail as possible!</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your idea, approximate size, colour or black/grey, availability, as much detail as possible!"
                    className="input-field resize-none"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="project_type">Tattoo type</label>
                  <select id="project_type" name="project_type" value={form.project_type} onChange={handleChange} className="input-field bg-transparent">
                    <option value="">Select one…</option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {status === 'error' && (
                  <p className="text-red-600 text-xs font-body">
                    Something went wrong — please try emailing me directly at raisingcainsigns@gmail.co.uk
                  </p>
                )}

                <button type="submit" disabled className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                {/* <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"> */}
                  {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
