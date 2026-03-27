import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'
import AnimatedSection from '../components/AnimatedSection'

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'Dr. Vishnuvardhan Road, R R Nagar Post, Channasandra, Bengaluru - 560098', color: 'text-orange-500' },
  { icon: Phone, label: 'Phone', value: '+91 80 2441 0020 / 21', color: 'text-green-500' },
  { icon: Mail, label: 'Email', value: 'admissions@rnsit.ac.in', color: 'text-purple-500' },
  { icon: Clock, label: 'Office Hours', value: 'Mon-Sat: 9:00 AM - 5:00 PM', color: 'text-orange-500' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (form.message.length < 10) e.message = 'Message must be at least 10 characters'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        setForm({ name: '', email: '', subject: '', message: '' })
        setErrors({})
      } else {
        setErrors({ submit: data.error || 'Something went wrong. Please try again.' })
      }
    } catch {
      setErrors({ submit: 'Could not connect to server. Please try again later.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setForm(p => ({ ...p, [field]: value }))
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }))
  }

  return (
    <div className="t-bg" style={{ minHeight: '100vh' }}>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you"
        breadcrumb="Home / Contact" />

      <section className="section-padding max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <AnimatedSection direction="right">
            <h2 className="text-2xl font-bold t-h mb-6">Get in <span className="text-gradient">Touch</span></h2>
            <div className="space-y-4 mb-8">
              {contactInfo.map(({ icon: Icon, label, value, color }, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl t-bg-alt card">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'var(--surface)' }}>
                    <Icon size={18} className={color} />
                  </div>
                  <div>
                    <div className="text-xs t-s mb-0.5">{label}</div>
                    <div className="text-sm font-medium t-b">{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--card-border)' }}>
              <iframe
                title="RNSIT Map"
                src="https://maps.google.com/maps?q=RNS+Institute+of+Technology,+Dr+Vishnuvardhan+Road,+RR+Nagar,+Bengaluru+560098&output=embed&z=16"
                width="100%" height="250" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              />
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection direction="left">
            <div className="card rounded-2xl p-8">
              <h2 className="text-2xl font-bold t-h mb-6">Send a <span className="text-gradient">Message</span></h2>
              <AnimatePresence>
                {submitted && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl mb-6"
                    style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}>
                    <CheckCircle size={20} className="text-green-500" />
                    <span className="text-green-600 text-sm font-medium">Message sent! We will get back to you soon.</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { field: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                  { field: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                  { field: 'subject', label: 'Subject', type: 'text', placeholder: 'How can we help?' },
                ].map(({ field, label, type, placeholder }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium t-b mb-1">{label}</label>
                    <input type={type} placeholder={placeholder} value={form[field]}
                      onChange={e => handleChange(field, e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all t-h"
                      style={{
                        background: 'var(--bg-alt)',
                        border: errors[field] ? '1px solid #ef4444' : '1px solid var(--card-border)',
                      }}
                    />
                    {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium t-b mb-1">Message</label>
                  <textarea rows={4} placeholder="Write your message here..." value={form.message}
                    onChange={e => handleChange('message', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all resize-none t-h"
                    style={{
                      background: 'var(--bg-alt)',
                      border: errors.message ? '1px solid #ef4444' : '1px solid var(--card-border)',
                    }}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 text-sm disabled:opacity-60">
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </button>
                {errors.submit && (
                  <p className="text-red-500 text-xs text-center mt-2">{errors.submit}</p>
                )}
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
