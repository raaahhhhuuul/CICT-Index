import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, BookOpen, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import TamilCursor from '../components/cursor/TamilCursor';

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: (i * 9.5 + 6) % 100,
  y: (i * 13.6 + 4) % 100,
  char: ['ம', 'ழ', 'க', 'அ', 'த', 'இ', 'ண', 'ப', 'உ', 'ஆ'][i % 10],
  size: 10 + (i % 3) * 2.5,
  delay: (i * 0.38) % 3.5,
  duration: 6 + (i % 3) * 1.5,
}));

/* Shared input style factory — applied via onFocus/onBlur for clean focus ring */
const baseInputStyle = {
  background: 'rgba(20, 14, 9, 0.55)',
  border: '1px solid rgba(212,160,23,0.14)',
  borderRadius: '10px',
  color: '#F0DFC0',
  fontSize: '13.5px',
  padding: '13px 14px',
  caretColor: '#D4A017',
  width: '100%',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border 0.22s, box-shadow 0.22s, background 0.22s',
};
const focusStyle  = { border: '1px solid rgba(212,160,23,0.50)', boxShadow: '0 0 0 3px rgba(212,160,23,0.08)', background: 'rgba(24,17,10,0.70)' };
const blurStyle   = { border: '1px solid rgba(212,160,23,0.14)', boxShadow: 'none', background: 'rgba(20,14,9,0.55)' };

function Field({ label, icon: Icon, children }) {
  return (
    <div className="mb-5">
      <label
        className="block font-semibold mb-2"
        style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(212,160,23,0.65)', textTransform: 'uppercase' }}
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          size={13}
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: '14px', color: 'rgba(212,160,23,0.28)' }}
        />
        {children}
      </div>
    </div>
  );
}

export default function SignUp() {
  const [name,        setName]        = useState('');
  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error,       setError]       = useState('');
  const [submitting,  setSubmitting]  = useState(false);

  const { signup, user } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/dashboard" replace />;

  const passwordsMatch = password && confirmPass && password === confirmPass;
  const passwordStrong = password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!passwordStrong) { setError('கடவுச்சொல் குறைந்தது 6 எழுத்துக்கள் இருக்க வேண்டும்'); return; }
    if (password !== confirmPass) { setError('கடவுச்சொற்கள் பொருந்தவில்லை'); return; }
    setSubmitting(true);
    try {
      signup(name, email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  const applyFocus = (e) => Object.assign(e.target.style, focusStyle);
  const applyBlur  = (e) => Object.assign(e.target.style, blurStyle);

  return (
    <div
      className="min-h-screen flex items-center justify-center py-16 px-5 relative overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #0B0806 0%, #17120D 35%, #261A0C 70%, #311407 100%)' }}
    >
      <TamilCursor />

      {/* Top gold accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 5%, #D4A017 40%, #FFD54F 50%, #D4A017 60%, transparent 95%)' }}
      />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="absolute font-tamil-serif select-none"
            style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size, color: 'rgba(212,160,23,0.09)' }}
            animate={{ y: [0, -12, 0], opacity: [0.12, 0.28, 0.12] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            {p.char}
          </motion.span>
        ))}
      </div>

      {/* Soft radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(212,160,23,0.06) 0%, transparent 68%)' }}
      />

      {/* Logo */}
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

      {/* Auth card */}
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
              <span className="font-tamil-serif text-white font-bold select-none" style={{ fontSize: '1.35rem' }}>ப</span>
            </motion.div>
            <h1
              className="font-tamil-serif font-bold text-[#FFD54F] mb-1.5"
              style={{ fontSize: '1.45rem', letterSpacing: '0.01em', lineHeight: 1.2 }}
            >
              பதிவு செய்க
            </h1>
            <p className="text-[#D4A017]/45 uppercase" style={{ fontSize: '9px', letterSpacing: '0.3em' }}>
              Create Your Account
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

            {/* Name */}
            <Field label="பெயர் · Name" icon={User}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="உங்கள் பெயர்"
                required
                className="font-tamil-serif"
                style={{ ...baseInputStyle, paddingLeft: '38px' }}
                onFocus={applyFocus}
                onBlur={applyBlur}
              />
            </Field>

            {/* Email */}
            <Field label="மின்னஞ்சல் · Email" icon={Mail}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="font-tamil-serif"
                style={{ ...baseInputStyle, paddingLeft: '38px' }}
                onFocus={applyFocus}
                onBlur={applyBlur}
              />
            </Field>

            {/* Password */}
            <div className="mb-5">
              <label
                className="block font-semibold mb-2"
                style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(212,160,23,0.65)', textTransform: 'uppercase' }}
              >
                கடவுச்சொல் · Password
              </label>
              <div className="relative">
                <Lock
                  size={13}
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ left: '14px', color: 'rgba(212,160,23,0.28)' }}
                />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="குறைந்தது 6 எழுத்துக்கள்"
                  required
                  className="font-tamil-serif"
                  style={{ ...baseInputStyle, paddingLeft: '38px', paddingRight: '42px' }}
                  onFocus={applyFocus}
                  onBlur={applyBlur}
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
              {/* Strength bar */}
              {password && (
                <div className="mt-2.5 flex items-center gap-1.5">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-[2px] flex-1 rounded-full transition-all duration-300"
                      style={{
                        background: password.length > i * 3
                          ? password.length >= 10 ? '#D4A017' : password.length >= 6 ? '#B55239' : '#5A4535'
                          : 'rgba(212,160,23,0.08)',
                      }}
                    />
                  ))}
                  <span
                    className="font-tamil-serif ml-1.5"
                    style={{ fontSize: '10px', color: password.length >= 10 ? '#D4A017' : password.length >= 6 ? '#B55239' : '#7A5C43' }}
                  >
                    {password.length >= 10 ? 'வலிமை' : password.length >= 6 ? 'நடுத்தரம்' : 'பலவீனம்'}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-7">
              <label
                className="block font-semibold mb-2"
                style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(212,160,23,0.65)', textTransform: 'uppercase' }}
              >
                உறுதிப்படுத்தல் · Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={13}
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ left: '14px', color: 'rgba(212,160,23,0.28)' }}
                />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="மீண்டும் உள்ளிடுக"
                  required
                  className="font-tamil-serif"
                  style={{
                    ...baseInputStyle,
                    paddingLeft: '38px',
                    paddingRight: '52px',
                    ...(confirmPass ? { border: `1px solid ${passwordsMatch ? 'rgba(212,160,23,0.40)' : 'rgba(220,38,38,0.35)'}` } : {}),
                  }}
                  onFocus={applyFocus}
                  onBlur={applyBlur}
                />
                <div className="absolute top-1/2 -translate-y-1/2 flex items-center gap-1.5" style={{ right: '12px' }}>
                  {confirmPass && passwordsMatch && (
                    <Check size={12} style={{ color: '#D4A017' }} />
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirm(v => !v)}
                    className="transition-colors duration-200"
                    style={{ color: 'rgba(90,65,45,0.8)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(212,160,23,0.7)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(90,65,45,0.8)'}
                  >
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 font-tamil-serif"
                style={{
                  fontSize: '12px',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(220,38,38,0.25)',
                  background: 'rgba(220,38,38,0.07)',
                  color: '#F87171',
                  lineHeight: 1.5,
                }}
              >
                {error}
              </motion.div>
            )}

            {/* Submit */}
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
                  கணக்கு உருவாக்கு
                  <ArrowRight size={14} strokeWidth={2.5} />
                </>
              )}
            </motion.button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 mt-7 mb-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(212,160,23,0.09)' }} />
            <span className="font-tamil-serif" style={{ fontSize: '11px', color: 'rgba(212,160,23,0.28)' }}>
              அல்லது
            </span>
            <div className="flex-1 h-px" style={{ background: 'rgba(212,160,23,0.09)' }} />
          </div>

          {/* Sign in link */}
          <p className="text-center font-tamil-serif" style={{ fontSize: '12.5px', color: 'rgba(245,230,204,0.30)' }}>
            ஏற்கனவே கணக்கு உள்ளதா?{' '}
            <Link
              to="/signin"
              className="font-semibold transition-colors duration-200"
              style={{ color: 'rgba(212,160,23,0.75)' }}
              onMouseEnter={e => e.target.style.color = '#FFD54F'}
              onMouseLeave={e => e.target.style.color = 'rgba(212,160,23,0.75)'}
            >
              உள்நுழைவு
            </Link>
          </p>

        </div>
      </motion.div>

      {/* Bottom gold accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(212,160,23,0.3) 50%, transparent 90%)' }}
      />
    </div>
  );
}
