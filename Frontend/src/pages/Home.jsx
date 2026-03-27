import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, Award, Users, BookOpen, Building2, Trophy, Zap } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { departments, stats as collegeStats, companies as recruiterList, collegeInfo } from '../data/college'

function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    if (!started) return
    let t0 = null
    const step = ts => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setCount(Math.floor(p * end))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, end, duration])
  return { count, start: () => setStarted(true) }
}

function StatItem({ value, label, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const { count, start } = useCountUp(value)
  useEffect(() => { if (inView) start() }, [inView])
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-black shimmer-text mb-1">{count.toLocaleString()}{suffix}</div>
      <div className="text-xs tracking-wider uppercase t-m">{label}</div>
    </div>
  )
}

const heroWords = ['Innovators', 'Engineers', 'Leaders', 'Visionaries']
const testimonials = [
  { name: 'Arjun Sharma', batch: 'CSE 2022', company: 'Google', text: 'RNSIT gave me the foundation to crack into top tech companies. The faculty and labs are world-class.', avatar: 'https://i.pravatar.cc/80?img=20' },
  { name: 'Priya Nair', batch: 'ECE 2021', company: 'Qualcomm', text: 'The research opportunities and industry exposure at RNSIT are unmatched. Best decision of my life.', avatar: 'https://i.pravatar.cc/80?img=21' },
  { name: 'Rahul Mehta', batch: 'ME 2023', company: 'ISRO', text: 'The practical approach to learning and excellent placement support helped me land my dream job.', avatar: 'https://i.pravatar.cc/80?img=22' },
]
const companies = recruiterList.slice(0, 20)

export default function Home() {
  const [wordIdx, setWordIdx] = useState(0)
  const [tIdx, setTIdx] = useState(0)
  useEffect(() => { const t = setInterval(() => setWordIdx(p => (p + 1) % heroWords.length), 2500); return () => clearInterval(t) }, [])
  useEffect(() => { const t = setInterval(() => setTIdx(p => (p + 1) % testimonials.length), 4000); return () => clearInterval(t) }, [])

  return (
    <div className="t-bg">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{ background: 'var(--hero)' }}>
        {/* Floating orbs — subtle in light, glowing in dark */}
        <div className="absolute top-32 left-16 w-20 h-20 rounded-full animate-float opacity-40 dark:opacity-60"
          style={{ background: 'radial-gradient(circle at 30% 30%, #fed7aa, #ffedd5)', boxShadow: '0 0 40px rgba(249,115,22,0.2)' }} />
        <div className="absolute bottom-40 right-20 w-14 h-14 rounded-full animate-float-delay opacity-30 dark:opacity-50"
          style={{ background: 'radial-gradient(circle at 30% 30%, #ddd6fe, #ede9fe)', boxShadow: '0 0 30px rgba(124,58,237,0.2)' }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(var(--accent) 1px,transparent 1px),linear-gradient(90deg,var(--accent) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="badge mb-8">
            <Zap size={10} className="inline mr-1" /> Top 10 Engineering Colleges in Karnataka — NAAC A+
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-4 t-h">
            Shaping Future<br />
            <AnimatePresence mode="wait">
              <motion.span key={wordIdx}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.5 }}
                className="shimmer-text inline-block">
                {heroWords[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="t-b text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Excellence in Engineering Education since 2001 — Bengaluru's premier institution for technology and innovation.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4">
            <Link to="/apply" className="btn-primary flex items-center gap-2 text-sm">
              Apply Now <ArrowRight size={15} />
            </Link>
            <Link to="/departments" className="btn-outline text-sm">
              Explore Departments
            </Link>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase t-s">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8" style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 t-bg-alt" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {collegeStats.slice(0, 12).map((s, i) => (
            <StatItem key={i} value={s.value} label={s.label} suffix={s.suffix} />
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section t-bg max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="right">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1562774053-701939374585?w=700&q=80"
                alt="Campus" className="rounded-2xl w-full h-80 object-cover"
                style={{ boxShadow: 'var(--shadow-lg)', border: '1px solid var(--card-border)' }} />
              <div className="absolute -bottom-5 -right-5 rounded-2xl p-4 card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.1)' }}>
                    <Trophy size={20} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <div className="font-bold t-h text-sm">NAAC A+</div>
                    <div className="text-xs t-s">Accredited</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="left">
            <span className="badge mb-4">About RNSIT</span>
            <h2 className="text-3xl md:text-4xl font-black t-h mb-4 leading-tight">
              A Legacy of <span className="text-gradient">Excellence</span>
            </h2>
            <p className="t-b leading-relaxed mb-6">
              RNS Institute of Technology, established in 2001, is one of Bengaluru's premier engineering institutions. Affiliated to VTU and approved by AICTE, RNSIT offers undergraduate and postgraduate programs across 8 departments.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: Award, label: 'NAAC A+ Accredited' },
                { icon: Building2, label: '50+ Acre Campus' },
                { icon: Users, label: '5000+ Students' },
                { icon: BookOpen, label: '8 Departments' },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-2 text-sm t-b">
                  <Icon size={14} style={{ color: 'var(--accent)' }} /> {label}
                </div>
              ))}
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-sm hover:gap-3 transition-all" style={{ color: 'var(--accent)' }}>
              Learn More <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── DEPARTMENTS ── */}
      <section className="section t-bg-alt">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <span className="badge mb-4">Academics</span>
            <h2 className="text-3xl md:text-5xl font-black t-h mb-3">Our <span className="text-gradient">Departments</span></h2>
            <p className="t-m max-w-xl mx-auto">Explore our diverse range of engineering programs designed for the future</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((dept, i) => (
              <AnimatedSection key={dept.id} delay={i * 0.08}>
                <Link to={`/departments/${dept.id}`} className="group block card overflow-hidden">
                  <div className="relative h-44 overflow-hidden">
                    <img src={dept.image} alt={dept.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${dept.color} opacity-60`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <span className="text-xs font-bold text-white/70 tracking-widest uppercase">{dept.shortName}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold t-h text-sm mb-2 group-hover:text-orange-500 transition-colors">{dept.name}</h3>
                    <p className="text-xs t-m line-clamp-2 mb-3">{dept.about}</p>
                    <div className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: 'var(--accent)' }}>
                      Explore <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/departments" className="btn-outline text-sm inline-flex items-center gap-2">
              View All Departments <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── RECRUITERS ── */}
      <section className="section t-bg">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black t-h mb-3">Top <span className="text-gradient">Recruiters</span></h2>
            <p className="t-m">Our students are placed in the world's leading companies</p>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3">
            {companies.map((c, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }} transition={{ delay: i * 0.04 }}
                className="px-5 py-2.5 rounded-xl font-semibold text-sm t-b card cursor-default">
                {c}
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/placements" className="btn-primary text-sm inline-flex items-center gap-2">
              View Placement Stats <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section t-bg-alt">
        <div className="max-w-3xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black t-h mb-3">Alumni <span className="text-gradient">Speak</span></h2>
          </AnimatedSection>
          <AnimatePresence mode="wait">
            <motion.div key={tIdx}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="card p-8 text-center">
              <img src={testimonials[tIdx].avatar} alt={testimonials[tIdx].name}
                className="w-16 h-16 rounded-full mx-auto mb-5 object-cover"
                style={{ border: '3px solid var(--accent)', boxShadow: '0 0 0 4px rgba(249,115,22,0.1)' }} />
              <p className="t-b text-lg italic mb-6 leading-relaxed">"{testimonials[tIdx].text}"</p>
              <div className="font-bold t-h">{testimonials[tIdx].name}</div>
              <div className="text-sm t-m">{testimonials[tIdx].batch} · {testimonials[tIdx].company}</div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setTIdx(i)}
                className="h-2 rounded-full transition-all"
                style={{ width: i === tIdx ? '24px' : '8px', background: i === tIdx ? 'var(--accent)' : 'var(--border)' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section t-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <div className="rounded-2xl p-12 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg,rgba(249,115,22,0.08),rgba(8,145,178,0.06))', border: '1px solid var(--card-border)' }}>
              <h2 className="text-3xl md:text-4xl font-black t-h mb-4">Ready to Start Your Journey?</h2>
              <p className="t-m mb-8">Join thousands of students who have built their careers at RNSIT</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/admissions" className="btn-primary text-sm">Apply for Admission</Link>
                <Link to="/contact" className="btn-outline text-sm">Contact Us</Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
