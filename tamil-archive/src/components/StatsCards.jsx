import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, AlignJustify, Library, Users } from 'lucide-react';
import { stats } from '../data/literatureData';

function useCounter(target, duration = 1800) {
  const [count, setCount]   = useState(0);
  const started             = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return [count, start];
}

function StatCard({ icon: Icon, label, value, sublabel, color, darkMode, delay }) {
  const ref               = useRef(null);
  const inView            = useInView(ref, { once: true, margin: '-60px' });
  const [count, startCount] = useCounter(typeof value === 'number' ? value : 0);

  useEffect(() => {
    if (inView && typeof value === 'number') startCount();
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay }}
      whileHover={{ y: -5, boxShadow: `0 24px 64px rgba(0,0,0,0.16), 0 0 28px ${color}14` }}
      className={`relative rounded-2xl overflow-hidden cursor-default transition-all duration-300 group ${
        darkMode
          ? 'bg-gradient-to-b from-[#2D2420] to-[#1F1B16] border border-[#D4A017]/12 hover:border-[#D4A017]/24'
          : 'bg-white border border-[#E8D5B5] shadow-md shadow-[#D4A017]/8 hover:border-[#D4A017]/35'
      }`}
      style={{ padding: '2.25rem 2rem' }}
    >
      {/* Corner glow */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-12 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ background: color }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10"
        style={{
          background: `linear-gradient(135deg, ${color}18, ${color}35)`,
          border: `1px solid ${color}40`,
        }}
      >
        <Icon size={22} style={{ color }} />
      </div>

      {/* Value */}
      <div className="relative z-10">
        {typeof value === 'number' ? (
          <p className="text-4xl font-bold font-playfair mb-1" style={{ color }}>
            {count.toLocaleString('ta-IN')}
          </p>
        ) : (
          <p className="text-4xl font-bold font-playfair mb-1" style={{ color }}>
            {value}
          </p>
        )}
        <p className={`font-tamil-serif text-sm font-semibold mt-0.5 ${darkMode ? 'text-[#F5E6CC]/78' : 'text-[#1F1B16]/80'}`}>
          {label}
        </p>
        {sublabel && (
          <p className={`text-[11px] mt-1 tracking-wide ${darkMode ? 'text-[#7A5C43]' : 'text-[#A89070]'}`}>
            {sublabel}
          </p>
        )}
      </div>

      {/* Bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  );
}

export default function StatsCards({ darkMode }) {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true });

  const cardData = [
    { icon: AlignJustify, label: 'இடம்பெற்ற அடிகள்', value: stats.idamPetra, sublabel: 'Lines Indexed',   color: '#D4A017', delay: 0    },
    { icon: BookOpen,     label: 'மொத்த அடிகள்',      value: stats.moththam, sublabel: 'Total Lines',     color: '#6B0F1A', delay: 0.12 },
    { icon: Library,      label: 'செவ்வியல் நூல்கள்', value: 12,             sublabel: 'Classical Works', color: '#B55239', delay: 0.24 },
    { icon: Users,        label: 'ஆசிரியர்கள்',        value: 48,             sublabel: 'Poets & Authors', color: '#7A5C43', delay: 0.36 },
  ];

  return (
    <section
      id="stats"
      ref={sectionRef}
      className={`py-28 lg:py-36 relative ${darkMode ? 'bg-[#1F1B16]' : 'bg-[#F5E6CC]/25'}`}
    >
      <div className="cx">

        {/* Section heading with ornament divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-5 mb-14"
        >
          <div className={`flex-1 h-px ${darkMode ? 'bg-[#D4A017]/18' : 'bg-[#D4A017]/28'}`} />
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-[#D4A017] text-lg">◈</span>
            <h2 className={`font-tamil-serif text-2xl font-bold ${darkMode ? 'text-[#F5E6CC]' : 'text-[#6B0F1A]'}`}>
              புள்ளிவிவரம்
            </h2>
            <span className="text-[#D4A017] text-lg">◈</span>
          </div>
          <div className={`flex-1 h-px ${darkMode ? 'bg-[#D4A017]/18' : 'bg-[#D4A017]/28'}`} />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {cardData.map((card) => (
            <StatCard key={card.label} {...card} darkMode={darkMode} />
          ))}
        </div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.55 }}
          className="max-w-[200px] mx-auto mt-14 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #D4A017, transparent)' }}
        />
      </div>
    </section>
  );
}
