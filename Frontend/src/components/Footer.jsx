import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'

const socialLinks = [
  { label: 'FB', href: '#' },
  { label: 'TW', href: '#' },
  { label: 'IG', href: '#' },
  { label: 'LI', href: '#' },
  { label: 'YT', href: '#' },
]

const quickLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Departments', path: '/departments' },
  { label: 'Academics', path: '/academics' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Placements', path: '/placements' },
  { label: 'Research', path: '/research' },
]

const studentLinks = [
  { label: 'Student Portal', path: '/students' },
  { label: 'Campus Life', path: '/campus-life' },
  { label: 'Events', path: '/events' },
  { label: 'Alumni', path: '/alumni' },
  { label: 'Contact', path: '/contact' },
]

export default function Footer() {
  return (
    <footer className="relative" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,var(--accent),transparent)', opacity: 0.4 }} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg animate-pulse-glow"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>R</div>
              <div>
                <div className="font-black text-white text-sm tracking-wider">RNSIT</div>
                <div className="text-xs text-blue-400/60 tracking-widest uppercase">Institute of Technology</div>
              </div>
            </div>
            <p className="text-sm t-m leading-relaxed mb-5">
              RNS Institute of Technology, Bengaluru — Shaping future engineers with excellence in education, research, and innovation since 2001.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold t-b hover:text-blue-400 transition-all"
                  style={{ background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.15)' }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm t-m hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Students</h4>
            <ul className="space-y-2">
              {studentLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm t-m hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Contact</h4>
            <div className="space-y-3">
              <div className="flex gap-3 text-sm t-m">
                <MapPin size={15} className="text-blue-400 mt-0.5 shrink-0" />
                <span>Dr. Vishnuvardhan Road, R.R. Nagar, Bengaluru - 560098</span>
              </div>
              <div className="flex gap-3 text-sm t-m">
                <Phone size={15} className="text-blue-400 shrink-0" />
                <span>+91 80 2860 5555</span>
              </div>
              <div className="flex gap-3 text-sm t-m">
                <Mail size={15} className="text-blue-400 shrink-0" />
                <span>info@rnsit.ac.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t py-6 px-4 md:px-8" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs t-s">
          <p>© 2024 RNS Institute of Technology. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:t-b transition-colors">Privacy Policy</a>
            <a href="#" className="hover:t-b transition-colors">Terms of Use</a>
            <a href="#" className="hover:t-b transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
