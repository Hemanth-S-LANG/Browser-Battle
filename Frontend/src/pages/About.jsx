import { motion, useInView } from 'framer-motion'
import { Award, Target, Eye, Users, Building2, BookOpen, Trophy, Star } from 'lucide-react'
import PageHero from '../components/PageHero'
import AnimatedSection from '../components/AnimatedSection'
import { useRef, useEffect, useState } from 'react'
import { collegeInfo, stats } from '../data/college'

function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, end, duration])
  return { count, start: () => setStarted(true) }
}

function WhiteStat({ value, label, suffix = '+' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const { count, start } = useCountUp(value)
  useEffect(() => { if (inView) start() }, [inView])
  return (
    <div ref={ref} className="t-h text-center py-4">
      <div className="text-4xl font-bold mb-1">{count.toLocaleString()}{suffix}</div>
      <div className="text-orange-100 text-sm">{label}</div>
    </div>
  )
}

const milestones = [
  { year: '2001', event: 'RNSIT established under VTU affiliation' },
  { year: '2005', event: 'First batch of graduates placed in top MNCs' },
  { year: '2010', event: 'NBA Accreditation received for all programs' },
  { year: '2015', event: 'Research center inaugurated with AICTE funding' },
  { year: '2018', event: 'NAAC A Grade accreditation achieved' },
  { year: '2022', event: 'NAAC A+ Grade — highest accreditation' },
  { year: '2024', event: 'Ranked among top 50 engineering colleges in India' },
]

const achievements = [
  { icon: Trophy, title: 'NAAC A+', desc: 'Highest accreditation grade' },
  { icon: Award, title: 'NBA Accredited', desc: 'All UG programs accredited' },
  { icon: Star, title: 'NIRF Ranked', desc: 'Top 100 Engineering Colleges' },
  { icon: Building2, title: '50+ Acres', desc: 'State-of-the-art campus' },
]

export default function About() {
  return (
    <div className="t-bg" style={{ minHeight: "100vh" }}>
      <PageHero
        title="About RNSIT"
        subtitle="A legacy of excellence in engineering education"
        breadcrumb="Home / About"
        image="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80"
      />

      {/* Overview */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="right">
            <img src="https://images.unsplash.com/photo-1562774053-701939374585?w=700&q=80"
              alt="Campus" className="rounded-2xl shadow-xl w-full h-80 object-cover"
              style={{ border: '1px solid var(--card-border)' }} />
          </AnimatedSection>
          <AnimatedSection direction="left">
            <span className="inline-block px-3 py-1 rounded-full bg-[rgba(249,115,22,0.12)] text-orange-500 dark:text-orange-400 text-sm font-medium mb-4">Our Story</span>
            <h2 className="text-3xl font-bold t-h mb-4">
              Building Engineers Since <span className="text-gradient">2001</span>
            </h2>
            <p className="t-h-sec leading-relaxed mb-4">
              RNS Institute of Technology (RNSIT) was established in 2001 by the RNS Educational Trust, Bengaluru. Located in the heart of Bengaluru's tech corridor, RNSIT has grown into one of Karnataka's most respected engineering institutions.
            </p>
            <p className="t-h-sec leading-relaxed">
              Affiliated to Visvesvaraya Technological University (VTU) and approved by AICTE, RNSIT offers B.E., M.Tech, and Ph.D programs across 8 departments with an intake of over 1200 students annually.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding" className="t-bg-alt">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold t-h mb-3">Vision & <span className="text-gradient">Mission</span></h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="rounded-2xl p-8 shadow-sm border border-orange-500/10 h-full" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <div className="w-12 h-12 rounded-xl bg-[rgba(249,115,22,0.12)] flex items-center justify-center mb-4">
                  <Eye className="text-orange-500" size={24} />
                </div>
                <h3 className="text-xl font-bold t-h mb-3">Our Vision</h3>
                <p className="t-b leading-relaxed">
                  {collegeInfo.vision}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="rounded-2xl p-8 shadow-sm border border-orange-500/10 h-full" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-cyan-900/30 flex items-center justify-center mb-4">
                  <Target className="text-orange-600" size={24} />
                </div>
                <h3 className="text-xl font-bold t-h mb-3">Our Mission</h3>
                <ul className="space-y-2 t-b">
                  {collegeInfo.mission.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding t-bg-alt" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {stats.slice(0, 12).map((s, i) => (
            <WhiteStat key={i} value={s.value} label={s.label} suffix={s.suffix} />
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold t-h mb-3">Our <span className="text-gradient">Achievements</span></h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map(({ icon: Icon, title, desc }, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="text-center p-6 rounded-2xl shadow-sm border border-orange-500/10 hover:shadow-lg transition-shadow" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <div className="w-14 h-14 rounded-2xl bg-[rgba(249,115,22,0.12)] flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-orange-500" size={28} />
                </div>
                <h3 className="font-bold t-h mb-1">{title}</h3>
                <p className="text-sm t-h-mut">{desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding" className="t-bg-alt">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold t-h mb-3">Our <span className="text-gradient">Journey</span></h2>
          </AnimatedSection>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-orange-200 dark:bg-orange-900" />
            {milestones.map((m, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="relative flex gap-6 mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center t-h text-xs font-bold shrink-0 shadow-lg z-10">
                  {m.year}
                </div>
                <div className="rounded-xl p-4 shadow-sm border border-orange-500/10 flex-1 mt-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <p className="t-h-sec">{m.event}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Gallery */}
      <section className="section-padding max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold t-h mb-3">Campus <span className="text-gradient">Overview</span></h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80',
            'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80',
            'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80',
            'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&q=80',
            'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80',
            'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80',
            'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&q=80',
            'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80',
          ].map((img, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div className="overflow-hidden rounded-xl aspect-square">
                <img src={img} alt={`Campus ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  )
}
