import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, RadialBarChart, RadialBar
} from 'recharts'
import { TrendingUp, Users, Building2, Award, Filter, ArrowUp } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import {
  yearlyStats, deptPlacementData, topCompanies,
  packageDistribution, deptPieData, departments
} from '../data/placementData'

// ── Animated counter ─────────────────────────────────────
function CountUp({ end, suffix = '', prefix = '', duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0, t0 = null
    const step = (ts) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setCount(parseFloat((p * end).toFixed(2)))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, end, duration])
  return <span ref={ref}>{prefix}{typeof end === 'number' && end % 1 !== 0 ? count.toFixed(2) : Math.floor(count)}{suffix}</span>
}

// ── Custom Tooltip ────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl px-4 py-3 text-sm shadow-xl"
      style={{ background: 'var(--surface)', border: '1px solid var(--card-border)' }}>
      <p className="font-bold t-h mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          {p.name}: <strong>{p.value}{p.name?.includes('Pkg') || p.name?.includes('LPA') ? ' LPA' : ''}</strong>
        </p>
      ))}
    </div>
  )
}

// ── Stat Card ─────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, suffix, prefix, sub, color, delay }) {
  return (
    <AnimatedSection delay={delay}>
      <div className="card rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -translate-y-6 translate-x-6"
          style={{ background: color }} />
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${color}20` }}>
            <Icon size={18} style={{ color }} />
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-green-500">
            <ArrowUp size={10} /> Live
          </span>
        </div>
        <div className="text-3xl font-black t-h mb-1">
          <CountUp end={value} suffix={suffix} prefix={prefix} />
        </div>
        <div className="text-sm t-m">{label}</div>
        {sub && <div className="text-xs t-s mt-1">{sub}</div>}
      </div>
    </AnimatedSection>
  )
}

// ── Main Dashboard ────────────────────────────────────────
export default function PlacementDashboard() {
  const [deptFilter, setDeptFilter] = useState('All')
  const [yearFilter, setYearFilter] = useState('All')

  const filteredDept = deptFilter === 'All' ? deptPlacementData : deptPlacementData.filter(d => d.dept === deptFilter)
  const filteredYearly = yearFilter === 'All' ? yearlyStats : yearlyStats.filter(y => y.year === yearFilter)

  const totalPlaced = deptPlacementData.reduce((s, d) => s + d.placed, 0)
  const maxPkg = Math.max(...deptPlacementData.map(d => d.highest))
  const avgPkg = (deptPlacementData.reduce((s, d) => s + d.avg, 0) / deptPlacementData.length).toFixed(1)
  const totalCompanies = 200

  const ORANGE = '#f97316'
  const ORANGE2 = '#ea580c'
  const ORANGE3 = '#fb923c'

  return (
    <div className="t-bg min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <AnimatedSection className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="badge mb-2">Live Data</span>
              <h1 className="text-3xl md:text-4xl font-black t-h">
                Placement <span className="text-gradient">Dashboard</span>
              </h1>
              <p className="t-m text-sm mt-1">RNSIT Campus Placement Analytics — 2020 to 2026</p>
            </div>
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
                style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                <Filter size={14} style={{ color: ORANGE }} />
                <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
                  className="bg-transparent t-h text-sm focus:outline-none">
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
                style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                <Filter size={14} style={{ color: ORANGE }} />
                <select value={yearFilter} onChange={e => setYearFilter(e.target.value)}
                  className="bg-transparent t-h text-sm focus:outline-none">
                  <option value="All">All Years</option>
                  {yearlyStats.map(y => <option key={y.year} value={y.year}>{y.year}</option>)}
                </select>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Users}     label="Students Placed (2025)" value={1060}         suffix=""      color={ORANGE}  delay={0}    sub="↑ 19% from 2024" />
          <StatCard icon={Award}     label="Highest Package"         value={50}           suffix=" LPA"  color={ORANGE2} delay={0.1}  sub="2025 batch" />
          <StatCard icon={TrendingUp} label="Average Package"        value={parseFloat(avgPkg)} suffix=" LPA" color={ORANGE3} delay={0.2} sub="Across all depts" />
          <StatCard icon={Building2} label="Companies Visited"       value={totalCompanies} suffix="+"   color="#c2410c" delay={0.3}  sub="2024-25 season" />
        </div>

        {/* Row 1: Area Chart + Pie Chart */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">

          {/* Placement Trend - Area Chart */}
          <AnimatedSection delay={0.1} className="lg:col-span-2">
            <div className="card rounded-2xl p-5">
              <h3 className="font-bold t-h mb-1">Year-wise Placement Trend</h3>
              <p className="text-xs t-m mb-4">Students placed & internships over the years</p>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={filteredYearly.length > 1 ? filteredYearly : yearlyStats}>
                  <defs>
                    <linearGradient id="placedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={ORANGE} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={ORANGE} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="internGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={ORANGE3} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={ORANGE3} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(249,115,22,0.1)" />
                  <XAxis dataKey="year" tick={{ fill: 'var(--t3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--t3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12, color: 'var(--t3)' }} />
                  <Area type="monotone" dataKey="placed" name="Placed" stroke={ORANGE} strokeWidth={2.5} fill="url(#placedGrad)" dot={{ fill: ORANGE, r: 4 }} />
                  <Area type="monotone" dataKey="internships" name="Internships" stroke={ORANGE3} strokeWidth={2} fill="url(#internGrad)" dot={{ fill: ORANGE3, r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </AnimatedSection>

          {/* Department Pie */}
          <AnimatedSection delay={0.2}>
            <div className="card rounded-2xl p-5">
              <h3 className="font-bold t-h mb-1">Placements by Dept</h3>
              <p className="text-xs t-m mb-4">2025 batch distribution</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={deptPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                    paddingAngle={3} dataKey="value">
                    {deptPieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v} students`, n]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-1 mt-2">
                {deptPieData.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs t-m">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: d.color }} />
                    {d.name}: {d.value}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Row 2: Bar Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          {/* Dept-wise Avg Package */}
          <AnimatedSection delay={0.1}>
            <div className="card rounded-2xl p-5">
              <h3 className="font-bold t-h mb-1">Avg Package by Department</h3>
              <p className="text-xs t-m mb-4">In LPA — filtered by selection</p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={filteredDept} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(249,115,22,0.1)" vertical={false} />
                  <XAxis dataKey="dept" tick={{ fill: 'var(--t3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--t3)', fontSize: 11 }} axisLine={false} tickLine={false} unit=" L" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="avg" name="Avg Pkg (LPA)" radius={[6, 6, 0, 0]}>
                    {filteredDept.map((_, i) => (
                      <Cell key={i} fill={i % 2 === 0 ? ORANGE : ORANGE2} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedSection>

          {/* Highest Package by Dept */}
          <AnimatedSection delay={0.2}>
            <div className="card rounded-2xl p-5">
              <h3 className="font-bold t-h mb-1">Highest Package by Department</h3>
              <p className="text-xs t-m mb-4">In LPA — best offer per department</p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={filteredDept} barSize={28} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(249,115,22,0.1)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: 'var(--t3)', fontSize: 11 }} axisLine={false} tickLine={false} unit=" L" />
                  <YAxis type="category" dataKey="dept" tick={{ fill: 'var(--t3)', fontSize: 11 }} axisLine={false} tickLine={false} width={45} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="highest" name="Highest Pkg (LPA)" radius={[0, 6, 6, 0]}>
                    {filteredDept.map((_, i) => (
                      <Cell key={i} fill={`hsl(${20 + i * 8}, 90%, ${45 + i * 3}%)`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedSection>
        </div>

        {/* Row 3: Package Distribution + Top Companies */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          {/* Package Distribution */}
          <AnimatedSection delay={0.1}>
            <div className="card rounded-2xl p-5">
              <h3 className="font-bold t-h mb-1">Package Distribution</h3>
              <p className="text-xs t-m mb-4">Number of students per salary range</p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={packageDistribution} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(249,115,22,0.1)" vertical={false} />
                  <XAxis dataKey="range" tick={{ fill: 'var(--t3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--t3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Students" radius={[6, 6, 0, 0]}>
                    {packageDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedSection>

          {/* CTC Trend Line */}
          <AnimatedSection delay={0.2}>
            <div className="card rounded-2xl p-5">
              <h3 className="font-bold t-h mb-1">CTC Trend (Avg vs Highest)</h3>
              <p className="text-xs t-m mb-4">Package growth over the years in LPA</p>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={yearlyStats}>
                  <defs>
                    <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={ORANGE3} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={ORANGE3} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={ORANGE2} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={ORANGE2} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(249,115,22,0.1)" />
                  <XAxis dataKey="year" tick={{ fill: 'var(--t3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--t3)', fontSize: 11 }} axisLine={false} tickLine={false} unit="L" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12, color: 'var(--t3)' }} />
                  <Area type="monotone" dataKey="average" name="Avg Pkg LPA" stroke={ORANGE3} strokeWidth={2} fill="url(#avgGrad)" dot={{ fill: ORANGE3, r: 3 }} />
                  <Area type="monotone" dataKey="highest" name="Highest LPA" stroke={ORANGE2} strokeWidth={2.5} fill="url(#highGrad)" dot={{ fill: ORANGE2, r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </AnimatedSection>
        </div>

        {/* Row 4: Top Companies Table + Dept Stats Table */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Top Recruiters */}
          <AnimatedSection delay={0.1}>
            <div className="card rounded-2xl p-5">
              <h3 className="font-bold t-h mb-4">Top Recruiters by Hiring</h3>
              <div className="space-y-2">
                {topCompanies.map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs t-s w-5 text-right">{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium t-h">{c.name}</span>
                        <span className="t-m text-xs">{c.hired} hired · {c.avgPkg} LPA</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-alt)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(c.hired / 180) * 100}%` }}
                          transition={{ duration: 1, delay: i * 0.08 }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${ORANGE}, ${ORANGE2})` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Dept Stats Table */}
          <AnimatedSection delay={0.2}>
            <div className="card rounded-2xl p-5">
              <h3 className="font-bold t-h mb-4">Department-wise Summary</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                      {['Dept', 'Placed', 'Avg Pkg', 'Highest', 'Companies'].map(h => (
                        <th key={h} className="text-left py-2 px-2 text-xs font-semibold t-m">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDept.map((d, i) => (
                      <motion.tr key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="transition-colors hover:bg-orange-500/5"
                        style={{ borderBottom: '1px solid var(--card-border)' }}>
                        <td className="py-2.5 px-2 font-bold" style={{ color: ORANGE }}>{d.dept}</td>
                        <td className="py-2.5 px-2 t-b">{d.placed}</td>
                        <td className="py-2.5 px-2 t-b">{d.avg} LPA</td>
                        <td className="py-2.5 px-2 font-semibold text-green-500">{d.highest} LPA</td>
                        <td className="py-2.5 px-2 t-b">{d.companies}+</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs t-s mt-8">
          * 2026 data is ongoing as of March 2026. All figures are based on official RNSIT placement records.
        </p>
      </div>
    </div>
  )
}
