import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, BookOpen } from 'lucide-react';

export default function Navbar({ darkMode, toggleDark }) {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const progress = Math.min(scrollY / 200, 1);
  const scrolled = scrollY > 40;

  // Interpolate background from hero red (transparent) → warm amber-gold
  const navBg = (() => {
    if (darkMode) {
      const r = Math.round(13 + (22 - 13) * progress);
      const g = Math.round(10 + (13 - 10) * progress);
      const b = Math.round(7 + (4 - 7) * progress);
      return `rgba(${r}, ${g}, ${b}, ${progress * 0.96})`;
    }
    const r = Math.round(61 + (52 - 61) * progress);
    const g = Math.round(11 + (28 - 11) * progress);
    const b = Math.round(19 + (5 - 19) * progress);
    return `rgba(${r}, ${g}, ${b}, ${progress * 0.94})`;
  })();

  const shadowOpacity = Math.max(0, (progress - 0.5) * 2 * 0.3);
  const borderOpacity = Math.max(0, (progress - 0.5) * 2 * 0.22);

  const navLinks = [
    { label: 'முகப்பு', href: '#hero' },
    { label: 'தேடல்', href: '#search' },
    { label: 'புள்ளிவிவரம்', href: '#stats' },
    { label: 'முடிவுகள்', href: '#results' },
    { label: 'எங்களைப் பற்றி', href: '#footer' },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: navBg,
        backdropFilter: progress > 0.1 ? `blur(${Math.round(progress * 12)}px)` : 'none',
        boxShadow: shadowOpacity > 0 ? `0 4px 24px rgba(0,0,0,${shadowOpacity})` : 'none',
        borderBottom: borderOpacity > 0 ? `1px solid rgba(212,160,23,${borderOpacity})` : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6B0F1A] to-[#D4A017] flex items-center justify-center shadow-md">
              <BookOpen size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold leading-none font-tamil-serif text-[#FFD54F]">
                செம்மொழி
              </p>
              <p className="text-[10px] leading-none text-[#D4A017]">
                Tamil Archive
              </p>
            </div>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ y: -1 }}
                className="text-sm font-medium font-tamil-serif transition-colors duration-200 relative group text-[#D4A017] hover:text-[#FFD54F]"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#D4A017] group-hover:w-full transition-all duration-300 rounded-full" />
              </motion.a>
            ))}

            {/* Separator */}
            <div className={`w-px h-5 ${darkMode ? 'bg-[#D4A017]/20' : 'bg-[#6B0F1A]/15'}`} />

            {/* Dark toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={toggleDark}
              className={`p-2.5 rounded-full border transition-all duration-300 ${
                darkMode
                  ? 'border-[#D4A017]/40 bg-[#D4A017]/10 text-[#D4A017]'
                  : 'border-[#6B0F1A]/20 bg-[#6B0F1A]/5 text-[#6B0F1A]'
              }`}
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDark}
              className={`p-2 rounded-full border ${
                darkMode ? 'border-[#D4A017]/40 text-[#D4A017]' : 'border-[#6B0F1A]/20 text-[#6B0F1A]'
              }`}
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-full border ${
                darkMode ? 'border-[#D4A017]/40 text-[#D4A017]' : 'border-[#6B0F1A]/20 text-[#6B0F1A]'
              }`}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden border-t overflow-hidden ${
              darkMode ? 'bg-[#1F1B16] border-[#D4A017]/20' : 'bg-[#FAF6EF] border-[#D4A017]/20'
            }`}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMenuOpen(false)}
                className={`block px-6 py-3 text-sm font-tamil-serif border-b transition-colors border-[#D4A017]/10 text-[#D4A017] hover:bg-[#D4A017]/10 hover:text-[#FFD54F]`}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
