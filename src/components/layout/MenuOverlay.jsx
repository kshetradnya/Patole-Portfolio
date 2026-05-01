import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { revealRight } from '../../utils/animations';
import { useAccent } from '../../context/AccentContext';

const MenuOverlay = ({ isOpen, setOpen }) => {
  const { accent } = useAccent();

  const menuLinks = [
    { label: "HOME",      id: "home" },
    { label: "VIVEK",     id: "vivek-showcase" },
    { label: "TIMELINE",  id: "timeline" },
    { label: "GALLERY",   id: "gallery" },
    { label: "CREATOR",   id: "creator" },
  ];

  const close = (id) => {
    setOpen(false);
    if (id) {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 340);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={revealRight}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-40 flex flex-col justify-center px-10 md:px-24 overflow-hidden"
          style={{ background: '#0F0F0F' }}
        >
          {/* Blueprint grid */}
          <div className="absolute inset-0 blueprint-bg opacity-50 pointer-events-none" />

          {/* Gold glow */}
          <div
            className="absolute top-1/2 left-0 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(232,160,32,0.05) 0%, transparent 70%)' }}
          />

          <nav className="z-10 flex flex-col items-center md:items-start gap-4 md:gap-5 overflow-y-auto max-h-[80vh] py-10 w-full">
            {menuLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => close(link.id)}
                className="group font-syne font-800 text-left text-[clamp(2.5rem,8vw,6rem)] leading-tight tracking-tight text-cream/75 hover:text-cream transition-colors duration-300 bg-transparent border-none cursor-pointer"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.22 + (i * 0.08), ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
                onMouseEnter={e => e.currentTarget.style.color = accent}
                onMouseLeave={e => e.currentTarget.style.color = ''}
              >
                <span className="font-mono text-[10px] tracking-[0.25em] text-cream/20 mr-3 align-middle">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </motion.button>
            ))}

            {/* Creator highlight */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.22 + (menuLinks.length * 0.08), duration: 0.6 }}
              className="mt-8 pt-8 border-t border-white/07 w-full flex justify-center md:justify-start"
            />
          </nav>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-8 left-10 md:left-24 right-10 flex flex-col sm:flex-row justify-between gap-4 z-10"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/20">
              © {new Date().getFullYear()} Patole
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/20">
              Engineered by Kshetradnya
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;
