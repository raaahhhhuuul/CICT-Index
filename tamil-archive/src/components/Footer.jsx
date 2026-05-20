import { motion } from 'framer-motion';
import { BookOpen, Mail, Phone, Globe, GitBranch, Heart } from 'lucide-react';

const KOLAM_PATTERN = [
  '◉ ◌ ◉ ◌ ◉',
  '◌ ◉ ◌ ◉ ◌',
  '◉ ◌ ◉ ◌ ◉',
];

export default function Footer({ darkMode }) {
  const links = {
    நூல்கள்: ['திருக்குறள்', 'சிலப்பதிகாரம்', 'மணிமேகலை', 'புறநானூறு', 'தொல்காப்பியம்'],
    தேடல்: ['சொல் தேடல்', 'மேம்பட்ட தேடல்', 'பாடல் தேடல்', 'ஆசிரியர் தேடல்'],
    தொடர்பு: ['எங்களை பற்றி', 'தொடர்பு கொள்ளவும்', 'உதவி', 'கருத்து தெரிவிக்கவும்'],
  };

  return (
    <footer
      id="footer"
      className="relative overflow-hidden"
      style={{
        background: darkMode
          ? 'linear-gradient(180deg, #1F1B16 0%, #0D0A07 100%)'
          : 'linear-gradient(180deg, #3D0B13 0%, #1F0508 100%)',
      }}
    >
      {/* Top border */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #D4A017, #FFD54F, #D4A017, transparent)' }}
      />

      {/* Decorative kolam top */}
      <div className="text-center pt-8 pb-4 opacity-20">
        {KOLAM_PATTERN.map((row, i) => (
          <p key={i} className="text-[#D4A017] text-xs tracking-[0.5em] leading-6">
            {row}
          </p>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6B0F1A] to-[#D4A017] flex items-center justify-center">
                <BookOpen size={18} className="text-white" />
              </div>
              <div>
                <p className="text-[#FFD54F] font-tamil-serif font-bold text-base leading-tight">
                  செவ்வியல் தமிழ்
                </p>
                <p className="text-[#D4A017]/60 text-[10px] tracking-wider">CLASSICAL TAMIL ARCHIVE</p>
              </div>
            </div>
            <p className="text-[#F5E6CC]/50 text-xs leading-relaxed font-tamil-serif mb-4">
              செம்மொழித் தமிழாய்வு மத்திய நிறுவனம் — இணையவழிச் செவ்வியல் தமிழ் இலக்கியங்களை பாதுகாக்கும் டிஜிட்டல் தேடறைவு.
            </p>
            <div className="flex items-center gap-3">
              {[Globe, GitBranch, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, color: '#D4A017' }}
                  className="w-8 h-8 rounded-full border border-[#D4A017]/20 flex items-center justify-center text-[#D4A017]/50 hover:text-[#D4A017] hover:border-[#D4A017]/50 transition-colors"
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="font-tamil-serif font-semibold text-[#D4A017] text-sm mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-[#D4A017]" />
                {title}
              </h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4 }}
                      className="text-[#F5E6CC]/45 hover:text-[#D4A017] text-xs font-tamil-serif transition-colors inline-block"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className={`border-t border-[#D4A017]/15 pt-6 mb-6`}>
          <div className="flex flex-wrap gap-5 justify-center">
            {[
              { icon: Mail, text: 'contact@cict.in' },
              { icon: Phone, text: '+91 44 2345 6789' },
              { icon: Globe, text: 'www.cict.in' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-[#D4A017]/50 text-xs">
                <Icon size={12} className="text-[#D4A017]/70" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#F5E6CC]/25">
          <p className="font-tamil-serif">
            © 2024 செம்மொழித் தமிழாய்வு மத்திய நிறுவனம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart size={10} className="text-[#6B0F1A] fill-[#6B0F1A]" /> for Tamil Heritage
          </p>
        </div>
      </div>

      {/* Bottom gold accent */}
      <div
        className="h-0.5 w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #D4A017, transparent)' }}
      />
    </footer>
  );
}
