import { CheckCircle, Download, ArrowRight, FileText, Users, Award, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import AnimatedSection from '../components/AnimatedSection'

const steps = [
  { step: '01', title: 'Check Eligibility', desc: 'Verify you meet the minimum eligibility criteria for your desired program.', icon: CheckCircle },
  { step: '02', title: 'Fill Application', desc: 'Complete the online application form with accurate personal and academic details.', icon: FileText },
  { step: '03', title: 'Submit Documents', desc: 'Upload required documents including mark sheets, certificates, and ID proof.', icon: Download },
  { step: '04', title: 'Counseling', desc: 'Attend the counseling session and secure your seat through KCET/COMEDK/Management quota.', icon: Users },
  { step: '05', title: 'Fee Payment', desc: 'Pay the admission fee and complete the enrollment process.', icon: Award },
  { step: '06', title: 'Join RNSIT', desc: 'Report to the college on the specified date and begin your journey!', icon: Calendar },
]

const eligibility = [
  { program: 'B.E. Programs', criteria: '10+2 with PCM, minimum 45% (40% for SC/ST). KCET / COMEDK rank required.' },
  { program: 'M.Tech Programs', criteria: 'B.E./B.Tech in relevant discipline with minimum 50%. PGCET rank required.' },
  { program: 'Ph.D Programs', criteria: 'M.Tech/M.E. with minimum 55%. Entrance test and interview required.' },
]

export default function Admissions() {
  return (
    <div className="t-bg" style={{ minHeight: "100vh" }}>
      <PageHero title="Admissions" subtitle="Begin your journey to excellence at RNSIT"
        breadcrumb="Home / Admissions"
        image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80" />

      {/* Steps */}
      <section className="section-padding max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold t-h mb-3">Admission <span className="text-gradient">Process</span></h2>
          <p className="t-h-mut">Simple steps to join RNSIT</p>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map(({ step, title, desc, icon: Icon }, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="relative rounded-2xl p-6 shadow-sm border border-orange-500/10 hover:shadow-lg transition-shadow" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <div className="absolute top-4 right-4 text-5xl font-black text-gray-100 dark:text-gray-700">{step}</div>
                <div className="w-12 h-12 rounded-xl bg-[rgba(249,115,22,0.12)] flex items-center justify-center mb-4">
                  <Icon size={22} className="text-orange-500" />
                </div>
                <h3 className="font-bold t-h mb-2">{title}</h3>
                <p className="text-sm t-h-mut">{desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Eligibility */}
      <section className="section-padding" className="t-bg-alt">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold t-h mb-3">Eligibility <span className="text-gradient">Criteria</span></h2>
          </AnimatedSection>
          <div className="space-y-4">
            {eligibility.map((e, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="rounded-2xl p-6 shadow-sm border border-orange-500/10" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                  <h3 className="font-bold t-h mb-2">{e.program}</h3>
                  <p className="t-h-sec text-sm">{e.criteria}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads & CTA */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="rounded-2xl p-8 shadow-sm border border-orange-500/10" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
              <h3 className="text-xl font-bold t-h mb-4">Download Forms</h3>
              <div className="space-y-3">
                {['Application Form 2024-25', 'Prospectus 2024-25', 'Fee Structure', 'Scholarship Form'].map((form, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-3 bg-[rgba(15,23,42,0.6)] rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors group">
                    <span className="text-sm t-h-sec flex items-center gap-2">
                      <FileText size={14} className="text-orange-500" /> {form}
                    </span>
                    <Download size={14} className="t-h-mut group-hover:text-orange-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 t-h">
              <h3 className="text-xl font-bold mb-3">Ready to Apply?</h3>
              <p className="text-orange-100 mb-6 text-sm">Applications for 2024-25 are now open. Secure your seat at RNSIT today.</p>
              <div className="space-y-3">
                <Link to="/apply" className="flex items-center justify-center gap-2 w-full py-3 bg-white text-orange-700 font-semibold rounded-xl hover:shadow-lg transition-all">
                  Apply Online <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="flex items-center justify-center gap-2 w-full py-3 bg-white/20 t-h font-semibold rounded-xl hover:bg-white/30 transition-all">
                  Contact Admissions
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
