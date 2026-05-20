import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, AlignJustify, Library, Users } from 'lucide-react';
import { stats } from '../data/literatureData';

function useCounter(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return [count, start];
}

function StatCard({ icon: Icon, label, value, sublabel, color, darkMode, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [count, startCount] = useCounter(typeof value === 'number' ? value : 0);

  useEffect(() => {
    if (inView && typeof value === 'number') startCount();
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
      className={`relative rounded-2xl p-7 overflow-hidden cursor-default transition-all duration-300 ${
        darkMode
          ? 'bg-gradient-to-br from-[#2D2420] to-[#1F1B16] border border-[#D4A017]/15'
          : 'bg-white border border-[#E8D5B5] shadow-md shadow-[#D4A017]/10'
      }`}
    >
      {/* Background glow */}
      <div
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl opacity-15"
        style={{ background: color }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
        style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)`, border: `1px solid ${color}44` }}
      >
        <Icon size={22} style={{ color }} />
      </div>

      {/* Value */}
      <div className="relative z-10">
        {typeof value === 'number' ? (
          <motion.p
            className="text-4xl font-bold font-playfair"
            style={{ color }}
          >
            {count.toLocaleString('ta-IN')}
          </motion.p>
        ) : (
          <p className="text-4xl font-bold font-playfair" style={{ color }}>
            {value}
          </p>
        )}
        <p className={`font-tamil-serif text-sm font-semibold mt-1 ${darkMode ? 'text-[#F5E6CC]/80' : 'text-[#1F1B16]/80'}`}>
          {label}
        </p>
        {sublabel && (
          <p className={`text-xs mt-0.5 ${darkMode ? 'text-[#7A5C43]' : 'text-[#A89070]'}`}>
            {sublabel}
          </p>
        )}
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  );
}

export default function StatsCards({ darkMode }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true });

  const cardData = [
    {
      icon: AlignJustify,
      label: 'இடம்பெற்ற அடிகள்',
      value: stats.idamPetra,
      sublabel: 'Lines Indexed',
      color: '#D4A017',
      delay: 0,
    },
    {
      icon: BookOpen,
      label: 'மொத்த அடிகள்',
      value: stats.moththam,
      sublabel: 'Total Lines',
      color: '#6B0F1A',
      delay: 0.12,
    },
    {
      icon: Library,
      label: 'செவ்வியல் நூல்கள்',
      value: 12,
      sublabel: 'Classical Works',
      color: '#B55239',
      delay: 0.24,
    },
    {
      icon: Users,
      label: 'ஆசிரியர்கள்',
      value: 48,
      sublabel: 'Poets & Authors',
      color: '#7A5C43',
      delay: 0.36,
    },
  ];

  return (
    <section
      id="stats"
      ref={sectionRef}
      className={`py-20 px-4 relative ${darkMode ? 'bg-[#1F1B16]' : 'bg-[#F5E6CC]/30'}`}
    >
      {/* Section divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-4 max-w-7xl mx-auto mb-10"
      >
        <div className={`flex-1 h-px ${darkMode ? 'bg-[#D4A017]/20' : 'bg-[#D4A017]/30'}`} />
        <div className="flex items-center gap-3">
          <span className="text-[#D4A017] text-lg">◈</span>
          <h2 className={`font-tamil-serif text-2xl font-bold ${darkMode ? 'text-[#F5E6CC]' : 'text-[#6B0F1A]'}`}>
            புள்ளிவிவரம்
          </h2>
          <span className="text-[#D4A017] text-lg">◈</span>
        </div>
        <div className={`flex-1 h-px ${darkMode ? 'bg-[#D4A017]/20' : 'bg-[#D4A017]/30'}`} />
      </motion.div>

      {/* Cards grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card) => (
          <StatCard key={card.label} {...card} darkMode={darkMode} />
        ))}
      </div>

      {/* Bottom ornament */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-xs mx-auto mt-10 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D4A017, transparent)' }}
      />
    </section>
  );
}
