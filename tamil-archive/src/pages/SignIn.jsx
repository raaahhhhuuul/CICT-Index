import { useState } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, BookOpen, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import TamilCursor from '../components/cursor/TamilCursor';

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: (i * 10 + 5) % 100,
  y: (i * 14.3 + 8) % 100,
  char: ['த', 'மி', 'ழ்', 'அ', 'க', 'ம', 'உ', 'ண', 'இ', 'ஆ'][i % 10],
  size: 10 + (i % 3) * 2.5,
  delay: (i * 0.4) % 3.5,
  duration: 6 + (i % 3) * 1.5,
}));

export default function SignIn() {
  const [email,      setEmail]      = useState('');
  const [password,   setPassword]   = useState('');
  const [showPass,   setShowPass]   = useState(false);
  const [error,      setError]      = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { signin, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      signin(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-16 px-5 relative overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #0B0806 0%, #17120D 35%, #261A0C 70%, #311407 100%)' }}
    >
      <TamilCursor />

      {/* ── Top gold accent ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 5%, #D4A017 40%, #FFD54F 50%, #D4A017 60%, transparent 95%)' }}
      />

      {/* ── Floating Tamil particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="absolute font-tamil-serif select-none"
            style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size, color: 'rgba(212,160,23,0.09)' }}
            animate={{ y: [0, -12, 0], opacity: [0.12, 0.3, 0.12] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            {p.char}
          </motion.span>
        ))}
      </div>

      {/* ── Soft radial focus glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(212,160,23,0.06) 0%, transparent 68%)' }}
      />

      {/* ── Logo ── */}
      <Link to="/" className="absolute top-6 left-6 sm:top-7 sm:left-9">
        <motion.div whileHover={{ scale: 1.04 }} className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6B0F1A, #C49010)', boxShadow: '0 0 12px rgba(212,160,23,0.25)' }}
          >
            <BookOpen size={15} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-[11px] font-semibold font-tamil-serif text-[#FFD54F] leading-none">செவ்வியல்</p>
            <p className="text-[9px] text-[#D4A017]/55 leading-none mt-0.5 tracking-widest uppercase">Tamil Archive</p>
          </div>
        </motion.div>
      </Link>

      {/* ── Auth card ── */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[520px] relative z-10"
      >
        <div
          className="rounded-2xl"
          style={{
            background: 'rgba(30, 22, 15, 0.70)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            border: '1px solid rgba(212,160,23,0.15)',
            boxShadow: '0 24px 72px rgba(0,0,0,0.45), 0 1px 0 rgba(212,160,23,0.08) inset',
            padding: '2.75rem 2.75rem 2.5rem',
          }}
        >

          {/* ── Card header ── */}
          <div className="text-center mb-8">

            {/* Icon medallion */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-[60px] h-[60px] rounded-full mx-auto mb-5 flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #6B0F1A 0%, #9B1E2A 45%, #C49010 100%)',
                boxShadow: '0 0 0 8px rgba(212,160,23,0.06), 0 8px 28px rgba(0,0,0,0.4)',
              }}
            >
              <span className="font-tamil-serif text-white font-bold select-none" style={{ fontSize: '1.35rem' }}>உ</span>
            </motion.div>

            {/* Title */}
            <h1
              className="font-tamil-serif font-bold text-[#FFD54F] mb-1.5"
              style={{ fontSize: '1.45rem', letterSpacing: '0.01em', lineHeight: 1.2 }}
            >
              உள்நுழைவு
            </h1>
            <p
              className="text-[#D4A017]/45 uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.3em' }}
            >
              Sign in to Tamil Archive
            </p>

            {/* Thin gold rule */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,160,23,0.35))' }} />
              <span className="text-[#D4A017]/30" style={{ fontSize: '10px' }}>◆</span>
              <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, rgba(212,160,23,0.35), transparent)' }} />
            </div>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} noValidate>

            {/* Email field */}
            <div className="mb-5">
              <label
                className="block font-semibold mb-2"
                style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(212,160,23,0.65)', textTransform: 'uppercase' }}
              >
                மின்னஞ்சல் · Email
              </label>
              <div className="relative">
                <Mail
                  size={13}
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ left: '14px', color: 'rgba(212,160,23,0.30)' }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full font-tamil-serif outline-none transition-all duration-250"
                  style={{
                    background: 'rgba(20, 14, 9, 0.55)',
                    border: '1px solid rgba(212,160,23,0.14)',
                    borderRadius: '10px',
                    color: '#F0DFC0',
                    fontSize: '13.5px',
                    padding: '13px 14px 13px 38px',
                    caretColor: '#D4A017',
                  }}
                  onFocus={e => {
                    e.target.style.border = '1px solid rgba(212,160,23,0.5)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(212,160,23,0.08)';
                    e.target.style.background = 'rgba(24, 17, 10, 0.70)';
                  }}
                  onBlur={e => {
                    e.target.style.border = '1px solid rgba(212,160,23,0.14)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = 'rgba(20, 14, 9, 0.55)';
                  }}
                />
              </div>
            </div>

            {/* Password field */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-2">
                <label
                  className="font-semibold"
                  style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(212,160,23,0.65)', textTransform: 'uppercase' }}
                >
                  கடவுச்சொல் · Password
                </label>
                <span
                  className="font-tamil-serif cursor-pointer transition-colors duration-200"
                  style={{ fontSize: '10px', color: 'rgba(212,160,23,0.4)' }}
                  onMouseEnter={e => e.target.style.color = 'rgba(212,160,23,0.7)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(212,160,23,0.4)'}
                >
                  மறந்துவிட்டீர்களா?
                </span>
              </div>
              <div className="relative">
                <Lock
                  size={13}
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ left: '14px', color: 'rgba(212,160,23,0.30)' }}
                />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full font-tamil-serif outline-none transition-all duration-250"
                  style={{
                    background: 'rgba(20, 14, 9, 0.55)',
                    border: '1px solid rgba(212,160,23,0.14)',
                    borderRadius: '10px',
                    color: '#F0DFC0',
                    fontSize: '13.5px',
                    padding: '13px 42px 13px 38px',
                    caretColor: '#D4A017',
                  }}
                  onFocus={e => {
                    e.target.style.border = '1px solid rgba(212,160,23,0.5)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(212,160,23,0.08)';
                    e.target.style.background = 'rgba(24, 17, 10, 0.70)';
                  }}
                  onBlur={e => {
                    e.target.style.border = '1px solid rgba(212,160,23,0.14)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = 'rgba(20, 14, 9, 0.55)';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ right: '14px', color: 'rgba(90,65,45,0.8)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(212,160,23,0.7)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(90,65,45,0.8)'}
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 px-4 py-3 rounded-xl font-tamil-serif"
                style={{
                  fontSize: '12px',
                  border: '1px solid rgba(220,38,38,0.25)',
                  background: 'rgba(220,38,38,0.07)',
                  color: '#F87171',
                  lineHeight: 1.5,
                }}
              >
                {error}
              </motion.div>
            )}

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={!submitting ? { scale: 1.015 } : {}}
              whileTap={!submitting ? { scale: 0.985 } : {}}
              className="w-full flex items-center justify-center gap-2.5 font-tamil-serif font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: submitting ? 'rgba(196,144,16,0.6)' : 'linear-gradient(135deg, #B8870B 0%, #E8B820 40%, #D4A017 100%)',
                borderRadius: '10px',
                color: '#1A1005',
                fontSize: '13.5px',
                padding: '13px 24px',
                letterSpacing: '0.02em',
                boxShadow: submitting ? 'none' : '0 4px 20px rgba(212,160,23,0.22)',
              }}
              onMouseEnter={e => { if (!submitting) e.currentTarget.style.boxShadow = '0 4px 28px rgba(212,160,23,0.40)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = submitting ? 'none' : '0 4px 20px rgba(212,160,23,0.22)'; }}
            >
              {submitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 rounded-full"
                  style={{ border: '2px solid rgba(26,16,5,0.25)', borderTopColor: '#1A1005' }}
                />
              ) : (
                <>
                  உள்நுழைக
                  <ArrowRight size={14} strokeWidth={2.5} />
                </>
              )}
            </motion.button>

          </form>

          {/* ── Divider ── */}
          <div className="flex items-center gap-3 mt-7 mb-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(212,160,23,0.09)' }} />
            <span className="font-tamil-serif" style={{ fontSize: '11px', color: 'rgba(212,160,23,0.28)' }}>
              அல்லது
            </span>
            <div className="flex-1 h-px" style={{ background: 'rgba(212,160,23,0.09)' }} />
          </div>

          {/* ── Sign up link ── */}
          <p className="text-center font-tamil-serif" style={{ fontSize: '12.5px', color: 'rgba(245,230,204,0.30)' }}>
            கணக்கு இல்லையா?{' '}
            <Link
              to="/signup"
              className="font-semibold transition-colors duration-200"
              style={{ color: 'rgba(212,160,23,0.75)' }}
              onMouseEnter={e => e.target.style.color = '#FFD54F'}
              onMouseLeave={e => e.target.style.color = 'rgba(212,160,23,0.75)'}
            >
              பதிவு செய்க
            </Link>
          </p>

        </div>
      </motion.div>

      {/* ── Bottom gold accent ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(212,160,23,0.3) 50%, transparent 90%)' }}
      />
    </div>
  );
}
