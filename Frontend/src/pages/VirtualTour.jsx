import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight, Maximize2, Minimize2,
  MapPin, ArrowRight, Info, RotateCcw, Play, Pause,
  Volume2, VolumeX, Navigation, Home, X
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'

// ── Tour Locations ────────────────────────────────────────
const LOCATIONS = [
  {
    id: 'entrance',
    name: 'Main Entrance',
    description: 'Welcome to RNS Institute of Technology — the gateway to excellence.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&q=60',
    hotspots: [
      { id: 'mainblock', label: 'Main Block', x: 65, y: 45 },
      { id: 'library', label: 'Library', x: 30, y: 55 },
    ],
  },
  {
    id: 'mainblock',
    name: 'Main Block',
    description: 'Administrative offices, Principal\'s office, and faculty rooms.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&q=60',
    hotspots: [
      { id: 'cse', label: 'CSE Block', x: 75, y: 50 },
      { id: 'auditorium', label: 'Auditorium', x: 25, y: 60 },
      { id: 'entrance', label: 'Entrance', x: 50, y: 75 },
    ],
  },
  {
    id: 'cse',
    name: 'CSE & ISE Block',
    description: 'State-of-the-art computing labs, AI research center, and classrooms.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&q=60',
    hotspots: [
      { id: 'lab', label: 'Computer Lab', x: 60, y: 40 },
      { id: 'ece', label: 'ECE Block', x: 80, y: 55 },
      { id: 'mainblock', label: 'Main Block', x: 20, y: 60 },
    ],
  },
  {
    id: 'lab',
    name: 'AI & ML Research Lab',
    description: 'GPU clusters, high-performance servers, and cutting-edge AI research equipment.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=200&q=60',
    hotspots: [
      { id: 'cse', label: 'Back to CSE', x: 20, y: 70 },
      { id: 'library', label: 'Library', x: 75, y: 55 },
    ],
  },
  {
    id: 'ece',
    name: 'ECE & EEE Block',
    description: 'VLSI design labs, communication labs, and embedded systems facilities.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=60',
    hotspots: [
      { id: 'cse', label: 'CSE Block', x: 25, y: 50 },
      { id: 'sports', label: 'Sports Complex', x: 70, y: 60 },
    ],
  },
  {
    id: 'library',
    name: 'Central Library',
    description: '50,000+ books, digital resources, e-journals, and 24/7 reading room.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=200&q=60',
    hotspots: [
      { id: 'mainblock', label: 'Main Block', x: 30, y: 65 },
      { id: 'cafeteria', label: 'Cafeteria', x: 70, y: 55 },
    ],
  },
  {
    id: 'auditorium',
    name: 'Auditorium',
    description: '1500-seat auditorium for events, seminars, convocations and cultural programs.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&q=60',
    hotspots: [
      { id: 'mainblock', label: 'Main Block', x: 50, y: 70 },
      { id: 'sports', label: 'Sports Complex', x: 75, y: 45 },
    ],
  },
  {
    id: 'sports',
    name: 'Sports Complex',
    description: 'Cricket ground, basketball, volleyball, badminton courts and athletics track.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&q=60',
    hotspots: [
      { id: 'cafeteria', label: 'Cafeteria', x: 60, y: 50 },
      { id: 'entrance', label: 'Main Entrance', x: 30, y: 65 },
    ],
  },
  {
    id: 'cafeteria',
    name: 'Cafeteria',
    description: 'Multi-cuisine food court serving hygienic and affordable meals for 2000+ students.',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=200&q=60',
    hotspots: [
      { id: 'library', label: 'Library', x: 25, y: 55 },
      { id: 'sports', label: 'Sports Complex', x: 70, y: 50 },
    ],
  },
]

// ── 360° Panorama Viewer ──────────────────────────────────
function PanoramaViewer({ location, onHotspot, autoRotate }) {
  const containerRef = useRef(null)
  const [angle, setAngle] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startAngle, setStartAngle] = useState(0)
  const animRef = useRef(null)
  const angleRef = useRef(0)

  // Auto-rotate
  useEffect(() => {
    if (!autoRotate || isDragging) return
    const tick = () => {
      angleRef.current = (angleRef.current + 0.08) % 360
      setAngle(angleRef.current)
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [autoRotate, isDragging])

  const onMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.clientX || e.touches?.[0]?.clientX)
    setStartAngle(angleRef.current)
  }
  const onMouseMove = useCallback((e) => {
    if (!isDragging) return
    const x = e.clientX || e.touches?.[0]?.clientX
    const delta = (x - startX) * 0.3
    const newAngle = (startAngle - delta + 360) % 360
    angleRef.current = newAngle
    setAngle(newAngle)
  }, [isDragging, startX, startAngle])
  const onMouseUp = () => setIsDragging(false)

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onMouseMove)
    window.addEventListener('touchend', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onMouseMove)
      window.removeEventListener('touchend', onMouseUp)
    }
  }, [onMouseMove])

  // Calculate hotspot positions adjusted for current angle
  const getHotspotPos = (hotspot) => {
    const adjustedX = ((hotspot.x - angle / 3.6 + 100) % 100)
    return { x: adjustedX, y: hotspot.y }
  }

  return (
    <div ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}>

      {/* Panorama image with parallax shift */}
      <motion.div
        className="absolute inset-0"
        style={{ width: '200%', left: `${-angle * 0.5}%` }}
        animate={{ left: `${-angle * 0.5}%` }}
        transition={{ type: 'tween', duration: 0 }}>
        <img src={location.image} alt={location.name}
          className="w-full h-full object-cover"
          draggable={false} />
      </motion.div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)' }} />

      {/* Hotspots */}
      {location.hotspots.map((hs, i) => {
        const pos = getHotspotPos(hs)
        if (pos.x < 5 || pos.x > 95) return null
        return (
          <motion.button key={hs.id}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}
            className="absolute z-20 flex flex-col items-center gap-1 group"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
            onClick={() => onHotspot(hs.id)}>
            {/* Pulse ring */}
            <div className="relative">
              <motion.div className="absolute inset-0 rounded-full"
                style={{ background: 'var(--accent)', opacity: 0.4 }}
                animate={{ scale: [1, 2, 2], opacity: [0.4, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity }} />
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-xl relative z-10"
                style={{ background: 'var(--accent)', border: '2px solid white' }}>
                <Navigation size={16} />
              </div>
            </div>
            <div className="px-2 py-1 rounded-lg text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
              {hs.label}
            </div>
          </motion.button>
        )
      })}

      {/* Drag hint */}
      {!isDragging && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs pointer-events-none"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <RotateCcw size={12} /> Drag to look around
        </div>
      )}

      {/* Compass */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
        <motion.div animate={{ rotate: -angle }} style={{ color: 'var(--accent)' }}>
          <Navigation size={18} />
        </motion.div>
      </div>
    </div>
  )
}

// ── Main Virtual Tour Page ────────────────────────────────
export default function VirtualTour() {
  const [current, setCurrent] = useState(LOCATIONS[0])
  const [prev, setPrev] = useState(null)
  const [fullscreen, setFullscreen] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [showInfo, setShowInfo] = useState(true)
  const [showMap, setShowMap] = useState(false)
  const containerRef = useRef(null)

  const navigate = (id) => {
    setPrev(current)
    const next = LOCATIONS.find(l => l.id === id)
    if (next) setCurrent(next)
  }

  const toggleFullscreen = () => {
    if (!fullscreen) {
      containerRef.current?.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    setFullscreen(f => !f)
  }

  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  return (
    <div className="t-bg min-h-screen pt-16">

      {/* ── Hero Header ── */}
      <div className="relative py-10 px-4 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(234,88,12,0.06))' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(var(--accent) 1px,transparent 1px),linear-gradient(90deg,var(--accent) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        <AnimatedSection className="relative z-10">
          <span className="badge mb-3">Interactive Experience</span>
          <h1 className="text-4xl md:text-5xl font-black t-h mb-2">
            Virtual Campus <span className="text-gradient">Tour</span>
          </h1>
          <p className="t-m max-w-xl mx-auto">
            Explore RNSIT from anywhere — drag to look around, click hotspots to navigate between locations
          </p>
        </AnimatedSection>
      </div>

      {/* ── Main Viewer ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">

          {/* Location List Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="card rounded-2xl p-4">
              <h3 className="font-bold t-h text-sm mb-3 flex items-center gap-2">
                <MapPin size={14} style={{ color: 'var(--accent)' }} /> Campus Locations
              </h3>
              <div className="space-y-2">
                {LOCATIONS.map(loc => (
                  <button key={loc.id} onClick={() => navigate(loc.id)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl transition-all text-left group"
                    style={{
                      background: current.id === loc.id ? 'rgba(249,115,22,0.12)' : 'transparent',
                      border: current.id === loc.id ? '1px solid rgba(249,115,22,0.3)' : '1px solid transparent',
                    }}>
                    <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0">
                      <img src={loc.thumb} alt={loc.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold t-h truncate group-hover:text-orange-500 transition-colors">
                        {loc.name}
                      </div>
                      <div className="text-xs t-s">{loc.hotspots.length} connections</div>
                    </div>
                    {current.id === loc.id && (
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick links to departments */}
            <div className="card rounded-2xl p-4 mt-4">
              <h3 className="font-bold t-h text-sm mb-3">Explore Departments</h3>
              <div className="space-y-1.5">
                {['cse', 'ece', 'me', 'ise', 'eee'].map(id => (
                  <Link key={id} to={`/departments/${id}`}
                    className="flex items-center justify-between p-2 rounded-lg text-xs t-b hover:text-orange-500 transition-colors group t-bg-alt">
                    <span className="uppercase font-bold">{id}</span>
                    <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" style={{ color: 'var(--accent)' }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Panorama Viewer */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div ref={containerRef}
              className="relative rounded-2xl overflow-hidden"
              style={{ height: fullscreen ? '100vh' : '500px', border: '2px solid var(--card-border)' }}>

              {/* Panorama */}
              <AnimatePresence mode="wait">
                <motion.div key={current.id} className="absolute inset-0"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}>
                  <PanoramaViewer
                    location={current}
                    onHotspot={navigate}
                    autoRotate={autoRotate} />
                </motion.div>
              </AnimatePresence>

              {/* Top bar */}
              <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-3"
                style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
                  <span className="text-white text-sm font-bold">{current.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setAutoRotate(r => !r)}
                    className="p-2 rounded-lg text-white transition-colors hover:bg-white/20"
                    title={autoRotate ? 'Pause rotation' : 'Auto rotate'}>
                    {autoRotate ? <Pause size={15} /> : <Play size={15} />}
                  </button>
                  <button onClick={() => setShowInfo(s => !s)}
                    className="p-2 rounded-lg text-white transition-colors hover:bg-white/20">
                    <Info size={15} />
                  </button>
                  <button onClick={toggleFullscreen}
                    className="p-2 rounded-lg text-white transition-colors hover:bg-white/20">
                    {fullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                  </button>
                </div>
              </div>

              {/* Info panel */}
              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-0 left-0 right-0 z-30 p-4"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                    <h3 className="text-white font-black text-lg">{current.name}</h3>
                    <p className="text-white/70 text-sm mt-1">{current.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {current.hotspots.map(hs => (
                        <button key={hs.id} onClick={() => navigate(hs.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-semibold transition-all hover:scale-105"
                          style={{ background: 'rgba(249,115,22,0.8)', backdropFilter: 'blur(4px)' }}>
                          <Navigation size={10} /> {hs.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                onClick={() => { const idx = LOCATIONS.findIndex(l => l.id === current.id); navigate(LOCATIONS[(idx - 1 + LOCATIONS.length) % LOCATIONS.length].id) }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full text-white transition-colors hover:bg-white/20"
                style={{ background: 'rgba(0,0,0,0.4)' }}>
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => { const idx = LOCATIONS.findIndex(l => l.id === current.id); navigate(LOCATIONS[(idx + 1) % LOCATIONS.length].id) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full text-white transition-colors hover:bg-white/20"
                style={{ background: 'rgba(0,0,0,0.4)' }}>
                <ChevronRight size={20} />
              </button>

              {/* Location counter */}
              <div className="absolute bottom-4 right-4 z-30 px-2 py-1 rounded-full text-white text-xs"
                style={{ background: 'rgba(0,0,0,0.5)' }}>
                {LOCATIONS.findIndex(l => l.id === current.id) + 1} / {LOCATIONS.length}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {LOCATIONS.map(loc => (
                <button key={loc.id} onClick={() => navigate(loc.id)}
                  className="shrink-0 relative rounded-xl overflow-hidden transition-all hover:scale-105"
                  style={{
                    width: '80px', height: '56px',
                    border: current.id === loc.id ? '2px solid var(--accent)' : '2px solid transparent',
                    boxShadow: current.id === loc.id ? '0 0 12px rgba(249,115,22,0.5)' : 'none',
                  }}>
                  <img src={loc.thumb} alt={loc.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-end p-1"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                    <span className="text-white text-[9px] font-bold leading-tight">{loc.name.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── How to use ── */}
        <AnimatedSection className="mt-10">
          <div className="card rounded-2xl p-6">
            <h3 className="font-bold t-h mb-4 text-center">How to Navigate</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: '🖱️', title: 'Drag', desc: 'Click and drag to look around 360°' },
                { icon: '📍', title: 'Hotspots', desc: 'Click orange pins to move to next location' },
                { icon: '⬅️', title: 'Arrows', desc: 'Use arrows to go to previous/next location' },
                { icon: '⛶', title: 'Fullscreen', desc: 'Click fullscreen for immersive experience' },
              ].map((tip, i) => (
                <div key={i} className="text-center p-4 rounded-xl t-bg-alt">
                  <div className="text-2xl mb-2">{tip.icon}</div>
                  <div className="font-bold t-h text-sm mb-1">{tip.title}</div>
                  <div className="text-xs t-m">{tip.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
