import { motion } from 'framer-motion'

export default function PageHero({ title, subtitle, breadcrumb }) {
  return (
    <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--hero)' }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(ellipse, #3b82f6, transparent)' }} />
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 text-center px-4">
        {breadcrumb && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: 'var(--t3)' }}
          >
            {breadcrumb}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black mb-3 text-gradient"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-base max-w-xl mx-auto"
            style={{ color: 'var(--t2)' }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }} />
    </div>
  )
}
