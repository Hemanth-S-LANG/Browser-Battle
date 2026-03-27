import { Globe, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import AnimatedSection from '../components/AnimatedSection'

const alumni = [
  { name: 'Arjun Sharma', batch: 'CSE 2018', company: 'Google', role: 'Senior Software Engineer', avatar: 'https://i.pravatar.cc/150?img=20', linkedin: '#' },
  { name: 'Priya Nair', batch: 'ECE 2017', company: 'Qualcomm', role: 'VLSI Design Engineer', avatar: 'https://i.pravatar.cc/150?img=21', linkedin: '#' },
  { name: 'Rahul Mehta', batch: 'ME 2019', company: 'ISRO', role: 'Aerospace Engineer', avatar: 'https://i.pravatar.cc/150?img=22', linkedin: '#' },
  { name: 'Sneha Rao', batch: 'ISE 2020', company: 'Microsoft', role: 'Product Manager', avatar: 'https://i.pravatar.cc/150?img=23', linkedin: '#' },
  { name: 'Kiran Kumar', batch: 'EEE 2016', company: 'Tesla', role: 'Power Systems Engineer', avatar: 'https://i.pravatar.cc/150?img=24', linkedin: '#' },
  { name: 'Ananya Singh', batch: 'CSE 2021', company: 'Amazon', role: 'SDE-2', avatar: 'https://i.pravatar.cc/150?img=25', linkedin: '#' },
]

const testimonials = [
  { name: 'Arjun Sharma', text: 'RNSIT gave me the technical foundation and soft skills to thrive at Google. The faculty mentorship was invaluable.', avatar: 'https://i.pravatar.cc/80?img=20', company: 'Google' },
  { name: 'Priya Nair', text: 'The research culture at RNSIT prepared me for the challenging work at Qualcomm. I am proud to be an RNSIT alumna.', avatar: 'https://i.pravatar.cc/80?img=21', company: 'Qualcomm' },
  { name: 'Rahul Mehta', text: 'From the labs to the placement cell, everything at RNSIT is designed to help you succeed in your career.', avatar: 'https://i.pravatar.cc/80?img=22', company: 'ISRO' },
]

export default function Alumni() {
  return (
    <div className="t-bg" style={{ minHeight: "100vh" }}>
      <PageHero title="Alumni Network" subtitle="A global community of RNSIT achievers"
        breadcrumb="Home / Alumni"
        image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80" />

      {/* Stats */}
      <section className="py-12" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.1))", borderTop: "1px solid rgba(96,165,250,0.1)", borderBottom: "1px solid rgba(96,165,250,0.1)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 t-h text-center">
          {[
            { value: '15,000+', label: 'Alumni Worldwide' },
            { value: '50+', label: 'Countries' },
            { value: '500+', label: 'Entrepreneurs' },
            { value: '100+', label: 'Fortune 500 Employees' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-bold mb-1">{s.value}</div>
              <div className="text-blue-100 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Notable Alumni */}
      <section className="section-padding max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold t-h mb-3">Notable <span className="text-gradient">Alumni</span></h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni.map((a, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="rounded-2xl p-6 shadow-sm border border-blue-500/10 hover:shadow-xl hover:-translate-y-1 transition-all" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-center gap-4 mb-4">
                  <img src={a.avatar} alt={a.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900" />
                  <div>
                    <h3 className="font-bold t-h">{a.name}</h3>
                    <p className="text-xs text-gray-500">{a.batch}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="font-semibold text-blue-600 dark:text-blue-400 text-sm">{a.company}</div>
                  <div className="text-sm text-gray-500">{a.role}</div>
                </div>
                <a href={a.linkedin} className="flex items-center gap-2 text-xs t-h-mut hover:text-blue-600 transition-colors">
                  <span className="text-xs font-bold">in</span> Connect on LinkedIn
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding" className="t-bg-alt">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold t-h mb-3">Alumni <span className="text-gradient">Speak</span></h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="rounded-2xl p-6 shadow-sm border border-blue-500/10" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                  <p className="t-h-sec italic mb-4 text-sm">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold t-h text-sm">{t.name}</div>
                      <div className="text-xs text-blue-600">{t.company}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Join Network CTA */}
      <section className="section-padding max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-3xl font-bold t-h mb-4">Join the Alumni Network</h2>
          <p className="t-h-mut mb-8">Stay connected, give back, and help shape the next generation of RNSIT engineers.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 t-h font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2">
              Register as Alumni <ArrowRight size={16} />
            </a>
            <a href="#" className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all flex items-center gap-2">
              <Globe size={16} /> Alumni Portal
            </a>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
