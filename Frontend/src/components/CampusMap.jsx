import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ZoomOut, Maximize2, MapPin, Map, Satellite } from 'lucide-react'

const BUILDINGS = [
  {
    id: 'main',
    label: 'Main Block',
    short: 'MB',
    x: 340, y: 160, w: 120, h: 70,
    color: '#f97316',
    description: 'Administrative offices, Principal\'s office, Conference halls, and Faculty rooms.',
    facilities: ['Principal Office', 'Admin Block', 'Conference Hall', 'Faculty Rooms'],
    floor: '4 Floors',
  },
  {
    id: 'cse',
    label: 'CSE & ISE Block',
    short: 'CS',
    x: 160, y: 100, w: 110, h: 65,
    color: '#ea580c',
    description: 'Houses Computer Science and Information Science departments with modern labs.',
    facilities: ['AI & ML Lab', 'Networking Lab', 'Cybersecurity Lab', 'Classrooms'],
    floor: '3 Floors',
  },
  {
    id: 'ece',
    label: 'ECE & EEE Block',
    short: 'EC',
    x: 510, y: 100, w: 110, h: 65,
    color: '#8b5cf6',
    description: 'Electronics, Communication and Electrical departments with VLSI and Power labs.',
    facilities: ['VLSI Lab', 'Communication Lab', 'Power Systems Lab', 'Embedded Lab'],
    floor: '3 Floors',
  },
  {
    id: 'mech',
    label: 'Mechanical Block',
    short: 'ME',
    x: 160, y: 280, w: 110, h: 65,
    color: '#f59e0b',
    description: 'Mechanical Engineering department with CAD/CAM, Thermal and Robotics labs.',
    facilities: ['CAD/CAM Lab', 'Thermal Lab', 'Robotics Lab', 'Workshop'],
    floor: '2 Floors',
  },
  {
    id: 'civil',
    label: 'Civil Block',
    short: 'CV',
    x: 510, y: 280, w: 110, h: 65,
    color: '#10b981',
    description: 'Civil Engineering department with Structural, Geotechnical and Survey labs.',
    facilities: ['Structural Lab', 'Geotechnical Lab', 'Survey Lab', 'Drawing Hall'],
    floor: '2 Floors',
  },
  {
    id: 'library',
    label: 'Central Library',
    short: 'LIB',
    x: 330, y: 310, w: 140, h: 60,
    color: '#ec4899',
    description: '50,000+ books, digital resources, e-journals, and 24/7 reading room.',
    facilities: ['Reading Room', 'Digital Section', 'Reference Section', 'Discussion Rooms'],
    floor: '2 Floors',
  },
  {
    id: 'auditorium',
    label: 'Auditorium',
    short: 'AUD',
    x: 340, y: 420, w: 120, h: 55,
    color: '#f43f5e',
    description: '1500-seat auditorium for events, seminars, convocations and cultural programs.',
    facilities: ['Main Hall', 'Stage', 'Green Room', 'AV Room'],
    floor: '1 Floor',
  },
  {
    id: 'hostel_boys',
    label: "Boys' Hostel",
    short: 'BH',
    x: 80, y: 390, w: 100, h: 60,
    color: '#0ea5e9',
    description: 'Modern hostel with furnished rooms, mess, gym and recreational facilities.',
    facilities: ['Rooms (2-3 sharing)', 'Mess Hall', 'Gym', 'Common Room'],
    floor: '4 Floors',
  },
  {
    id: 'hostel_girls',
    label: "Girls' Hostel",
    short: 'GH',
    x: 620, y: 390, w: 100, h: 60,
    color: '#d946ef',
    description: 'Secure girls hostel with all modern amenities and 24/7 security.',
    facilities: ['Rooms (2-3 sharing)', 'Mess Hall', 'Recreation Room', 'Security'],
    floor: '4 Floors',
  },
  {
    id: 'sports',
    label: 'Sports Complex',
    short: 'SP',
    x: 80, y: 180, w: 60, h: 100,
    color: '#84cc16',
    description: 'Cricket ground, basketball, volleyball, badminton courts and athletics track.',
    facilities: ['Cricket Ground', 'Basketball Court', 'Volleyball', 'Badminton'],
    floor: 'Ground Level',
  },
  {
    id: 'cafeteria',
    label: 'Cafeteria',
    short: 'CAF',
    x: 620, y: 180, w: 80, h: 60,
    color: '#fb923c',
    description: 'Multi-cuisine food court serving hygienic and affordable meals.',
    facilities: ['Food Court', 'Juice Bar', 'Snacks Corner', 'Seating Area'],
    floor: '1 Floor',
  },
  {
    id: 'medical',
    label: 'Medical Center',
    short: 'MED',
    x: 620, y: 260, w: 80, h: 50,
    color: '#ef4444',
    description: 'On-campus health center with qualified doctors and first-aid facilities.',
    facilities: ['OPD', 'First Aid', 'Pharmacy', 'Ambulance'],
    floor: '1 Floor',
  },
]

// Roads / paths on campus
const ROADS = [
  'M 140 230 L 660 230',
  'M 400 80 L 400 490',
  'M 140 370 L 660 370',
  'M 140 80 L 140 490',
  'M 660 80 L 660 490',
]

// Trees / green areas
const TREES = [
  { x: 220, y: 230 }, { x: 260, y: 230 }, { x: 300, y: 230 },
  { x: 500, y: 230 }, { x: 540, y: 230 }, { x: 580, y: 230 },
  { x: 400, y: 230 }, { x: 400, y: 370 },
  { x: 220, y: 370 }, { x: 580, y: 370 },
]

function Tree({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle r="10" fill="#16a34a" opacity="0.7" />
      <circle r="7" fill="#22c55e" opacity="0.8" cx="0" cy="-2" />
    </g>
  )
}

function Building({ b, selected, onClick }) {
  const isSelected = selected?.id === b.id
  return (
    <motion.g
      onClick={() => onClick(b)}
      style={{ cursor: 'pointer' }}
      whileHover={{ scale: 1.04 }}
      animate={{ scale: isSelected ? 1.06 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Shadow */}
      <rect x={b.x + 4} y={b.y + 4} width={b.w} height={b.h}
        rx="6" fill="rgba(0,0,0,0.2)" />
      {/* Building body */}
      <rect x={b.x} y={b.y} width={b.w} height={b.h}
        rx="6"
        fill={isSelected ? b.color : b.color + 'cc'}
        stroke={isSelected ? '#fff' : b.color}
        strokeWidth={isSelected ? 2.5 : 1}
      />
      {/* Roof highlight */}
      <rect x={b.x} y={b.y} width={b.w} height={12}
        rx="6" fill="rgba(255,255,255,0.2)" />
      {/* Windows pattern */}
      {[0, 1, 2].map(col => (
        [0, 1].map(row => (
          <rect key={`${col}-${row}`}
            x={b.x + 12 + col * (b.w / 3 - 2)} y={b.y + 20 + row * 18}
            width={b.w / 3 - 14} height={10}
            rx="2" fill="rgba(255,255,255,0.35)"
          />
        ))
      ))}
      {/* Label */}
      <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 5}
        textAnchor="middle" fill="white"
        fontSize="11" fontWeight="700"
        style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
        {b.short}
      </text>
      {/* Pulse ring when selected */}
      {isSelected && (
        <motion.rect
          x={b.x - 4} y={b.y - 4} width={b.w + 8} height={b.h + 8}
          rx="10" fill="none" stroke={b.color} strokeWidth="2"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.g>
  )
}

export default function CampusMap() {
  const [view, setView] = useState('map') // 'map' | 'satellite'
  const [selected, setSelected] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState(null)
  const svgRef = useRef(null)

  const handleMouseDown = (e) => {
    if (e.target.closest('g[style*="cursor: pointer"]')) return
    setDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }
  const handleMouseMove = (e) => {
    if (!dragging) return
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }
  const handleMouseUp = () => setDragging(false)

  const handleWheel = (e) => {
    e.preventDefault()
    setZoom(z => Math.min(2.5, Math.max(0.5, z - e.deltaY * 0.001)))
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden"
      style={{ background: 'var(--surface)', border: '1px solid var(--card-border)', height: '520px' }}>

      {/* Tab switcher */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 p-1 rounded-xl"
        style={{ background: 'var(--card)', border: '1px solid var(--card-border)', backdropFilter: 'blur(8px)' }}>
        {[
          { id: 'map', label: 'Campus Map', icon: Map },
          { id: 'satellite', label: 'Satellite', icon: Satellite },
        ].map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setView(id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: view === id ? 'var(--accent)' : 'transparent',
              color: view === id ? 'white' : 'var(--t3)',
            }}>
            <Icon size={12} /> {label}
          </button>
        ))}
      </div>

      {/* Satellite Google Maps embed */}
      {view === 'satellite' && (
        <motion.div key="satellite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-10">
          <iframe
            title="RNSIT Campus Satellite View"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.069!2d77.51516!3d12.91408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3ee159b3d7b5%3A0xb7f6b6b6b6b6b6b6!2sRNS%20Institute%20of%20Technology%2C%20Channasandra%2C%20Bengaluru!5e1!3m2!1sen!2sin!4v1711500000000!5m2!1sen!2sin"
          />
          <div className="absolute bottom-3 left-3 z-20 px-3 py-1.5 rounded-lg text-xs font-medium text-white"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}>
            <MapPin size={10} className="inline mr-1" style={{ color: 'var(--accent)' }} />
            RNS Institute of Technology, Bengaluru
          </div>
        </motion.div>
      )}

      {/* SVG Campus Map */}
      {view === 'map' && (
        <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">

      {/* Controls */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
        {[
          { icon: ZoomIn, action: () => setZoom(z => Math.min(2.5, z + 0.2)) },
          { icon: ZoomOut, action: () => setZoom(z => Math.max(0.5, z - 0.2)) },
          { icon: Maximize2, action: () => { setZoom(1); setPan({ x: 0, y: 0 }) } },
        ].map(({ icon: Icon, action }, i) => (
          <button key={i} onClick={action}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
            style={{ background: 'var(--card)', border: '1px solid var(--card-border)', color: 'var(--t2)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Icon size={14} />
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="absolute top-3 left-3 z-20 rounded-xl p-3 text-xs"
        style={{ background: 'var(--card)', border: '1px solid var(--card-border)', backdropFilter: 'blur(8px)' }}>
        <div className="font-bold mb-2" style={{ color: 'var(--t1)' }}>Campus Map</div>
        <div className="flex items-center gap-1.5 mb-1" style={{ color: 'var(--t3)' }}>
          <MapPin size={10} style={{ color: 'var(--accent)' }} /> Click a building for details
        </div>
        <div style={{ color: 'var(--t4)' }}>Drag to pan · Scroll to zoom</div>
      </div>

      {/* SVG Map */}
      <svg
        ref={svgRef}
        width="100%" height="100%"
        viewBox="0 0 800 560"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none' }}
      >
        <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}
          style={{ transformOrigin: '400px 280px' }}>

          {/* Ground */}
          <rect x="60" y="60" width="680" height="460" rx="12"
            fill="#e8f5e9" stroke="#c8e6c9" strokeWidth="1" />

          {/* Roads */}
          {ROADS.map((d, i) => (
            <path key={i} d={d} stroke="#cbd5e1" strokeWidth="18"
              fill="none" strokeLinecap="round" />
          ))}
          {ROADS.map((d, i) => (
            <path key={`c${i}`} d={d} stroke="#e2e8f0" strokeWidth="14"
              fill="none" strokeLinecap="round" strokeDasharray="20 10" />
          ))}

          {/* Entrance gate */}
          <rect x="380" y="490" width="40" height="20" rx="4" fill="#94a3b8" />
          <text x="400" y="504" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">GATE</text>

          {/* Parking */}
          <rect x="70" y="460" width="80" height="50" rx="6" fill="#dde1e7" stroke="#b0b8c4" strokeWidth="1" />
          <text x="110" y="490" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="600">PARKING</text>

          {/* Trees */}
          {TREES.map((t, i) => <Tree key={i} x={t.x} y={t.y} />)}

          {/* Buildings */}
          {BUILDINGS.map(b => (
            <Building key={b.id} b={b} selected={selected}
              onClick={b => setSelected(prev => prev?.id === b.id ? null : b)} />
          ))}

          {/* Building labels below */}
          {BUILDINGS.map(b => (
            <text key={`lbl-${b.id}`}
              x={b.x + b.w / 2} y={b.y + b.h + 13}
              textAnchor="middle" fill="#475569"
              fontSize="8.5" fontWeight="500"
              style={{ pointerEvents: 'none' }}>
              {b.label}
            </text>
          ))}

          {/* Compass */}
          <g transform="translate(720, 100)">
            <circle r="22" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
            <text x="0" y="-8" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="900">N</text>
            <text x="0" y="16" textAnchor="middle" fill="#94a3b8" fontSize="8">S</text>
            <text x="12" y="5" textAnchor="middle" fill="#94a3b8" fontSize="8">E</text>
            <text x="-12" y="5" textAnchor="middle" fill="#94a3b8" fontSize="8">W</text>
            <line x1="0" y1="-4" x2="0" y2="-16" stroke="#ef4444" strokeWidth="2" />
          </g>
        </g>
      </svg>

      </motion.div>
      )} {/* end map view */}

      {/* Info Panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="absolute bottom-4 right-4 w-64 rounded-2xl p-4 z-20"
            style={{ background: 'var(--card)', border: `2px solid ${selected.color}`, backdropFilter: 'blur(12px)', boxShadow: `0 8px 32px ${selected.color}30` }}
          >
            <button onClick={() => setSelected(null)}
              className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors"
              style={{ color: 'var(--t3)' }}>
              <X size={12} />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black"
                style={{ background: selected.color }}>
                {selected.short}
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: 'var(--t1)' }}>{selected.label}</div>
                <div className="text-xs" style={{ color: 'var(--t4)' }}>{selected.floor}</div>
              </div>
            </div>

            <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--t3)' }}>
              {selected.description}
            </p>

            <div>
              <div className="text-xs font-semibold mb-1.5" style={{ color: 'var(--t2)' }}>Facilities:</div>
              <div className="flex flex-wrap gap-1">
                {selected.facilities.map((f, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: selected.color + '18', color: selected.color, border: `1px solid ${selected.color}30` }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
