import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, BookOpen, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ darkMode, toggleDark, variant = 'landing' }) {
  const [scrollY, setScrollY]   = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signout }       = useAuth();
  const navigate                = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const rawProgress = Math.min(scrollY / 140, 1);
  const progress    = variant === 'dashboard' ? Math.max(0.65, rawProgress) : rawProgress;

  const navBg = (() => {
    if (darkMode) {
      const r = Math.round(13 + (20 - 13) * progress);
      const g = Math.round(10 + (12 - 10) * progress);
      const b = Math.round(7  + (4  -  7) * progress);
      return `rgba(${r},${g},${b},${Math.max(progress * 0.97, variant === 'dashboard' ? 0.90 : 0)})`;
    }
    const r = Math.round(61 + (52 - 61) * progress);
    const g = Math.round(11 + (28 - 11) * progress);
    const b = Math.round(19 + (5  - 19) * progress);
    return `rgba(${r},${g},${b},${Math.max(progress * 0.96, variant === 'dashboard' ? 0.88 : 0)})`;
  })();

  const shadowOpacity = Math.max(0, (progress - 0.35) * 1.54 * 0.26);
  const borderOpacity = Math.max(variant === 'dashboard' ? 0.16 : 0, (progress - 0.35) * 1.54 * 0.22);

  const landingLinks = [
    { label: 'முகப்பு',      href: '#hero' },
    { label: 'சிறப்புகள்',   href: '#features' },
    { label: 'எங்களை பற்றி', href: '#footer' },
  ];
  const dashboardLinks = [
    { label: 'தேடல்',        href: '#search' },
    { label: 'புள்ளிவிவரம்', href: '#stats' },
    { label: 'முடிவுகள்',    href: '#results' },
  ];
  const navLinks = variant === 'dashboard' ? dashboardLinks : landingLinks;

  const handleSignout = () => {
    signout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -88, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: navBg,
        backdropFilter: `blur(${Math.round(progress * 18)}px)`,
        WebkitBackdropFilter: `blur(${Math.round(progress * 18)}px)`,
        boxShadow: shadowOpacity > 0 ? `0 2px 36px rgba(0,0,0,${shadowOpacity})` : 'none',
        borderBottom: `1px solid rgba(212,160,23,${borderOpacity})`,
      }}
    >
      <div className="cx">
        <div className="flex items-center justify-between h-[80px]">

          {/* ── Logo ── */}
          <Link to="/" className="flex-shrink-0">
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-3 cursor-pointer">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                style={{ background: 'linear-gradient(135deg, #6B0F1A, #D4A017)' }}
              >
                <BookOpen size={19} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-[12.5px] font-bold leading-none font-tamil-serif text-[#FFD54F] tracking-wide">
                  செவ்வியல்
                </p>
                <p className="text-[10px] leading-none mt-0.5 text-[#D4A017]/65 tracking-[0.14em] uppercase">
                  Tamil Archive
                </p>
              </div>
            </motion.div>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ y: -1 }}
                className="relative group font-tamil-serif font-medium transition-colors duration-200 whitespace-nowrap text-[#D4A017]/80 hover:text-[#FFD54F]"
                style={{ fontSize: '14.5px' }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4A017] group-hover:w-full transition-all duration-300 rounded-full" />
              </motion.a>
            ))}

            <div className="w-px h-5 bg-[#D4A017]/15" />

            {/* Dark mode toggle */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.08 }}
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 border-[#D4A017]/28 text-[#D4A017] hover:bg-[#D4A017]/10 hover:border-[#D4A017]/50"
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-3">
                {variant === 'landing' && (
                  <Link to="/dashboard">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-1.5 rounded-full border border-[#D4A017]/28 text-[#D4A017] hover:bg-[#D4A017]/10 transition-colors font-tamil-serif"
                      style={{ fontSize: '13px', padding: '9px 18px' }}
                    >
                      <LayoutDashboard size={13} />
                      தேடறைவு
                    </motion.button>
                  </Link>
                )}
                <div className="flex items-center gap-1.5 text-[#D4A017]/52 font-tamil-serif" style={{ fontSize: '12.5px' }}>
                  <User size={12} />
                  <span className="max-w-[80px] truncate">{user.name}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSignout}
                  className="flex items-center gap-1.5 rounded-full border border-[#D4A017]/22 text-[#D4A017]/70 hover:bg-[#D4A017]/10 hover:text-[#D4A017] transition-all duration-200 font-tamil-serif"
                  style={{ fontSize: '13px', padding: '9px 16px' }}
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
                    className="rounded-full border border-[#D4A017]/28 text-[#D4A017] hover:bg-[#D4A017]/10 transition-all duration-200 font-tamil-serif font-medium"
                    style={{ fontSize: '13px', padding: '9px 20px' }}
                  >
                    உள்நுழைவு
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 0 22px rgba(212,160,23,0.38)' }}
                    whileTap={{ scale: 0.96 }}
                    className="rounded-full font-semibold font-tamil-serif text-[#1F1B16] transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, #D4A017, #FFD54F)', fontSize: '13px', padding: '9px 20px' }}
                  >
                    பதிவு செய்க
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* ── Mobile controls ── */}
          <div className="flex md:hidden items-center gap-2.5">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={toggleDark}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-[#D4A017]/30 text-[#D4A017]"
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-[#D4A017]/30 text-[#D4A017]"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.26 }}
            className="md:hidden border-t border-[#D4A017]/12 overflow-hidden"
            style={{ background: darkMode ? 'rgba(18,12,7,0.97)' : 'rgba(46,7,15,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="cx py-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center border-b border-[#D4A017]/8 font-tamil-serif text-[#D4A017] hover:text-[#FFD54F] hover:bg-[#D4A017]/6 transition-colors"
                  style={{ fontSize: '15px', padding: '16px 0' }}
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="pt-4 pb-2">
                {user ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 pb-3 border-b border-[#D4A017]/8 mb-1">
                      <User size={13} className="text-[#D4A017]/50" />
                      <span className="font-tamil-serif text-[#D4A017]/50" style={{ fontSize: '13px' }}>{user.name}</span>
                    </div>
                    {variant === 'landing' && (
                      <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                        <div className="font-tamil-serif text-[#FFD54F] hover:bg-[#D4A017]/8 transition-colors rounded-lg" style={{ fontSize: '15px', padding: '14px 4px' }}>
                          தேடறைவு
                        </div>
                      </Link>
                    )}
                    <button onClick={handleSignout} className="w-full text-left font-tamil-serif text-[#D4A017]/60 hover:bg-[#D4A017]/8 rounded-lg transition-colors" style={{ fontSize: '15px', padding: '14px 4px' }}>
                      வெளியேறு
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3 pt-1">
                    <Link to="/signin" onClick={() => setMenuOpen(false)} className="flex-1">
                      <div className="text-center border border-[#D4A017]/28 rounded-xl text-[#D4A017] font-tamil-serif font-medium transition-colors hover:bg-[#D4A017]/8" style={{ fontSize: '14px', padding: '13px' }}>
                        உள்நுழைவு
                      </div>
                    </Link>
                    <Link to="/signup" onClick={() => setMenuOpen(false)} className="flex-1">
                      <div className="text-center rounded-xl font-tamil-serif font-semibold text-[#1F1B16]" style={{ background: 'linear-gradient(135deg, #D4A017, #FFD54F)', fontSize: '14px', padding: '13px' }}>
                        பதிவு செய்க
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
