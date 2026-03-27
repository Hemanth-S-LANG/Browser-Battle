import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, User, Mail, Phone, BookOpen, Hash, Users, CheckCircle, AlertCircle, Send } from 'lucide-react'
import { allEvents } from '../data/eventsData'
import AnimatedSection from '../components/AnimatedSection'

const DEPARTMENTS = [
  'Computer Science & Engineering (CSE)',
  'CSE (AI & Machine Learning)',
  'CSE (Data Science)',
  'CSE (Cyber Security)',
  'Information Science & Engineering (ISE)',
  'Electronics & Communication Engineering (ECE)',
  'Electrical & Electronics Engineering (EEE)',
  'Mechanical Engineering',
  'Instrumentation Technology',
  'MBA', 'MCA',
]

const SEMESTERS = ['1st Sem', '2nd Sem', '3rd Sem', '4th Sem', '5th Sem', '6th Sem', '7th Sem', '8th Sem']
const SECTIONS = ['A', 'B', 'C', 'D', 'E']

const catColor = {
  Technical: '#f97316', Cultural: '#8b5cf6', Career: '#10b981',
  Sports: '#3b82f6', Academic: '#ec4899', Alumni: '#f59e0b',
  Social: '#06b6d4', default: '#6b7280',
}

function Field({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold t-b mb-1.5 flex items-center gap-1.5">
        <Icon size={13} style={{ color: 'var(--accent)' }} /> {label}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  )
}

export default function EventRegister() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = allEvents.find(e => e.id === parseInt(id))

  const [form, setForm] = useState({
    name: '', email: '', mobile: '', usn: '',
    department: '', semester: '', section: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!event) return (
    <div className="min-h-screen t-bg flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold t-h mb-3">Event not found</h2>
        <Link to="/events" className="text-orange-500 hover:underline">Back to Events</Link>
      </div>
    </div>
  )

  const color = catColor[event.category] || catColor.default

  const set = (field, val) => {
    setForm(p => ({ ...p, [field]: val }))
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email is required'
    if (!form.mobile.match(/^[6-9]\d{9}$/)) e.mobile = 'Valid 10-digit mobile number required'
    if (!form.usn.trim()) e.usn = 'USN is required'
    if (!form.department) e.department = 'Please select your department'
    if (!form.semester) e.semester = 'Please select your semester'
    if (!form.section) e.section = 'Please select your section'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-screen t-bg flex items-center justify-center px-4 pt-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center card rounded-2xl p-10">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: `${color}20`, border: `2px solid ${color}` }}>
            <CheckCircle size={40} style={{ color }} />
          </motion.div>
          <h2 className="text-2xl font-black t-h mb-2">Registration Successful!</h2>
          <p className="t-m mb-1">You're registered for</p>
          <p className="font-bold t-h mb-4">{event.title}</p>
          <div className="rounded-xl p-4 mb-6 text-left space-y-2 t-bg-alt">
            {[
              { label: 'Name', value: form.name },
              { label: 'USN', value: form.usn.toUpperCase() },
              { label: 'Department', value: form.department.split('(')[0].trim() },
              { label: 'Semester', value: form.semester },
              { label: 'Reg ID', value: `RNSIT-EVT-${event.id}-${Date.now().toString().slice(-5)}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="t-m">{label}</span>
                <span className="font-semibold t-h">{value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs t-m mb-6">A confirmation will be sent to <strong className="t-b">{form.email}</strong></p>
          <div className="flex gap-3">
            <Link to="/events" className="flex-1 btn-outline text-sm text-center py-3 rounded-xl">
              Back to Events
            </Link>
            <button onClick={() => window.print()}
              className="flex-1 py-3 rounded-xl text-white text-sm font-bold"
              style={{ background: color }}>
              Download Pass
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="t-bg min-h-screen pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4">

        {/* Back */}
        <Link to="/events" className="inline-flex items-center gap-2 text-sm t-m hover:text-orange-500 transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Events
        </Link>

        {/* Event Banner */}
        <AnimatedSection>
          <div className="relative h-40 rounded-2xl overflow-hidden mb-6">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" style={{ filter: 'brightness(0.4)' }} />
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <span className="inline-block px-2 py-0.5 rounded-full text-white text-xs font-bold mb-2 w-fit"
                style={{ background: color }}>{event.category}</span>
              <h1 className="text-xl font-black text-white">{event.title}</h1>
              <p className="text-white/70 text-xs mt-1">
                {new Date(event.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · {event.time} · {event.venue}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Form Card */}
        <AnimatedSection delay={0.1}>
          <div className="card rounded-2xl p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-black t-h">Event Registration</h2>
              <p className="text-sm t-m mt-1">Fill in your details to register for this event</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <Field label="Full Name *" icon={User} error={errors.name}>
                <input type="text" placeholder="Enter your full name" value={form.name}
                  onChange={e => set('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 t-h transition-all"
                  style={{ background: 'var(--bg-alt)', border: errors.name ? '1px solid #ef4444' : '1px solid var(--card-border)', focusRingColor: color }} />
              </Field>

              {/* Email + Mobile */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Email Address *" icon={Mail} error={errors.email}>
                  <input type="email" placeholder="your@email.com" value={form.email}
                    onChange={e => set('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none t-h transition-all"
                    style={{ background: 'var(--bg-alt)', border: errors.email ? '1px solid #ef4444' : '1px solid var(--card-border)' }} />
                </Field>
                <Field label="Mobile Number *" icon={Phone} error={errors.mobile}>
                  <div className="flex gap-2">
                    <span className="px-3 py-3 rounded-xl text-sm font-medium t-b shrink-0"
                      style={{ background: 'var(--bg-alt)', border: '1px solid var(--card-border)' }}>+91</span>
                    <input type="tel" placeholder="10-digit number" value={form.mobile}
                      onChange={e => set('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none t-h transition-all"
                      style={{ background: 'var(--bg-alt)', border: errors.mobile ? '1px solid #ef4444' : '1px solid var(--card-border)' }} />
                  </div>
                </Field>
              </div>

              {/* USN */}
              <Field label="USN (University Seat Number) *" icon={Hash} error={errors.usn}>
                <input type="text" placeholder="e.g. 1RN22CS001" value={form.usn}
                  onChange={e => set('usn', e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none t-h transition-all uppercase"
                  style={{ background: 'var(--bg-alt)', border: errors.usn ? '1px solid #ef4444' : '1px solid var(--card-border)' }} />
              </Field>

              {/* Department */}
              <Field label="Department *" icon={BookOpen} error={errors.department}>
                <select value={form.department} onChange={e => set('department', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none t-h transition-all"
                  style={{ background: 'var(--bg-alt)', border: errors.department ? '1px solid #ef4444' : '1px solid var(--card-border)' }}>
                  <option value="">Select Department</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </Field>

              {/* Semester + Section */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Semester *" icon={BookOpen} error={errors.semester}>
                  <select value={form.semester} onChange={e => set('semester', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none t-h transition-all"
                    style={{ background: 'var(--bg-alt)', border: errors.semester ? '1px solid #ef4444' : '1px solid var(--card-border)' }}>
                    <option value="">Select Semester</option>
                    {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Section *" icon={Users} error={errors.section}>
                  <select value={form.section} onChange={e => set('section', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none t-h transition-all"
                    style={{ background: 'var(--bg-alt)', border: errors.section ? '1px solid #ef4444' : '1px solid var(--card-border)' }}>
                    <option value="">Select Section</option>
                    {SECTIONS.map(s => <option key={s} value={s}>Section {s}</option>)}
                  </select>
                </Field>
              </div>

              {/* Capacity warning */}
              {event.registrations / event.capacity > 0.9 && (
                <div className="flex items-center gap-2 p-3 rounded-xl text-sm"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
                  <AlertCircle size={14} className="text-red-500 shrink-0" />
                  <span className="t-b">Only {event.capacity - event.registrations} spots remaining — register fast!</span>
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-60"
                style={{ background: `linear-gradient(135deg, ${color}, var(--accent2))`, boxShadow: `0 4px 20px ${color}40` }}>
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Registering...</>
                ) : (
                  <><Send size={15} /> Complete Registration</>
                )}
              </button>

              <p className="text-center text-xs t-m">
                By registering you agree to RNSIT's event terms and conditions.
              </p>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
