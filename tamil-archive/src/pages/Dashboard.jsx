import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import StatsCards from '../components/StatsCards';
import ResultsTable from '../components/ResultsTable';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import TamilCursor from '../components/cursor/TamilCursor';
import { loadTableData } from '../data/literatureData';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [darkMode, setDarkMode]     = useState(() => localStorage.getItem('ta_theme') === 'dark');
  const [searchWord, setSearchWord] = useState('');
  const [tableData, setTableData]   = useState([]);
  const [results, setResults]       = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [books, setBooks]           = useState(['செவ்வியல் நூல்கள்']);
  const [loading, setLoading]       = useState(true);
  const { user }                    = useAuth();

  useEffect(() => {
    loadTableData()
      .then(rows => {
        setTableData(rows);
        setResults(rows);
        const uniqueBooks = ['செவ்வியல் நூல்கள்', ...new Set(rows.map(r => r.nool).filter(Boolean))];
        setBooks(uniqueBooks);
      })
      .catch(err => console.error('Failed to load data:', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#1F1B16' : '#FAF6EF';
  }, [darkMode]);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('ta_theme', next ? 'dark' : 'light');
  };

  const handleSearch = (word, book) => {
    const filtered = tableData.filter((row) => {
      const matchWord =
        word.trim() &&
        (row.moolaPadam.includes(word) ||
         row.sandhiPirittha.includes(word) ||
         row.solPirittha.includes(word));
      const matchBook = book === 'செவ்வியல் நூல்கள்' || row.nool === book;
      return matchWord && matchBook;
    });
    setHasSearched(true);
    setResults(filtered);
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: darkMode ? '#1F1B16' : '#FAF6EF' }}
    >
      <TamilCursor />

      <AnimatePresence>
        {loading && <LoadingScreen isLoading={loading} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar darkMode={darkMode} toggleDark={toggleDark} variant="dashboard" />

          {/* ── Welcome banner ── */}
          <section
            className="relative overflow-hidden"
            style={{
              background: darkMode
                ? 'linear-gradient(135deg, #1A1510 0%, #2D1F0E 50%, #1F1B16 100%)'
                : 'linear-gradient(135deg, #3D0B13 0%, #6B0F1A 50%, #8B3A1A 100%)',
              paddingTop: '7.5rem',
              paddingBottom: '3rem',
            }}
          >
            <div className="absolute inset-0 kolam-bg opacity-18 pointer-events-none" />
            <div className="absolute inset-0 manuscript-noise pointer-events-none" />

            <div
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, #D4A017, #FFD54F, #D4A017, transparent)' }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 55% 70% at 50% 50%, rgba(212,160,23,0.07) 0%, transparent 70%)' }}
            />

            <div className="cx relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65 }}
                >
                  <p className="text-[#D4A017]/55 text-[11px] tracking-[0.32em] uppercase mb-2">
                    Digital Archive Dashboard
                  </p>
                  <h1 className="font-tamil-serif font-bold text-[#FFD54F] mb-2"
                    style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
                  >
                    வணக்கம், {user?.name}!
                  </h1>
                  <p className="text-[#F5E6CC]/40 text-xs font-tamil-serif">
                    செவ்வியல் தமிழ் இலக்கியங்களை இன்று தேடுங்கள்
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, delay: 0.15 }}
                  className="hidden sm:flex items-center gap-4"
                >
                  {[
                    { label: 'நூல்கள்',      value: `${books.length - 1}` },
                    { label: 'இடம்பெற்ற அடிகள்', value: `${tableData.length}` },
                    { label: 'மொத்த அடிகள்', value: '37K+' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="text-center px-7 py-4 rounded-xl border border-[#D4A017]/18 bg-[#D4A017]/7"
                    >
                      <p className="text-[#FFD54F] text-xl font-bold font-playfair leading-none mb-1">{s.value}</p>
                      <p className="text-[#D4A017]/55 text-[10px] font-tamil-serif uppercase tracking-wide">{s.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
              style={{
                background: darkMode
                  ? 'linear-gradient(to bottom, transparent, #1F1B16)'
                  : 'linear-gradient(to bottom, transparent, #FAF6EF)',
              }}
            />
          </section>

          <main>
            <SearchBar
              darkMode={darkMode}
              onSearch={handleSearch}
              searchWord={searchWord}
              setSearchWord={setSearchWord}
              books={books}
            />
            <StatsCards darkMode={darkMode} totalRows={tableData.length} />
            <ResultsTable darkMode={darkMode} searchWord={searchWord} results={results} tableData={tableData} hasSearched={hasSearched} />
          </main>

          <Footer darkMode={darkMode} />
        </>
      )}
    </div>
  );
}
