import { TrendingUp, Users, Building2, Award } from 'lucide-react'
import PageHero from '../components/PageHero'
import AnimatedSection from '../components/AnimatedSection'
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

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
      <div className="text-blue-100 text-sm">{label}</div>
    </div>
  )
}

const companies = [
  { name: 'Google', package: '45 LPA' },
  { name: 'Microsoft', package: '42 LPA' },
  { name: 'Amazon', package: '38 LPA' },
  { name: 'Infosys', package: '8 LPA' },
  { name: 'TCS', package: '7 LPA' },
  { name: 'Wipro', package: '7.5 LPA' },
  { name: 'Accenture', package: '9 LPA' },
  { name: 'IBM', package: '10 LPA' },
  { name: 'Qualcomm', package: '35 LPA' },
  { name: 'Intel', package: '30 LPA' },
  { name: 'Cisco', package: '28 LPA' },
  { name: 'Oracle', package: '22 LPA' },
]

const stories = [
  { name: 'Arjun Sharma', company: 'Google', package: '45 LPA', dept: 'CSE 2022', avatar: 'https://i.pravatar.cc/80?img=20', quote: 'RNSIT prepared me for the toughest interviews.' },
  { name: 'Priya Nair', company: 'Qualcomm', package: '35 LPA', dept: 'ECE 2021', avatar: 'https://i.pravatar.cc/80?img=21', quote: 'The placement cell was incredibly supportive.' },
  { name: 'Rahul Mehta', company: 'Microsoft', package: '42 LPA', dept: 'CSE 2023', avatar: 'https://i.pravatar.cc/80?img=22', quote: 'Mock interviews and coding sessions made all the difference.' },
]

const yearStats = [
  { year: '2024', placed: 1180, highest: '45 LPA', average: '12 LPA', companies: 120 },
  { year: '2023', placed: 1050, highest: '42 LPA', average: '10 LPA', companies: 105 },
  { year: '2022', placed: 980, highest: '38 LPA', average: '9 LPA', companies: 95 },
]

export default function Placements() {
  return (
    <div className="t-bg" style={{ minHeight: "100vh" }}>
      <PageHero title="Placements" subtitle="Building careers at the world's best companies"
        breadcrumb="Home / Placements"
        image="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1600&q=80" />

      {/* Stats */}
      <section className="py-12" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.1))", borderTop: "1px solid rgba(96,165,250,0.1)", borderBottom: "1px solid rgba(96,165,250,0.1)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: 95, label: 'Placement Rate', suffix: '%' },
            { value: 45, label: 'Highest Package (LPA)', suffix: '' },
            { value: 120, label: 'Companies Visited', suffix: '+' },
            { value: 1180, label: 'Students Placed (2024)', suffix: '' },
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
          <table className="w-full rounded-2xl shadow-sm border border-blue-500/10 overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
            <thead>
              <tr className="bg-blue-600 t-h">
                <th className="px-6 py-4 text-left text-sm font-semibold">Year</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Students Placed</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Highest Package</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Average Package</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Companies</th>
              </tr>
            </thead>
            <tbody>
              {yearStats.map((row, i) => (
                <tr key={i} className="border-t border-blue-500/10 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
                  <td className="px-6 py-4 font-semibold t-h">{row.year}</td>
                  <td className="px-6 py-4 t-h-sec">{row.placed}</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">{row.highest}</td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">{row.average}</td>
                  <td className="px-6 py-4 t-h-sec">{row.companies}+</td>
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
                <div className="rounded-2xl p-4 text-center shadow-sm border border-blue-500/10 hover:shadow-lg hover:-translate-y-1 transition-all" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                  <div className="w-10 h-10 rounded-full bg-[rgba(59,130,246,0.12)] flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold text-xs">{c.name.slice(0,2).toUpperCase()}</span>
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
              <div className="rounded-2xl p-6 shadow-sm border border-blue-500/10 hover:shadow-xl transition-shadow" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <img src={s.avatar} alt={s.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900" />
                  <div>
                    <div className="font-bold t-h">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.dept}</div>
                  </div>
                </div>
                <p className="t-h-sec text-sm italic mb-4">"{s.quote}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-blue-600">{s.company}</span>
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
