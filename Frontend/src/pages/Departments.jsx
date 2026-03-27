import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import AnimatedSection from '../components/AnimatedSection'
import CompareDepartments from '../components/CompareDepartments'
import GoalJourney from '../components/GoalJourney'
import { departments } from '../data/college'

export default function Departments() {
  const [query, setQuery] = useState('')

  const filtered = departments.filter(d =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.shortName.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div style={{ background: '#020817', minHeight: '100vh' }}>
      <PageHero title="Departments" subtitle="Explore our world-class engineering programs" breadcrumb="Home / Departments" />

      <section className="section-padding max-w-7xl mx-auto px-4">
        <AnimatedSection className="max-w-md mx-auto mb-14">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 t-m" />
            <input type="text" placeholder="Search departments..." value={query} onChange={e => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-orange-500/50 transition-all"
              style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(249,115,22,0.15)' }}
            />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dept, i) => (
            <motion.div key={dept.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link to={`/departments/${dept.id}`} className="group block rounded-2xl overflow-hidden glass-card">
                <div className="relative h-52 overflow-hidden">
                  <img src={dept.image} alt={dept.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${dept.color} opacity-50`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-bold text-white/50 tracking-widest uppercase">{dept.shortName}</span>
                    <h3 className="text-white font-bold text-lg leading-tight">{dept.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm t-m mb-4 line-clamp-2">{dept.about}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dept.programs.slice(0, 2).map((p, j) => (
                      <span key={j} className="px-2 py-1 text-orange-400 text-xs rounded-lg"
                        style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.15)' }}>{p}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs t-s">{dept.faculty.length} Faculty Members</span>
                    <span className="flex items-center gap-1 text-orange-400 text-xs font-semibold group-hover:gap-2 transition-all">
                      Explore <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 t-s">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p>No departments found for "{query}"</p>
          </div>
        )}
      </section>

      {/* Goal Journey */}
      <section className="section-padding max-w-7xl mx-auto px-4 pb-8">
        <AnimatedSection className="text-center mb-8">
          <h2 className="text-3xl font-bold t-h mb-2">Goal-Based <span className="text-gradient">Journey Builder</span></h2>
          <p className="t-m text-sm">Tell us what you want — get your best department, skills & 4-year roadmap</p>
        </AnimatedSection>
        <AnimatedSection>
          <GoalJourney />
        </AnimatedSection>
      </section>

      {/* Compare Tool */}
      <section className="section-padding max-w-7xl mx-auto px-4 pb-16">
        <AnimatedSection className="text-center mb-8">
          <h2 className="text-3xl font-bold t-h mb-2">Compare <span className="text-gradient">Departments</span></h2>
          <p className="t-m text-sm">Pick 2–3 departments and compare placements, subjects & opportunities</p>
        </AnimatedSection>
        <AnimatedSection>
          <CompareDepartments />
        </AnimatedSection>
      </section>
    </div>
  )
}
