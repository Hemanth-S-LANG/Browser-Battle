import { useState } from 'react'
import { Search, Calendar, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import AnimatedSection from '../components/AnimatedSection'

const allEvents = [
  { title: 'TechFest 2024', date: 'Dec 15, 2024', category: 'Technical', status: 'Upcoming', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80', desc: 'Annual technical festival with hackathons, paper presentations, and workshops.' },
  { title: 'Annual Sports Meet', date: 'Jan 10, 2025', category: 'Sports', status: 'Upcoming', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80', desc: 'Inter-department sports competition with 20+ events.' },
  { title: 'Industry Connect Summit', date: 'Jan 20, 2025', category: 'Career', status: 'Upcoming', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&q=80', desc: 'Connect with industry leaders and explore career opportunities.' },
  { title: 'Cultural Fest — Utsav', date: 'Feb 5, 2025', category: 'Cultural', status: 'Upcoming', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80', desc: 'Three-day cultural extravaganza with music, dance, and drama.' },
  { title: 'Research Symposium', date: 'Oct 20, 2024', category: 'Academic', status: 'Past', image: 'https://images.unsplash.com/photo-1532094349884-543559c5f185?w=400&q=80', desc: 'Annual research symposium showcasing student and faculty research.' },
  { title: 'Placement Drive — TCS', date: 'Nov 5, 2024', category: 'Career', status: 'Past', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', desc: 'Campus placement drive by TCS with 150+ offers.' },
  { title: 'Alumni Meet 2024', date: 'Nov 15, 2024', category: 'Alumni', status: 'Past', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80', desc: 'Annual alumni gathering with networking and mentorship sessions.' },
  { title: 'Hackathon 2024', date: 'Sep 28, 2024', category: 'Technical', status: 'Past', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80', desc: '24-hour hackathon with 500+ participants and ₹5L prize pool.' },
]

const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Career', 'Academic', 'Alumni']

const statusColors = {
  Upcoming: 'bg-[rgba(34,197,94,0.12)] text-green-600',
  Past: 'bg-[rgba(15,23,42,0.6)] text-gray-500',
}

export default function Events() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [tab, setTab] = useState('All')

  const filtered = allEvents.filter(e => {
    const matchQuery = e.title.toLowerCase().includes(query.toLowerCase())
    const matchCat = category === 'All' || e.category === category
    const matchTab = tab === 'All' || e.status === tab
    return matchQuery && matchCat && matchTab
  })

  return (
    <div className="t-bg" style={{ minHeight: "100vh" }}>
      <PageHero title="Events" subtitle="Stay updated with the latest happenings at RNSIT"
        breadcrumb="Home / Events"
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80" />

      <section className="section-padding max-w-7xl mx-auto">
        {/* Filters */}
        <AnimatedSection className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 t-h-mut" />
              <input type="text" placeholder="Search events..." value={query} onChange={e => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 t-h focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm" />
            </div>
            <div className="flex gap-2">
              {['All', 'Upcoming', 'Past'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === t ? 'bg-orange-500 t-h' : 'bg-[rgba(15,23,42,0.5)] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${category === cat ? 'bg-orange-500 t-h' : 'bg-[rgba(15,23,42,0.5)] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <div className="group rounded-2xl overflow-hidden shadow-sm border border-orange-500/10 hover:shadow-xl hover:-translate-y-1 transition-all" style={{ background: "var(--card)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                <div className="relative h-48 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${statusColors[event.status]}`}>{event.status}</span>
                    <span className="px-2 py-1 bg-orange-500 t-h rounded-lg text-xs">{event.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs t-h-mut mb-2">
                    <Calendar size={12} /> {event.date}
                  </div>
                  <h3 className="font-bold t-h mb-2">{event.title}</h3>
                  <p className="text-sm t-h-mut">{event.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 t-h-mut">
            <Calendar size={48} className="mx-auto mb-4 opacity-30" />
            <p>No events found</p>
          </div>
        )}
      </section>
    </div>
  )
}
