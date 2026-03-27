import { useState } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'
import AnimatedSection from '../components/AnimatedSection'

const clubs = [
  { name: 'IEEE Student Chapter', category: 'Technical', members: 250, desc: 'Connecting students with global IEEE network for technical excellence.' },
  { name: 'Google Developer Student Club', category: 'Technical', members: 180, desc: 'Building tech solutions and learning Google technologies.' },
  { name: 'NSS Unit', category: 'Social', members: 300, desc: 'National Service Scheme for community development activities.' },
  { name: 'Sports Club', category: 'Sports', members: 400, desc: 'Promoting sports culture with state and national level competitions.' },
  { name: 'Cultural Club', category: 'Cultural', members: 200, desc: 'Celebrating diversity through music, dance, and drama.' },
  { name: 'Entrepreneurship Cell', category: 'Business', members: 150, desc: 'Nurturing startup ideas and entrepreneurial mindset.' },
]

const facilities = [
  { name: 'Central Library', desc: '50,000+ books, digital resources, 24/7 reading room', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80' },
  { name: 'Sports Complex', desc: 'Cricket ground, basketball, volleyball, badminton courts', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80' },
  { name: 'Hostel', desc: 'Separate hostels for boys and girls with modern amenities', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80' },
  { name: 'Cafeteria', desc: 'Multi-cuisine food court with hygienic and affordable meals', image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&q=80' },
  { name: 'Auditorium', desc: '1500-seat auditorium for events, seminars, and conferences', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80' },
  { name: 'Medical Center', desc: 'On-campus health center with qualified medical staff', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80' },
]

const galleryImages = [
  'https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80',
  'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80',
  'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80',
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&q=80',
]

export default function CampusLife() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <div className="t-bg" style={{ minHeight: "100vh" }}>
      <PageHero title="Campus Life" subtitle="Experience a vibrant and enriching campus environment"
        breadcrumb="Home / Campus Life"
        image="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80" />

      {/* Clubs */}
      <section className="section-padding max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold t-h mb-3">Clubs & <span className="text-gradient">Activities</span></h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="rounded-2xl p-6 shadow-sm border border-blue-500/10 hover:shadow-lg hover:-translate-y-1 transition-all" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-start justify-between mb-3">
                  <span className="px-2 py-1 bg-[rgba(59,130,246,0.12)] text-blue-600 dark:text-blue-400 text-xs rounded-lg font-medium">{club.category}</span>
                  <span className="text-xs t-h-mut">{club.members} members</span>
                </div>
                <h3 className="font-bold t-h mb-2">{club.name}</h3>
                <p className="text-sm t-h-mut">{club.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section className="section-padding" className="t-bg-alt">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold t-h mb-3">Campus <span className="text-gradient">Facilities</span></h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="rounded-2xl overflow-hidden shadow-sm border border-blue-500/10 hover:shadow-xl hover:-translate-y-1 transition-all" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                  <div className="h-44 overflow-hidden">
                    <img src={f.image} alt={f.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold t-h mb-2">{f.name}</h3>
                    <p className="text-sm t-h-mut">{f.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery with Lightbox */}
      <section className="section-padding max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold t-h mb-3">Photo <span className="text-gradient">Gallery</span></h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div className="overflow-hidden rounded-xl aspect-square cursor-pointer group" onClick={() => setLightbox(img)}>
                <img src={img} alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-4 right-4 t-h p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={lightbox}
              alt="Gallery"
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
