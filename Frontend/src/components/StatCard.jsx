import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, end, duration])

  return { count, start: () => setStarted(true) }
}

export default function StatCard({ value, label, suffix = '+' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const { count, start } = useCountUp(value)

  useEffect(() => {
    if (inView) start()
  }, [inView])

  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-4xl md:text-5xl font-bold text-gradient mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">{label}</div>
    </div>
  )
}
