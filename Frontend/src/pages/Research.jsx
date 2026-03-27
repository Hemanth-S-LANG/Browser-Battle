import { FlaskConical, BookOpen, Lightbulb, ExternalLink } from 'lucide-react'
import PageHero from '../components/PageHero'
import AnimatedSection from '../components/AnimatedSection'

const projects = [
  { title: 'AI-Powered Disease Detection', dept: 'CSE', funding: 'AICTE — ₹25 Lakhs', status: 'Ongoing', desc: 'Deep learning models for early detection of diseases using medical imaging.' },
  { title: 'Smart Grid Energy Management', dept: 'EEE', funding: 'DST — ₹18 Lakhs', status: 'Ongoing', desc: 'IoT-based smart grid system for efficient energy distribution and monitoring.' },
  { title: 'Autonomous Vehicle Navigation', dept: 'ECE', funding: 'DRDO — ₹30 Lakhs', status: 'Ongoing', desc: 'Computer vision and sensor fusion for autonomous vehicle path planning.' },
  { title: 'Sustainable Construction Materials', dept: 'Civil', funding: 'VGST — ₹12 Lakhs', status: 'Completed', desc: 'Research on eco-friendly construction materials using industrial waste.' },
]

const publications = [
  { title: 'Deep Learning for Medical Image Segmentation', authors: 'Dr. Priya Sharma et al.', journal: 'IEEE Transactions on Medical Imaging', year: '2024', citations: 45 },
  { title: 'VLSI Implementation of Neural Networks', authors: 'Dr. Ramesh Babu et al.', journal: 'Microelectronics Journal', year: '2024', citations: 32 },
  { title: 'Renewable Energy Optimization using ML', authors: 'Dr. Vijay Kumar et al.', journal: 'Energy and AI', year: '2023', citations: 67 },
  { title: 'Smart Traffic Management System', authors: 'Dr. Deepak Nair et al.', journal: 'IEEE IoT Journal', year: '2023', citations: 28 },
]

const labs = [
  { name: 'AI & Machine Learning Research Lab', dept: 'CSE', equipment: 'GPU Clusters, High-Performance Servers', image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80' },
  { name: 'VLSI Design & Fabrication Lab', dept: 'ECE', equipment: 'Cadence Tools, FPGA Boards', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80' },
  { name: 'Renewable Energy Lab', dept: 'EEE', equipment: 'Solar Panels, Wind Turbine Models', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80' },
  { name: 'Robotics & Automation Lab', dept: 'ME', equipment: 'Industrial Robots, CNC Machines', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80' },
]

export default function Research() {
  return (
    <div className="t-bg" style={{ minHeight: "100vh" }}>
      <PageHero title="Research & Innovation" subtitle="Pushing boundaries through cutting-edge research"
        breadcrumb="Home / Research"
        image="https://images.unsplash.com/photo-1532094349884-543559c5f185?w=1600&q=80" />

      {/* Projects */}
      <section className="section-padding max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold t-h mb-3">Ongoing <span className="text-gradient">Projects</span></h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="rounded-2xl p-6 shadow-sm border border-orange-500/10 hover:shadow-lg transition-shadow" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(249,115,22,0.12)] flex items-center justify-center">
                    <Lightbulb size={18} className="text-orange-500" />
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${p.status === 'Ongoing' ? 'bg-[rgba(34,197,94,0.12)] text-green-600' : 'bg-[rgba(15,23,42,0.6)] text-gray-500'}`}>
                    {p.status}
                  </span>
                </div>
                <h3 className="font-bold t-h mb-2">{p.title}</h3>
                <p className="text-sm t-h-mut mb-3">{p.desc}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-orange-500 dark:text-orange-400 font-medium">{p.dept}</span>
                  <span className="text-gray-500">{p.funding}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section className="section-padding" className="t-bg-alt">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold t-h mb-3">Recent <span className="text-gradient">Publications</span></h2>
          </AnimatedSection>
          <div className="space-y-4">
            {publications.map((pub, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="rounded-2xl p-5 shadow-sm border border-orange-500/10 flex items-start gap-4" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                  <div className="w-10 h-10 rounded-xl bg-[rgba(168,85,247,0.12)] flex items-center justify-center shrink-0">
                    <BookOpen size={18} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold t-h mb-1">{pub.title}</h3>
                    <p className="text-sm text-gray-500 mb-1">{pub.authors}</p>
                    <p className="text-xs text-orange-500 dark:text-orange-400">{pub.journal} · {pub.year}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold t-h">{pub.citations}</div>
                    <div className="text-xs t-h-mut">citations</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Research Labs */}
      <section className="section-padding max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold t-h mb-3">Research <span className="text-gradient">Labs</span></h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {labs.map((lab, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="rounded-2xl overflow-hidden shadow-sm border border-orange-500/10 hover:shadow-xl hover:-translate-y-1 transition-all" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <div className="h-40 overflow-hidden">
                  <img src={lab.image} alt={lab.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold t-h text-sm mb-1">{lab.name}</h3>
                  <p className="text-xs text-orange-500 dark:text-orange-400 mb-2">{lab.dept}</p>
                  <p className="text-xs text-gray-500">{lab.equipment}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  )
}
