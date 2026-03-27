import { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Mail, Phone, MapPin, ArrowLeft, FlaskConical, GraduationCap,
  Users, Trophy, ChevronLeft, ChevronRight, BookOpen, Star,
  TrendingUp, Award, ExternalLink
} from 'lucide-react'
import { departments } from '../data/college'
import AnimatedSection from '../components/AnimatedSection'

// ── Animated Counter ──────────────────────────────────────
function Counter({ end, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useState(() => {
    if (!inView) return
    let t0 = null
    const step = ts => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setCount(Math.floor(p * end))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView])
  return <span ref={ref}>{count}{suffix}</span>
}

// ── Faculty Flip Card ─────────────────────────────────────
function FacultyCard({ f, i }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className="relative h-52 cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-2xl card flex flex-col items-center justify-center p-5 text-center"
          style={{ backfaceVisibility: 'hidden' }}>
          <img src={f.image} alt={f.name}
            className="w-16 h-16 rounded-full object-cover mb-3"
            style={{ border: '3px solid var(--accent)', boxShadow: '0 0 0 4px rgba(249,115,22,0.15)' }} />
          <div className="font-bold t-h text-sm">{f.name}</div>
          <div className="text-xs font-semibold mt-1" style={{ color: 'var(--accent)' }}>{f.designation}</div>
          <div className="text-xs t-m mt-1">{f.specialization}</div>
          <div className="text-xs t-s mt-3 italic">Hover to see more</div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-5 text-center text-white"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}>
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-black mb-3">
            {f.name.charAt(0)}
          </div>
          <div className="font-bold text-sm mb-1">{f.name}</div>
          <div className="text-orange-100 text-xs mb-2">{f.designation}</div>
          <div className="text-xs bg-white/20 px-3 py-1 rounded-full">{f.specialization}</div>
          <a href={`mailto:faculty@rnsit.ac.in`}
            className="mt-3 text-xs flex items-center gap-1 text-orange-100 hover:text-white transition-colors">
            <Mail size={11} /> Contact
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Gallery Lightbox ──────────────────────────────────────
function Gallery({ images }) {
  const [active, setActive] = useState(null)
  const prev = () => setActive(i => (i - 1 + images.length) % images.length)
  const next = () => setActive(i => (i + 1) % images.length)
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {images.map((img, i) => (
          <motion.div key={i} whileHover={{ scale: 1.03 }}
            className="overflow-hidden rounded-xl aspect-video cursor-pointer relative group"
            onClick={() => setActive(i)}>
            <img src={img} alt={`Gallery ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
              <ExternalLink size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setActive(null)}>
            <button onClick={e => { e.stopPropagation(); prev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
              <ChevronLeft size={24} />
            </button>
            <motion.img key={active} initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              src={images[active]} alt="Gallery"
              className="max-w-4xl max-h-[85vh] rounded-2xl object-contain"
              onClick={e => e.stopPropagation()} />
            <button onClick={e => { e.stopPropagation(); next() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-6 flex gap-2">
              {images.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setActive(i) }}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ background: i === active ? 'var(--accent)' : 'rgba(255,255,255,0.3)' }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Tab System ────────────────────────────────────────────
const TABS = ['Overview', 'Faculty', 'Labs', 'Achievements', 'Gallery']

// ── Main Page ─────────────────────────────────────────────
export default function DepartmentDetail() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('Overview')
  const dept = departments.find(d => d.id === id)

  if (!dept) return (
    <div className="min-h-screen flex items-center justify-center t-bg">
      <div className="text-center">
        <h2 className="text-2xl font-bold t-h mb-4">Department not found</h2>
        <Link to="/departments" className="text-orange-500 hover:underline">Back to Departments</Link>
      </div>
    </div>
  )

  return (
    <div className="t-bg" style={{ minHeight: '100vh' }}>

      {/* ── Hero Banner ── */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={dept.image} alt={dept.name}
          className="w-full h-full object-cover" style={{ filter: 'brightness(0.2)' }} />
        {/* Gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.4))' }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(249,115,22,1) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,1) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/departments"
              className="inline-flex items-center gap-2 text-orange-300 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft size={14} /> All Departments
            </Link>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 text-white"
              style={{ background: 'var(--accent)' }}>
              {dept.shortName}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight drop-shadow-lg">{dept.name}</h1>
            <p className="text-white/90 text-sm md:text-base max-w-2xl line-clamp-2 drop-shadow">{dept.about}</p>
          </motion.div>
        </div>
      </div>

      {/* ── Quick Stats Bar ── */}
      <div className="sticky top-16 z-30 shadow-lg"
        style={{ background: 'var(--surface)', borderBottom: '1px solid var(--card-border)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Stats */}
            <div className="hidden md:flex divide-x" style={{ divideColor: 'var(--card-border)' }}>
              {[
                { icon: Users, label: 'Faculty', value: dept.faculty.length },
                { icon: BookOpen, label: 'Programs', value: dept.programs.length },
                { icon: FlaskConical, label: 'Labs', value: dept.labs.length },
                { icon: Trophy, label: 'Achievements', value: dept.achievements.length },
              ].map(({ icon: Icon, label, value }, i) => (
                <div key={i} className="flex items-center gap-2 px-5 py-3">
                  <Icon size={15} style={{ color: 'var(--accent)' }} />
                  <span className="text-sm t-b font-bold">{value}</span>
                  <span className="text-xs t-m">{label}</span>
                </div>
              ))}
            </div>
            {/* Tabs */}
            <div className="flex overflow-x-auto">
              {TABS.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="px-4 py-4 text-sm font-semibold whitespace-nowrap transition-all relative"
                  style={{ color: activeTab === tab ? 'var(--accent)' : 'var(--t3)' }}>
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: 'var(--accent)' }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">

              {/* OVERVIEW TAB */}
              {activeTab === 'Overview' && (
                <motion.div key="overview"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                  className="space-y-6">
                  {/* About */}
                  <div className="card rounded-2xl p-6">
                    <h2 className="text-xl font-black t-h mb-3">About the Department</h2>
                    <p className="t-b leading-relaxed">{dept.about}</p>
                  </div>
                  {/* Vision */}
                  <div className="rounded-2xl p-6 relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(234,88,12,0.06))', border: '1px solid rgba(249,115,22,0.25)' }}>
                    <div className="absolute top-0 right-0 text-[120px] font-black opacity-5 leading-none" style={{ color: 'var(--accent)' }}>"</div>
                    <h3 className="font-bold t-h mb-2 flex items-center gap-2">
                      <Star size={16} style={{ color: 'var(--accent)' }} /> Vision
                    </h3>
                    <p className="t-b leading-relaxed italic">{dept.vision}</p>
                  </div>
                  {/* Programs */}
                  <div className="card rounded-2xl p-6">
                    <h2 className="text-xl font-black t-h mb-4 flex items-center gap-2">
                      <GraduationCap size={20} style={{ color: 'var(--accent)' }} /> Programs Offered
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {dept.programs.map((p, i) => (
                        <motion.div key={i} whileHover={{ x: 4 }}
                          className="flex items-center gap-3 p-3 rounded-xl t-bg-alt">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                          <span className="t-b text-sm font-medium">{p}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* FACULTY TAB */}
              {activeTab === 'Faculty' && (
                <motion.div key="faculty"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                  <div className="card rounded-2xl p-6">
                    <h2 className="text-xl font-black t-h mb-2 flex items-center gap-2">
                      <Users size={20} style={{ color: 'var(--accent)' }} /> Faculty Members
                    </h2>
                    <p className="text-xs t-m mb-6">Hover over a card to see more details</p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {dept.faculty.map((f, i) => <FacultyCard key={i} f={f} i={i} />)}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* LABS TAB */}
              {activeTab === 'Labs' && (
                <motion.div key="labs"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                  <div className="card rounded-2xl p-6">
                    <h2 className="text-xl font-black t-h mb-4 flex items-center gap-2">
                      <FlaskConical size={20} style={{ color: 'var(--accent)' }} /> Labs & Research Facilities
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {dept.labs.map((lab, i) => (
                        <motion.div key={i}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.02 }}
                          transition={{ delay: i * 0.08 }}
                          className="p-4 rounded-xl relative overflow-hidden"
                          style={{ background: 'var(--bg-alt)', border: '1px solid var(--card-border)' }}>
                          <div className="absolute top-0 right-0 w-16 h-16 rounded-full opacity-10 -translate-y-4 translate-x-4"
                            style={{ background: 'var(--accent)' }} />
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                            style={{ background: 'rgba(249,115,22,0.12)' }}>
                            <FlaskConical size={18} style={{ color: 'var(--accent)' }} />
                          </div>
                          <div className="font-semibold t-h text-sm">{lab}</div>
                          <div className="text-xs t-m mt-1">State-of-the-art equipment</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ACHIEVEMENTS TAB */}
              {activeTab === 'Achievements' && (
                <motion.div key="achievements"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                  <div className="card rounded-2xl p-6">
                    <h2 className="text-xl font-black t-h mb-4 flex items-center gap-2">
                      <Trophy size={20} style={{ color: 'var(--accent)' }} /> Achievements & Recognition
                    </h2>
                    <div className="space-y-3">
                      {dept.achievements.map((a, i) => (
                        <motion.div key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-xl"
                          style={{ background: 'rgba(234,179,8,0.06)', border: '1px solid rgba(234,179,8,0.2)' }}>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: 'rgba(234,179,8,0.15)' }}>
                            <Trophy size={18} className="text-yellow-500" />
                          </div>
                          <div>
                            <div className="font-semibold t-h text-sm">{a}</div>
                            <div className="text-xs t-m mt-0.5">{dept.shortName} Department</div>
                          </div>
                          <Award size={16} className="text-yellow-400 ml-auto shrink-0" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* GALLERY TAB */}
              {activeTab === 'Gallery' && (
                <motion.div key="gallery"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                  <div className="card rounded-2xl p-6">
                    <h2 className="text-xl font-black t-h mb-2">Department Gallery</h2>
                    <p className="text-xs t-m mb-5">Click any image to view fullscreen</p>
                    <Gallery images={dept.gallery} />
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">

            {/* HOD Card */}
            <AnimatedSection direction="left">
              <div className="rounded-2xl p-6 text-white relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 -translate-y-8 translate-x-8"
                  style={{ background: '#fff' }} />
                <div className="text-xs font-bold tracking-widest uppercase text-orange-100 mb-3">Head of Department</div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-white/25 flex items-center justify-center text-2xl font-black">
                    {dept.hod.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{dept.hod.name}</div>
                    <div className="text-orange-100 text-xs">HOD, {dept.shortName}</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <a href={`mailto:${dept.hod.email}`}
                    className="flex items-center gap-2 text-orange-100 hover:text-white transition-colors">
                    <Mail size={13} /> {dept.hod.email}
                  </a>
                  <div className="flex items-center gap-2 text-orange-100">
                    <Phone size={13} /> {dept.hod.phone}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Quick Stats */}
            <AnimatedSection direction="left" delay={0.1}>
              <div className="card rounded-2xl p-5">
                <h3 className="font-bold t-h mb-4 text-sm tracking-wider uppercase">Department Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Faculty', value: dept.faculty.length, icon: Users },
                    { label: 'Programs', value: dept.programs.length, icon: GraduationCap },
                    { label: 'Labs', value: dept.labs.length, icon: FlaskConical },
                    { label: 'Awards', value: dept.achievements.length, icon: Trophy },
                  ].map(({ label, value, icon: Icon }, i) => (
                    <div key={i} className="text-center p-3 rounded-xl t-bg-alt">
                      <Icon size={16} className="mx-auto mb-1" style={{ color: 'var(--accent)' }} />
                      <div className="text-xl font-black t-h">{value}</div>
                      <div className="text-xs t-m">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Map */}
            <AnimatedSection direction="left" delay={0.15}>
              <div className="card rounded-2xl overflow-hidden">
                <iframe
                  title="RNSIT Location"
                  src="https://maps.google.com/maps?q=RNS+Institute+of+Technology,+Dr+Vishnuvardhan+Road,+RR+Nagar,+Bengaluru+560098&output=embed&z=16"
                  width="100%" height="180" style={{ border: 0 }} allowFullScreen="" loading="lazy" />
                <div className="p-3 flex items-start gap-2 text-xs t-m">
                  <MapPin size={12} style={{ color: 'var(--accent)' }} className="mt-0.5 shrink-0" />
                  Dr. Vishnuvardhan Road, R.R. Nagar, Bengaluru - 560098
                </div>
              </div>
            </AnimatedSection>

            {/* Other Departments */}
            <AnimatedSection direction="left" delay={0.2}>
              <div className="card rounded-2xl p-5">
                <h3 className="font-bold t-h mb-3 text-sm">Explore Other Departments</h3>
                <div className="space-y-1">
                  {departments.filter(d => d.id !== id).slice(0, 5).map(d => (
                    <Link key={d.id} to={`/departments/${d.id}`}
                      className="flex items-center gap-2 p-2 rounded-lg text-sm t-b hover:text-orange-500 transition-colors group">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 group-hover:scale-150 transition-transform"
                        style={{ background: 'var(--accent)' }} />
                      <span>{d.shortName}</span>
                      <span className="t-m text-xs">— {d.name.split(' ')[0]}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Apply CTA */}
            <AnimatedSection direction="left" delay={0.25}>
              <Link to="/apply"
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm rounded-2xl py-4">
                <GraduationCap size={16} /> Apply for {dept.shortName}
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  )
}
