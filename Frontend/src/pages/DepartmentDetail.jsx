import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowLeft, FlaskConical, GraduationCap, Users, Trophy } from 'lucide-react'
import { departments } from '../data/college'
import AnimatedSection from '../components/AnimatedSection'
import PageHero from '../components/PageHero'

export default function DepartmentDetail() {
  const { id } = useParams()
  const dept = departments.find(d => d.id === id)

  if (!dept) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold t-h mb-4">Department not found</h2>
        <Link to="/departments" className="text-orange-500 hover:underline">Back to Departments</Link>
      </div>
    </div>
  )

  return (
    <div className="t-bg" style={{ minHeight: "100vh" }}>
      <PageHero
        title={dept.name}
        subtitle={dept.about}
        breadcrumb={`Home / Departments / ${dept.shortName}`}
        image={dept.image}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Link to="/departments" className="inline-flex items-center gap-2 text-orange-500 dark:text-orange-400 hover:gap-3 transition-all mb-8">
          <ArrowLeft size={16} /> Back to Departments
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About & Vision */}
            <AnimatedSection>
              <div className="rounded-2xl p-6 shadow-sm border border-orange-500/10" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <h2 className="text-xl font-bold t-h mb-3">
                  About the Department
                </h2>
                <p className="t-h-sec leading-relaxed mb-4">{dept.about}</p>
                <div className="p-4 bg-[rgba(249,115,22,0.08)] rounded-xl">
                  <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Vision</h3>
                  <p className="t-h-sec text-sm">{dept.vision}</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Programs */}
            <AnimatedSection delay={0.1}>
              <div className="rounded-2xl p-6 shadow-sm border border-orange-500/10" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <h2 className="text-xl font-bold t-h mb-4 flex items-center gap-2">
                  <GraduationCap size={20} className="text-orange-500" /> Programs Offered
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {dept.programs.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-[rgba(15,23,42,0.6)] rounded-xl">
                      <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                      <span className="t-h-sec text-sm font-medium">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Faculty */}
            <AnimatedSection delay={0.15}>
              <div className="rounded-2xl p-6 shadow-sm border border-orange-500/10" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <h2 className="text-xl font-bold t-h mb-4 flex items-center gap-2">
                  <Users size={20} className="text-orange-500" /> Faculty
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {dept.faculty.map((f, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 p-3 bg-[rgba(15,23,42,0.6)] rounded-xl"
                    >
                      <img src={f.image} alt={f.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold t-h text-sm">{f.name}</div>
                        <div className="text-xs text-orange-500 dark:text-orange-400">{f.designation}</div>
                        <div className="text-xs text-gray-500">{f.specialization}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Labs */}
            <AnimatedSection delay={0.2}>
              <div className="rounded-2xl p-6 shadow-sm border border-orange-500/10" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <h2 className="text-xl font-bold t-h mb-4 flex items-center gap-2">
                  <FlaskConical size={20} className="text-orange-500" /> Labs & Facilities
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {dept.labs.map((lab, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-[rgba(15,23,42,0.6)] rounded-xl text-sm t-h-sec">
                      <FlaskConical size={14} className="text-orange-500 shrink-0" /> {lab}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Achievements */}
            <AnimatedSection delay={0.25}>
              <div className="rounded-2xl p-6 shadow-sm border border-orange-500/10" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <h2 className="text-xl font-bold t-h mb-4 flex items-center gap-2">
                  <Trophy size={20} className="text-orange-500" /> Achievements
                </h2>
                <div className="space-y-2">
                  {dept.achievements.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-[rgba(234,179,8,0.08)] rounded-xl">
                      <Trophy size={14} className="text-yellow-500 shrink-0" />
                      <span className="t-h-sec text-sm">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Gallery */}
            <AnimatedSection delay={0.3}>
              <div className="rounded-2xl p-6 shadow-sm border border-orange-500/10" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <h2 className="text-xl font-bold t-h mb-4">Gallery</h2>
                <div className="grid grid-cols-2 gap-3">
                  {dept.gallery.map((img, i) => (
                    <div key={i} className="overflow-hidden rounded-xl aspect-video">
                      <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* HOD Card */}
            <AnimatedSection direction="left">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 t-h">
                <h3 className="font-bold text-lg mb-4">Head of Department</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                    {dept.hod.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{dept.hod.name}</div>
                    <div className="text-orange-100 text-sm">HOD, {dept.shortName}</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-orange-100">
                    <Mail size={14} /> {dept.hod.email}
                  </div>
                  <div className="flex items-center gap-2 text-orange-100">
                    <Phone size={14} /> {dept.hod.phone}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Map */}
            <AnimatedSection direction="left" delay={0.1}>
              <div className="rounded-2xl overflow-hidden shadow-sm border border-orange-500/10" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <iframe
                  title="RNSIT Location"
                  src="https://maps.google.com/maps?q=RNS+Institute+of+Technology,+Dr+Vishnuvardhan+Road,+RR+Nagar,+Bengaluru+560098&output=embed&z=16"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="w-full"
                />
                <div className="p-4">
                  <div className="flex items-start gap-2 text-sm t-h-sec">
                    <MapPin size={14} className="text-orange-500 mt-0.5 shrink-0" />
                    Dr. Vishnuvardhan Road, R.R. Nagar, Bengaluru - 560098
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Quick Links */}
            <AnimatedSection direction="left" delay={0.2}>
              <div className="rounded-2xl p-6 shadow-sm border border-orange-500/10" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <h3 className="font-bold t-h mb-4">Other Departments</h3>
                <div className="space-y-2">
                  {departments.filter(d => d.id !== id).slice(0, 4).map(d => (
                    <Link key={d.id} to={`/departments/${d.id}`}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 t-h-sec hover:text-orange-500 transition-colors text-sm"
                    >
                      <span>{d.icon}</span> {d.shortName} — {d.name.split(' ')[0]}
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  )
}
