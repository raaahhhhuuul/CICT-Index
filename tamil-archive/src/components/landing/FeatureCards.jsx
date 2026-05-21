import { motion } from 'framer-motion';
import { Search, BookOpen, AlignLeft, Library } from 'lucide-react';

const features = [
  {
    icon: Search,
    tamilChar: 'தே',
    title: 'சொல் தேடல்',
    subtitle: 'Intelligent Word Search',
    description: 'செவ்வியல் தமிழ் நூல்களில் எந்த சொல்லையும் வேகமாகவும் துல்லியமாகவும் தேடி கண்டுபிடிக்கவும்.',
    color: '#D4A017',
    delay: 0,
  },
  {
    icon: BookOpen,
    tamilChar: 'நூ',
    title: 'பல நூல்கள்',
    subtitle: 'Multiple Classical Works',
    description: 'திருக்குறள், சிலப்பதிகாரம், புறநானூறு, நற்றிணை உட்பட 12+ செவ்வியல் நூல்கள் ஒரே இடத்தில்.',
    color: '#9B2335',
    delay: 0.08,
  },
  {
    icon: AlignLeft,
    tamilChar: 'சொ',
    title: 'சந்தி பகுப்பு',
    subtitle: 'Sandhi Analysis',
    description: 'சொற்களின் சந்திப்பிரித்த மற்றும் சொல்பிரித்த வடிவங்களை ஒப்பீட்டு ஆராயவும்.',
    color: '#B55239',
    delay: 0.16,
  },
  {
    icon: Library,
    tamilChar: 'ஆர்',
    title: 'டிஜிட்டல் தேடறைவு',
    subtitle: 'Digital Archive',
    description: 'செம்மொழித் தமிழின் டிஜிட்டல் பாதுகாப்பு — ஆராய்ச்சியாளர்களுக்கும் மாணவர்களுக்கும்.',
    color: '#8A6A52',
    delay: 0.24,
  },
];

const stats = [
  { value: '12+',  label: 'செவ்வியல் நூல்கள்', sub: 'Classical Works' },
  { value: '48+',  label: 'ஆசிரியர்கள்',        sub: 'Poets & Authors' },
  { value: '10K+', label: 'அடிகள்',              sub: 'Lines Indexed'  },
  { value: '100%', label: 'இலவசம்',              sub: 'Free Access'    },
];

export default function FeatureCards({ darkMode }) {
  return (
    <section
      id="features"
      className="relative overflow-hidden"
      style={{
        background: darkMode
          ? 'linear-gradient(180deg, #1A1510 0%, #1F1B16 100%)'
          : 'linear-gradient(180deg, #F0E4CE 0%, #FAF6EF 100%)',
        paddingTop: 'clamp(4rem, 6vw, 5.5rem)',
        paddingBottom: 'clamp(0rem, 0vw, 0rem)',
      }}
    >
      {/* Subtle kolam dot texture */}
      <div className="absolute inset-0 kolam-bg opacity-10 pointer-events-none" />

      <div className="cx relative z-10">

        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-12"
        >
          <p className={`text-[11px] tracking-[0.38em] uppercase mb-3 font-semibold ${darkMode ? 'text-[#D4A017]/50' : 'text-[#B55239]/60'}`}>
            Platform Features
          </p>
          <h2
            className={`font-tamil-serif font-bold mb-4 ${darkMode ? 'text-[#F5E6CC]' : 'text-[#6B0F1A]'}`}
            style={{ fontSize: 'clamp(1.65rem, 3vw, 2.5rem)', lineHeight: 1.15 }}
          >
            சிறப்பு அம்சங்கள்
          </h2>
          {/* Ornament rule */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 sm:w-20" style={{ background: 'linear-gradient(90deg, transparent, #D4A017)' }} />
            <span className="text-[#D4A017]" style={{ fontSize: '1rem', filter: 'drop-shadow(0 0 5px rgba(212,160,23,0.48))' }}>❋</span>
            <div className="h-px w-12 sm:w-20" style={{ background: 'linear-gradient(90deg, #D4A017, transparent)' }} />
          </div>
          <p
            className={`font-tamil-serif leading-relaxed whitespace-nowrap mx-auto text-center ${darkMode ? 'text-[#F5E6CC]/42' : 'text-[#7A5C43]'}`}
            style={{ fontSize: '0.8125rem' }}
          >
            செம்மொழித் தமிழ் இலக்கியங்களை டிஜிட்டல் வழியில் எளிதாக ஆராய உதவும் நவீன கருவிகள்
          </p>
        </motion.div>

        {/* ── Feature cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {features.map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: f.delay }}
              whileHover={{ y: -5, boxShadow: `0 20px 52px rgba(0,0,0,0.18), 0 0 24px ${f.color}14` }}
              className={`relative rounded-xl overflow-hidden flex flex-col transition-all duration-300 group ${
                darkMode
                  ? 'bg-[#252018] border border-[#D4A017]/10 hover:border-[#D4A017]/20'
                  : 'bg-white border border-[#E8D5B5]/70 shadow-md shadow-[#D4A017]/6 hover:border-[#D4A017]/28'
              }`}
              style={{ padding: '1.75rem 1.75rem 1.625rem' }}
            >
              {/* Corner glow */}
              <div
                className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-3xl opacity-[0.06] group-hover:opacity-[0.11] transition-opacity duration-400 pointer-events-none"
                style={{ background: f.color }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0 relative z-10"
                style={{
                  background: `linear-gradient(135deg, ${f.color}12, ${f.color}28)`,
                  border: `1px solid ${f.color}35`,
                }}
              >
                <f.icon size={19} style={{ color: f.color }} />
              </div>

              {/* Ghost character — restrained size */}
              <div
                className="absolute bottom-2 right-3 font-tamil-serif font-bold select-none pointer-events-none opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-300"
                style={{ fontSize: '4rem', color: f.color, lineHeight: 1 }}
              >
                {f.tamilChar}
              </div>

              {/* Text */}
              <div className="relative z-10 flex-1 flex flex-col">
                <h3
                  className="font-tamil-serif font-bold mb-1 leading-snug"
                  style={{ fontSize: '1.0rem', color: f.color }}
                >
                  {f.title}
                </h3>
                <p className={`text-[11px] tracking-[0.18em] uppercase mb-3 font-semibold ${darkMode ? 'text-[#7A5C43]' : 'text-[#A89070]'}`}>
                  {f.subtitle}
                </p>
                <p
                  className={`font-tamil-serif leading-[1.75] flex-1 ${darkMode ? 'text-[#F5E6CC]/45' : 'text-[#7A5C43]'}`}
                  style={{ fontSize: '0.875rem' }}
                >
                  {f.description}
                </p>
              </div>

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-450 origin-left"
                style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Thin ornament separator ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className={`flex-1 h-px ${darkMode ? 'bg-[#D4A017]/10' : 'bg-[#D4A017]/18'}`} />
          <span className={`text-xs font-tamil-serif ${darkMode ? 'text-[#D4A017]/30' : 'text-[#D4A017]/45'}`}>◈</span>
          <div className={`flex-1 h-px ${darkMode ? 'bg-[#D4A017]/10' : 'bg-[#D4A017]/18'}`} />
        </motion.div>

      </div>

      {/* ── Stats banner — flush to footer, no gap ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.15 }}
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, #251C14 0%, #1A1510 100%)'
            : 'linear-gradient(135deg, #5A0D16 0%, #3A0B10 100%)',
        }}
      >
        {/* Top micro-line */}
        <div
          className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,160,23,0.35), transparent)' }}
        />

        <div className="cx py-10 sm:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.45 }}
                className="text-center"
              >
                <p
                  className="font-playfair font-bold leading-none mb-2"
                  style={{
                    fontSize: 'clamp(1.7rem, 2.8vw, 2.2rem)',
                    color: '#FFD54F',
                    filter: 'drop-shadow(0 0 10px rgba(212,160,23,0.38))',
                  }}
                >
                  {stat.value}
                </p>
                <p className="font-tamil-serif text-sm font-semibold text-white/80 mb-0.5">{stat.label}</p>
                <p className="text-[10.5px] text-white/32 tracking-[0.18em] uppercase">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
}
