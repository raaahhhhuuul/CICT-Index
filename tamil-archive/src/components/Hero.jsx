import { motion } from 'framer-motion';

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 9 + (i % 4) * 3,
  x: (i * 5.56 + 3) % 100,
  y: (i * 11.8 + 7) % 100,
  delay: (i * 0.28) % 4,
  duration: 5 + (i % 4),
  char: ['ம', 'த', 'ழ', 'க', 'அ', 'ஆ', 'இ', 'உ', 'ண'][i % 9],
  op: 0.1 + (i % 4) * 0.04,
}));

export default function Hero({ darkMode, onCTAClick }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden manuscript-noise"
      style={{
        background: darkMode
          ? 'linear-gradient(155deg, #0D0A07 0%, #1A1510 25%, #2C1E0D 55%, #3B1808 100%)'
          : 'linear-gradient(155deg, #2A0810 0%, #580D16 30%, #781C14 65%, #9C4030 100%)',
      }}
    >
      <div className="absolute inset-0 kolam-bg opacity-20 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 42%, rgba(212,160,23,0.09) 0%, transparent 68%)' }}
      />

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #D4A017 30%, #FFD54F 50%, #D4A017 70%, transparent 100%)' }}
      />

      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute font-tamil-serif select-none pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size, color: `rgba(212,160,23,${p.op})` }}
          animate={{ y: [0, -18, 0], opacity: [p.op, p.op * 2.8, p.op] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {p.char}
        </motion.span>
      ))}

      <div
        className="relative z-10 text-center px-6 sm:px-10 lg:px-12 max-w-4xl mx-auto w-full"
        style={{ marginTop: '-64px' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-[#D4A017]/30 px-5 py-2.5 mb-10"
          style={{ backgroundColor: 'rgba(212,160,23,0.07)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017] animate-pulse flex-shrink-0" />
          <span className="text-[#D4A017] text-[10.5px] font-medium tracking-[0.22em] uppercase leading-none">
            Classical Tamil Literature Archive
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017] animate-pulse flex-shrink-0" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-tamil-serif font-bold mb-8"
          style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 4.6rem)',
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #FFE082 0%, #D4A017 35%, #FFD54F 65%, #B8860B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 32px rgba(212,160,23,0.28))',
          }}
        >
          இணையவழிச் செவ்வியல்
          <br />
          தமிழ்த் தேடறைவு
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.75, duration: 0.9 }}
          className="flex items-center justify-center gap-4 mb-9"
        >
          <div className="h-px w-24 sm:w-32" style={{ background: 'linear-gradient(90deg, transparent, #D4A017)' }} />
          <span className="text-[#D4A017] text-xl" style={{ filter: 'drop-shadow(0 0 8px rgba(212,160,23,0.55))' }}>❋</span>
          <div className="h-px w-24 sm:w-32" style={{ background: 'linear-gradient(90deg, #D4A017, transparent)' }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="font-tamil-serif text-[#F5E6CC]/78 mb-2.5"
          style={{ fontSize: 'clamp(1rem, 2.2vw, 1.28rem)', lineHeight: 1.5 }}
        >
          செம்மொழித் தமிழாய்வு மத்திய நிறுவனம்
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="text-[#D4A017]/50 text-[11px] tracking-[0.3em] uppercase mb-14"
        >
          Central Institute of Classical Tamil
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap"
        >
          {onCTAClick ? (
            <motion.button
              onClick={onCTAClick}
              whileHover={{ scale: 1.04, boxShadow: '0 0 44px rgba(212,160,23,0.5), 0 10px 40px rgba(0,0,0,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full text-[13px] font-bold font-tamil-serif text-[#1A1408] tracking-wide px-12 sm:px-16 py-4 sm:py-5"
              style={{ background: 'linear-gradient(135deg, #C49010 0%, #FFD54F 45%, #D4A017 100%)', boxShadow: '0 4px 24px rgba(212,160,23,0.25)' }}
            >
              தேடல் தொடங்கு
            </motion.button>
          ) : (
            <motion.a
              href="#search"
              whileHover={{ scale: 1.04, boxShadow: '0 0 44px rgba(212,160,23,0.5), 0 10px 40px rgba(0,0,0,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full text-[13px] font-bold font-tamil-serif text-[#1A1408] tracking-wide px-12 sm:px-16 py-4 sm:py-5"
              style={{ background: 'linear-gradient(135deg, #C49010 0%, #FFD54F 45%, #D4A017 100%)', boxShadow: '0 4px 24px rgba(212,160,23,0.25)' }}
            >
              தேடல் தொடங்கு
            </motion.a>
          )}
          <motion.a
            href="#features"
            whileHover={{ scale: 1.03, backgroundColor: 'rgba(212,160,23,0.09)', borderColor: 'rgba(212,160,23,0.65)' }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full text-[13px] font-semibold font-tamil-serif border text-[#D4A017] px-12 sm:px-16 py-4 sm:py-5 transition-all duration-300"
            style={{ borderColor: 'rgba(212,160,23,0.38)' }}
          >
            மேலும் அறிக
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.6 }}
          className="mt-20 flex flex-col items-center gap-2.5"
        >
          <span className="text-[#D4A017]/38 text-[10px] tracking-[0.4em] uppercase">கீழே செல்க</span>
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-[#D4A017]/22 flex items-start justify-center pt-1.5"
          >
            <motion.div
              animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-[#D4A017]/55"
            />
          </motion.div>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: darkMode
            ? 'linear-gradient(to bottom, transparent 0%, #1F1B16 100%)'
            : 'linear-gradient(to bottom, transparent 0%, #FAF6EF 100%)',
        }}
      />
    </section>
  );
}
