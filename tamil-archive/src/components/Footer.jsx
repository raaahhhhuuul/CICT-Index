import { motion } from 'framer-motion';
import { BookOpen, Mail, Phone, Globe, GitBranch, Heart } from 'lucide-react';

const KOLAM_PATTERN = ['◉ ◌ ◉ ◌ ◉', '◌ ◉ ◌ ◉ ◌', '◉ ◌ ◉ ◌ ◉'];

export default function Footer({ darkMode }) {
  const links = {
    நூல்கள்: ['திருக்குறள்', 'சிலப்பதிகாரம்', 'மணிமேகலை', 'புறநானூறு', 'தொல்காப்பியம்'],
    தேடல்:   ['சொல் தேடல்', 'மேம்பட்ட தேடல்', 'பாடல் தேடல்', 'ஆசிரியர் தேடல்'],
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
      {/* Top gold line */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #D4A017, #FFD54F, #D4A017, transparent)' }}
      />

      {/* Kolam motif */}
      <div className="text-center pt-9 pb-5 opacity-18">
        {KOLAM_PATTERN.map((row, i) => (
          <p key={i} className="text-[#D4A017] text-xs tracking-[0.55em] leading-6">{row}</p>
        ))}
      </div>

      <div className="cx pt-8 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6B0F1A] to-[#D4A017] flex items-center justify-center flex-shrink-0">
                <BookOpen size={18} className="text-white" />
              </div>
              <div>
                <p className="text-[#FFD54F] font-tamil-serif font-bold text-base leading-tight">
                  செவ்வியல் தமிழ்
                </p>
                <p className="text-[#D4A017]/55 text-[9px] tracking-[0.18em] uppercase mt-0.5">
                  Classical Tamil Archive
                </p>
              </div>
            </div>
            <p className="text-[#F5E6CC]/45 text-[12px] leading-relaxed font-tamil-serif mb-6">
              செம்மொழித் தமிழாய்வு மத்திய நிறுவனம் — இணையவழிச் செவ்வியல் தமிழ் இலக்கியங்களை பாதுகாக்கும் டிஜிட்டல் தேடறைவு.
            </p>
            <div className="flex items-center gap-2.5">
              {[Globe, GitBranch, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, y: -1 }}
                  className="w-8 h-8 rounded-full border border-[#D4A017]/18 flex items-center justify-center text-[#D4A017]/45 hover:text-[#D4A017] hover:border-[#D4A017]/45 transition-all duration-200"
                >
                  <Icon size={13} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="font-tamil-serif font-semibold text-[#D4A017] text-sm mb-5 flex items-center gap-2">
                <span className="w-4 h-px bg-[#D4A017]" />
                {title}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4 }}
                      className="text-[#F5E6CC]/42 hover:text-[#D4A017] text-[12px] font-tamil-serif transition-colors inline-block"
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
        <div className="border-t border-[#D4A017]/12 pt-7 mb-7">
          <div className="flex flex-wrap gap-6 justify-center">
            {[
              { icon: Mail,  text: 'contact@cict.in'    },
              { icon: Phone, text: '+91 44 2345 6789'   },
              { icon: Globe, text: 'www.cict.in'        },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-[#D4A017]/45 text-xs">
                <Icon size={11} className="text-[#D4A017]/60" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#F5E6CC]/22">
          <p className="font-tamil-serif text-center sm:text-left">
            © 2024 செம்மொழித் தமிழாய்வு மத்திய நிறுவனம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.
          </p>
          <p className="flex items-center gap-1 flex-shrink-0">
            Made with <Heart size={9} className="text-[#6B0F1A] fill-[#6B0F1A] mx-0.5" /> for Tamil Heritage
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
