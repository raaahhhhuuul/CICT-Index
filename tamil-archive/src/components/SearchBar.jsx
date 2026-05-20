import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, Clock } from 'lucide-react';
import { books } from '../data/literatureData';

export default function SearchBar({ darkMode, onSearch, searchWord, setSearchWord }) {
  const [selectedBook, setSelectedBook] = useState(books[0]);
  const [bookOpen, setBookOpen]         = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [history, setHistory]           = useState(['அன்பு', 'யாதும்', 'அகரம்']);

  const handleSearch = () => {
    if (searchWord.trim()) {
      onSearch(searchWord, selectedBook);
      if (!history.includes(searchWord.trim()))
        setHistory(prev => [searchWord.trim(), ...prev.slice(0, 4)]);
    }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSearch(); };

  const inputBase = [
    'w-full px-4 py-4 rounded-xl text-sm outline-none transition-all duration-300 font-tamil-serif',
    darkMode
      ? 'bg-[#2A1F18] text-[#F5E6CC] placeholder-[#7A5C43] border border-[#3D2F24] focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017]/18'
      : 'bg-white text-[#1F1B16] placeholder-[#A89070] border border-[#E8D5B5] focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017]/18',
  ].join(' ');

  return (
    <section
      id="search"
      className={`py-28 lg:py-36 relative ${darkMode ? 'bg-[#1F1B16]' : 'bg-[#FAF6EF]'}`}
    >
      <div className="cx">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className={`text-[10px] tracking-[0.38em] uppercase mb-3 font-medium ${darkMode ? 'text-[#D4A017]/58' : 'text-[#B55239]/68'}`}>
            Digital Search Portal
          </p>
          <h2
            className={`font-tamil-serif font-bold mb-6 ${darkMode ? 'text-[#F5E6CC]' : 'text-[#6B0F1A]'}`}
            style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)' }}
          >
            சொல் தேடல்
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-14 sm:w-24" style={{ background: 'linear-gradient(90deg, transparent, #D4A017)' }} />
            <span className={`text-sm font-tamil-serif ${darkMode ? 'text-[#D4A017]/65' : 'text-[#7A5C43]'}`}>✦ ✦ ✦</span>
            <div className="h-px w-14 sm:w-24" style={{ background: 'linear-gradient(90deg, #D4A017, transparent)' }} />
          </div>
        </motion.div>

        {/* Search card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-2xl"
          style={{
            background: darkMode ? 'rgba(42,30,24,0.82)' : 'rgba(255,252,246,0.88)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: `1px solid ${darkMode ? 'rgba(212,160,23,0.18)' : 'rgba(212,160,23,0.22)'}`,
            boxShadow: darkMode
              ? '0 20px 64px rgba(0,0,0,0.35), 0 0 48px rgba(212,160,23,0.04)'
              : '0 16px 48px rgba(107,15,26,0.10), 0 0 32px rgba(212,160,23,0.06)',
            padding: 'clamp(2rem, 4vw, 3rem) clamp(1.75rem, 4vw, 3rem)',
          }}
        >
          {/* Main search row */}
          <div className="flex flex-col sm:flex-row gap-4 items-end">

            {/* Word input */}
            <div className="flex-1 relative pt-5">
              <label className={`absolute top-2 left-3.5 text-[9px] px-1 tracking-wider font-semibold z-10 uppercase ${
                darkMode ? 'text-[#D4A017] bg-[#2A1F18]' : 'text-[#6B0F1A] bg-white'
              }`}>
                சொல் / Word
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="தேட வேண்டிய சொல்லை உள்ளிடுக..."
                  className={`${inputBase} pr-10`}
                  style={{ paddingLeft: '1rem' }}
                  aria-label="Search word input"
                />
                {searchWord && (
                  <button
                    onClick={() => setSearchWord('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A5C43] hover:text-[#D4A017] transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Book dropdown */}
            <div className="relative min-w-[220px] pt-5">
              <label className={`absolute top-2 left-3.5 text-[9px] px-1 tracking-wider font-semibold z-10 uppercase ${
                darkMode ? 'text-[#D4A017] bg-[#2A1F18]' : 'text-[#6B0F1A] bg-white'
              }`}>
                நூல் / Book
              </label>
              <button
                onClick={() => setBookOpen(!bookOpen)}
                className={[
                  'w-full flex items-center justify-between px-4 py-4 rounded-xl text-sm font-tamil-serif transition-all duration-300',
                  darkMode
                    ? 'bg-[#2A1F18] text-[#F5E6CC] border border-[#3D2F24] hover:border-[#D4A017]/60'
                    : 'bg-white text-[#1F1B16] border border-[#E8D5B5] hover:border-[#D4A017]/60',
                  bookOpen ? 'border-[#D4A017] ring-2 ring-[#D4A017]/15' : '',
                ].join(' ')}
              >
                <span className="truncate">{selectedBook}</span>
                <motion.span animate={{ rotate: bookOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={15} className="text-[#D4A017] flex-shrink-0 ml-2" />
                </motion.span>
              </button>

              <AnimatePresence>
                {bookOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className={`absolute top-full mt-2 left-0 right-0 z-50 rounded-xl overflow-hidden shadow-2xl border ${
                      darkMode ? 'bg-[#2A1F18] border-[#D4A017]/22' : 'bg-white border-[#D4A017]/22'
                    }`}
                  >
                    <div className="max-h-56 overflow-y-auto">
                      {books.map((book) => (
                        <button
                          key={book}
                          onClick={() => { setSelectedBook(book); setBookOpen(false); }}
                          className={[
                            'w-full text-left px-4 py-3 text-sm font-tamil-serif transition-colors',
                            selectedBook === book
                              ? 'bg-[#D4A017]/14 text-[#D4A017] font-semibold'
                              : darkMode
                                ? 'text-[#F5E6CC]/75 hover:bg-[#D4A017]/8'
                                : 'text-[#1F1B16]/80 hover:bg-[#6B0F1A]/5',
                          ].join(' ')}
                        >
                          {book}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search button */}
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(212,160,23,0.48)' }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSearch}
              className="flex items-center gap-2.5 px-9 py-4 rounded-xl text-sm font-semibold font-tamil-serif text-white cursor-pointer whitespace-nowrap self-end min-h-[54px]"
              style={{ background: 'linear-gradient(135deg, #6B0F1A 0%, #9B2335 50%, #D4A017 100%)' }}
            >
              <Search size={15} />
              தேடு
            </motion.button>
          </div>

          {/* Advanced filter toggle */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                darkMode ? 'text-[#D4A017]/68 hover:text-[#D4A017]' : 'text-[#B55239] hover:text-[#6B0F1A]'
              }`}
            >
              <SlidersHorizontal size={13} />
              மேம்பட்ட தேடல்
              <motion.span animate={{ rotate: showAdvanced ? 180 : 0 }}>
                <ChevronDown size={13} />
              </motion.span>
            </button>
            <p className={`text-xs ${darkMode ? 'text-[#7A5C43]' : 'text-[#A89070]'}`}>
              Enter அழுத்தி தேடலாம்
            </p>
          </div>

          {/* Advanced panel */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className={`mt-5 pt-5 border-t grid grid-cols-1 sm:grid-cols-3 gap-4 ${
                  darkMode ? 'border-[#D4A017]/12' : 'border-[#D4A017]/18'
                }`}>
                  {[
                    { label: 'பாடல் எண்',  placeholder: 'உ.ம்: 1-100' },
                    { label: 'அடி எண்',    placeholder: 'உ.ம்: 1' },
                    { label: 'ஆசிரியர்',   placeholder: 'ஆசிரியர் பெயர்' },
                  ].map((field) => (
                    <div key={field.label} className="relative pt-4">
                      <label className={`absolute top-1.5 left-3.5 text-[9px] px-1 z-10 uppercase tracking-wider font-semibold ${
                        darkMode ? 'text-[#D4A017] bg-[#2A1F18]' : 'text-[#6B0F1A] bg-white'
                      }`}>
                        {field.label}
                      </label>
                      <input type="text" placeholder={field.placeholder} className={inputBase} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Search history chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex items-center gap-3 flex-wrap"
        >
          <span className={`text-xs flex items-center gap-1.5 ${darkMode ? 'text-[#7A5C43]' : 'text-[#A89070]'}`}>
            <Clock size={11} /> சமீபத்திய:
          </span>
          {history.map((word) => (
            <motion.button
              key={word}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setSearchWord(word); onSearch(word, selectedBook); }}
              className={`px-4 py-1.5 rounded-full text-xs font-tamil-serif border transition-all duration-200 ${
                darkMode
                  ? 'border-[#D4A017]/22 text-[#D4A017]/70 hover:bg-[#D4A017]/10 hover:border-[#D4A017]/45'
                  : 'border-[#B55239]/22 text-[#B55239] hover:bg-[#B55239]/8 hover:border-[#B55239]/45'
              }`}
            >
              {word}
            </motion.button>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
