import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'
import AnimatedSection from '../components/AnimatedSection'

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'Dr. Vishnuvardhan Road, R.R. Nagar Post, Bengaluru - 560098', color: 'text-blue-500' },
  { icon: Phone, label: 'Phone', value: '+91 80 2860 5555 / 5556', color: 'text-green-500' },
  { icon: Mail, label: 'Email', value: 'info@rnsit.ac.in', color: 'text-purple-500' },
  { icon: Clock, label: 'Office Hours', value: 'Mon–Sat: 9:00 AM – 5:00 PM', color: 'text-orange-500' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (form.message.length < 10) e.message = 'Message must be at least 10 characters'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitted(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setErrors({})
  }

  const handleChange = (field, value) => {
    setForm(p => ({ ...p, [field]: value }))
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }))
  }

  return (
    <div className="t-bg" style={{ minHeight: "100vh" }}>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you"
        breadcrumb="Home / Contact"
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80" />

      <section className="section-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <AnimatedSection direction="right">
            <h2 className="text-2xl font-bold t-h mb-6">Get in <span className="text-gradient">Touch</span></h2>
            <div className="space-y-4 mb-8">
              {contactInfo.map(({ icon: Icon, label, value, color }, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-[rgba(15,23,42,0.5)] rounded-xl">
                  <div className={`w-10 h-10 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm shrink-0`}>
                    <Icon size={18} className={color} />
                  </div>
                  <div>
                    <div className="text-xs t-h-mut mb-0.5">{label}</div>
                    <div className="text-sm font-medium t-h-sec">{value}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-blue-500/10">
              <iframe
                title="RNSIT Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.5!3d12.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzAwLjAiTiA3N8KwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%" height="250" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              />
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection direction="left">
            <div className="rounded-2xl p-8 shadow-sm border border-blue-500/10" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
              <h2 className="text-2xl font-bold t-h mb-6">Send a <span className="text-gradient">Message</span></h2>
              <AnimatePresence>
                {submitted && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl mb-6"
                  >
                    <CheckCircle size={20} className="text-green-500" />
                    <span className="text-green-700 dark:text-green-400 text-sm font-medium">Message sent successfully! We'll get back to you soon.</span>
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
                    <label className="block text-sm font-medium t-h-sec mb-1">{label}</label>
                    <input type={type} placeholder={placeholder} value={form[field]}
                      onChange={e => handleChange(field, e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-[rgba(15,23,42,0.6)] t-h focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors[field] ? 'border-red-400' : 'border-blue-500/15'}`}
                    />
                    {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium t-h-sec mb-1">Message</label>
                  <textarea rows={4} placeholder="Write your message here..." value={form.message}
                    onChange={e => handleChange('message', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm bg-[rgba(15,23,42,0.6)] t-h focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${errors.message ? 'border-red-400' : 'border-blue-500/15'}`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 t-h font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Send size={16} /> Send Message
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
