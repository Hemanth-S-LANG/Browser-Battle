import { FileText, Bell, BookOpen, ExternalLink } from 'lucide-react'
import PageHero from '../components/PageHero'
import AnimatedSection from '../components/AnimatedSection'

const notices = [
  { title: 'End Semester Exam Schedule — Nov 2024', date: 'Oct 28, 2024', type: 'Exam', urgent: true },
  { title: 'Scholarship Application Deadline Extended', date: 'Oct 25, 2024', type: 'Scholarship', urgent: false },
  { title: 'Campus Placement Drive — Infosys', date: 'Oct 22, 2024', type: 'Placement', urgent: true },
  { title: 'Annual Sports Meet Registration Open', date: 'Oct 20, 2024', type: 'Event', urgent: false },
  { title: 'Library Timing Change — November', date: 'Oct 18, 2024', type: 'General', urgent: false },
  { title: 'Anti-Ragging Committee Meeting', date: 'Oct 15, 2024', type: 'General', urgent: false },
]

const resources = [
  { title: 'Student Portal', desc: 'Access attendance, marks, and fee details', link: '#' },
  { title: 'VTU Results', desc: 'Check your semester examination results', link: '#' },
  { title: 'Digital Library', desc: 'Access e-books, journals, and research papers', link: '#' },
  { title: 'Timetable', desc: 'View your class and exam timetable', link: '#' },
  { title: 'Hostel Portal', desc: 'Hostel allotment and fee payment', link: '#' },
  { title: 'Grievance Portal', desc: 'Submit and track your grievances', link: '#' },
]

const typeColors = {
  Exam: 'bg-[rgba(239,68,68,0.12)] text-red-600',
  Scholarship: 'bg-[rgba(34,197,94,0.12)] text-green-600',
  Placement: 'bg-[rgba(249,115,22,0.12)] text-orange-500',
  Event: 'bg-[rgba(168,85,247,0.12)] text-purple-600',
  General: 'bg-[rgba(15,23,42,0.6)] text-gray-500',
}

export default function Students() {
  return (
    <div className="t-bg" style={{ minHeight: "100vh" }}>
      <PageHero title="Student Zone" subtitle="Everything you need for your academic journey"
        breadcrumb="Home / Students"
        image="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1600&q=80" />

      {/* Resources */}
      <section className="section-padding max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold t-h mb-3">Student <span className="text-gradient">Resources</span></h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <a href={r.link} className="group flex items-start gap-4 rounded-2xl p-5 shadow-sm border border-orange-500/10 hover:shadow-lg hover:-translate-y-1 transition-all" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <div className="w-10 h-10 rounded-xl bg-[rgba(249,115,22,0.12)] flex items-center justify-center shrink-0">
                  <BookOpen size={18} className="text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold t-h mb-1 group-hover:text-orange-500 transition-colors">{r.title}</h3>
                  <p className="text-sm t-h-mut">{r.desc}</p>
                </div>
                <ExternalLink size={16} className="text-gray-300 group-hover:text-orange-500 transition-colors shrink-0 mt-1" />
              </a>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Notices */}
      <section className="section-padding" className="t-bg-alt">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold t-h mb-3">Notice <span className="text-gradient">Board</span></h2>
          </AnimatedSection>
          <div className="space-y-3">
            {notices.map((n, i) => (
              <AnimatedSection key={i} delay={i * 0.07}>
                <div className={`flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border transition-shadow hover:shadow-md ${n.urgent ? 'border-red-200 dark:border-red-900/50' : 'border-orange-500/10'}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.urgent ? 'bg-[rgba(239,68,68,0.12)]' : 'bg-[rgba(249,115,22,0.12)]'}`}>
                    <Bell size={16} className={n.urgent ? 'text-red-500' : 'text-orange-500'} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium t-h text-sm">{n.title}</div>
                    <div className="text-xs t-h-mut mt-0.5">{n.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {n.urgent && <span className="px-2 py-0.5 bg-[rgba(239,68,68,0.12)] text-red-600 text-xs rounded-lg font-medium">Urgent</span>}
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${typeColors[n.type]}`}>{n.type}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
