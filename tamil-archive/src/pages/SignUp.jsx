import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, BookOpen, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import TamilCursor from '../components/cursor/TamilCursor';

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: (i * 8.33 + 6) % 100,
  y: (i * 13.2 + 4) % 100,
  char: ['ம', 'ழ', 'க', 'அ', 'த', 'இ', 'ண', 'ப'][i % 8],
  size: 10 + (i % 3) * 3,
  delay: (i * 0.32) % 3,
  duration: 5 + (i % 3) * 1.5,
}));

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
  const navigate         = useNavigate();

  if (user) return <Navigate to="/dashboard" replace />;

  const passwordsMatch  = password && confirmPass && password === confirmPass;
  const passwordStrong  = password.length >= 6;

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

  const inputCls = [
    'w-full rounded-xl text-sm text-[#F5E6CC] placeholder-[#5A4535] outline-none transition-all duration-300',
    'bg-[#1E1812]/70 border border-[#3A2D22] font-tamil-serif',
    'focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017]/18',
    'py-4',
  ].join(' ');

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-5 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #0D0A07 0%, #1A1510 30%, #2D1F0E 65%, #3D1A0A 100%)' }}
    >
      <TamilCursor />

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #D4A017, #FFD54F, #D4A017, transparent)' }}
      />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="absolute font-tamil-serif select-none"
            style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size, color: 'rgba(212,160,23,0.12)' }}
            animate={{ y: [0, -14, 0], rotate: [0, 180, 360], opacity: [0.15, 0.40, 0.15] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            {p.char}
          </motion.span>
        ))}
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(212,160,23,0.07) 0%, transparent 70%)' }}
      />

      {/* Logo */}
      <Link to="/" className="absolute top-6 left-6 sm:top-7 sm:left-8">
        <motion.div whileHover={{ scale: 1.04 }} className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6B0F1A] to-[#D4A017] flex items-center justify-center shadow-md">
            <BookOpen size={17} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-[11px] font-semibold font-tamil-serif text-[#FFD54F] leading-none tracking-wide">செவ்வியல்</p>
            <p className="text-[9px] text-[#D4A017]/65 leading-none mt-0.5 tracking-wider uppercase">Tamil Archive</p>
          </div>
        </motion.div>
      </Link>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[580px] relative z-10"
      >
        <div
          className="rounded-3xl"
          style={{
            background: 'rgba(38,28,22,0.78)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(212,160,23,0.20)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.50), 0 0 60px rgba(212,160,23,0.04)',
            padding: 'clamp(2.5rem, 5vw, 4rem) clamp(2rem, 5vw, 3.5rem)',
          }}
        >
          {/* Header */}
          <div className="text-center mb-9">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #6B0F1A 0%, #D4A017 100%)',
                boxShadow: '0 0 32px rgba(212,160,23,0.32)',
              }}
            >
              <span className="font-tamil-serif text-white text-2xl font-bold select-none">ப</span>
            </motion.div>
            <h1 className="font-tamil-serif text-[1.6rem] font-bold text-[#FFD54F] mb-1.5">பதிவு செய்க</h1>
            <p className="text-[#D4A017]/48 text-[9px] tracking-[0.34em] uppercase">Create Your Account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {/* Name */}
            <div>
              <label className="block text-[9px] font-semibold text-[#D4A017]/60 tracking-[0.22em] uppercase mb-2.5">
                பெயர் / Name
              </label>
              <div className="relative">
                <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A017]/38 pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="உங்கள் பெயர்"
                  required
                  className={`${inputCls} pl-11 pr-4`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[9px] font-semibold text-[#D4A017]/60 tracking-[0.22em] uppercase mb-2.5">
                மின்னஞ்சல் / Email
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A017]/38 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className={`${inputCls} pl-11 pr-4`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[9px] font-semibold text-[#D4A017]/60 tracking-[0.22em] uppercase mb-2.5">
                கடவுச்சொல் / Password
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A017]/38 pointer-events-none" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="குறைந்தது 6 எழுத்துக்கள்"
                  required
                  className={`${inputCls} pl-11 pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5A4535] hover:text-[#D4A017] transition-colors"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {/* Strength indicator */}
              {password && (
                <div className="mt-2 flex items-center gap-1.5">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-0.5 flex-1 rounded-full transition-all duration-300"
                      style={{
                        background: password.length > i * 3
                          ? password.length >= 10 ? '#D4A017' : password.length >= 6 ? '#B55239' : '#7A5C43'
                          : 'rgba(212,160,23,0.10)',
                      }}
                    />
                  ))}
                  <span className="text-[10px] text-[#7A5C43] ml-1">
                    {password.length >= 10 ? 'வலிமை' : password.length >= 6 ? 'நடுத்தரம்' : 'பலவீனம்'}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[9px] font-semibold text-[#D4A017]/60 tracking-[0.22em] uppercase mb-2.5">
                கடவுச்சொல் உறுதி / Confirm Password
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A017]/38 pointer-events-none" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="மீண்டும் உள்ளிடுக"
                  required
                  className={`${inputCls} pl-11 pr-14`}
                  style={{ borderColor: confirmPass ? (passwordsMatch ? 'rgba(212,160,23,0.45)' : 'rgba(220,38,38,0.38)') : undefined }}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {confirmPass && passwordsMatch && <Check size={12} className="text-[#D4A017]" />}
                  <button
                    type="button"
                    onClick={() => setShowConfirm(v => !v)}
                    className="text-[#5A4535] hover:text-[#D4A017] transition-colors"
                  >
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 rounded-xl text-xs font-tamil-serif border border-red-500/28 bg-red-500/8 text-red-400"
              >
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={!submitting ? { scale: 1.02, boxShadow: '0 0 32px rgba(212,160,23,0.52)' } : {}}
              whileTap={!submitting ? { scale: 0.98 } : {}}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-bold font-tamil-serif text-[#1F1B16] transition-all duration-300 disabled:opacity-55 disabled:cursor-not-allowed mt-2 min-h-[56px]"
              style={{ background: 'linear-gradient(135deg, #C49010 0%, #FFD54F 50%, #D4A017 100%)' }}
            >
              {submitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 rounded-full border-2 border-[#1F1B16]/28 border-t-[#1F1B16]"
                />
              ) : (
                <>
                  கணக்கு உருவாக்கு
                  <ArrowRight size={15} />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="flex-1 h-px bg-[#D4A017]/10" />
            <span className="text-[#D4A017]/38 text-xs font-tamil-serif">அல்லது</span>
            <div className="flex-1 h-px bg-[#D4A017]/10" />
          </div>

          {/* Sign in link */}
          <p className="text-center text-xs text-[#F5E6CC]/32 font-tamil-serif">
            ஏற்கனவே கணக்கு உள்ளதா?{' '}
            <Link
              to="/signin"
              className="text-[#D4A017] hover:text-[#FFD54F] font-semibold transition-colors duration-200"
            >
              உள்நுழைவு
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #D4A017, transparent)' }}
      />
    </div>
  );
}
