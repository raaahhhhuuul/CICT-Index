import { motion, AnimatePresence } from 'framer-motion';

const LETTERS = ['த', 'மி', 'ழ்'];

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1F0508, #3D0B13, #6B0F1A)' }}
        >
          {/* Spinning ring */}
          <div className="relative w-24 h-24 mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full"
              style={{
                border: '2px solid transparent',
                borderTopColor: '#D4A017',
                borderRightColor: '#FFD54F',
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-3 rounded-full"
              style={{
                border: '1px solid transparent',
                borderBottomColor: '#D4A017',
                borderLeftColor: '#B55239',
              }}
            />

            {/* Center letters */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex gap-0.5">
                {LETTERS.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: [0, 1, 0], y: [5, 0, -5] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }}
                    className="font-tamil-serif font-bold text-[#D4A017]"
                    style={{ fontSize: '1.1rem' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#D4A017]/70 text-xs tracking-[0.4em] font-tamil-serif"
          >
            தேடல் தொடங்குகிறது...
          </motion.p>

          {/* Loading bar */}
          <div className="mt-6 w-48 h-0.5 bg-[#D4A017]/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full w-1/2 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, #D4A017, transparent)' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
