import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, X } from 'lucide-react'

const WELCOME_TEXT =
  'Welcome to RNS Institute of Technology, Bengaluru. ' +
  'A premier engineering institution committed to excellence in education, research, and innovation. ' +
  'Explore our world-class facilities, vibrant campus life, and outstanding placement record. ' +
  'We are glad to have you here.'

export default function VoiceNarrator() {
  const [visible, setVisible] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const uttRef = useRef(null)
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)
  const DURATION = 12000 // ~12s estimated speech duration

  // Only show once per session
  useEffect(() => {
    if (sessionStorage.getItem('narrator_shown')) return
    sessionStorage.setItem('narrator_shown', '1')

    // Small delay so page renders first
    const t = setTimeout(() => setVisible(true), 800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!visible) return
    speak()
    return () => stopSpeech()
  }, [visible])

  const speak = () => {
    if (!window.speechSynthesis || muted) return
    stopSpeech()

    const utt = new SpeechSynthesisUtterance(WELCOME_TEXT)
    utt.rate = 0.92
    utt.pitch = 1.05
    utt.volume = 1

    // Pick a natural-sounding voice if available
    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find(v =>
      /Google US English|Samantha|Karen|Daniel|en-US|en-GB/i.test(v.name)
    )
    if (preferred) utt.voice = preferred

    utt.onstart = () => {
      setSpeaking(true)
      startTimeRef.current = Date.now()
      tickProgress()
    }
    utt.onend = () => {
      setSpeaking(false)
      setProgress(100)
      clearInterval(timerRef.current)
      setTimeout(dismiss, 800)
    }
    utt.onerror = () => setSpeaking(false)

    uttRef.current = utt
    window.speechSynthesis.speak(utt)
  }

  const tickProgress = () => {
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      setProgress(Math.min(99, (elapsed / DURATION) * 100))
    }, 100)
  }

  const stopSpeech = () => {
    window.speechSynthesis?.cancel()
    clearInterval(timerRef.current)
    setSpeaking(false)
  }

  const toggleMute = () => {
    if (speaking) {
      stopSpeech()
      setMuted(true)
    } else {
      setMuted(false)
      speak()
    }
  }

  const dismiss = () => {
    stopSpeech()
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="fixed bottom-6 left-1/2 z-[9999]"
          style={{ transform: 'translateX(-50%)', width: 'min(480px, 92vw)' }}
        >
          <div className="rounded-2xl p-4 shadow-2xl"
            style={{
              background: 'rgba(15,15,20,0.92)',
              border: '1px solid rgba(249,115,22,0.35)',
              backdropFilter: 'blur(18px)',
            }}>

            {/* Top row */}
            <div className="flex items-center gap-3 mb-3">
              {/* Animated mic icon */}
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.4)' }}>
                  <Volume2 size={18} style={{ color: '#f97316' }} />
                </div>
                {speaking && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: '2px solid #f97316', opacity: 0.5 }}
                    animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-bold">RNSIT Voice Narrator</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {speaking ? 'Speaking…' : 'Paused'}
                </div>
              </div>

              {/* Sound bars animation */}
              {speaking && (
                <div className="flex items-end gap-0.5 h-5 shrink-0">
                  {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8].map((h, i) => (
                    <motion.div key={i}
                      className="w-1 rounded-full"
                      style={{ background: '#f97316' }}
                      animate={{ scaleY: [h, 1, h * 0.5, 1, h] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </div>
              )}

              {/* Controls */}
              <button onClick={toggleMute}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110 shrink-0"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
                title={speaking ? 'Mute' : 'Unmute'}>
                {speaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <button onClick={dismiss}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110 shrink-0"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
                title="Dismiss">
                <X size={14} />
              </button>
            </div>

            {/* Scrolling text */}
            <div className="text-xs mb-3 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
              "{WELCOME_TEXT}"
            </div>

            {/* Progress bar */}
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <motion.div className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg,#f97316,#fb923c)', width: `${progress}%` }}
                transition={{ duration: 0.1 }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
