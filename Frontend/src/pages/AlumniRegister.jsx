import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Mail, Phone, Building2, Briefcase, GraduationCap,
  MapPin, Star, MessageSquare, CheckCircle, AlertCircle,
  ArrowLeft, Send, Link2, Globe
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'

const DEPARTMENTS = [
  'Computer Science & Engineering (CSE)',
  'CSE (AI & Machine Learning)',
  'CSE (Data Science)',
  'Information Science & Engineering (ISE)',
  'Electronics & Communication Engineering (ECE)',
  'Electrical & Electronics Engineering (EEE)',
  'Mechanical Engineering',
  'Instrumentation Technology',
  'MBA', 'MCA',
]

const PASSOUT_YEARS = Array.from({ length: 24 }, (_, i) => (2025 - i).toString())

const JOB_TYPES = [
  'Software Engineer', 'Data Scientist', 'AI/ML Engineer', 'DevOps Engineer',
  'Product Manager', 'Business Analyst', 'VLSI Engineer', 'Embedded Systems Engineer',
  'Mechanical Engineer', 'Civil Engineer', 'Entrepreneur / Founder',
  'Higher Studies (MS/MTech/PhD)', 'Government / PSU', 'Other',
]

const RATINGS = [1, 2, 3, 4, 5]

function Field({ label, icon: Icon, error, required, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold t-b mb-1.5 flex items-center gap-1.5">
        <Icon size={13} style={{ color: 'var(--accent)' }} />
        {label} {required && <span className="text-red-500">*</span>}
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

function StarRating({ value, onChange, label }) {
  const [hover, setHover] = useState(0)
  return (
    <div>
      <label className="block text-sm font-semibold t-b mb-2">{label}</label>
      <div className="flex gap-2">
        {RATINGS.map(r => (
          <button key={r} type="button"
            onMouseEnter={() => setHover(r)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(r)}
            className="transition-transform hover:scale-125">
            <Star size={28}
              fill={(hover || value) >= r ? 'var(--accent)' : 'none'}
              style={{ color: (hover || value) >= r ? 'var(--accent)' : 'var(--t4)' }} />
          </button>
        ))}
        {value > 0 && (
          <span className="text-sm font-semibold ml-2 self-center" style={{ color: 'var(--accent)' }}>
            {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][value]}
          </span>
        )}
      </div>
    </div>
  )
}

const inputClass = (err) => `w-full px-4 py-3 rounded-xl text-sm focus:outline-none t-h transition-all`
const inputStyle = (err) => ({ background: 'var(--bg-alt)', border: err ? '1px solid #ef4444' : '1px solid var(--card-border)' })

export default function AlumniRegister() {
  const [form, setForm] = useState({
    name: '', email: '', mobile: '', department: '', passoutYear: '',
    company: '', jobTitle: '', jobType: '', location: '', linkedin: '', website: '',
    overallRating: 0, placementRating: 0, facultyRating: 0, infraRating: 0,
    feedback: '', achievements: '', message: '', consent: false,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [step, setStep] = useState(1)

  const set = (field, val) => {
    setForm(p => ({ ...p, [field]: val }))
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }))
  }

  const validateStep1 = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email is required'
    if (form.mobile && !form.mobile.match(/^[6-9]\d{9}$/)) e.mobile = 'Enter valid 10-digit number'
    if (!form.department) e.department = 'Please select your department'
    if (!form.passoutYear) e.passoutYear = 'Please select passout year'
    return e
  }

  const validateStep2 = () => {
    const e = {}
    if (!form.company.trim()) e.company = 'Company name is required'
    if (!form.jobTitle.trim()) e.jobTitle = 'Job title is required'
    if (!form.jobType) e.jobType = 'Please select job type'
    return e
  }

  const validateStep3 = () => {
    const e = {}
    if (form.overallRating === 0) e.overallRating = 'Please rate your overall experience'
    if (!form.feedback.trim() || form.feedback.length < 30) e.feedback = 'Please write at least 30 characters'
    if (!form.consent) e.consent = 'You must agree to proceed'
    return e
  }

  const nextStep = () => {
    const errs = step === 1 ? validateStep1() : step === 2 ? validateStep2() : {}
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setStep(s => s + 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validateStep3()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    setSuccess(true)
  }

  const steps = ['Personal Info', 'Professional Info', 'Feedback']

  if (success) {
    return (
      <div className="min-h-screen t-bg flex items-center justify-center px-4 pt-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center card rounded-2xl p-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(249,115,22,0.1)', border: '2px solid var(--accent)' }}>
            <CheckCircle size={40} style={{ color: 'var(--accent)' }} />
          </motion.div>
          <h2 className="text-2xl font-black t-h mb-2">Welcome to the Alumni Network!</h2>
          <p className="t-m mb-4">Thank you, <strong className="t-b">{form.name}</strong>! Your profile has been submitted for verification.</p>
          <div className="rounded-xl p-4 mb-6 text-left space-y-2 t-bg-alt text-sm">
            {[
              { label: 'Name', value: form.name },
              { label: 'Batch', value: form.passoutYear },
              { label: 'Department', value: form.department.split('(')[0].trim() },
              { label: 'Company', value: form.company },
              { label: 'Role', value: form.jobTitle },
              { label: 'Rating', value: `${'★'.repeat(form.overallRating)}${'☆'.repeat(5 - form.overallRating)}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="t-m">{label}</span>
                <span className="font-semibold t-h">{value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs t-m mb-6">We'll send a confirmation to <strong className="t-b">{form.email}</strong> within 24 hours.</p>
          <div className="flex gap-3">
            <Link to="/alumni" className="flex-1 btn-outline text-sm text-center py-3 rounded-xl">Alumni Page</Link>
            <Link to="/" className="flex-1 btn-primary text-sm text-center py-3 rounded-xl">Go Home</Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="t-bg min-h-screen pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4">

        {/* Back */}
        <Link to="/alumni" className="inline-flex items-center gap-2 text-sm t-m hover:text-orange-500 transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Alumni
        </Link>

        {/* Header */}
        <AnimatedSection className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}>
            <GraduationCap size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-black t-h mb-2">Join Alumni Network</h1>
          <p className="t-m">Connect with 15,000+ RNSIT alumni worldwide</p>
        </AnimatedSection>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  style={{
                    background: step > i + 1 ? '#22c55e' : step === i + 1 ? 'var(--accent)' : 'var(--bg-alt)',
                    border: `2px solid ${step > i + 1 ? '#22c55e' : step === i + 1 ? 'var(--accent)' : 'var(--card-border)'}`,
                    color: step >= i + 1 ? '#fff' : 'var(--t4)',
                  }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className="text-xs mt-1 hidden sm:block"
                  style={{ color: step === i + 1 ? 'var(--accent)' : 'var(--t4)' }}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-16 sm:w-20 h-0.5 mx-2 mb-4 transition-all"
                  style={{ background: step > i + 1 ? '#22c55e' : 'var(--card-border)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="card rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">

              {/* ── STEP 1: Personal Info ── */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-5">
                  <h2 className="text-lg font-bold t-h mb-4 flex items-center gap-2">
                    <User size={18} style={{ color: 'var(--accent)' }} /> Personal Information
                  </h2>

                  <Field label="Full Name" icon={User} error={errors.name} required>
                    <input type="text" placeholder="Your full name" value={form.name}
                      onChange={e => set('name', e.target.value)}
                      className={inputClass(errors.name)} style={inputStyle(errors.name)} />
                  </Field>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Email Address" icon={Mail} error={errors.email} required>
                      <input type="email" placeholder="your@email.com" value={form.email}
                        onChange={e => set('email', e.target.value)}
                        className={inputClass(errors.email)} style={inputStyle(errors.email)} />
                    </Field>
                    <Field label="Mobile Number" icon={Phone} error={errors.mobile}>
                      <div className="flex gap-2">
                        <span className="px-3 py-3 rounded-xl text-sm t-b shrink-0"
                          style={{ background: 'var(--bg-alt)', border: '1px solid var(--card-border)' }}>+91</span>
                        <input type="tel" placeholder="10-digit number" value={form.mobile}
                          onChange={e => set('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className="flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none t-h"
                          style={inputStyle(errors.mobile)} />
                      </div>
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Department" icon={GraduationCap} error={errors.department} required>
                      <select value={form.department} onChange={e => set('department', e.target.value)}
                        className={inputClass(errors.department)} style={inputStyle(errors.department)}>
                        <option value="">Select Department</option>
                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </Field>
                    <Field label="Passout Year" icon={GraduationCap} error={errors.passoutYear} required>
                      <select value={form.passoutYear} onChange={e => set('passoutYear', e.target.value)}
                        className={inputClass(errors.passoutYear)} style={inputStyle(errors.passoutYear)}>
                        <option value="">Select Year</option>
                        {PASSOUT_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </Field>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2: Professional Info ── */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-5">
                  <h2 className="text-lg font-bold t-h mb-4 flex items-center gap-2">
                    <Briefcase size={18} style={{ color: 'var(--accent)' }} /> Professional Information
                  </h2>

                  <Field label="Current Company / Organization" icon={Building2} error={errors.company} required>
                    <input type="text" placeholder="e.g. Google, Infosys, Self-employed" value={form.company}
                      onChange={e => set('company', e.target.value)}
                      className={inputClass(errors.company)} style={inputStyle(errors.company)} />
                  </Field>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Job Title / Designation" icon={Briefcase} error={errors.jobTitle} required>
                      <input type="text" placeholder="e.g. Senior Software Engineer" value={form.jobTitle}
                        onChange={e => set('jobTitle', e.target.value)}
                        className={inputClass(errors.jobTitle)} style={inputStyle(errors.jobTitle)} />
                    </Field>
                    <Field label="Job Type" icon={Briefcase} error={errors.jobType} required>
                      <select value={form.jobType} onChange={e => set('jobType', e.target.value)}
                        className={inputClass(errors.jobType)} style={inputStyle(errors.jobType)}>
                        <option value="">Select Type</option>
                        {JOB_TYPES.map(j => <option key={j} value={j}>{j}</option>)}
                      </select>
                    </Field>
                  </div>

                  <Field label="Current Location" icon={MapPin} error={errors.location}>
                    <input type="text" placeholder="e.g. Bengaluru, India / San Francisco, USA" value={form.location}
                      onChange={e => set('location', e.target.value)}
                      className={inputClass(errors.location)} style={inputStyle(errors.location)} />
                  </Field>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="LinkedIn Profile" icon={Link2} error={errors.linkedin}>
                      <input type="url" placeholder="linkedin.com/in/yourname" value={form.linkedin}
                        onChange={e => set('linkedin', e.target.value)}
                        className={inputClass(errors.linkedin)} style={inputStyle(errors.linkedin)} />
                    </Field>
                    <Field label="Personal Website / Portfolio" icon={Globe} error={errors.website}>
                      <input type="url" placeholder="yourwebsite.com" value={form.website}
                        onChange={e => set('website', e.target.value)}
                        className={inputClass(errors.website)} style={inputStyle(errors.website)} />
                    </Field>
                  </div>

                  <Field label="Notable Achievements (optional)" icon={Star} error={errors.achievements}>
                    <textarea rows={3} placeholder="Awards, patents, publications, startup founded, etc."
                      value={form.achievements} onChange={e => set('achievements', e.target.value)}
                      className={`${inputClass()} resize-none`} style={inputStyle()} />
                  </Field>
                </motion.div>
              )}

              {/* ── STEP 3: Feedback ── */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6">
                  <h2 className="text-lg font-bold t-h mb-4 flex items-center gap-2">
                    <MessageSquare size={18} style={{ color: 'var(--accent)' }} /> Your Feedback
                  </h2>

                  {/* Star ratings */}
                  <div className="card rounded-xl p-5 space-y-5">
                    <StarRating value={form.overallRating} onChange={v => set('overallRating', v)}
                      label="Overall College Experience *" />
                    {errors.overallRating && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={11} />{errors.overallRating}</p>}
                    <StarRating value={form.placementRating} onChange={v => set('placementRating', v)}
                      label="Placement Support" />
                    <StarRating value={form.facultyRating} onChange={v => set('facultyRating', v)}
                      label="Faculty & Teaching Quality" />
                    <StarRating value={form.infraRating} onChange={v => set('infraRating', v)}
                      label="Infrastructure & Facilities" />
                  </div>

                  {/* Feedback text */}
                  <Field label="Your Feedback About RNSIT" icon={MessageSquare} error={errors.feedback} required>
                    <textarea rows={5}
                      placeholder="Share your experience at RNSIT — what you loved, what helped your career, and any suggestions for current students..."
                      value={form.feedback} onChange={e => set('feedback', e.target.value)}
                      className={`${inputClass(errors.feedback)} resize-none`} style={inputStyle(errors.feedback)} />
                    <div className="text-xs t-s mt-1 text-right">{form.feedback.length} / 500 chars</div>
                  </Field>

                  {/* Message to juniors */}
                  <Field label="Message to Current Students (optional)" icon={MessageSquare} error={errors.message}>
                    <textarea rows={3}
                      placeholder="Any advice or motivation for current RNSIT students..."
                      value={form.message} onChange={e => set('message', e.target.value)}
                      className={`${inputClass()} resize-none`} style={inputStyle()} />
                  </Field>

                  {/* Consent */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={form.consent}
                        onChange={e => set('consent', e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded shrink-0" style={{ accentColor: 'var(--accent)' }} />
                      <span className="text-sm t-b leading-relaxed">
                        I agree to have my profile and feedback displayed on the RNSIT Alumni page.
                        My contact details will not be shared publicly. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.consent && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.consent}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6" style={{ borderTop: '1px solid var(--card-border)' }}>
              {step > 1 ? (
                <button type="button" onClick={() => setStep(s => s - 1)} className="btn-outline text-sm px-6 py-2.5">
                  Back
                </button>
              ) : (
                <Link to="/alumni" className="btn-outline text-sm px-6 py-2.5">Cancel</Link>
              )}

              {step < 3 ? (
                <button type="button" onClick={nextStep} className="btn-primary text-sm px-8 py-2.5">
                  Next Step
                </button>
              ) : (
                <button type="submit" disabled={loading}
                  className="btn-primary text-sm px-8 py-2.5 flex items-center gap-2 disabled:opacity-60">
                  {loading
                    ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                    : <><Send size={14} /> Submit Profile</>}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
