import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, User, MessageCircle, RotateCcw } from 'lucide-react'

// ── Knowledge Base ──────────────────────────────────────
const KB = [
  {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'howdy'],
    answer: `Hello! Welcome to RNSIT Assistant. I can help you with:\n• Admissions & eligibility\n• Departments & programs\n• Placements & packages\n• Campus facilities\n• Fees & hostel\n• Contact information\n\nWhat would you like to know?`,
  },
  {
    patterns: ['about rnsit', 'what is rnsit', 'tell me about', 'overview', 'history', 'established', 'founder'],
    answer: `RNS Institute of Technology (RNSIT) is a premier autonomous engineering college in Bengaluru.\n\n• Founded: 2001 by Dr. R. N. Shetty\n• Type: Private Autonomous Engineering College\n• Location: Dr. Vishnuvardhan Road, R R Nagar, Channasandra, Bengaluru – 560098\n• Affiliated to: VTU | Approved by: AICTE\n• Accreditation: NAAC A+ Grade | NBA (Selected Programs)\n• Campus Strength: 5600+ students\n• Faculty: 312+ | Annual Intake: 2160`,
  },
  {
    patterns: ['admission', 'apply', 'application', 'how to join', 'enroll', 'entrance', 'kcet', 'comedk'],
    answer: `Admissions at RNSIT:\n\nUG (B.E.) Admission:\n• Through KCET / COMEDK / Management quota\n• Eligibility: 10+2 with PCM, min 45% (40% for SC/ST)\n• Applications open: March – July\n\nPG Programs:\n• MBA & MCA: Management / PGCET\n• M.Tech: PGCET, min 50% in B.E./B.Tech\n\nContact: admissions@rnsit.ac.in\nPhone: +91 80 2441 0020 / 21`,
  },
  {
    patterns: ['department', 'departments', 'branch', 'branches', 'stream', 'streams', 'program', 'programs', 'course', 'courses'],
    answer: `RNSIT offers 8 UG + PG programs:\n\nUndergraduate (B.E.):\n1. Computer Science & Engineering (CSE)\n2. CSE (AI & Machine Learning)\n3. CSE (Data Science)\n4. Information Science & Engineering (ISE)\n5. Electronics & Communication Engineering (ECE)\n6. Electrical & Electronics Engineering (EEE)\n7. Mechanical Engineering\n8. Instrumentation Technology\n\nPostgraduate:\n• MBA | MCA | M.Tech (Various Specializations)\n\nType a department name to know more!`,
  },
  {
    patterns: ['cse', 'computer science', 'cs department'],
    answer: `Computer Science & Engineering (CSE):\n\n• Programs: B.E. CSE, B.E. CSE (AI&ML), B.E. CSE (Data Science), M.Tech\n• Labs: AI & ML Lab, Networking Lab, Software Engineering Lab, Data Science Lab\n• Achievements: NBA Accredited, Consistent VTU Ranks\n• Contact: hod.cse@rnsit.ac.in`,
  },
  {
    patterns: ['ai', 'aiml', 'artificial intelligence', 'machine learning'],
    answer: `CSE (AI & Machine Learning):\n\n• Specialized B.E. program in AI, Deep Learning, Computer Vision, NLP\n• Labs: AI Research Lab, Deep Learning Lab, Computer Vision Lab, NLP Lab\n• Industry-aligned curriculum with Python, TensorFlow, PyTorch\n• Contact: hod.aiml@rnsit.ac.in`,
  },
  {
    patterns: ['data science', 'ds', 'big data'],
    answer: `CSE (Data Science):\n\n• Specialized B.E. program in Data Analytics, Statistical Modeling, Business Intelligence\n• Labs: Data Analytics Lab, Big Data Lab, Visualization Lab\n• Industry collaboration with Oracle, TCS\n• Contact: hod.ds@rnsit.ac.in`,
  },
  {
    patterns: ['ece', 'electronics', 'communication engineering'],
    answer: `Electronics & Communication Engineering (ECE):\n\n• Programs: B.E. ECE, M.Tech VLSI\n• Labs: VLSI Lab, Communication Lab, Embedded Systems Lab, Signal Processing Lab\n• Achievements: IEEE Student Chapter, AICTE Funded Projects\n• Contact: hod.ece@rnsit.ac.in`,
  },
  {
    patterns: ['mechanical', 'me department', 'mech'],
    answer: `Mechanical Engineering:\n\n• Programs: B.E. ME, M.Tech Manufacturing\n• Labs: CAD/CAM Lab, Thermal Lab, Fluid Mechanics Lab, Robotics Lab, Workshop\n• Achievements: SAE Collegiate Club, Industry Collaboration with ISRO\n• Contact: hod.me@rnsit.ac.in`,
  },
  {
    patterns: ['ise', 'information science', 'is department'],
    answer: `Information Science & Engineering (ISE):\n\n• Programs: B.E. ISE\n• Labs: Cybersecurity Lab, Database Lab, IoT Lab, Software Testing Lab\n• Achievements: Google Developer Student Club, Hackathon Champions\n• Contact: hod.ise@rnsit.ac.in`,
  },
  {
    patterns: ['eee', 'electrical', 'electronics engineering'],
    answer: `Electrical & Electronics Engineering (EEE):\n\n• Programs: B.E. EEE, M.Tech Power Electronics\n• Labs: Power Systems Lab, Control Systems Lab, Renewable Energy Lab\n• Achievements: IEEE Power & Energy Society Chapter\n• Contact: hod.eee@rnsit.ac.in`,
  },
  {
    patterns: ['instrumentation', 'it department'],
    answer: `Instrumentation Technology:\n\n• Programs: B.E. Instrumentation Technology\n• Labs: Process Control Lab, Sensors & Transducers Lab, Industrial Automation Lab\n• Focus: Industrial automation, smart manufacturing, IoT\n• Contact: hod.it@rnsit.ac.in`,
  },
  {
    patterns: ['mba', 'management', 'business administration'],
    answer: `MBA at RNSIT:\n\n• Duration: 2 years\n• Fees: ~₹3.75 Lakhs/year\n• Admission: Management entrance / direct\n• Focus: Business management, entrepreneurship, leadership\n• Contact: admissions@rnsit.ac.in`,
  },
  {
    patterns: ['mca', 'computer applications'],
    answer: `MCA at RNSIT:\n\n• Duration: 2 years\n• Fees: ~₹3.5 Lakhs/year\n• Admission: PGCET\n• Focus: Software development, database management, web technologies\n• Contact: admissions@rnsit.ac.in`,
  },
  {
    patterns: ['placement', 'placements', 'job', 'package', 'salary', 'lpa', 'recruit', 'company', 'companies', 'hired', 'ctc'],
    answer: `Placements at RNSIT (Real Data):\n\n2025: 1060 placed | Highest: 50 LPA | Internships: 426\n2024: 1071 job offers | Highest: 26.65 LPA | Internships: 470\n2023: 1386 job offers | Highest: 56 LPA\n2026 (ongoing): 643 placed | Highest: 20.87 LPA\n\nTop Recruiters (200+ companies):\nAmazon, Accenture, Bosch, Capgemini, Cognizant, Infosys, Oracle, PayPal, SAP, TCS, Texas Instruments, Wipro, VMware, NVIDIA and many more!\n\nContact: placements@rnsit.ac.in`,
  },
  {
    patterns: ['fee', 'fees', 'tuition', 'cost', 'how much', 'expense'],
    answer: `Fee Structure at RNSIT:\n\nUndergraduate (B.E.):\n• Total: ₹3.8 Lakhs – ₹30 Lakhs\n• Depends on quota (KCET / COMEDK / Management)\n\nPostgraduate:\n• MBA: ~₹3.75 Lakhs/year\n• MCA: ~₹3.5 Lakhs/year\n\nAdditional Costs:\n• Exam Fee: ₹5,000/semester\n• Books: ₹2,500/year\n• Uniform: ₹2,500 (one-time)\n\nFor exact fees: admissions@rnsit.ac.in\nPhone: +91 80 2441 0020`,
  },
  {
    patterns: ['hostel', 'accommodation', 'stay', 'room', 'pg'],
    answer: `Hostel Facilities at RNSIT:\n\n• Separate hostels for boys and girls\n• Boys capacity: 500+ | Girls capacity: 300+\n• Furnished rooms (2-3 sharing)\n• 24/7 security and Wi-Fi\n• Mess with hygienic food\n• Recreation areas & common rooms\n\nFor hostel allotment: admissions@rnsit.ac.in`,
  },
  {
    patterns: ['facility', 'facilities', 'infrastructure', 'campus', 'library', 'lab', 'sports', 'cafeteria', 'canteen'],
    answer: `Campus Facilities at RNSIT:\n\n• Central Library: Digital + physical resources\n• Sports: Indoor & outdoor facilities\n• Cafeteria: Multi-cuisine food court\n• Auditorium & seminar halls\n• Research & innovation centers\n• Wi-Fi enabled campus\n• Transport facilities\n• Modern labs with advanced equipment`,
  },
  {
    patterns: ['club', 'clubs', 'activity', 'activities', 'extracurricular', 'fest', 'cultural'],
    answer: `Clubs & Activities at RNSIT (20 Student Clubs):\n\nTechnical: Coding, Robotics, AI, IEEE Chapter, GDSC\nCultural: Dance, Music, Drama\nSports: Cricket, Basketball, Volleyball, Badminton\nProfessional: Entrepreneurship Cell, NSS\n\nEvents: Hackathons, Tech Fests, Cultural Fests, Guest Lectures, Alumni Meets`,
  },
  {
    patterns: ['research', 'project', 'publication', 'phd', 'innovation', 'patent'],
    answer: `Research at RNSIT:\n\n• 200+ Research Publications\n• 40+ Patents since 2020\n• 16 MoU with Industries\n• 126 PhDs\n• Research centers in AI, VLSI, Renewable Energy\n• Funded by AICTE, DST, DRDO\n\nFor research queries: research@rnsit.ac.in`,
  },
  {
    patterns: ['contact', 'address', 'location', 'phone', 'email', 'reach', 'map', 'where'],
    answer: `Contact RNSIT:\n\nAddress:\nDr. Vishnuvardhan Road, R R Nagar Post,\nChannasandra, Bengaluru – 560098\n\nPhone: +91 80 2441 0020 / 21\nEmail: admissions@rnsit.ac.in\nWebsite: www.rnsit.ac.in\n\nOffice Hours: Mon – Sat: 9:00 AM – 5:00 PM`,
  },
  {
    patterns: ['naac', 'nba', 'accreditation', 'ranking', 'rank', 'aicte', 'vtu', 'affiliated', 'autonomous'],
    answer: `RNSIT Accreditations:\n\n• NAAC A+ Grade (Highest accreditation)\n• NBA Accredited (Selected programs)\n• AICTE Approved\n• Autonomous Institute under VTU\n• 235 VTU Ranks\n• 8 UG Programs | 2 PG Programs\n• Established: 2001 | 25 years of excellence`,
  },
  {
    patterns: ['scholarship', 'financial aid', 'fee waiver', 'merit'],
    answer: `Scholarships at RNSIT:\n\n• Government scholarships for SC/ST/OBC students\n• Merit-based scholarships for top KCET rankers\n• Management scholarships for deserving students\n• Minority scholarships available\n• Sports quota fee concessions\n\nFor details: admissions@rnsit.ac.in\nPhone: +91 80 2441 0020`,
  },
  {
    patterns: ['vision', 'mission'],
    answer: `RNSIT Vision & Mission:\n\nVision:\nBuilding RNSIT into a World Class Institution\n\nMission:\n• Attract quality students with strong fundamentals\n• Impart value-based, skill-based professional education\n• Promote excellence in Teaching, Research & Consultancy\n• Expose students to emerging frontiers of knowledge\n• Prepare students for Industry, Entrepreneurship & R&D`,
  },
  {
    patterns: ['transport', 'bus', 'how to reach', 'commute'],
    answer: `Transport at RNSIT:\n\nCollege Bus Service covering major Bengaluru areas\n\nBy Road:\n• Located at R R Nagar, Channasandra\n• Near Mysore Road, Bengaluru\n\nFor bus routes: admissions@rnsit.ac.in`,
  },
  {
    patterns: ['thank', 'thanks', 'bye', 'goodbye', 'ok', 'okay', 'great', 'helpful'],
    answer: `You're welcome! Feel free to ask anything else about RNSIT.\n\nPhone: +91 80 2441 0020 / 21\nEmail: admissions@rnsit.ac.in\nWebsite: www.rnsit.ac.in\n\nHave a great day!`,
  },
]

const SUGGESTIONS = [
  'How to apply for admission?',
  'What are the departments?',
  'Placement statistics',
  'Fee structure',
  'Campus facilities',
  'Contact information',
]

function getReply(input) {
  const text = input.toLowerCase().trim()
  for (const item of KB) {
    if (item.patterns.some(p => text.includes(p))) {
      return item.answer
    }
  }
  return `I'm not sure about that specific query. Here's how you can get help:\n\nPhone: +91 80 2441 0020 / 21\nEmail: admissions@rnsit.ac.in\nWebsite: www.rnsit.ac.in\n\nOr try asking about:\n• Admissions, Departments, Placements\n• Fees, Hostel, Facilities, Contact`
}

// ── Components ───────────────────────────────────────────
function Bubble({ msg }) {
  const isBot = msg.role === 'bot'
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1"
          style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent2))' }}>
          <Bot size={13} className="text-white" />
        </div>
      )}
      <div className="max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
        style={isBot ? {
          background: 'var(--surface2, var(--bg-alt))',
          border: '1px solid var(--card-border)',
          color: 'var(--t2)',
          borderTopLeftRadius: '4px',
        } : {
          background: 'linear-gradient(135deg,var(--accent),var(--accent2))',
          color: '#fff',
          borderTopRightRadius: '4px',
        }}>
        {msg.text}
      </div>
      {!isBot && (
        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1"
          style={{ background: 'var(--bg-alt)', border: '1px solid var(--card-border)' }}>
          <User size={13} style={{ color: 'var(--t3)' }} />
        </div>
      )}
    </motion.div>
  )
}

function Typing() {
  return (
    <div className="flex gap-2.5">
      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent2))' }}>
        <Bot size={13} className="text-white" />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center"
        style={{ background: 'var(--surface2, var(--bg-alt))', border: '1px solid var(--card-border)' }}>
        {[0, 1, 2].map(i => (
          <motion.div key={i} className="w-2 h-2 rounded-full"
            style={{ background: 'var(--accent)' }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
        ))}
      </div>
    </div>
  )
}

// ── Main Chatbot ─────────────────────────────────────────
export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm the RNSIT Assistant.\n\nI can help you with admissions, departments, placements, fees, campus facilities, and more.\n\nWhat would you like to know?" }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 300) }, [open])

  const send = (text) => {
    const msg = (text || input).trim()
    if (!msg || typing) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setTyping(true)
    // Simulate natural typing delay
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { role: 'bot', text: getReply(msg) }])
    }, 800 + Math.random() * 600)
  }

  const reset = () => {
    setMessages([{ role: 'bot', text: "Hi! I'm the RNSIT Assistant. How can I help you today?" }])
    setInput('')
  }

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[340px] md:w-[370px] flex flex-col rounded-2xl overflow-hidden"
            style={{ height: '520px', background: 'var(--surface)', border: '1px solid var(--card-border)', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent2))' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">RNSIT Assistant</div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                    <span className="text-white/70 text-xs">Always Online</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={reset} className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white/80 hover:text-white" title="Reset">
                  <RotateCcw size={14} />
                </button>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white/80 hover:text-white">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => <Bubble key={i} msg={m} />)}
              {typing && <Typing />}

              {/* Quick suggestions — show only at start */}
              {messages.length === 1 && !typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                  <p className="text-xs mb-2" style={{ color: 'var(--t4)' }}>Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s, i) => (
                      <button key={i} onClick={() => send(s)}
                        className="text-xs px-3 py-1.5 rounded-full transition-all hover:scale-105"
                        style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid var(--card-border)', color: 'var(--accent)' }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 shrink-0" style={{ borderTop: '1px solid var(--card-border)' }}>
              <div className="flex gap-2 items-center rounded-xl px-3 py-2"
                style={{ background: 'var(--bg-alt, var(--surface2))', border: '1px solid var(--card-border)' }}>
                <input ref={inputRef} type="text" value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="Ask about RNSIT..."
                  className="flex-1 bg-transparent text-sm focus:outline-none"
                  style={{ color: 'var(--t1)' }}
                  disabled={typing}
                />
                <button onClick={() => send()} disabled={!input.trim() || typing}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent2))' }}>
                  <Send size={14} className="text-white" />
                </button>
              </div>
              <p className="text-center text-xs mt-1.5" style={{ color: 'var(--t4)' }}>RNSIT Official Assistant</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button onClick={() => setOpen(p => !p)}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 md:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent2))', boxShadow: '0 4px 24px rgba(249,115,22,0.5)' }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={22} className="text-white" /></motion.div>
            : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={22} className="text-white" /></motion.div>
          }
        </AnimatePresence>
        {!open && (
          <motion.div className="absolute inset-0 rounded-full"
            style={{ border: '2px solid var(--accent)' }}
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity }} />
        )}
      </motion.button>
    </>
  )
}
