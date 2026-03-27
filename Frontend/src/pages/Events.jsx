import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Calendar, MapPin, Users, Heart, Share2,
  Clock, Trophy, ChevronLeft, ChevronRight, X,
  CalendarPlus, Filter, Tag, ArrowRight
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'
import { categories } from '../data/eventsData'
import { allEvents } from '../data/eventsData'
const eventsAll = allEvents

// ── Countdown Timer ───────────────────────────────────────
function Countdown({ date }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const calc = () => {
      const diff = new Date(date) - new Date()
      if (diff <= 0) return setTime({ d: 0, h: 0, m: 0, s: 0 })
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const t = setInterval(calc, 1000)
    return () => clearInterval(t)
  }, [date])

  if (new Date(date) <= new Date()) return null
  return (
    <div className="flex gap-1.5 mt-2">
      {[['d', 'Days'], ['h', 'Hrs'], ['m', 'Min'], ['s', 'Sec']].map(([k, l]) => (
        <div key={k} className="text-center">
          <div className="text-sm font-black text-white w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.4)' }}>
            {String(time[k]).padStart(2, '0')}
          </div>
          <div className="text-[9px] text-white/60 mt-0.5">{l}</div>
        </div>
      ))}
    </div>
  )
}

// ── Add to Calendar ───────────────────────────────────────
function addToCalendar(event) {
  const start = new Date(event.date + 'T' + (event.time === '09:00 AM' ? '09:00:00' : '10:00:00'))
  const end = new Date(event.endDate + 'T23:59:00')
  const fmt = d => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${fmt(start)}/${fmt(end)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.venue + ', RNSIT, Bengaluru')}`
  window.open(url, '_blank')
}

// ── Share Event ───────────────────────────────────────────
function shareEvent(event) {
  if (navigator.share) {
    navigator.share({ title: event.title, text: event.description, url: window.location.href })
  } else {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }
}

// ── Category colors ───────────────────────────────────────
const catColor = {
  Technical: '#f97316', Cultural: '#8b5cf6', Career: '#10b981',
  Sports: '#3b82f6', Academic: '#ec4899', Alumni: '#f59e0b', default: '#6b7280',
}

// ── Gallery Lightbox ──────────────────────────────────────
function GalleryLightbox({ images, onClose }) {
  const [idx, setIdx] = useState(0)
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}>
      <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white" onClick={onClose}>
        <X size={20} />
      </button>
      <button className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
        onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length) }}>
        <ChevronLeft size={22} />
      </button>
      <motion.img key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        src={images[idx]} alt="Event" className="max-w-4xl max-h-[85vh] rounded-2xl object-contain"
        onClick={e => e.stopPropagation()} />
      <button className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
        onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % images.length) }}>
        <ChevronRight size={22} />
      </button>
      <div className="absolute bottom-6 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={e => { e.stopPropagation(); setIdx(i) }}
            className="w-2 h-2 rounded-full transition-all"
            style={{ background: i === idx ? '#f97316' : 'rgba(255,255,255,0.3)', width: i === idx ? '20px' : '8px' }} />
        ))}
      </div>
    </motion.div>
  )
}

// ── Event Card ────────────────────────────────────────────
function EventCard({ event, onClick }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(Math.floor(Math.random() * 200) + 50)
  const isPast = event.status === 'past'
  const color = catColor[event.category] || catColor.default
  const pct = Math.round((event.registrations / event.capacity) * 100)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      className="card rounded-2xl overflow-hidden cursor-pointer group"
      onClick={() => onClick(event)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={event.image} alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          style={{ filter: isPast ? 'grayscale(30%)' : 'none' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Date badge */}
        <div className="absolute top-3 left-3 bg-white rounded-xl px-2 py-1 text-center shadow-lg min-w-[44px]">
          <div className="text-lg font-black leading-none" style={{ color }}>
            {new Date(event.date).getDate()}
          </div>
          <div className="text-[10px] font-bold text-gray-500 uppercase">
            {new Date(event.date).toLocaleString('default', { month: 'short' })}
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 right-12 px-2 py-1 rounded-full text-white text-xs font-bold"
          style={{ background: color }}>
          {event.category}
        </div>

        {/* Like button */}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          style={{ background: liked ? '#ef4444' : 'rgba(0,0,0,0.4)' }}
          onClick={e => { e.stopPropagation(); setLiked(p => !p); setLikes(p => p + (liked ? -1 : 1)) }}>
          <Heart size={14} className="text-white" fill={liked ? 'white' : 'none'} />
        </button>

        {/* Countdown on image */}
        {!isPast && (
          <div className="absolute bottom-3 left-3">
            <Countdown date={event.date} />
          </div>
        )}

        {/* Past badge */}
        {isPast && (
          <div className="absolute bottom-3 left-3 px-2 py-1 rounded-full text-white text-xs font-bold bg-black/50">
            Past Event
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold t-h text-sm mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
          {event.title}
        </h3>

        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2 text-xs t-m">
            <Clock size={11} style={{ color }} /> {event.time} · {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
          <div className="flex items-center gap-2 text-xs t-m">
            <MapPin size={11} style={{ color }} /> {event.venue}
          </div>
          {event.prize && (
            <div className="flex items-center gap-2 text-xs font-semibold" style={{ color }}>
              <Trophy size={11} /> Prize: {event.prize}
            </div>
          )}
        </div>

        {/* Registration bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs t-m mb-1">
            <span>{event.registrations.toLocaleString()} registered</span>
            <span>{pct}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden t-bg-alt">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }}
              transition={{ duration: 1 }} className="h-full rounded-full"
              style={{ background: pct > 90 ? '#ef4444' : color }} />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {event.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full t-m"
              style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid var(--card-border)' }}>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs t-m">
              <Heart size={11} className={liked ? 'text-red-500' : ''} fill={liked ? '#ef4444' : 'none'} /> {likes}
            </span>
            <button className="flex items-center gap-1 text-xs t-m hover:text-orange-500 transition-colors"
              onClick={e => { e.stopPropagation(); shareEvent(event) }}>
              <Share2 size={11} /> Share
            </button>
          </div>
          {!isPast ? (
            <button className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-all hover:scale-105"
              style={{ background: color }}
              onClick={e => { e.stopPropagation(); addToCalendar(event) }}>
              <CalendarPlus size={11} /> Add to Calendar
            </button>
          ) : (
            <span className="text-xs font-semibold" style={{ color }}>
              {event.gallery.length > 0 ? `${event.gallery.length} Photos` : 'View Details'}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ── Event Detail Modal ────────────────────────────────────
function EventModal({ event, onClose }) {
  const [gallery, setGallery] = useState(false)
  const navigate = useNavigate()
  const color = catColor[event.category] || catColor.default
  const isPast = event.status === 'past'

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: 'var(--surface)', border: '1px solid var(--card-border)' }}
        onClick={e => e.stopPropagation()}>

        {/* Hero */}
        <div className="relative h-56">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <button onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors">
            <X size={18} />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block px-2 py-1 rounded-full text-white text-xs font-bold mb-2"
              style={{ background: color }}>{event.category}</span>
            <h2 className="text-xl font-black text-white">{event.title}</h2>
          </div>
        </div>

        <div className="p-6">
          {/* Countdown */}
          {!isPast && (
            <div className="rounded-xl p-4 mb-5 flex items-center justify-between"
              style={{ background: `${color}12`, border: `1px solid ${color}30` }}>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color }}>Event starts in</div>
                <Countdown date={event.date} />
              </div>
              <button onClick={() => addToCalendar(event)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105"
                style={{ background: color }}>
                <CalendarPlus size={14} /> Add to Calendar
              </button>
            </div>
          )}

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { icon: Calendar, label: 'Date', value: new Date(event.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) },
              { icon: Clock, label: 'Time', value: event.time },
              { icon: MapPin, label: 'Venue', value: event.venue },
              { icon: Users, label: 'Organizer', value: event.organizer },
              ...(event.prize ? [{ icon: Trophy, label: 'Prize Pool', value: event.prize }] : []),
              { icon: Users, label: 'Registrations', value: `${event.registrations} / ${event.capacity}` },
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-xl t-bg-alt">
                <Icon size={14} className="mt-0.5 shrink-0" style={{ color }} />
                <div>
                  <div className="text-xs t-m">{label}</div>
                  <div className="text-sm font-semibold t-h">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="t-b text-sm leading-relaxed mb-5">{event.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {event.tags.map((tag, i) => (
              <span key={i} className="flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium"
                style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>

          {/* Past event gallery */}
          {isPast && event.gallery.length > 0 && (
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold t-h text-sm">Event Gallery</h3>
                <button onClick={() => setGallery(true)}
                  className="text-xs font-semibold flex items-center gap-1" style={{ color }}>
                  View All <ArrowRight size={11} />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {event.gallery.map((img, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setGallery(true)}>
                    <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            {!isPast && (
              <button className="flex-1 py-3 rounded-xl text-white font-bold text-sm transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${color}, var(--accent2))` }}
                onClick={() => { onClose(); navigate(`/events/register/${event.id}`) }}>
                Register Now
              </button>
            )}
            <button onClick={() => shareEvent(event)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm t-b transition-all hover:text-orange-500"
              style={{ border: '1px solid var(--card-border)' }}>
              <Share2 size={15} /> Share
            </button>
          </div>
        </div>
      </motion.div>

      {gallery && <GalleryLightbox images={event.gallery} onClose={() => setGallery(false)} />}
    </motion.div>
  )
}

// ── Main Events Page ──────────────────────────────────────
export default function Events() {
  const [tab, setTab] = useState('upcoming')
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = eventsAll.filter(e => {
    const matchTab = e.status === tab
    const matchCat = category === 'All' || e.category === category
    const matchQ = e.title.toLowerCase().includes(query.toLowerCase()) ||
                   e.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
    return matchTab && matchCat && matchQ
  })

  const upcoming = eventsAll.filter(e => e.status === 'upcoming')
  const past = eventsAll.filter(e => e.status === 'past')

  return (
    <div className="t-bg min-h-screen pt-20">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden py-16 px-4"
        style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(234,88,12,0.06))' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(var(--accent) 1px,transparent 1px),linear-gradient(90deg,var(--accent) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <span className="badge mb-4">Events & Activities</span>
            <h1 className="text-4xl md:text-6xl font-black t-h mb-3">
              RNSIT <span className="text-gradient">Events</span>
            </h1>
            <p className="t-m text-lg mb-8">Discover, register, and experience the best of RNSIT</p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 t-m" />
              <input type="text" placeholder="Search events, tags..." value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm focus:outline-none t-h transition-all"
                style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }} />
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Upcoming Events', value: upcoming.length, color: '#f97316' },
            { label: 'Past Events', value: past.length, color: '#8b5cf6' },
            { label: 'Total Registrations', value: eventsAll.reduce((s, e) => s + e.registrations, 0).toLocaleString(), color: '#10b981' },
            { label: 'Event Categories', value: categories.length - 1, color: '#3b82f6' },
          ].map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="card rounded-2xl p-4 text-center">
                <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs t-m">{s.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* ── Tabs + Filters ── */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Upcoming / Past tabs */}
          <div className="flex rounded-xl overflow-hidden p-1 gap-1"
            style={{ background: 'var(--bg-alt)', border: '1px solid var(--card-border)' }}>
            {['upcoming', 'past'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize"
                style={tab === t ? { background: 'var(--accent)', color: '#fff' } : { color: 'var(--t3)' }}>
                {t === 'upcoming' ? `Upcoming (${upcoming.length})` : `Past Events (${past.length})`}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={category === cat
                  ? { background: catColor[cat] || 'var(--accent)', color: '#fff' }
                  : { background: 'var(--bg-alt)', color: 'var(--t3)', border: '1px solid var(--card-border)' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Event Grid ── */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div key={tab + category}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(event => (
                <EventCard key={event.id} event={event} onClick={setSelected} />
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20">
              <Calendar size={48} className="mx-auto mb-4 t-m opacity-30" />
              <p className="t-m">No events found</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Past Events Gallery Section ── */}
        {tab === 'past' && (
          <AnimatedSection className="mt-16">
            <h2 className="text-2xl font-black t-h mb-6">
              Event <span className="text-gradient">Highlights</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {past.flatMap(e => e.gallery).slice(0, 8).map((img, i) => (
                <motion.div key={i} whileHover={{ scale: 1.03 }}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer">
                  <img src={img} alt={`Highlight ${i}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>

      {/* ── Event Modal ── */}
      <AnimatePresence>
        {selected && <EventModal event={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}
