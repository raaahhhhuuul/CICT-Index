import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import StatsCards from '../components/StatsCards';
import ResultsTable from '../components/ResultsTable';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import TamilCursor from '../components/cursor/TamilCursor';
import { tableData } from '../data/literatureData';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('ta_theme') === 'dark');
  const [searchWord, setSearchWord] = useState('');
  const [results, setResults] = useState(tableData);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
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
        !word.trim() ||
        row.moolaPadam.includes(word) ||
        row.sandhiPirittha.includes(word) ||
        row.solPirittha.includes(word);
      const matchBook = book === 'செவ்வியல் நூல்கள்' || row.nool === book;
      return matchWord && matchBook;
    });
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

          {/* Dashboard welcome banner */}
          <section
            className="pt-24 pb-12 px-4 relative overflow-hidden"
            style={{
              background: darkMode
                ? 'linear-gradient(135deg, #1A1510 0%, #2D1F0E 50%, #1F1B16 100%)'
                : 'linear-gradient(135deg, #3D0B13 0%, #6B0F1A 50%, #8B3A1A 100%)',
            }}
          >
            {/* Background kolam pattern */}
            <div className="absolute inset-0 kolam-bg opacity-20 pointer-events-none" />
            {/* Top gold line */}
            <div
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, #D4A017, #FFD54F, #D4A017, transparent)' }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-[#D4A017]/60 text-[10px] tracking-[0.3em] uppercase mb-1">
                    Digital Archive Dashboard
                  </p>
                  <h1 className="font-tamil-serif text-2xl sm:text-3xl font-bold text-[#FFD54F]">
                    வணக்கம், {user?.name}!
                  </h1>
                  <p className="text-[#F5E6CC]/45 text-xs font-tamil-serif mt-1">
                    செவ்வியல் தமிழ் இலக்கியங்களை இன்று தேடுங்கள்
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="hidden sm:flex items-center gap-3"
                >
                  {[
                    { label: 'நூல்கள்', value: '12+' },
                    { label: 'ஆசிரியர்கள்', value: '48+' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="text-center px-6 py-4 rounded-xl border border-[#D4A017]/20 bg-[#D4A017]/8"
                    >
                      <p className="text-[#FFD54F] text-lg font-bold font-playfair">{s.value}</p>
                      <p className="text-[#D4A017]/60 text-[10px] font-tamil-serif">{s.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Bottom fade */}
            <div
              className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
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
            />
            <StatsCards darkMode={darkMode} />
            <ResultsTable darkMode={darkMode} searchWord={searchWord} results={results} />
          </main>

          <Footer darkMode={darkMode} />
        </>
      )}
    </div>
  );
}
