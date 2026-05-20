import { useState } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, BookOpen, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import TamilCursor from '../components/cursor/TamilCursor';

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  char: ['த', 'மி', 'ழ்', 'அ', 'க', 'ம', 'உ', 'ண'][i % 8],
  size: 12 + Math.random() * 10,
  delay: Math.random() * 3,
  duration: 4 + Math.random() * 3,
}));

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
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

  const inputClass =
    'w-full py-4 rounded-xl text-sm text-[#F5E6CC] placeholder-[#7A5C43] outline-none transition-all duration-300 bg-[#1F1B16]/60 border border-[#3D2F24] focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017]/20 font-tamil-serif';

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0D0A07 0%, #1F1B16 30%, #2D1F0E 60%, #3D1A0A 100%)' }}
    >
      <TamilCursor />

      {/* Gold top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #D4A017, #FFD54F, #D4A017, transparent)' }}
      />

      {/* Floating Tamil particles */}
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute font-tamil-serif pointer-events-none select-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size, color: 'rgba(212,160,23,0.15)' }}
          animate={{ y: [0, -18, 0], rotate: [0, 180, 360], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {p.char}
        </motion.span>
      ))}

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,160,23,0.07) 0%, transparent 70%)' }}
      />

      {/* Logo */}
      <Link to="/" className="absolute top-5 left-5 sm:top-6 sm:left-8">
        <motion.div whileHover={{ scale: 1.04 }} className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6B0F1A] to-[#D4A017] flex items-center justify-center shadow-md">
            <BookOpen size={18} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold font-tamil-serif text-[#FFD54F] leading-none">செவ்வியல்</p>
            <p className="text-[10px] text-[#D4A017] leading-none mt-0.5">Tamil Archive</p>
          </div>
        </motion.div>
      </Link>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        <div
          className="rounded-2xl p-10 sm:p-12"
          style={{
            background: 'rgba(45,36,32,0.72)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            border: '1px solid rgba(212,160,23,0.22)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.45), 0 0 50px rgba(212,160,23,0.04)',
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6B0F1A 0%, #D4A017 100%)', boxShadow: '0 0 28px rgba(212,160,23,0.3)' }}
            >
              <span className="font-tamil-serif text-white text-2xl font-bold select-none">உ</span>
            </motion.div>
            <h1 className="font-tamil-serif text-2xl font-bold text-[#FFD54F] mb-1">உள்நுழைவு</h1>
            <p className="text-[#D4A017]/55 text-[10px] tracking-[0.3em] uppercase">Sign In to Your Account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Email */}
            <div>
              <label className="block text-[10px] font-medium text-[#D4A017]/65 tracking-[0.2em] uppercase mb-2">
                மின்னஞ்சல் / Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4A017]/45 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className={`${inputClass} pl-10 pr-4`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-medium text-[#D4A017]/65 tracking-[0.2em] uppercase mb-2">
                கடவுச்சொல் / Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4A017]/45 pointer-events-none" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`${inputClass} pl-10 pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A5C43] hover:text-[#D4A017] transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 rounded-xl text-xs font-tamil-serif border border-red-500/30 bg-red-500/10 text-red-400"
              >
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={!submitting ? { scale: 1.02, boxShadow: '0 0 28px rgba(212,160,23,0.5)' } : {}}
              whileTap={!submitting ? { scale: 0.98 } : {}}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-bold font-tamil-serif text-[#1F1B16] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{ background: 'linear-gradient(135deg, #D4A017 0%, #FFD54F 50%, #D4A017 100%)' }}
            >
              {submitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 rounded-full border-2 border-[#1F1B16]/30 border-t-[#1F1B16]"
                />
              ) : (
                <>
                  உள்நுழைக
                  <ArrowRight size={15} />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="flex-1 h-px bg-[#D4A017]/12" />
            <span className="text-[#D4A017]/40 text-xs font-tamil-serif">அல்லது</span>
            <div className="flex-1 h-px bg-[#D4A017]/12" />
          </div>

          {/* Sign up link */}
          <p className="text-center text-xs text-[#F5E6CC]/35 font-tamil-serif">
            கணக்கு இல்லையா?{' '}
            <Link
              to="/signup"
              className="text-[#D4A017] hover:text-[#FFD54F] font-semibold transition-colors duration-200"
            >
              பதிவு செய்க
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Bottom gold line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #D4A017, transparent)' }}
      />
    </div>
  );
}
