import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Departments from './pages/Departments'
import DepartmentDetail from './pages/DepartmentDetail'
import Academics from './pages/Academics'
import Admissions from './pages/Admissions'
import Placements from './pages/Placements'
import Research from './pages/Research'
import CampusLife from './pages/CampusLife'
import Events from './pages/Events'
import Alumni from './pages/Alumni'
import Contact from './pages/Contact'
import Students from './pages/Students'
import ScrollToTop from './components/ScrollToTop'
import ParticleCanvas from './components/ParticleCanvas'

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  return (
    <div className={darkMode ? 'dark' : ''}>
      <BrowserRouter>
        <ParticleCanvas darkMode={darkMode} />
        <ScrollToTop />
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/departments/:id" element={<DepartmentDetail />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/research" element={<Research />} />
            <Route path="/campus-life" element={<CampusLife />} />
            <Route path="/events" element={<Events />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/students" element={<Students />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  )
}
