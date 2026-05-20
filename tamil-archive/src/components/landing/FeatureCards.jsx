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
    delay: 0.1,
  },
  {
    icon: AlignLeft,
    tamilChar: 'சொ',
    title: 'சந்தி பகுப்பு',
    subtitle: 'Sandhi Analysis',
    description: 'சொற்களின் சந்திப்பிரித்த மற்றும் சொல்பிரித்த வடிவங்களை ஒப்பீட்டு ஆராயவும்.',
    color: '#B55239',
    delay: 0.2,
  },
  {
    icon: Library,
    tamilChar: 'ஆர்',
    title: 'டிஜிட்டல் தேடறைவு',
    subtitle: 'Digital Archive',
    description: 'செம்மொழித் தமிழின் டிஜிட்டல் பாதுகாப்பு — ஆராய்ச்சியாளர்களுக்கும் மாணவர்களுக்கும்.',
    color: '#8A6A52',
    delay: 0.3,
  },
];

export default function FeatureCards({ darkMode }) {
  return (
    <section
      id="features"
      className={`py-32 lg:py-40 relative overflow-hidden ${darkMode ? 'bg-[#1A1510]' : 'bg-[#F5E6CC]/20'}`}
    >
      <div className="absolute inset-0 kolam-bg opacity-12 pointer-events-none" />

      <div className="cx relative z-10">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20 sm:mb-24"
        >
          <p className={`text-[10px] tracking-[0.4em] uppercase mb-4 font-medium ${darkMode ? 'text-[#D4A017]/55' : 'text-[#B55239]/65'}`}>
            Platform Features
          </p>
          <h2
            className={`font-tamil-serif font-bold mb-6 ${darkMode ? 'text-[#F5E6CC]' : 'text-[#6B0F1A]'}`}
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', lineHeight: 1.12 }}
          >
            சிறப்பு அம்சங்கள்
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 sm:w-28" style={{ background: 'linear-gradient(90deg, transparent, #D4A017)' }} />
            <span className="text-[#D4A017] text-lg" style={{ filter: 'drop-shadow(0 0 6px rgba(212,160,23,0.5))' }}>❋</span>
            <div className="h-px w-16 sm:w-28" style={{ background: 'linear-gradient(90deg, #D4A017, transparent)' }} />
          </div>
          <p
            className={`font-tamil-serif leading-relaxed max-w-[520px] mx-auto ${darkMode ? 'text-[#F5E6CC]/45' : 'text-[#7A5C43]'}`}
            style={{ fontSize: '0.875rem' }}
          >
            செம்மொழித் தமிழ் இலக்கியங்களை டிஜிட்டல் வழியில் எளிதாக ஆராய உதவும் நவீன கருவிகள்
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 mb-24">
          {features.map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: f.delay }}
              whileHover={{ y: -8, boxShadow: `0 32px 72px rgba(0,0,0,0.22), 0 0 32px ${f.color}18` }}
              className={`relative rounded-2xl overflow-hidden flex flex-col transition-all duration-350 group ${
                darkMode
                  ? 'bg-gradient-to-b from-[#2A2018] to-[#1F1B16] border border-[#D4A017]/10 hover:border-[#D4A017]/22'
                  : 'bg-white border border-[#E8D5B5]/65 shadow-lg shadow-[#D4A017]/6 hover:border-[#D4A017]/30'
              }`}
              style={{ padding: '2.5rem 2.25rem 2.25rem' }}
            >
              {/* Background accent glow */}
              <div
                className="absolute -top-14 -right-14 w-40 h-40 rounded-full blur-3xl opacity-[0.07] group-hover:opacity-[0.13] transition-opacity duration-500 pointer-events-none"
                style={{ background: f.color }}
              />

              {/* Icon block */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7 flex-shrink-0 relative z-10"
                style={{
                  background: `linear-gradient(135deg, ${f.color}12 0%, ${f.color}26 100%)`,
                  border: `1px solid ${f.color}38`,
                }}
              >
                <f.icon size={22} style={{ color: f.color }} />
              </div>

              {/* Ghost Tamil char */}
              <div
                className="absolute bottom-3 right-4 font-tamil-serif font-bold select-none pointer-events-none opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-400"
                style={{ fontSize: '5.5rem', color: f.color, lineHeight: 1 }}
              >
                {f.tamilChar}
              </div>

              {/* Text content */}
              <div className="relative z-10 flex-1 flex flex-col">
                <h3
                  className="font-tamil-serif font-bold mb-1.5 leading-snug"
                  style={{ fontSize: '1.1rem', color: f.color }}
                >
                  {f.title}
                </h3>
                <p className={`text-[10px] tracking-[0.22em] uppercase mb-5 font-medium ${darkMode ? 'text-[#7A5C43]' : 'text-[#A89070]'}`}>
                  {f.subtitle}
                </p>
                <p
                  className={`font-tamil-serif leading-[1.8] flex-1 ${darkMode ? 'text-[#F5E6CC]/48' : 'text-[#7A5C43]'}`}
                  style={{ fontSize: '0.8125rem' }}
                >
                  {f.description}
                </p>
              </div>

              {/* Bottom hover accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className={`rounded-2xl overflow-hidden ${darkMode ? 'border border-[#D4A017]/12' : ''}`}
          style={{
            background: darkMode
              ? 'linear-gradient(135deg, #2A2018 0%, #1A1510 100%)'
              : 'linear-gradient(135deg, #5A0D16 0%, #3A0B10 100%)',
          }}
        >
          <div className="px-8 sm:px-14 lg:px-20 py-12 sm:py-14">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
              {[
                { value: '12+',  label: 'செவ்வியல் நூல்கள்', sub: 'Classical Works' },
                { value: '48+',  label: 'ஆசிரியர்கள்',       sub: 'Poets & Authors' },
                { value: '10K+', label: 'அடிகள்',             sub: 'Lines Indexed' },
                { value: '100%', label: 'இலவசம்',             sub: 'Free Access' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  className="text-center"
                >
                  <p
                    className="font-playfair font-bold mb-2"
                    style={{ fontSize: 'clamp(2rem, 3vw, 2.6rem)', color: '#FFD54F', filter: 'drop-shadow(0 0 14px rgba(212,160,23,0.42))' }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-tamil-serif text-sm font-semibold text-white/82 mb-1">{stat.label}</p>
                  <p className="text-[10px] text-white/35 tracking-wider uppercase">{stat.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
