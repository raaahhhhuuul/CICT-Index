import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: 4 + Math.random() * 8,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 4 + Math.random() * 4,
  char: ['ம', 'த', 'ழ', 'க', 'அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ண'][Math.floor(Math.random() * 10)],
}));

export default function Hero({ darkMode }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden manuscript-noise"
      style={{
        background: darkMode
          ? 'linear-gradient(135deg, #0D0A07 0%, #1F1B16 30%, #2D1F0E 60%, #3D1A0A 100%)'
          : 'linear-gradient(135deg, #3D0B13 0%, #6B0F1A 35%, #8B3A1A 65%, #B55239 100%)',
      }}
    >
      {/* Decorative background layers */}
      <div className="absolute inset-0 kolam-bg opacity-30" />

      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(212,160,23,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Floating Tamil letter particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute font-tamil-serif select-none pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size,
            color: 'rgba(212,160,23,0.25)',
          }}
          animate={{
            y: [0, -22, 0],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {p.char}
        </motion.div>
      ))}

      {/* Top ornamental border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, transparent, #D4A017, #FFD54F, #D4A017, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-10 sm:px-16 lg:px-24 max-w-5xl mx-auto" style={{ marginTop: '-80px' }}>
        {/* Institution badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="inline-flex items-center gap-3 rounded-full border border-[#D4A017]/40 bg-[#D4A017]/10 mb-16"
          style={{ padding: '18px 52px' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017] animate-pulse" />
          <span className="text-[#D4A017] text-xs font-medium tracking-widest uppercase">
            Classical Tamil Literature Archive
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017] animate-pulse" />
        </motion.div>

        {/* Main Tamil title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-tamil-serif font-bold leading-tight mb-4"
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 3.8rem)',
            background: 'linear-gradient(135deg, #FFD54F 0%, #D4A017 40%, #FFD54F 70%, #B8860B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 20px rgba(212,160,23,0.4))',
          }}
        >
          இணையவழிச் செவ்வியல்
          <br />
          தமிழ்த் தேடறைவு
        </motion.h1>

        {/* Ornamental divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex items-center justify-center gap-3 my-5"
        >
          <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(90deg, transparent, #D4A017)' }} />
          <span className="text-[#D4A017] text-xl">❋</span>
          <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(90deg, #D4A017, transparent)' }} />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="font-tamil-serif text-[#F5E6CC]/85 mb-2"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)' }}
        >
          செம்மொழித் தமிழாய்வு மத்திய நிறுவனம்
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="text-[#D4A017]/70 text-sm tracking-widest mb-10"
        >
          Central Institute of Classical Tamil
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex items-center justify-center gap-10 flex-wrap"
        >
          <motion.a
            href="#search"
            whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(212,160,23,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full text-sm font-semibold font-tamil-serif text-[#1F1B16] cursor-pointer tracking-wide"
            style={{ background: 'linear-gradient(135deg, #D4A017, #FFD54F, #D4A017)', padding: '22px 64px' }}
          >
            தேடல் தொடங்கு
          </motion.a>
          <motion.a
            href="#results"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full text-sm font-semibold font-tamil-serif border border-[#D4A017]/50 text-[#D4A017] hover:bg-[#D4A017]/10 transition-colors cursor-pointer tracking-wide"
            style={{ padding: '22px 64px' }}
          >
            முடிவுகள் காண்க
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="mt-14 flex flex-col items-center gap-2"
        >
          <span className="text-[#D4A017]/50 text-xs tracking-wider">கீழே செல்க</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-[#D4A017]/30 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-[#D4A017]/60" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: darkMode
            ? 'linear-gradient(to bottom, transparent, #1F1B16)'
            : 'linear-gradient(to bottom, transparent, #FAF6EF)',
        }}
      />
    </section>
  );
}
