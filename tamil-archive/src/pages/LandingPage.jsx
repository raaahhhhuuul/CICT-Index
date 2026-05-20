import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeatureCards from '../components/landing/FeatureCards';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import TamilCursor from '../components/cursor/TamilCursor';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('ta_theme') === 'dark');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
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

  const handleCTA = () => {
    navigate(user ? '/dashboard' : '/signin');
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
          <Navbar darkMode={darkMode} toggleDark={toggleDark} variant="landing" />
          <main>
            <Hero darkMode={darkMode} onCTAClick={handleCTA} />
            <FeatureCards darkMode={darkMode} />
          </main>
          <Footer darkMode={darkMode} />
        </>
      )}
    </div>
  );
}
