import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, RotateCcw, CheckCircle, Zap, BookOpen, TrendingUp, FlaskConical, Globe, Shield, Cpu, Wrench } from 'lucide-react'

const GOALS = [
  { id: 'salary',    emoji: '💰', label: 'High Salary',       desc: 'I want the best paying job after graduation' },
  { id: 'research',  emoji: '🔬', label: 'Research & PhD',    desc: 'I want to do deep research and publish papers' },
  { id: 'startup',   emoji: '🚀', label: 'Start a Company',   desc: 'I want to build my own product or startup' },
  { id: 'govt',      emoji: '🏛️', label: 'Govt / PSU Jobs',   desc: 'I want a stable government or PSU career' },
  { id: 'abroad',    emoji: '✈️', label: 'Study / Work Abroad',desc: 'I want to go to a foreign university or company' },
  { id: 'core',      emoji: '⚙️', label: 'Core Engineering',  desc: 'I want to work in my core engineering domain' },
]

const RESULTS = {
  salary: {
    departments: ['CSE', 'ISE'],
    why: 'CSE and ISE consistently produce the highest packages at RNSIT, with top recruiters like Google, Microsoft and Amazon offering 20–40 LPA.',
    skills: ['Data Structures & Algorithms', 'System Design', 'LeetCode / CP', 'Cloud (AWS/GCP)', 'Full Stack Dev', 'Machine Learning'],
    roadmap: [
      { sem: 'Sem 1–2', task: 'Master C++ / Python fundamentals, start DSA basics' },
      { sem: 'Sem 3–4', task: 'Solve 200+ LeetCode problems, learn DBMS & OS concepts' },
      { sem: 'Sem 5–6', task: 'Build 2 full-stack projects, contribute to open source' },
      { sem: 'Sem 7',   task: 'Crack internships at product companies, system design prep' },
      { sem: 'Sem 8',   task: 'Final placements — target FAANG / unicorn startups' },
    ],
    color: '#f97316',
    icon: TrendingUp,
  },
  research: {
    departments: ['CSE', 'ECE'],
    why: 'CSE (AI/ML focus) and ECE (VLSI/Signal Processing) have the most active research labs, AICTE-funded projects and PhD programs at RNSIT.',
    skills: ['Mathematics & Statistics', 'Research Paper Writing', 'Python / MATLAB', 'Deep Learning', 'Signal Processing', 'LaTeX'],
    roadmap: [
      { sem: 'Sem 1–2', task: 'Build strong math foundation — Linear Algebra, Calculus, Probability' },
      { sem: 'Sem 3–4', task: 'Read 5+ research papers, learn Python/MATLAB for experiments' },
      { sem: 'Sem 5–6', task: 'Join a faculty research group, co-author a conference paper' },
      { sem: 'Sem 7',   task: 'Apply for research internships (IISc, IITs, abroad universities)' },
      { sem: 'Sem 8',   task: 'Submit journal paper, apply for MS/PhD programs' },
    ],
    color: '#8b5cf6',
    icon: FlaskConical,
  },
  startup: {
    departments: ['CSE', 'ISE'],
    why: 'CSE and ISE give you the technical depth to build products. RNSIT\'s E-Cell and GDSC provide mentorship, funding access and hackathon exposure.',
    skills: ['Product Thinking', 'Full Stack Development', 'UI/UX Design', 'Business Model Canvas', 'Pitching & Communication', 'No-code Tools'],
    roadmap: [
      { sem: 'Sem 1–2', task: 'Learn web dev basics, identify a real-world problem to solve' },
      { sem: 'Sem 3–4', task: 'Build an MVP, join E-Cell, participate in hackathons' },
      { sem: 'Sem 5–6', task: 'Launch a beta product, get 100 real users, apply for incubation' },
      { sem: 'Sem 7',   task: 'Pitch to angel investors / startup competitions' },
      { sem: 'Sem 8',   task: 'Raise pre-seed or join a high-growth startup as early employee' },
    ],
    color: '#f43f5e',
    icon: Zap,
  },
  govt: {
    departments: ['EEE', 'ME', 'CIVIL'],
    why: 'EEE, ME and Civil are the most relevant branches for GATE, UPSC ESE, BHEL, NTPC, NHAI and other PSU exams.',
    skills: ['GATE Exam Prep', 'Core Subject Mastery', 'Aptitude & Reasoning', 'Technical Report Writing', 'Interview Skills'],
    roadmap: [
      { sem: 'Sem 1–2', task: 'Build strong core subject fundamentals from day one' },
      { sem: 'Sem 3–4', task: 'Start GATE syllabus mapping, solve previous year papers' },
      { sem: 'Sem 5–6', task: 'Join a GATE coaching or online course, mock tests weekly' },
      { sem: 'Sem 7',   task: 'Appear for GATE, apply for PSU recruitment drives' },
      { sem: 'Sem 8',   task: 'PSU interviews, UPSC ESE preparation if targeting IES' },
    ],
    color: '#10b981',
    icon: Shield,
  },
  abroad: {
    departments: ['CSE', 'ECE', 'ME'],
    why: 'CSE, ECE and ME have the strongest MS admit records from RNSIT. Research experience and GRE scores matter most — these depts give you both.',
    skills: ['GRE / IELTS / TOEFL', 'Research Experience (SOP)', 'Competitive Programming', 'Networking on LinkedIn', 'Technical Writing'],
    roadmap: [
      { sem: 'Sem 1–2', task: 'Maintain high CGPA (target 9+), start GRE vocab building' },
      { sem: 'Sem 3–4', task: 'Join a research lab, get a professor LOR, build GitHub profile' },
      { sem: 'Sem 5–6', task: 'Give GRE/IELTS, shortlist 10–15 universities' },
      { sem: 'Sem 7',   task: 'Write SOP, get 3 strong LORs, apply by December' },
      { sem: 'Sem 8',   task: 'Visa process, accept admit, prepare for relocation' },
    ],
    color: '#0ea5e9',
    icon: Globe,
  },
  core: {
    departments: ['ECE', 'ME', 'EEE', 'CIVIL'],
    why: 'ECE, ME, EEE and Civil have dedicated industry tie-ups with Qualcomm, ISRO, BHEL and L&T for core engineering roles.',
    skills: ['Domain-specific CAD/EDA tools', 'Industry Certifications', 'Internships in core companies', 'Technical Drawing', 'Project Management'],
    roadmap: [
      { sem: 'Sem 1–2', task: 'Focus on core subjects, understand industry applications' },
      { sem: 'Sem 3–4', task: 'Learn domain tools (AutoCAD / Cadence / MATLAB), get certified' },
      { sem: 'Sem 5–6', task: 'Do a core internship, work on a real industry project' },
      { sem: 'Sem 7',   task: 'Apply to core companies via campus placements' },
      { sem: 'Sem 8',   task: 'Final placement in core engineering role' },
    ],
    color: '#f59e0b',
    icon: Cpu,
  },
}

const DEPT_COLORS = { CSE: '#f97316', ISE: '#6366f1', ECE: '#8b5cf6', ME: '#ef4444', EEE: '#eab308', CIVIL: '#10b981' }
const DEPT_IDS    = { CSE: 'cse', ISE: 'ise', ECE: 'ece', ME: 'me', EEE: 'eee', CIVIL: 'civil' }

export default function GoalJourney() {
  const [selected, setSelected] = useState(null)
  const result = selected ? RESULTS[selected] : null

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--card-border)', background: 'var(--card)' }}>

      {/* Header */}
      <div className="p-6 border-b" style={{ borderColor: 'var(--card-border)' }}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="font-black text-xl t-h">Goal-Based Journey Builder</h3>
            <p className="text-sm t-m mt-1">Tell us your goal — we'll show the best department, skills & roadmap</p>
          </div>
          {selected && (
            <button onClick={() => setSelected(null)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold t-m hover:text-orange-500 transition-colors"
              style={{ border: '1px solid var(--card-border)' }}>
              <RotateCcw size={12} /> Start Over
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Goal selector */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {GOALS.map(g => (
            <motion.button key={g.id} onClick={() => setSelected(g.id)}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="relative text-left p-4 rounded-xl transition-all"
              style={{
                background: selected === g.id ? 'rgba(249,115,22,0.12)' : 'var(--surface, rgba(0,0,0,0.05))',
                border: selected === g.id ? '2px solid #f97316' : '2px solid var(--card-border)',
              }}>
              {selected === g.id && (
                <CheckCircle size={14} className="absolute top-3 right-3" style={{ color: '#f97316' }} />
              )}
              <div className="text-2xl mb-2">{g.emoji}</div>
              <div className="font-bold text-sm t-h">{g.label}</div>
              <div className="text-xs t-m mt-0.5 leading-relaxed">{g.desc}</div>
            </motion.button>
          ))}
        </div>

        {/* Result */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div key={selected}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px" style={{ background: 'var(--card-border)' }} />
                <span className="text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ background: result.color }}>Your Personalised Plan</span>
                <div className="flex-1 h-px" style={{ background: 'var(--card-border)' }} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {/* Left — Best Dept + Why + Skills */}
                <div className="space-y-5">

                  {/* Best departments */}
                  <div className="rounded-xl p-4" style={{ background: `${result.color}10`, border: `1px solid ${result.color}30` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <result.icon size={15} style={{ color: result.color }} />
                      <span className="font-bold text-sm t-h">Best Departments for You</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {result.departments.map(d => (
                        <Link key={d} to={`/departments/${DEPT_IDS[d]}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-bold hover:scale-105 transition-transform"
                          style={{ background: DEPT_COLORS[d] || result.color }}>
                          {d} <ArrowRight size={10} />
                        </Link>
                      ))}
                    </div>
                    <p className="text-xs t-m leading-relaxed">{result.why}</p>
                  </div>

                  {/* Skills */}
                  <div className="rounded-xl p-4" style={{ border: '1px solid var(--card-border)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={14} style={{ color: result.color }} />
                      <span className="font-bold text-sm t-h">Skills You Need</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.skills.map((s, i) => (
                        <motion.span key={s}
                          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.06 }}
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{ background: `${result.color}15`, color: result.color, border: `1px solid ${result.color}30` }}>
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right — Roadmap */}
                <div className="rounded-xl p-4" style={{ border: '1px solid var(--card-border)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Wrench size={14} style={{ color: result.color }} />
                    <span className="font-bold text-sm t-h">Your 4-Year Roadmap</span>
                  </div>
                  <div className="relative">
                    {/* vertical line */}
                    <div className="absolute left-[18px] top-2 bottom-2 w-0.5 rounded-full"
                      style={{ background: `${result.color}30` }} />
                    <div className="space-y-4">
                      {result.roadmap.map((step, i) => (
                        <motion.div key={i} className="flex gap-3"
                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}>
                          {/* dot */}
                          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0 z-10"
                            style={{ background: result.color }}>
                            {i + 1}
                          </div>
                          <div className="flex-1 pt-1">
                            <div className="text-xs font-bold mb-0.5" style={{ color: result.color }}>{step.sem}</div>
                            <div className="text-xs t-h leading-relaxed">{step.task}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selected && (
          <div className="text-center py-8 t-m">
            <div className="text-4xl mb-3">🎯</div>
            <div className="font-semibold t-h mb-1">Pick a goal above</div>
            <div className="text-sm">We'll build your personalised department recommendation and roadmap</div>
          </div>
        )}
      </div>
    </div>
  )
}
