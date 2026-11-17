import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import contactBanner from '../assets/contact-banner.JPG'

const EMPTY = { name: '', from_email: '', tattoo_idea: '', approx_size: '', colour_preference: '', placement: '', existing_pieces: '', availability: '' }

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
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '5836a4fe-b450-4196-ac44-20ce93dad79e',
          ...form,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setForm(EMPTY)
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <PageTransition>
      <div
        className="pt-40 pb-24 px-6 text-center"
        style={{
          backgroundImage: `url(${contactBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
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
                  Your message has been sent, I'll get back to you as soon as possible!
                </p>
                <button onClick={() => setStatus('idle')} className="mt-8 btn-primary">
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className={labelClass} htmlFor="name">Your name</label>
                  <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="from_email">Email address</label>
                  <input id="from_email" name="from_email" type="email" required value={form.from_email} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="tattoo_idea">Tell me about your tattoo idea - describe your idea, as much detail as possible!</label>
                  <textarea
                    id="tattoo_idea"
                    name="tattoo_idea"
                    required
                    rows={3}
                    value={form.tattoo_idea}
                    onChange={handleChange}
                    placeholder="Tell me about your tattoo idea - describe your idea, as much detail as possible!"
                    className="input-field resize-none"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="approx_size">Approximate size (cm/inches)</label>
                  <input id="approx_size" name="approx_size" type="text" required value={form.approx_size} placeholder="eg: 10cm" onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="colour_preference">Colour, or black & grey?</label>
                  <input id="colour_preference" name="colour_preference" type="text" required value={form.colour_preference} placeholder="eg: Black & grey" onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="placement">Placement, where would you like your tattoo to go?</label>
                  <input id="placement" name="placement" type="text" required value={form.placement} placeholder="eg: Inner bicep" onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="existing_pieces">Any existing tattoos that we'd need to work around?</label>
                  <input id="existing_pieces" name="existing_pieces" type="text" required value={form.existing_pieces} placeholder="eg: I have a small piece towards inner elbow" onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="availability">Availability, can you do weekdays or prefer weekends?</label>
                  <input id="availability" name="availability" type="text" required value={form.availability} placeholder="eg: I'm only available on Saturdays" onChange={handleChange} className="input-field" />
                </div>

                {status === 'error' && (
                  <p className="text-red-600 text-xs font-body">
                    Something went wrong — please try again later.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
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