import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Departments', path: '/departments' },
  { label: 'Academics', path: '/academics' },
  { label: 'Admissions', path: '/admissions' },
  {
    label: 'More', path: '#',
    children: [
      { label: 'Placements', path: '/placements' },
      { label: 'Research', path: '/research' },
      { label: 'Campus Life', path: '/campus-life' },
      { label: 'Events', path: '/events' },
      { label: 'Alumni', path: '/alumni' },
      { label: 'Students', path: '/students' },
    ]
  },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdown, setDropdown] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMobileOpen(false), [location])

  const linkStyle = (path) => ({
    color: location.pathname === path ? 'var(--accent)' : 'var(--t2)',
  })

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 't-nav shadow-sm' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg animate-pulse-glow"
              style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent2))' }}>R</div>
            <div className="hidden sm:block">
              <div className="font-black text-sm tracking-wider" style={{ color: 'var(--t1)' }}>RNSIT</div>
              <div className="text-xs tracking-widest uppercase" style={{ color: 'var(--t3)' }}>Institute of Technology</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link =>
              link.children ? (
                <div key={link.label} className="relative"
                  onMouseEnter={() => setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}>
                  <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-blue-500/10"
                    style={{ color: 'var(--t2)' }}>
                    {link.label} <ChevronDown size={13} />
                  </button>
                  <AnimatePresence>
                    {dropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-48 rounded-xl overflow-hidden shadow-xl"
                        style={{ background: 'var(--surface)', border: '1px solid var(--card-border)' }}
                      >
                        {link.children.map(child => (
                          <Link key={child.path} to={child.path}
                            className="block px-4 py-2.5 text-sm transition-colors hover:bg-blue-500/10"
                            style={{ color: 'var(--t2)', borderBottom: '1px solid var(--border)' }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.path} to={link.path}
                  className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-blue-500/10"
                  style={linkStyle(link.path)}
                >
                  {location.pathname === link.path && (
                    <motion.span layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(37,99,235,0.08)' }} />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg transition-colors hover:bg-blue-500/10"
              style={{ color: 'var(--t3)' }}>
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <Link to="/admissions" className="btn-primary hidden md:flex items-center text-sm px-4 py-2">
              Apply Now
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors hover:bg-blue-500/10"
              style={{ color: 'var(--t3)' }}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link =>
                link.children ? (
                  <div key={link.label}>
                    <div className="px-3 py-2 text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--t4)' }}>{link.label}</div>
                    {link.children.map(child => (
                      <Link key={child.path} to={child.path}
                        className="block px-6 py-2 text-sm rounded-lg transition-colors hover:bg-blue-500/10"
                        style={{ color: 'var(--t2)' }}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link key={link.path} to={link.path}
                    className="block px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-blue-500/10"
                    style={linkStyle(link.path)}>
                    {link.label}
                  </Link>
                )
              )}
              <Link to="/admissions" className="btn-primary block text-center text-sm mt-3">Apply Now</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
