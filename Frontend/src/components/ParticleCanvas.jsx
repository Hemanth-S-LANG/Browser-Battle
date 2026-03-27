import { useEffect, useRef } from 'react'

export default function ParticleCanvas({ darkMode }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 180; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.25 + 0.04,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const color = darkMode ? '180, 210, 255' : '59, 130, 246'
      const baseOpacity = darkMode ? 0.7 : 0.25

      particles.forEach(p => {
        p.twinkle += p.twinkleSpeed
        const alpha = p.alpha * baseOpacity * (0.5 + 0.5 * Math.sin(p.twinkle))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${alpha})`
        ctx.fill()
        p.y -= p.speed
        if (p.y < -2) { p.y = canvas.height + 2; p.x = Math.random() * canvas.width }
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [darkMode])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
