import { TrendingUp, Users, Building2, Award } from 'lucide-react'
import PageHero from '../components/PageHero'
import AnimatedSection from '../components/AnimatedSection'
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { companies as allCompanies, placementStats } from '../data/college'

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

function WhiteStat({ value, label, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const { count, start } = useCountUp(value)
  useEffect(() => { if (inView) start() }, [inView])
  return (
    <div ref={ref} className="t-h text-center">
      <div className="text-4xl font-bold mb-1">{count.toLocaleString()}{suffix}</div>
      <div className="text-orange-100 text-sm">{label}</div>
    </div>
  )
}

const companies = allCompanies.slice(0, 24).map(name => ({ name }))

const stories = [
  { name: 'Arjun Sharma', company: 'Infosys', package: '26.65 LPA', dept: 'CSE 2024', avatar: 'https://i.pravatar.cc/80?img=20', quote: 'RNSIT prepared me for the toughest interviews with excellent aptitude and technical training.' },
  { name: 'Priya Nair', company: 'Texas Instruments', package: '20.87 LPA', dept: 'ECE 2025', avatar: 'https://i.pravatar.cc/80?img=21', quote: 'The placement cell was incredibly supportive and the mock interviews were very helpful.' },
  { name: 'Rahul Mehta', company: 'Oracle', package: '50 LPA', dept: 'CSE 2025', avatar: 'https://i.pravatar.cc/80?img=22', quote: 'Mock interviews and coding sessions at RNSIT made all the difference in my career.' },
]

const yearStats = placementStats

export default function Placements() {
  return (
    <div className="t-bg" style={{ minHeight: "100vh" }}>
      <PageHero title="Placements" subtitle="Building careers at the world's best companies"
        breadcrumb="Home / Placements"
        image="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1600&q=80" />

      {/* Stats */}
      <section className="py-12 t-bg-alt" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: 1060, label: 'Placements 2025', suffix: '' },
            { value: 50, label: 'Highest CTC 2025 (LPA)', suffix: '' },
            { value: 200, label: 'Companies Visited', suffix: '+' },
            { value: 1386, label: 'Job Offers 2023', suffix: '' },
          ].map((s, i) => (
            <WhiteStat key={i} value={s.value} label={s.label} suffix={s.suffix} />
          ))}
        </div>
      </section>

      {/* Year-wise Stats */}
      <section className="section-padding max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold t-h mb-3">Year-wise <span className="text-gradient">Statistics</span></h2>
        </AnimatedSection>
        <div className="overflow-x-auto">
          <table className="w-full rounded-2xl shadow-sm border border-orange-500/10 overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
            <thead>
              <tr style={{ background: 'var(--accent)' }}>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Year</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Students Placed</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Highest CTC</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Internships</th>
              </tr>
            </thead>
            <tbody>
              {yearStats.map((row, i) => (
                <tr key={i} className="border-t transition-colors hover:bg-orange-500/5" style={{ borderColor: 'var(--border)' }}>
                  <td className="px-6 py-4 font-semibold t-h">{row.year}</td>
                  <td className="px-6 py-4 t-b">{row.placed}</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">{row.highest}</td>
                  <td className="px-6 py-4 t-b">{row.internships || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Companies */}
      <section className="section-padding" className="t-bg-alt">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold t-h mb-3">Our <span className="text-gradient">Recruiters</span></h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {companies.map((c, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="rounded-2xl p-4 text-center shadow-sm border border-orange-500/10 hover:shadow-lg hover:-translate-y-1 transition-all" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                  <div className="w-10 h-10 rounded-full bg-[rgba(249,115,22,0.12)] flex items-center justify-center mx-auto mb-2">
                    <span className="text-orange-500 font-bold text-xs">{c.name.slice(0,2).toUpperCase()}</span>
                  </div>
                  <div className="font-semibold t-h text-sm">{c.name}</div>
                  <div className="text-xs text-green-600 font-medium">{c.package}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold t-h mb-3">Success <span className="text-gradient">Stories</span></h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="rounded-2xl p-6 shadow-sm border border-orange-500/10 hover:shadow-xl transition-shadow" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <img src={s.avatar} alt={s.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-100 dark:ring-orange-900" />
                  <div>
                    <div className="font-bold t-h">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.dept}</div>
                  </div>
                </div>
                <p className="t-h-sec text-sm italic mb-4">"{s.quote}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-orange-500">{s.company}</span>
                  <span className="px-2 py-1 bg-[rgba(34,197,94,0.12)] text-green-600 text-xs rounded-lg font-semibold">{s.package}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  )
}
