import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, BookOpen, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ darkMode, toggleDark, variant = 'landing' }) {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Dashboard variant starts with some opacity even at top
  const rawProgress = Math.min(scrollY / 200, 1);
  const progress = variant === 'dashboard' ? Math.max(0.55, rawProgress) : rawProgress;

  const navBg = (() => {
    if (darkMode) {
      const r = Math.round(13 + (22 - 13) * progress);
      const g = Math.round(10 + (13 - 10) * progress);
      const b = Math.round(7 + (4 - 7) * progress);
      return `rgba(${r}, ${g}, ${b}, ${Math.max(progress * 0.96, variant === 'dashboard' ? 0.85 : 0)})`;
    }
    const r = Math.round(61 + (52 - 61) * progress);
    const g = Math.round(11 + (28 - 11) * progress);
    const b = Math.round(19 + (5 - 19) * progress);
    return `rgba(${r}, ${g}, ${b}, ${Math.max(progress * 0.94, variant === 'dashboard' ? 0.82 : 0)})`;
  })();

  const shadowOpacity = Math.max(0, (progress - 0.5) * 2 * 0.3);
  const borderOpacity = Math.max(variant === 'dashboard' ? 0.12 : 0, (progress - 0.5) * 2 * 0.22);

  const landingLinks = [
    { label: 'முகப்பு', href: '#hero' },
    { label: 'சிறப்புகள்', href: '#features' },
    { label: 'எங்களைப் பற்றி', href: '#footer' },
  ];

  const dashboardLinks = [
    { label: 'தேடல்', href: '#search' },
    { label: 'புள்ளிவிவரம்', href: '#stats' },
    { label: 'முடிவுகள்', href: '#results' },
  ];

  const navLinks = variant === 'dashboard' ? dashboardLinks : landingLinks;

  const handleSignout = () => {
    signout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: navBg,
        backdropFilter: `blur(${Math.round(progress * 14)}px)`,
        WebkitBackdropFilter: `blur(${Math.round(progress * 14)}px)`,
        boxShadow: shadowOpacity > 0 ? `0 4px 24px rgba(0,0,0,${shadowOpacity})` : 'none',
        borderBottom: `1px solid rgba(212,160,23,${borderOpacity})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6B0F1A] to-[#D4A017] flex items-center justify-center shadow-md">
                <BookOpen size={18} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold leading-none font-tamil-serif text-[#FFD54F]">
                  செவ்வியல்
                </p>
                <p className="text-[10px] leading-none mt-0.5 text-[#D4A017]">Tamil Archive</p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ y: -1 }}
                className="text-sm font-medium font-tamil-serif transition-colors duration-200 relative group text-[#D4A017] hover:text-[#FFD54F] whitespace-nowrap"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D4A017] group-hover:w-full transition-all duration-300 rounded-full" />
              </motion.a>
            ))}

            <div className={`w-px h-5 ${darkMode ? 'bg-[#D4A017]/20' : 'bg-[#FFD54F]/20'}`} />

            {/* Dark toggle */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.1 }}
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="p-2.5 rounded-full border transition-all duration-300 border-[#D4A017]/35 bg-[#D4A017]/8 text-[#D4A017] hover:bg-[#D4A017]/15"
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>

            {/* Auth area */}
            {user ? (
              <div className="flex items-center gap-3">
                {variant === 'landing' && (
                  <Link to="/dashboard">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border border-[#D4A017]/30 text-[#D4A017] hover:bg-[#D4A017]/10 transition-colors font-tamil-serif"
                    >
                      <LayoutDashboard size={13} />
                      தேடறைவு
                    </motion.button>
                  </Link>
                )}
                <div className="flex items-center gap-1.5 text-[#D4A017]/60 text-xs font-tamil-serif">
                  <User size={12} />
                  <span className="max-w-[80px] truncate">{user.name}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSignout}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium border border-[#D4A017]/25 text-[#D4A017]/75 hover:bg-[#D4A017]/10 hover:text-[#D4A017] transition-all duration-200"
                >
                  <LogOut size={12} />
                  வெளியேறு
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link to="/signin">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-4 py-2 rounded-full text-xs font-medium font-tamil-serif border border-[#D4A017]/30 text-[#D4A017] hover:bg-[#D4A017]/10 transition-all duration-200"
                  >
                    உள்நுழைவு
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 0 18px rgba(212,160,23,0.4)' }}
                    whileTap={{ scale: 0.96 }}
                    className="px-4 py-2 rounded-full text-xs font-semibold font-tamil-serif text-[#1F1B16] transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, #D4A017, #FFD54F)' }}
                  >
                    பதிவு செய்க
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full border border-[#D4A017]/35 text-[#D4A017]"
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-full border border-[#D4A017]/35 text-[#D4A017]"
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
            transition={{ duration: 0.28 }}
            className="md:hidden border-t border-[#D4A017]/15 overflow-hidden"
            style={{ background: darkMode ? 'rgba(22,16,10,0.97)' : 'rgba(50,8,16,0.97)', backdropFilter: 'blur(16px)' }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.055 }}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-3.5 text-sm font-tamil-serif border-b border-[#D4A017]/8 text-[#D4A017] hover:bg-[#D4A017]/8 hover:text-[#FFD54F] transition-colors"
              >
                {link.label}
              </motion.a>
            ))}

            {user ? (
              <>
                <div className="px-6 py-3 flex items-center gap-2 border-b border-[#D4A017]/8">
                  <User size={13} className="text-[#D4A017]/60" />
                  <span className="text-xs text-[#D4A017]/60 font-tamil-serif">{user.name}</span>
                </div>
                {variant === 'landing' && (
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                    <div className="px-6 py-3.5 text-sm font-tamil-serif border-b border-[#D4A017]/8 text-[#FFD54F] hover:bg-[#D4A017]/8 transition-colors">
                      தேடறைவு
                    </div>
                  </Link>
                )}
                <button
                  onClick={handleSignout}
                  className="w-full text-left px-6 py-3.5 text-sm font-tamil-serif text-[#D4A017]/60 hover:bg-[#D4A017]/8 transition-colors"
                >
                  வெளியேறு
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" onClick={() => setMenuOpen(false)}>
                  <div className="px-6 py-3.5 text-sm font-tamil-serif border-b border-[#D4A017]/8 text-[#D4A017] hover:bg-[#D4A017]/8 transition-colors">
                    உள்நுழைவு
                  </div>
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  <div className="px-6 py-3.5 text-sm font-tamil-serif text-[#FFD54F] hover:bg-[#D4A017]/8 transition-colors">
                    பதிவு செய்க
                  </div>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
