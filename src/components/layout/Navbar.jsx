import React, { useState } from 'react';
import { useAccent } from '../../context/AccentContext';
import MenuOverlay from './MenuOverlay';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { accent } = useAccent();

  return (
    <>
      <header className={`fixed top-0 w-full p-6 lg:px-12 z-50 transition-colors duration-300 ${menuOpen ? 'text-cream mix-blend-normal' : 'text-cream mix-blend-difference'}`}>
        <nav className="flex justify-between items-center w-full mx-auto">
          {/* Logo */}
          <motion.a 
            href="#" 
            className="font-anton text-2xl md:text-3xl tracking-wider select-none relative z-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            PATOLE<span style={{ color: accent }}>.</span>
          </motion.a>
          
          {/* Menu Toggle */}
          <div className="flex items-center gap-8 z-50 relative">
            <span className="hidden md:block font-inter text-xs font-semibold tracking-[0.2em] uppercase">
              FAMILY PORTFOLIO
            </span>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="group flex items-center gap-3 Focus:outline-none"
            >
              <span className="font-inter text-xs font-bold tracking-[0.2em] relative overflow-hidden">
                <span className="block transition-transform duration-300 group-hover:-translate-y-[120%]">
                  {menuOpen ? 'CLOSE' : 'MENU'}
                </span>
                <span className="absolute inset-0 block transition-transform duration-300 translate-y-[120%] group-hover:translate-y-0" style={{ color: accent }}>
                  {menuOpen ? 'CLOSE' : 'MENU'}
                </span>
              </span>
              
              {/* Animated Hamburger/Close Lines */}
              <div className="w-8 h-4 relative flex flex-col justify-between overflow-hidden">
                <motion.span 
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="w-full h-[2px] bg-current origin-center transition-all duration-300"
                />
                <motion.span 
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-[2px] bg-current transition-all duration-300"
                />
                <motion.span 
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="w-full h-[2px] bg-current origin-center transition-all duration-300"
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
