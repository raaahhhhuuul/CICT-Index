import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import StatsCards from './components/StatsCards';
import ResultsTable from './components/ResultsTable';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { tableData } from './data/literatureData';
import './index.css';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [results, setResults] = useState(tableData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#1F1B16';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#FAF6EF';
    }
  }, [darkMode]);

  const handleSearch = (word, book) => {
    const filtered = tableData.filter((row) => {
      const matchWord =
        !word.trim() ||
        row.moolaPadam.includes(word) ||
        row.sandhiPirittha.includes(word) ||
        row.solPirittha.includes(word);
      const matchBook =
        book === 'செவ்வியல் நூல்கள்' || row.nool === book;
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
      <AnimatePresence>
        {loading && <LoadingScreen isLoading={loading} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar darkMode={darkMode} toggleDark={() => setDarkMode(!darkMode)} />
          <main>
            <Hero darkMode={darkMode} />
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
