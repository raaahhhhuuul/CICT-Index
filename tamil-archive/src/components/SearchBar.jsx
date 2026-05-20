import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, Clock } from 'lucide-react';
import { books } from '../data/literatureData';

export default function SearchBar({ darkMode, onSearch, searchWord, setSearchWord }) {
  const [selectedBook, setSelectedBook] = useState(books[0]);
  const [bookOpen, setBookOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [history, setHistory] = useState(['அன்பு', 'யாதும்', 'அகரம்']);

  const handleSearch = () => {
    if (searchWord.trim()) {
      onSearch(searchWord, selectedBook);
      if (!history.includes(searchWord.trim())) {
        setHistory(prev => [searchWord.trim(), ...prev.slice(0, 4)]);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const inputBase = `w-full px-4 py-4 rounded-xl text-sm outline-none transition-all duration-300 font-tamil-serif ${
    darkMode
      ? 'bg-[#2D2420] text-[#F5E6CC] placeholder-[#7A5C43] border border-[#3D2F24]'
      : 'bg-white text-[#1F1B16] placeholder-[#A89070] border border-[#E8D5B5]'
  } focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017]/20`;

  return (
    <section id="search" className={`py-24 lg:py-28 px-4 relative ${darkMode ? 'bg-[#1F1B16]' : 'bg-[#FAF6EF]'}`}>
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <p className={`text-xs tracking-[0.3em] uppercase mb-2 ${darkMode ? 'text-[#D4A017]/60' : 'text-[#B55239]/70'}`}>
          Digital Search Portal
        </p>
        <h2 className={`font-tamil-serif text-3xl font-bold ${darkMode ? 'text-[#F5E6CC]' : 'text-[#6B0F1A]'}`}>
          சொல் தேடல்
        </h2>
        <div className="ornament-line max-w-48 mx-auto mt-3">
          <span className={`text-xs font-tamil-serif ${darkMode ? 'text-[#D4A017]/70' : 'text-[#7A5C43]'}`}>
            ✦ ✦ ✦
          </span>
        </div>
      </motion.div>

      {/* Search card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={`max-w-5xl mx-auto rounded-2xl p-10 sm:p-12 shadow-xl glass-card`}
        style={{
          background: darkMode
            ? 'rgba(45,36,32,0.8)'
            : 'rgba(255,252,246,0.85)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${darkMode ? 'rgba(212,160,23,0.2)' : 'rgba(212,160,23,0.25)'}`,
        }}
      >
        {/* Main search row */}
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          {/* Word input */}
          <div className="flex-1 relative group pt-4">
            <label className={`absolute top-1.5 left-3 text-[10px] px-1 tracking-wider font-medium z-10 ${
              darkMode ? 'text-[#D4A017] bg-[#2D2420]' : 'text-[#6B0F1A] bg-white'
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
                className={inputBase}
                aria-label="Search word input"
              />
              {searchWord && (
                <button
                  onClick={() => setSearchWord('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A5C43] hover:text-[#6B0F1A]"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Book dropdown */}
          <div className="relative min-w-[210px] pt-4">
            <label className={`absolute top-1.5 left-3 text-[10px] px-1 tracking-wider font-medium z-10 ${
              darkMode ? 'text-[#D4A017] bg-[#2D2420]' : 'text-[#6B0F1A] bg-white'
            }`}>
              நூல் / Book
            </label>
            <button
              onClick={() => setBookOpen(!bookOpen)}
              className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-sm font-tamil-serif transition-all duration-300 ${
                darkMode
                  ? 'bg-[#2D2420] text-[#F5E6CC] border border-[#3D2F24] hover:border-[#D4A017]'
                  : 'bg-white text-[#1F1B16] border border-[#E8D5B5] hover:border-[#D4A017]'
              } ${bookOpen ? 'border-[#D4A017] ring-2 ring-[#D4A017]/20' : ''}`}
            >
              <span className="truncate">{selectedBook}</span>
              <motion.div animate={{ rotate: bookOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={16} className="text-[#D4A017] flex-shrink-0 ml-2" />
              </motion.div>
            </button>

            <AnimatePresence>
              {bookOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className={`absolute top-full mt-1.5 left-0 right-0 z-50 rounded-xl overflow-hidden shadow-2xl border ${
                    darkMode
                      ? 'bg-[#2D2420] border-[#D4A017]/25'
                      : 'bg-white border-[#D4A017]/25'
                  }`}
                >
                  <div className="max-h-52 overflow-y-auto">
                    {books.map((book) => (
                      <button
                        key={book}
                        onClick={() => { setSelectedBook(book); setBookOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm font-tamil-serif transition-colors ${
                          selectedBook === book
                            ? 'bg-[#D4A017]/15 text-[#D4A017] font-semibold'
                            : darkMode
                              ? 'text-[#F5E6CC]/80 hover:bg-[#D4A017]/10'
                              : 'text-[#1F1B16]/80 hover:bg-[#6B0F1A]/5'
                        }`}
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
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(212,160,23,0.45)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSearch}
            className="flex items-center gap-2.5 px-10 py-4 rounded-xl text-sm font-semibold font-tamil-serif text-white cursor-pointer whitespace-nowrap self-end"
            style={{ background: 'linear-gradient(135deg, #6B0F1A 0%, #9B2335 50%, #D4A017 100%)' }}
          >
            <Search size={15} />
            தேடு
          </motion.button>
        </div>

        {/* Advanced toggle */}
        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
              darkMode ? 'text-[#D4A017]/70 hover:text-[#D4A017]' : 'text-[#B55239] hover:text-[#6B0F1A]'
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
              <div className={`mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-3 gap-3 ${
                darkMode ? 'border-[#D4A017]/15' : 'border-[#D4A017]/20'
              }`}>
                {[
                  { label: 'பாடல் எண்', placeholder: 'உ.ம்: 1-100' },
                  { label: 'அடி எண்', placeholder: 'உ.ம்: 1' },
                  { label: 'ஆசிரியர்', placeholder: 'ஆசிரியர் பெயர்' },
                ].map((field) => (
                  <div key={field.label} className="relative">
                    <label className={`absolute -top-2 left-3 text-[10px] px-1 z-10 ${
                      darkMode ? 'text-[#D4A017] bg-[#2D2420]' : 'text-[#6B0F1A] bg-white'
                    }`}>
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      className={inputBase}
                    />
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
        className="max-w-5xl mx-auto mt-5 flex items-center gap-3 flex-wrap"
      >
        <span className={`text-xs flex items-center gap-1 ${darkMode ? 'text-[#7A5C43]' : 'text-[#A89070]'}`}>
          <Clock size={12} /> சமீபத்திய:
        </span>
        {history.map((word) => (
          <motion.button
            key={word}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setSearchWord(word); onSearch(word, selectedBook); }}
            className={`px-4 py-1.5 rounded-full text-xs font-tamil-serif border transition-all duration-200 ${
              darkMode
                ? 'border-[#D4A017]/25 text-[#D4A017]/75 hover:bg-[#D4A017]/10 hover:border-[#D4A017]/50'
                : 'border-[#B55239]/25 text-[#B55239] hover:bg-[#B55239]/8 hover:border-[#B55239]/50'
            }`}
          >
            {word}
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}
