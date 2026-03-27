import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, X } from 'lucide-react'

const WELCOME_TEXT =
  'Welcome to RNS Institute of Technology, Bengaluru. ' +
  'A premier engineering institution committed to excellence in education, research, and innovation. ' +
  'Explore our world-class facilities, vibrant campus life, and outstanding placement record. ' +
  'We are glad to have you here.'

const DURATION = 13000

export default function VoiceNarrator() {
  const [visible, setVisible] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)
  const hasSpoken = useRef(false) // guard against StrictMode double-fire

  useEffect(() => {
    if (sessionStorage.getItem('narrator_shown')) return
    sessionStorage.setItem('narrator_shown', '1')
    const t = setTimeout(() => setVisible(true), 900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!visible) return
    if (hasSpoken.current) return
    hasSpoken.current = true

    // Voices may not be ready yet in Chrome — wait for them
    const doSpeak = () => {
      const synth = window.speechSynthesis
      if (!synth) return

      synth.cancel()

      const utt = new SpeechSynthesisUtterance(WELCOME_TEXT)
      utt.rate = 0.9
      utt.pitch = 1.05
      utt.volume = 1

      const voices = synth.getVoices()
      const preferred = voices.find(v =>
        /Google US English|Samantha|Karen|Daniel/i.test(v.name)
      ) || voices.find(v => /en-US|en-GB/i.test(v.lang))
      if (preferred) utt.voice = preferred

      utt.onstart = () => {
        setSpeaking(true)
        startTimeRef.current = Date.now()
        timerRef.current = setInterval(() => {
          const pct = Math.min(99, ((Date.now() - startTimeRef.current) / DURATION) * 100)
          setProgress(pct)
        }, 120)
      }

      utt.onend = () => {
        setSpeaking(false)
        setProgress(100)
        clearInterval(timerRef.current)
        setTimeout(() => setVisible(false), 900)
      }

      utt.onerror = () => {
        setSpeaking(false)
        clearInterval(timerRef.current)
      }

      synth.speak(utt)
    }

    // If voices already loaded, speak immediately; otherwise wait
    if (window.speechSynthesis.getVoices().length > 0) {
      doSpeak()
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', doSpeak, { once: true })
    }

    return () => {
      window.speechSynthesis?.cancel()
      clearInterval(timerRef.current)
    }
  }, [visible])

  const dismiss = () => {
    window.speechSynthesis?.cancel()
    clearInterval(timerRef.current)
    setSpeaking(false)
    setVisible(false)
  }

  const toggleMute = () => {
    if (speaking) {
      window.speechSynthesis?.cancel()
      clearInterval(timerRef.current)
      setSpeaking(false)
    } else {
      // re-speak
      hasSpoken.current = false
      setProgress(0)
      const synth = window.speechSynthesis
      const utt = new SpeechSynthesisUtterance(WELCOME_TEXT)
      utt.rate = 0.9; utt.pitch = 1.05; utt.volume = 1
      const voices = synth.getVoices()
      const preferred = voices.find(v => /Google US English|Samantha|Karen|Daniel/i.test(v.name))
        || voices.find(v => /en-US|en-GB/i.test(v.lang))
      if (preferred) utt.voice = preferred
      utt.onstart = () => {
        setSpeaking(true)
        startTimeRef.current = Date.now()
        timerRef.current = setInterval(() => {
          setProgress(Math.min(99, ((Date.now() - startTimeRef.current) / DURATION) * 100))
        }, 120)
      }
      utt.onend = () => {
        setSpeaking(false); setProgress(100)
        clearInterval(timerRef.current)
        setTimeout(() => setVisible(false), 900)
      }
      utt.onerror = () => { setSpeaking(false); clearInterval(timerRef.current) }
      synth.speak(utt)
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 70 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="fixed bottom-6 left-1/2 z-[9999]"
          style={{ transform: 'translateX(-50%)', width: 'min(480px, 92vw)' }}
        >
          <div className="rounded-2xl p-4 shadow-2xl"
            style={{
              background: 'rgba(12,12,18,0.94)',
              border: '1px solid rgba(249,115,22,0.4)',
              backdropFilter: 'blur(20px)',
            }}>

            {/* Top row */}
            <div className="flex items-center gap-3 mb-3">
              {/* Icon with pulse */}
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.45)' }}>
                  <Volume2 size={18} style={{ color: '#f97316' }} />
                </div>
                {speaking && (
                  <motion.div className="absolute inset-0 rounded-full"
                    style={{ border: '2px solid #f97316' }}
                    animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-bold">RNSIT Voice Narrator</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {speaking ? 'Speaking…' : 'Ready'}
                </div>
              </div>

              {/* Sound bars */}
              {speaking && (
                <div className="flex items-end gap-[3px] h-5 shrink-0">
                  {[0.4, 0.8, 1, 0.6, 0.9, 0.5, 0.75].map((h, i) => (
                    <motion.div key={i} className="w-[3px] rounded-full"
                      style={{ background: '#f97316', height: '100%', originY: 1 }}
                      animate={{ scaleY: [h, 1, h * 0.4, 0.9, h] }}
                      transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.09 }} />
                  ))}
                </div>
              )}

              <button onClick={toggleMute}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:scale-110 transition-all shrink-0"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
                title={speaking ? 'Stop' : 'Replay'}>
                {speaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <button onClick={dismiss}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:scale-110 transition-all shrink-0"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
                title="Dismiss">
                <X size={14} />
              </button>
            </div>

            {/* Text */}
            <div className="text-xs mb-3 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.55)', fontStyle: 'italic' }}>
              "{WELCOME_TEXT}"
            </div>

            {/* Progress bar */}
            <div className="h-1 w-full rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.08)' }}>
              <motion.div className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg,#f97316,#fb923c)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.12 }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
