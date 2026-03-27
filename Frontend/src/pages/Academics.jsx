import { BookOpen, Calendar, GraduationCap, Clock } from 'lucide-react'
import PageHero from '../components/PageHero'
import AnimatedSection from '../components/AnimatedSection'

const courses = [
  { name: 'B.E. Computer Science & Engineering', duration: '4 Years', intake: 180, type: 'UG' },
  { name: 'B.E. Electronics & Communication', duration: '4 Years', intake: 120, type: 'UG' },
  { name: 'B.E. Mechanical Engineering', duration: '4 Years', intake: 120, type: 'UG' },
  { name: 'B.E. Civil Engineering', duration: '4 Years', intake: 60, type: 'UG' },
  { name: 'B.E. Information Science & Engineering', duration: '4 Years', intake: 120, type: 'UG' },
  { name: 'B.E. Electrical & Electronics Engineering', duration: '4 Years', intake: 60, type: 'UG' },
  { name: 'M.Tech Computer Science', duration: '2 Years', intake: 18, type: 'PG' },
  { name: 'M.Tech VLSI Design', duration: '2 Years', intake: 18, type: 'PG' },
  { name: 'Ph.D Programs', duration: '3-5 Years', intake: 'Limited', type: 'PhD' },
]

const calendar = [
  { event: 'Odd Semester Begins', date: 'August 1, 2024', type: 'Academic' },
  { event: 'Internal Assessment 1', date: 'September 15, 2024', type: 'Exam' },
  { event: 'Internal Assessment 2', date: 'October 20, 2024', type: 'Exam' },
  { event: 'Odd Semester End Exams', date: 'November 25, 2024', type: 'Exam' },
  { event: 'Even Semester Begins', date: 'January 6, 2025', type: 'Academic' },
  { event: 'Internal Assessment 1', date: 'February 15, 2025', type: 'Exam' },
  { event: 'Even Semester End Exams', date: 'May 10, 2025', type: 'Exam' },
]

const typeColors = {
  UG: 'bg-[rgba(59,130,246,0.12)] text-blue-600 dark:text-blue-400',
  PG: 'bg-[rgba(168,85,247,0.12)] text-purple-600 dark:text-purple-400',
  PhD: 'bg-[rgba(34,197,94,0.12)] text-green-600 dark:text-green-400',
  Academic: 'bg-[rgba(59,130,246,0.12)] text-blue-600',
  Exam: 'bg-[rgba(239,68,68,0.12)] text-red-600',
}

export default function Academics() {
  return (
    <div className="t-bg" style={{ minHeight: "100vh" }}>
      <PageHero title="Academics" subtitle="Comprehensive programs designed for excellence"
        breadcrumb="Home / Academics"
        image="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80" />

      {/* Courses */}
      <section className="section-padding max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold t-h mb-3">Programs <span className="text-gradient">Offered</span></h2>
          <p className="t-h-mut">VTU affiliated programs approved by AICTE</p>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((c, i) => (
            <AnimatedSection key={i} delay={i * 0.07}>
              <div className="rounded-2xl p-5 shadow-sm border border-blue-500/10 hover:shadow-lg transition-shadow" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(59,130,246,0.12)] flex items-center justify-center">
                    <GraduationCap size={20} className="text-blue-600" />
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${typeColors[c.type]}`}>{c.type}</span>
                </div>
                <h3 className="font-semibold t-h text-sm mb-3">{c.name}</h3>
                <div className="flex items-center gap-4 text-xs t-h-mut">
                  <span className="flex items-center gap-1"><Clock size={12} /> {c.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen size={12} /> Intake: {c.intake}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="section-padding" className="t-bg-alt">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold t-h mb-3">Academic <span className="text-gradient">Calendar 2024-25</span></h2>
          </AnimatedSection>
          <div className="space-y-3">
            {calendar.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.07}>
                <div className="flex items-center gap-4 rounded-xl p-4 shadow-sm border border-blue-500/10" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <div className="w-10 h-10 rounded-xl bg-[rgba(59,130,246,0.12)] flex items-center justify-center shrink-0">
                    <Calendar size={18} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium t-h text-sm">{item.event}</div>
                    <div className="text-xs text-gray-500">{item.date}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${typeColors[item.type]}`}>{item.type}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
