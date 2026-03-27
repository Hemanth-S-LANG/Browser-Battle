import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Code2, ChevronRight, Eye, EyeOff, CheckCircle, Clock, Lightbulb, RotateCcw } from 'lucide-react'
import { tryData } from '../data/tryData'

const DIFF_COLOR = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' }

function LessonCard({ lesson, onOpen }) {
  return (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      onClick={() => onOpen(lesson)}
      className="w-full text-left p-4 rounded-xl transition-all"
      style={{ background: 'var(--surface, rgba(0,0,0,0.04))', border: '1px solid var(--card-border)' }}>
      <div className="flex items-start gap-3">
        <div className="text-2xl shrink-0">{lesson.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm t-h mb-1">{lesson.title}</div>
          <div className="flex items-center gap-1.5 text-xs t-m">
            <Clock size={10} /> {lesson.duration} read
          </div>
        </div>
        <ChevronRight size={14} className="t-m shrink-0 mt-1" />
      </div>
    </motion.button>
  )
}

function ProblemCard({ problem }) {
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [code, setCode] = useState(problem.starterCode)
  const [solved, setSolved] = useState(false)

  const reset = () => { setCode(problem.starterCode); setShowSolution(false); setShowHint(false); setSolved(false) }

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--card-border)' }}>
      {/* Header */}
      <div className="p-4 flex items-start justify-between gap-3"
        style={{ background: 'var(--surface, rgba(0,0,0,0.04))' }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-sm t-h">{problem.title}</span>
            {solved && <CheckCircle size={14} style={{ color: '#10b981' }} />}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ background: DIFF_COLOR[problem.difficulty] }}>{problem.difficulty}</span>
            <span className="text-[10px] t-m px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(249,115,22,0.1)', color: '#f97316' }}>{problem.topic}</span>
          </div>
        </div>
        <button onClick={reset} className="p-1.5 rounded-lg hover:bg-orange-500/10 transition-colors t-m">
          <RotateCcw size={12} />
        </button>
      </div>

      {/* Description */}
      <div className="px-4 pt-3 pb-2">
        <pre className="text-xs t-h leading-relaxed whitespace-pre-wrap font-sans">{problem.description}</pre>
      </div>

      {/* Code editor */}
      <div className="px-4 pb-3">
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(249,115,22,0.2)' }}>
          <div className="flex items-center justify-between px-3 py-1.5"
            style={{ background: 'rgba(249,115,22,0.08)' }}>
            <span className="text-[10px] font-bold" style={{ color: '#f97316' }}>JavaScript</span>
            <div className="flex gap-1">
              {['#ef4444','#f59e0b','#10b981'].map(c => (
                <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
              ))}
            </div>
          </div>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
            rows={problem.starterCode.split('\n').length + 1}
            className="w-full p-3 text-xs font-mono resize-none focus:outline-none"
            style={{ background: 'rgba(0,0,0,0.35)', color: '#e2e8f0', lineHeight: 1.6 }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex flex-wrap gap-2">
        <button onClick={() => { setShowHint(h => !h) }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105"
          style={{ background: 'rgba(234,179,8,0.12)', color: '#f59e0b', border: '1px solid rgba(234,179,8,0.25)' }}>
          <Lightbulb size={11} /> {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
        <button onClick={() => { setShowSolution(s => !s); if (!showSolution) setSolved(true) }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105"
          style={{ background: 'rgba(249,115,22,0.12)', color: '#f97316', border: '1px solid rgba(249,115,22,0.25)' }}>
          {showSolution ? <EyeOff size={11} /> : <Eye size={11} />}
          {showSolution ? 'Hide Solution' : 'View Solution'}
        </button>
      </div>

      <AnimatePresence>
        {showHint && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
            className="px-4 pb-3">
            <div className="flex items-start gap-2 p-3 rounded-lg text-xs"
              style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)', color: '#f59e0b' }}>
              <Lightbulb size={12} className="shrink-0 mt-0.5" /> {problem.hint}
            </div>
          </motion.div>
        )}
        {showSolution && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
            className="px-4 pb-4">
            <div className="text-[10px] font-bold mb-1.5" style={{ color: '#10b981' }}>✓ Solution</div>
            <pre className="p-3 rounded-lg text-xs font-mono overflow-x-auto"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#6ee7b7', lineHeight: 1.6 }}>
              {problem.solution}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function TryBeforeYouJoin({ deptId }) {
  const data = tryData[deptId]
  const [tab, setTab] = useState('lessons')
  const [activeLesson, setActiveLesson] = useState(null)

  if (!data) return null

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--card-border)', background: 'var(--card)' }}>
      {/* Header */}
      <div className="p-5" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(234,88,12,0.05))', borderBottom: '1px solid var(--card-border)' }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
            style={{ background: '#f97316' }}>🎓</div>
          <div>
            <h3 className="font-black text-lg t-h">Try Before You Join</h3>
            <p className="text-xs t-m">Mini lessons + coding problems — get a real taste of this department</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: 'var(--card-border)' }}>
        {[
          { id: 'lessons', label: 'Demo Lessons', icon: BookOpen, count: data.lessons.length },
          { id: 'problems', label: 'Coding Problems', icon: Code2, count: data.problems.length },
        ].map(({ id, label, icon: Icon, count }) => (
          <button key={id} onClick={() => { setTab(id); setActiveLesson(null) }}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-all"
            style={{ color: tab === id ? '#f97316' : 'var(--t3)', borderBottom: tab === id ? '2px solid #f97316' : '2px solid transparent' }}>
            <Icon size={14} /> {label}
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
              style={{ background: tab === id ? 'rgba(249,115,22,0.15)' : 'var(--surface)', color: tab === id ? '#f97316' : 'var(--t4)' }}>
              {count}
            </span>
          </button>
        ))}
      </div>

      <div className="p-5">
        <AnimatePresence mode="wait">

          {/* LESSONS */}
          {tab === 'lessons' && !activeLesson && (
            <motion.div key="lesson-list" initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-10 }}
              className="space-y-3">
              <p className="text-xs t-m mb-4">Click a lesson to read it — no signup needed.</p>
              {data.lessons.map(l => <LessonCard key={l.id} lesson={l} onOpen={setActiveLesson} />)}
            </motion.div>
          )}

          {tab === 'lessons' && activeLesson && (
            <motion.div key="lesson-content" initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-10 }}>
              <button onClick={() => setActiveLesson(null)}
                className="flex items-center gap-1.5 text-xs t-m hover:text-orange-500 transition-colors mb-4">
                ← Back to lessons
              </button>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{activeLesson.emoji}</span>
                <div>
                  <h4 className="font-black t-h">{activeLesson.title}</h4>
                  <div className="flex items-center gap-1 text-xs t-m mt-0.5">
                    <Clock size={10} /> {activeLesson.duration} read
                  </div>
                </div>
              </div>
              <div className="rounded-xl p-4 text-sm t-h leading-relaxed whitespace-pre-line"
                style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.15)', lineHeight: 1.8 }}>
                {activeLesson.content}
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs t-m p-3 rounded-lg"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981' }}>
                <CheckCircle size={12} /> Lesson complete! Try the coding problems next.
              </div>
            </motion.div>
          )}

          {/* PROBLEMS */}
          {tab === 'problems' && (
            <motion.div key="problems" initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-10 }}
              className="space-y-5">
              <p className="text-xs t-m">Edit the code, use hints, or reveal the solution when stuck.</p>
              {data.problems.map(p => <ProblemCard key={p.id} problem={p} />)}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
