import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Download, Filter } from 'lucide-react';
import { tableData } from '../data/literatureData';

function highlightWord(text, word) {
  if (!word || !word.trim()) return text;
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === word.toLowerCase()
      ? <mark key={i} className="highlight-word">{part}</mark>
      : part
  );
}

const columns = [
  { key: 'moolaPadam', label: 'மூலபாடம்', shortLabel: 'மூலம்' },
  { key: 'sandhiPirittha', label: 'சந்திப்பிரித்தபாடம்', shortLabel: 'சந்தி' },
  { key: 'solPirittha', label: 'சொற்கள்பிரித்தபாடம்', shortLabel: 'சொற்கள்' },
  { key: 'nool', label: 'நூல்', shortLabel: 'நூல்' },
  { key: 'padalElam', label: 'பாடல்எண்', shortLabel: 'பாடல்' },
  { key: 'adi', label: 'அடி', shortLabel: 'அடி' },
];

export default function ResultsTable({ darkMode, searchWord, results }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [filterNool, setFilterNool] = useState('அனைத்தும்');
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 8;

  const displayData = results && results.length > 0 ? results : tableData;

  const uniqueNools = ['அனைத்தும்', ...new Set(displayData.map(r => r.nool))];

  const filtered = filterNool === 'அனைத்தும்'
    ? displayData
    : displayData.filter(r => r.nool === filterNool);

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const av = a[sortKey] ?? '';
        const bv = b[sortKey] ?? '';
        const cmp = av.localeCompare(bv, 'ta');
        return sortDir === 'asc' ? cmp : -cmp;
      })
    : filtered;

  const paginated = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
    setPage(0);
  };

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ChevronUp size={12} className="opacity-20" />;
    return sortDir === 'asc'
      ? <ChevronUp size={12} className="text-[#D4A017]" />
      : <ChevronDown size={12} className="text-[#D4A017]" />;
  };

  return (
    <section
      id="results"
      ref={ref}
      className={`py-24 lg:py-28 px-4 ${darkMode ? 'bg-[#1A1510]' : 'bg-[#FAF6EF]'}`}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-10"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className={`text-xs tracking-[0.3em] uppercase mb-1 ${darkMode ? 'text-[#D4A017]/60' : 'text-[#B55239]/70'}`}>
              Search Results
            </p>
            <h2 className={`font-tamil-serif text-2xl font-bold ${darkMode ? 'text-[#F5E6CC]' : 'text-[#6B0F1A]'}`}>
              தேடல் முடிவுகள்
              {searchWord && (
                <span className="ml-3 text-base font-normal text-[#D4A017]">
                  — "{searchWord}"
                </span>
              )}
            </h2>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Filter by nool */}
            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs ${
              darkMode ? 'border-[#D4A017]/20 bg-[#2D2420]' : 'border-[#E8D5B5] bg-white'
            }`}>
              <Filter size={12} className="text-[#D4A017]" />
              <select
                value={filterNool}
                onChange={e => { setFilterNool(e.target.value); setPage(0); }}
                className={`outline-none font-tamil-serif bg-transparent ${
                  darkMode ? 'text-[#F5E6CC]' : 'text-[#1F1B16]'
                }`}
              >
                {uniqueNools.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            <span className={`text-xs px-4 py-2.5 rounded-xl border ${
              darkMode ? 'border-[#D4A017]/20 text-[#D4A017]/80 bg-[#2D2420]' : 'border-[#E8D5B5] text-[#7A5C43] bg-white'
            }`}>
              {sorted.length} முடிவுகள்
            </span>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center gap-2 text-xs px-4 py-2.5 rounded-xl border transition-colors ${
                darkMode
                  ? 'border-[#D4A017]/20 text-[#D4A017] hover:bg-[#D4A017]/10'
                  : 'border-[#6B0F1A]/20 text-[#6B0F1A] hover:bg-[#6B0F1A]/5'
              }`}
            >
              <Download size={12} /> ஏற்றுமதி
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Desktop table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-7xl mx-auto hidden md:block"
      >
        <div className={`rounded-2xl overflow-hidden border shadow-xl ${
          darkMode ? 'border-[#D4A017]/15 shadow-black/30' : 'border-[#E8D5B5] shadow-[#D4A017]/10'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{
                  background: darkMode
                    ? 'linear-gradient(135deg, #3D1A0A, #6B0F1A)'
                    : 'linear-gradient(135deg, #6B0F1A, #8B3A1A)',
                }}>
                  <th className="px-3 py-5 text-center w-10">
                    <span className="text-[#D4A017]/60 text-xs">#</span>
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="px-6 py-5 text-left text-[#FFD54F] font-tamil-serif font-semibold text-xs tracking-wide cursor-pointer hover:text-[#FFD54F] select-none"
                    >
                      <div className="flex items-center gap-1.5">
                        {col.label}
                        <SortIcon col={col.key} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="wait">
                  {paginated.map((row, i) => (
                    <motion.tr
                      key={`${row.nool}-${row.padalElam}-${row.adi}-${i}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className={`border-b transition-all duration-200 group ${
                        darkMode
                          ? i % 2 === 0
                            ? 'bg-[#1F1B16] border-[#D4A017]/08 hover:bg-[#2D2420]'
                            : 'bg-[#251E18] border-[#D4A017]/08 hover:bg-[#2D2420]'
                          : i % 2 === 0
                            ? 'bg-white border-[#E8D5B5] hover:bg-[#FFF8F0]'
                            : 'bg-[#FDF7EE] border-[#E8D5B5] hover:bg-[#FFF8F0]'
                      }`}
                    >
                      <td className={`px-4 py-5 text-center text-xs ${darkMode ? 'text-[#7A5C43]' : 'text-[#A89070]'}`}>
                        {page * PAGE_SIZE + i + 1}
                      </td>
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={`px-6 py-5 font-tamil-serif leading-relaxed ${
                            col.key === 'nool'
                              ? `font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#6B0F1A]'}`
                              : col.key === 'padalElam' || col.key === 'adi'
                                ? `text-center ${darkMode ? 'text-[#F5E6CC]/70' : 'text-[#7A5C43]'}`
                                : darkMode ? 'text-[#F5E6CC]/85' : 'text-[#1F1B16]/85'
                          }`}
                        >
                          {col.key === 'moolaPadam' || col.key === 'sandhiPirittha' || col.key === 'solPirittha'
                            ? highlightWord(row[col.key], searchWord)
                            : row[col.key]
                          }
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Mobile cards */}
      <div className="md:hidden max-w-2xl mx-auto space-y-4">
        {paginated.map((row, i) => (
          <motion.div
            key={`m-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className={`rounded-xl p-4 border shadow-sm ${
              darkMode
                ? 'bg-[#2D2420] border-[#D4A017]/15'
                : 'bg-white border-[#E8D5B5]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`font-tamil-serif font-bold text-sm px-3 py-1 rounded-full ${
                darkMode ? 'bg-[#D4A017]/15 text-[#D4A017]' : 'bg-[#6B0F1A]/10 text-[#6B0F1A]'
              }`}>
                {row.nool}
              </span>
              <span className={`text-xs ${darkMode ? 'text-[#7A5C43]' : 'text-[#A89070]'}`}>
                பாடல்: {row.padalElam} · அடி: {row.adi}
              </span>
            </div>
            {[
              { label: 'மூலபாடம்', key: 'moolaPadam' },
              { label: 'சந்திப்பிரித்தபாடம்', key: 'sandhiPirittha' },
              { label: 'சொற்கள்பிரித்தபாடம்', key: 'solPirittha' },
            ].map(({ label, key }) => (
              <div key={key} className={`mt-2 pt-2 border-t ${darkMode ? 'border-[#D4A017]/10' : 'border-[#E8D5B5]'}`}>
                <p className={`text-[10px] uppercase tracking-wider mb-0.5 ${darkMode ? 'text-[#7A5C43]' : 'text-[#A89070]'}`}>
                  {label}
                </p>
                <p className={`font-tamil-serif text-sm leading-relaxed ${darkMode ? 'text-[#F5E6CC]/85' : 'text-[#1F1B16]/85'}`}>
                  {highlightWord(row[key], searchWord)}
                </p>
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="max-w-7xl mx-auto mt-6 flex items-center justify-center gap-2"
        >
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className={`px-5 py-2.5 rounded-xl text-xs font-tamil-serif border transition-all ${
              page === 0
                ? darkMode ? 'border-[#3D2F24] text-[#7A5C43] cursor-not-allowed' : 'border-[#E8D5B5] text-[#C0A882] cursor-not-allowed'
                : darkMode ? 'border-[#D4A017]/30 text-[#D4A017] hover:bg-[#D4A017]/10' : 'border-[#6B0F1A]/20 text-[#6B0F1A] hover:bg-[#6B0F1A]/5'
            }`}
          >
            ← முந்தைய
          </button>

          <div className="flex gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                  page === i
                    ? 'bg-[#6B0F1A] text-white shadow-md'
                    : darkMode
                      ? 'text-[#F5E6CC]/60 hover:bg-[#D4A017]/10'
                      : 'text-[#1F1B16]/60 hover:bg-[#6B0F1A]/8'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className={`px-5 py-2.5 rounded-xl text-xs font-tamil-serif border transition-all ${
              page === totalPages - 1
                ? darkMode ? 'border-[#3D2F24] text-[#7A5C43] cursor-not-allowed' : 'border-[#E8D5B5] text-[#C0A882] cursor-not-allowed'
                : darkMode ? 'border-[#D4A017]/30 text-[#D4A017] hover:bg-[#D4A017]/10' : 'border-[#6B0F1A]/20 text-[#6B0F1A] hover:bg-[#6B0F1A]/5'
            }`}
          >
            அடுத்தது →
          </button>
        </motion.div>
      )}
    </section>
  );
}
