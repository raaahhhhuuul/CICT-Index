import { motion } from 'framer-motion';

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  size: 10 + (i % 4) * 2.5,
  x: (i * 6.25 + 4) % 100,
  y: (i * 11.8 + 6) % 100,
  delay: (i * 0.3) % 4,
  duration: 6 + (i % 3) * 1.5,
  char: ['ம', 'த', 'ழ', 'க', 'அ', 'ஆ', 'இ', 'உ'][i % 8],
  op: 0.08 + (i % 4) * 0.03,
}));

export default function Hero({ darkMode, onCTAClick }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen manuscript-noise"
      style={{
        background: darkMode
          ? 'linear-gradient(155deg, #0D0A07 0%, #1A1510 25%, #2C1E0D 55%, #3B1808 100%)'
          : 'linear-gradient(155deg, #2A0810 0%, #580D16 30%, #781C14 65%, #9C4030 100%)',
        overflow: 'clip',
      }}
    >
      {/* Kolam dot pattern */}
      <div className="absolute inset-0 kolam-bg opacity-20 pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 46%, rgba(212,160,23,0.10) 0%, transparent 68%)' }}
      />

      {/* Top gold line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #D4A017 28%, #FFD54F 50%, #D4A017 72%, transparent 100%)' }}
      />

      {/* Floating Tamil particles — clipped in own layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="absolute font-tamil-serif select-none"
            style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size, color: `rgba(212,160,23,${p.op})` }}
            animate={{ y: [0, -16, 0], opacity: [p.op, p.op * 2.5, p.op] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            {p.char}
          </motion.span>
        ))}
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-5 sm:px-8 pt-24 pb-20">
        <div className="w-full max-w-[860px] mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[#D4A017]/28 px-8 py-3 mb-12"
            style={{ backgroundColor: 'rgba(212,160,23,0.06)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017] animate-pulse flex-shrink-0 ml-2" />
            <span
              className="text-[#D4A017]/90 font-medium uppercase tracking-[0.22em] leading-normal"
              style={{ fontSize: 'clamp(10.5px, 1.2vw, 12.5px)' }}
            >
              Classical Tamil Literature Archive
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017] animate-pulse flex-shrink-0 mr-2" />
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-tamil-serif font-bold mb-10 leading-[1.45]"
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 4.8rem)',
              background: 'linear-gradient(135deg, #FFE082 0%, #D4A017 30%, #FFD54F 60%, #B8860B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 36px rgba(212,160,23,0.26))',
              wordBreak: 'keep-all',
              overflowWrap: 'break-word',
              paddingTop: '0.15em',
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
            transition={{ delay: 0.75, duration: 0.9 }}
            className="flex items-center justify-center gap-5 mb-10"
          >
            <div className="h-px w-20 sm:w-32" style={{ background: 'linear-gradient(90deg, transparent, #D4A017)' }} />
            <span className="text-[#D4A017] text-xl flex-shrink-0" style={{ filter: 'drop-shadow(0 0 8px rgba(212,160,23,0.55))' }}>❋</span>
            <div className="h-px w-20 sm:w-32" style={{ background: 'linear-gradient(90deg, #D4A017, transparent)' }} />
          </motion.div>

          {/* Institution */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="font-tamil-serif text-[#F5E6CC]/72 mb-2"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', lineHeight: 1.5 }}
          >
            செம்மொழித் தமிழாய்வு மத்திய நிறுவனம்
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="text-[#D4A017]/45 uppercase mb-16"
            style={{ fontSize: 'clamp(10.5px, 1.1vw, 12px)', letterSpacing: '0.3em' }}
          >
            Central Institute of Classical Tamil
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="flex items-center justify-center gap-4 sm:gap-5 flex-wrap"
          >
            {onCTAClick ? (
              <motion.button
                onClick={onCTAClick}
                whileHover={{ scale: 1.04, boxShadow: '0 0 48px rgba(212,160,23,0.55), 0 12px 44px rgba(0,0,0,0.35)' }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full font-bold font-tamil-serif text-[#1A1408] tracking-wide min-h-[56px]"
                style={{
                  background: 'linear-gradient(135deg, #C49010 0%, #FFD54F 45%, #D4A017 100%)',
                  boxShadow: '0 4px 28px rgba(212,160,23,0.28)',
                  fontSize: 'clamp(13px, 1.3vw, 15px)',
                  padding: 'clamp(14px, 1.5vw, 18px) clamp(32px, 4vw, 56px)',
                }}
              >
                தேடல் தொடங்கு
              </motion.button>
            ) : (
              <motion.a
                href="#search"
                whileHover={{ scale: 1.04, boxShadow: '0 0 48px rgba(212,160,23,0.55), 0 12px 44px rgba(0,0,0,0.35)' }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full font-bold font-tamil-serif text-[#1A1408] tracking-wide min-h-[56px] flex items-center"
                style={{
                  background: 'linear-gradient(135deg, #C49010 0%, #FFD54F 45%, #D4A017 100%)',
                  boxShadow: '0 4px 28px rgba(212,160,23,0.28)',
                  fontSize: 'clamp(13px, 1.3vw, 15px)',
                  padding: 'clamp(14px, 1.5vw, 18px) clamp(32px, 4vw, 56px)',
                }}
              >
                தேடல் தொடங்கு
              </motion.a>
            )}

            <motion.a
              href="#features"
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(212,160,23,0.08)', borderColor: 'rgba(212,160,23,0.6)' }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full font-semibold font-tamil-serif text-[#D4A017] transition-all duration-300 min-h-[56px] flex items-center"
              style={{
                border: '1px solid rgba(212,160,23,0.35)',
                fontSize: 'clamp(13px, 1.3vw, 15px)',
                padding: 'clamp(14px, 1.5vw, 18px) clamp(32px, 4vw, 56px)',
              }}
            >
              மேலும் அறிக
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.6 }}
            className="mt-20 sm:mt-24 flex flex-col items-center gap-3"
          >
            <span className="text-[#D4A017]/32 uppercase tracking-[0.42em]" style={{ fontSize: '10.5px' }}>
              கீழே செல்க
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-5 h-8 rounded-full border border-[#D4A017]/20 flex items-start justify-center pt-1.5"
            >
              <motion.div
                animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-2 rounded-full bg-[#D4A017]/50"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: darkMode
            ? 'linear-gradient(to bottom, transparent 0%, #1F1B16 100%)'
            : 'linear-gradient(to bottom, transparent 0%, #FAF6EF 100%)',
        }}
      />
    </section>
  );
}
