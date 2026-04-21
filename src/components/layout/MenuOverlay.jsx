import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { revealRight } from '../../utils/animations';
import { useAccent } from '../../context/AccentContext';

const MenuOverlay = ({ isOpen, setOpen }) => {
  const { accent } = useAccent();
  const menuLinks = ["HOME", "FAMILY", "TIMELINE", "GALLERY", "PHILOSOPHY"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={revealRight}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-40 bg-dark flex flex-col justify-center px-10 md:px-24 overflow-hidden"
        >
          {/* Topo background hint */}
          <div className="absolute inset-0 opacity-10 bg-topo bg-cover object-cover pointer-events-none mix-blend-screen" />

          <nav className="z-10 flex flex-col items-center md:items-start gap-6 md:gap-8 overflow-y-auto max-h-[80vh] py-10 w-full">
            {menuLinks.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  const targetId = link.toLowerCase();
                  setTimeout(() => {
                    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                  }, 300); // Wait for menu to close slightly
                }}
                className="font-anton text-4xl md:text-8xl tracking-widest text-cream hover:text-accent transition-all duration-300 transform"
                style={{ '--tw-text-opacity': 1 }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + (i * 0.1), ease: "easeOut", duration: 0.6 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#f0efe9'; // cream
                }}
              >
                {link}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;
