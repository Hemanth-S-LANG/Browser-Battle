import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, TrendingUp, BookOpen, Briefcase, Users, Award, ChevronDown } from 'lucide-react'
import { departments } from '../data/departments'

const ACCENT = '#f97316'

// Which metric is "best" (highest wins)
const METRICS = [
  { key: 'placementRate', label: 'Placement Rate', suffix: '%', icon: TrendingUp, higher: true },
  { key: 'avgPackage',    label: 'Avg Package',    suffix: '',   icon: Award,      higher: true },
  { key: 'seats',         label: 'Total Seats',    suffix: '',   icon: Users,      higher: false },
  { key: 'facultyCount',  label: 'Faculty',        suffix: '',   icon: Users,      higher: true },
  { key: 'researchPapers',label: 'Research Papers',suffix: '',   icon: BookOpen,   higher: true },
]

function getBest(selected, key) {
  const vals = selected.map(d => parseFloat(d.compare[key]))
  return Math.max(...vals)
}

export default function CompareDepartments() {
  const [selected, setSelected] = useState([])
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('placements') // placements | subjects | opportunities

  const add = (dept) => {
    if (selected.find(d => d.id === dept.id)) return
    if (selected.length >= 3) return
    setSelected(s => [...s, dept])
    setOpen(false)
  }

  const remove = (id) => setSelected(s => s.filter(d => d.id !== id))

  const available = departments.filter(d => !selected.find(s => s.id === d.id))

  const TABS = [
    { id: 'placements',    label: 'Placements',    icon: TrendingUp },
    { id: 'subjects',      label: 'Subjects',      icon: BookOpen },
    { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
  ]

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--card-border)', background: 'var(--card)' }}>

      {/* Header */}
      <div className="p-5 border-b" style={{ borderColor: 'var(--card-border)' }}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="font-black text-lg t-h">Compare Departments</h3>
            <p className="text-xs t-m mt-0.5">Select up to 3 departments to compare side by side</p>
          </div>
          {/* Add button */}
          {selected.length < 3 && (
            <div className="relative">
              <button onClick={() => setOpen(o => !o)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: ACCENT }}>
                <Plus size={15} /> Add Department <ChevronDown size={13} className={open ? 'rotate-180' : ''} style={{ transition: 'transform .2s' }} />
              </button>
              <AnimatePresence>
                {open && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-2 w-64 rounded-xl shadow-2xl z-50 overflow-hidden"
                    style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                    {available.map(d => (
                      <button key={d.id} onClick={() => add(d)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-orange-500/10 transition-colors">
                        <span className="text-xl">{d.icon}</span>
                        <div>
                          <div className="text-sm font-semibold t-h">{d.shortName}</div>
                          <div className="text-xs t-m">{d.name}</div>
                        </div>
                      </button>
                    ))}
                    {available.length === 0 && (
                      <div className="px-4 py-3 text-xs t-m">All departments selected</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Selected chips */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {selected.map(d => (
              <div key={d.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold text-white"
                style={{ background: 'rgba(249,115,22,0.85)' }}>
                {d.icon} {d.shortName}
                <button onClick={() => remove(d.id)} className="hover:scale-125 transition-transform">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 t-m text-center px-4">
          <div className="text-5xl mb-4">🔍</div>
          <div className="font-semibold t-h mb-1">No departments selected</div>
          <div className="text-sm">Click "Add Department" above to start comparing</div>
        </div>
      ) : (
        <>
          {/* Tab switcher */}
          <div className="flex border-b" style={{ borderColor: 'var(--card-border)' }}>
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-all"
                style={{
                  color: tab === id ? ACCENT : 'var(--t3)',
                  borderBottom: tab === id ? `2px solid ${ACCENT}` : '2px solid transparent',
                }}>
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>

          <div className="p-5">
            <AnimatePresence mode="wait">

              {/* ── PLACEMENTS TAB ── */}
              {tab === 'placements' && (
                <motion.div key="placements" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  {/* Metric bars */}
                  {METRICS.map(({ key, label, suffix, icon: Icon, higher }) => {
                    const best = getBest(selected, key)
                    return (
                      <div key={key} className="mb-5">
                        <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold t-h">
                          <Icon size={12} style={{ color: ACCENT }} /> {label}
                        </div>
                        <div className="space-y-2">
                          {selected.map(d => {
                            const raw = parseFloat(d.compare[key])
                            const display = d.compare[key]
                            const pct = best > 0 ? (raw / best) * 100 : 0
                            const isBest = raw === best
                            return (
                              <div key={d.id} className="flex items-center gap-3">
                                <div className="w-10 text-xs font-bold t-h shrink-0">{d.shortName}</div>
                                <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ background: 'var(--surface, rgba(0,0,0,0.1))' }}>
                                  <motion.div className="h-full rounded-full flex items-center px-2"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 0.7, ease: 'easeOut' }}
                                    style={{ background: isBest ? ACCENT : 'rgba(249,115,22,0.35)', minWidth: '2rem' }}>
                                    <span className="text-white text-[10px] font-bold whitespace-nowrap">{display}{suffix}</span>
                                  </motion.div>
                                </div>
                                {isBest && <span className="text-[10px] font-bold shrink-0" style={{ color: ACCENT }}>★ Best</span>}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}

                  {/* Top recruiters */}
                  <div className="mt-4">
                    <div className="text-xs font-semibold t-h mb-3 flex items-center gap-1.5">
                      <Briefcase size={12} style={{ color: ACCENT }} /> Top Recruiters
                    </div>
                    <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${selected.length}, 1fr)` }}>
                      {selected.map(d => (
                        <div key={d.id}>
                          <div className="text-xs font-bold mb-1.5" style={{ color: ACCENT }}>{d.shortName}</div>
                          <div className="flex flex-wrap gap-1">
                            {d.compare.topRecruiters.map(r => (
                              <span key={r} className="text-[10px] px-2 py-0.5 rounded-full t-h"
                                style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)' }}>{r}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── SUBJECTS TAB ── */}
              {tab === 'subjects' && (
                <motion.div key="subjects" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selected.length}, 1fr)` }}>
                    {selected.map(d => (
                      <div key={d.id} className="rounded-xl p-3" style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.15)' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg">{d.icon}</span>
                          <span className="font-bold text-sm t-h">{d.shortName}</span>
                        </div>
                        <div className="space-y-1.5">
                          {d.compare.subjects.map((s, i) => (
                            <motion.div key={s} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                              className="flex items-center gap-2 text-xs t-h">
                              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
                              {s}
                            </motion.div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t text-xs t-m" style={{ borderColor: 'rgba(249,115,22,0.15)' }}>
                          {d.compare.subjects.length} core subjects
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── OPPORTUNITIES TAB ── */}
              {tab === 'opportunities' && (
                <motion.div key="opportunities" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selected.length}, 1fr)` }}>
                    {selected.map(d => (
                      <div key={d.id} className="rounded-xl p-3" style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.15)' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg">{d.icon}</span>
                          <span className="font-bold text-sm t-h">{d.shortName}</span>
                        </div>
                        <div className="space-y-2">
                          {d.compare.opportunities.map((o, i) => (
                            <motion.div key={o} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                              className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium t-h"
                              style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                              <Briefcase size={10} style={{ color: ACCENT, flexShrink: 0 }} /> {o}
                            </motion.div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t text-xs t-m" style={{ borderColor: 'rgba(249,115,22,0.15)' }}>
                          Accreditation: <span className="font-semibold t-h">{d.compare.accreditation}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  )
}
