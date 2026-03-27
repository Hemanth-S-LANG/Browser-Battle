import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Upload, X, RefreshCw, FileText, User, Mail, Phone, MapPin, BookOpen, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh',
]

const CITIES_BY_STATE = {
  Karnataka: ['Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi', 'Kalaburagi', 'Ballari', 'Tumakuru', 'Shivamogga', 'Davanagere'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool'],
  Telangana: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
  Kerala: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'],
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
  Delhi: ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi'],
}

const PROGRAMS = [
  { group: 'Undergraduate (B.E.)', options: [
    'B.E. Computer Science & Engineering',
    'B.E. CSE (Artificial Intelligence & Machine Learning)',
    'B.E. CSE (Data Science)',
    'B.E. CSE (Cyber Security)',
    'B.E. Information Science & Engineering',
    'B.E. Electronics & Communication Engineering',
    'B.E. Electrical & Electronics Engineering',
    'B.E. Mechanical Engineering',
    'B.E. Instrumentation Technology',
  ]},
  { group: 'Postgraduate', options: [
    'M.Tech Computer Science',
    'M.Tech VLSI Design',
    'M.Tech Power Electronics',
    'MBA',
    'MCA',
  ]},
]

const DOCUMENTS = [
  { id: 'photo', label: 'Passport Size Photo', accept: 'image/*', required: true },
  { id: 'sslc', label: '10th (SSLC) Marks Card', accept: '.pdf,image/*', required: true },
  { id: 'puc', label: '12th (PUC/HSC) Marks Card', accept: '.pdf,image/*', required: true },
  { id: 'kcet', label: 'KCET / COMEDK Rank Card', accept: '.pdf,image/*', required: false },
  { id: 'fee', label: 'Fee Receipt (if any)', accept: '.pdf,image/*', required: false },
  { id: 'id', label: 'Aadhar Card / ID Proof', accept: '.pdf,image/*', required: true },
]

function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

function CaptchaBox({ value, onRefresh }) {
  return (
    <div className="flex items-center gap-3">
      <div className="px-5 py-2.5 rounded-xl font-mono font-bold text-lg tracking-[0.3em] select-none"
        style={{
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          color: '#fff',
          letterSpacing: '0.3em',
          textDecoration: 'line-through',
          textDecorationColor: 'rgba(255,255,255,0.3)',
          filter: 'blur(0.3px)',
          userSelect: 'none',
        }}>
        {value}
      </div>
      <button type="button" onClick={onRefresh}
        className="p-2 rounded-lg transition-all hover:scale-110"
        style={{ background: 'var(--bg-alt)', border: '1px solid var(--card-border)', color: 'var(--t3)' }}>
        <RefreshCw size={16} />
      </button>
    </div>
  )
}

function FileUpload({ doc, file, onChange, onRemove }) {
  const inputRef = useRef()
  return (
    <div>
      <label className="block text-sm font-medium t-b mb-1.5">
        {doc.label} {doc.required && <span className="text-red-500">*</span>}
      </label>
      {file ? (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)' }}>
          <FileText size={16} className="text-green-500 shrink-0" />
          <span className="text-sm t-b flex-1 truncate">{file.name}</span>
          <span className="text-xs t-m">{(file.size / 1024).toFixed(0)} KB</span>
          <button type="button" onClick={() => onRemove(doc.id)}
            className="p-1 rounded-full hover:bg-red-100 transition-colors">
            <X size={14} className="text-red-500" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current.click()}
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all hover:border-orange-400"
          style={{ background: 'var(--bg-alt)', border: '2px dashed var(--card-border)' }}>
          <Upload size={16} style={{ color: 'var(--accent)' }} />
          <span className="text-sm t-m">Click to upload or drag & drop</span>
          <span className="text-xs t-s ml-auto">PDF, JPG, PNG</span>
        </div>
      )}
      <input ref={inputRef} type="file" accept={doc.accept} className="hidden"
        onChange={e => onChange(doc.id, e.target.files[0])} />
    </div>
  )
}

export default function Apply() {
  const [form, setForm] = useState({
    name: '', email: '', mobile: '', state: '', city: '',
    program: '', captchaInput: '', agree: false,
  })
  const [files, setFiles] = useState({})
  const [errors, setErrors] = useState({})
  const [captcha, setCaptcha] = useState(generateCaptcha)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const cities = CITIES_BY_STATE[form.state] || []

  const set = (field, value) => {
    setForm(p => ({ ...p, [field]: value }))
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }))
  }

  const handleFile = (id, file) => {
    if (file) setFiles(p => ({ ...p, [id]: file }))
  }
  const removeFile = (id) => setFiles(p => { const n = { ...p }; delete n[id]; return n })

  const validateStep1 = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email is required'
    if (!form.mobile.match(/^[6-9]\d{9}$/)) e.mobile = 'Valid 10-digit mobile number required'
    if (!form.state) e.state = 'Please select your state'
    if (!form.city) e.city = 'Please select your city'
    if (!form.program) e.program = 'Please select a program'
    return e
  }

  const validateStep2 = () => {
    const e = {}
    const required = DOCUMENTS.filter(d => d.required)
    required.forEach(d => { if (!files[d.id]) e[d.id] = `${d.label} is required` })
    return e
  }

  const validateStep3 = () => {
    const e = {}
    if (form.captchaInput.toLowerCase() !== captcha.toLowerCase()) e.captcha = 'Captcha does not match'
    if (!form.agree) e.agree = 'You must agree to proceed'
    return e
  }

  const nextStep = () => {
    if (step === 1) {
      const e = validateStep1()
      if (Object.keys(e).length > 0) { setErrors(e); return }
    }
    if (step === 2) {
      const e = validateStep2()
      if (Object.keys(e).length > 0) { setErrors(e); return }
    }
    setErrors({})
    setStep(s => s + 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e3 = validateStep3()
    if (Object.keys(e3).length > 0) { setErrors(e3); return }
    setLoading(true)
    // Simulate submission (replace with real API call)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  const steps = ['Personal Info', 'Documents', 'Confirm & Submit']

  if (submitted) {
    return (
      <div className="min-h-screen t-bg flex items-center justify-center px-4 pt-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center card rounded-2xl p-10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.3)' }}>
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-black t-h mb-3">Application Submitted!</h2>
          <p className="t-m mb-2">Thank you, <strong className="t-b">{form.name}</strong>!</p>
          <p className="t-m text-sm mb-6">
            Your application for <strong className="t-b">{form.program}</strong> has been received.
            We will contact you at <strong className="t-b">{form.email}</strong> within 2-3 working days.
          </p>
          <div className="p-4 rounded-xl mb-6 text-sm t-b"
            style={{ background: 'var(--bg-alt)', border: '1px solid var(--card-border)' }}>
            Application ID: <strong className="text-gradient">RNSIT-{Date.now().toString().slice(-8)}</strong>
          </div>
          <Link to="/" className="btn-primary inline-flex items-center gap-2 text-sm">
            Back to Home
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen t-bg pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <AnimatedSection className="text-center mb-10">
          <span className="badge mb-3">Admissions 2025-26</span>
          <h1 className="text-3xl md:text-4xl font-black t-h mb-2">
            Apply to <span className="text-gradient">RNSIT</span>
          </h1>
          <p className="t-m">Fill in the details below to submit your application</p>
        </AnimatedSection>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step > i + 1 ? 'text-white' : step === i + 1 ? 'text-white' : 'text-gray-400'
                }`}
                  style={{
                    background: step > i + 1 ? '#22c55e' : step === i + 1 ? 'var(--accent)' : 'var(--bg-alt)',
                    border: `2px solid ${step > i + 1 ? '#22c55e' : step === i + 1 ? 'var(--accent)' : 'var(--card-border)'}`,
                  }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className="text-xs mt-1 hidden sm:block" style={{ color: step === i + 1 ? 'var(--accent)' : 'var(--t4)' }}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-16 sm:w-24 h-0.5 mx-2 mb-4"
                  style={{ background: step > i + 1 ? '#22c55e' : 'var(--card-border)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="card rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">

              {/* ── STEP 1: Personal Info ── */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-lg font-bold t-h mb-6 flex items-center gap-2">
                    <User size={18} style={{ color: 'var(--accent)' }} /> Personal Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium t-b mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Enter your full name" value={form.name}
                        onChange={e => set('name', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 t-h transition-all"
                        style={{ background: 'var(--bg-alt)', border: errors.name ? '1px solid #ef4444' : '1px solid var(--card-border)' }} />
                      {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium t-b mb-1.5">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" placeholder="your@email.com" value={form.email}
                        onChange={e => set('email', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 t-h transition-all"
                        style={{ background: 'var(--bg-alt)', border: errors.email ? '1px solid #ef4444' : '1px solid var(--card-border)' }} />
                      {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.email}</p>}
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className="block text-sm font-medium t-b mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                      <div className="flex gap-2">
                        <span className="px-3 py-3 rounded-xl text-sm font-medium t-b"
                          style={{ background: 'var(--bg-alt)', border: '1px solid var(--card-border)' }}>+91</span>
                        <input type="tel" placeholder="10-digit mobile number" value={form.mobile}
                          onChange={e => set('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className="flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 t-h transition-all"
                          style={{ background: 'var(--bg-alt)', border: errors.mobile ? '1px solid #ef4444' : '1px solid var(--card-border)' }} />
                      </div>
                      {errors.mobile && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.mobile}</p>}
                    </div>

                    {/* State */}
                    <div>
                      <label className="block text-sm font-medium t-b mb-1.5">State <span className="text-red-500">*</span></label>
                      <select value={form.state} onChange={e => { set('state', e.target.value); set('city', '') }}
                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 t-h transition-all"
                        style={{ background: 'var(--bg-alt)', border: errors.state ? '1px solid #ef4444' : '1px solid var(--card-border)' }}>
                        <option value="">Select State</option>
                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.state && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.state}</p>}
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-medium t-b mb-1.5">City <span className="text-red-500">*</span></label>
                      {cities.length > 0 ? (
                        <select value={form.city} onChange={e => set('city', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 t-h transition-all"
                          style={{ background: 'var(--bg-alt)', border: errors.city ? '1px solid #ef4444' : '1px solid var(--card-border)' }}>
                          <option value="">Select City</option>
                          {cities.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      ) : (
                        <input type="text" placeholder="Enter your city" value={form.city}
                          onChange={e => set('city', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 t-h transition-all"
                          style={{ background: 'var(--bg-alt)', border: errors.city ? '1px solid #ef4444' : '1px solid var(--card-border)' }} />
                      )}
                      {errors.city && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.city}</p>}
                    </div>

                    {/* Program */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium t-b mb-1.5">Select Program <span className="text-red-500">*</span></label>
                      <select value={form.program} onChange={e => set('program', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 t-h transition-all"
                        style={{ background: 'var(--bg-alt)', border: errors.program ? '1px solid #ef4444' : '1px solid var(--card-border)' }}>
                        <option value="">Select Program</option>
                        {PROGRAMS.map(g => (
                          <optgroup key={g.group} label={g.group}>
                            {g.options.map(o => <option key={o} value={o}>{o}</option>)}
                          </optgroup>
                        ))}
                      </select>
                      {errors.program && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.program}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2: Documents ── */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-lg font-bold t-h mb-2 flex items-center gap-2">
                    <Upload size={18} style={{ color: 'var(--accent)' }} /> Upload Documents
                  </h2>
                  <p className="text-xs t-m mb-6">Max file size: 2MB per document. Accepted: PDF, JPG, PNG</p>
                  <div className="space-y-4">
                    {DOCUMENTS.map(doc => (
                      <div key={doc.id}>
                        <FileUpload doc={doc} file={files[doc.id]} onChange={handleFile} onRemove={removeFile} />
                        {errors[doc.id] && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors[doc.id]}</p>}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── STEP 3: Captcha + Confirm ── */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-lg font-bold t-h mb-6 flex items-center gap-2">
                    <CheckCircle size={18} style={{ color: 'var(--accent)' }} /> Review & Submit
                  </h2>

                  {/* Summary */}
                  <div className="rounded-xl p-4 mb-6 space-y-2"
                    style={{ background: 'var(--bg-alt)', border: '1px solid var(--card-border)' }}>
                    <h3 className="font-semibold t-h text-sm mb-3">Application Summary</h3>
                    {[
                      { label: 'Name', value: form.name },
                      { label: 'Email', value: form.email },
                      { label: 'Mobile', value: `+91 ${form.mobile}` },
                      { label: 'Location', value: `${form.city}, ${form.state}` },
                      { label: 'Program', value: form.program },
                      { label: 'Documents', value: `${Object.keys(files).length} file(s) uploaded` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between text-sm">
                        <span className="t-m">{label}</span>
                        <span className="t-b font-medium">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Captcha */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium t-b mb-2">Enter Captcha <span className="text-red-500">*</span></label>
                    <CaptchaBox value={captcha} onRefresh={() => { setCaptcha(generateCaptcha()); set('captchaInput', '') }} />
                    <input type="text" placeholder="Type the captcha above" value={form.captchaInput}
                      onChange={e => set('captchaInput', e.target.value)}
                      className="w-full mt-3 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 t-h transition-all"
                      style={{ background: 'var(--bg-alt)', border: errors.captcha ? '1px solid #ef4444' : '1px solid var(--card-border)' }} />
                    {errors.captcha && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.captcha}</p>}
                  </div>

                  {/* Agreement */}
                  <div className="mb-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={form.agree} onChange={e => set('agree', e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded accent-orange-500 shrink-0" />
                      <span className="text-sm t-b leading-relaxed">
                        I agree to receive information regarding my submitted enquiry on{' '}
                        <strong>RNS Institute of Technology</strong>. I understand that my data will be
                        used only for admission-related communication.
                        <span className="text-red-500"> *</span>
                      </span>
                    </label>
                    {errors.agree && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.agree}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6" style={{ borderTop: '1px solid var(--card-border)' }}>
              {step > 1 ? (
                <button type="button" onClick={() => setStep(s => s - 1)}
                  className="btn-outline text-sm px-6 py-2.5">
                  Back
                </button>
              ) : (
                <Link to="/" className="btn-outline text-sm px-6 py-2.5">Cancel</Link>
              )}

              {step < 3 ? (
                <button type="button" onClick={nextStep} className="btn-primary text-sm px-8 py-2.5">
                  Next Step
                </button>
              ) : (
                <button type="submit" disabled={loading} className="btn-primary text-sm px-8 py-2.5 flex items-center gap-2 disabled:opacity-60">
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                  ) : (
                    <><CheckCircle size={15} /> Submit Application</>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Note */}
        <p className="text-center text-xs t-m mt-6">
          For admission enquiries call <strong className="t-b">+91 80 2441 0020 / 21</strong> or email{' '}
          <strong className="t-b">admissions@rnsit.ac.in</strong>
        </p>
      </div>
    </div>
  )
}
