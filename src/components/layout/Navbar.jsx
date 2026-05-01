import React, { useState } from 'react';
import { useAccent } from '../../context/AccentContext';
import MenuOverlay from './MenuOverlay';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { accent } = useAccent();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className="fixed top-0 w-full px-6 py-5 lg:px-12 z-50"
        style={{ mixBlendMode: menuOpen ? 'normal' : 'difference' }}
      >
        <nav className="flex justify-between items-center w-full mx-auto">
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo('home')}
            className="font-syne font-800 text-2xl md:text-3xl tracking-tight select-none relative z-50 text-cream"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
          >
            PATOLE<span style={{ color: accent }}>.</span>
          </motion.button>

          {/* Right controls */}
          <div className="flex items-center gap-6 z-50 relative">
            <span className="hidden lg:block font-mono text-[10px] font-600 tracking-[0.25em] uppercase text-cream">
              Vivek Patole
            </span>

            {/* Creator anchor link */}
            <button
              onClick={() => scrollTo('creator')}
              className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60 hover:text-cream transition-colors duration-300 border border-cream/20 hover:border-cream/50 px-4 py-2 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
              Creator
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="group flex items-center gap-3 focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className="font-mono text-[10px] font-700 tracking-[0.25em] relative overflow-hidden text-cream">
                <span className="block transition-transform duration-300 group-hover:-translate-y-[120%]">
                  {menuOpen ? 'CLOSE' : 'MENU'}
                </span>
                <span
                  className="absolute inset-0 block transition-transform duration-300 translate-y-[120%] group-hover:translate-y-0"
                  style={{ color: accent }}
                >
                  {menuOpen ? 'CLOSE' : 'MENU'}
                </span>
              </span>

              <div className="w-8 h-4 relative flex flex-col justify-between overflow-hidden">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="w-full h-[2px] bg-current origin-center"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  className="w-full h-[2px] bg-current"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="w-full h-[2px] bg-current origin-center"
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      <MenuOverlay isOpen={menuOpen} setOpen={setMenuOpen} />
    </>
  );
};

export default Navbar;
