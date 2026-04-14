import React from 'react';
import { motion } from 'framer-motion';

const MarqueeText = ({ text, reverse = false }) => {
  return (
    <div className="relative w-full overflow-hidden whitespace-nowrap bg-cream py-6 flex -rotate-2 scale-110 z-30 border-y border-dark/10">
      <motion.div 
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        className="flex whitespace-nowrap"
      >
        <span className="font-anton text-6xl md:text-8xl tracking-widest uppercase text-dark px-8">
          {text} • {text} • {text} • {text} •
        </span>
        <span className="font-anton text-6xl md:text-8xl tracking-widest uppercase text-dark px-8">
          {text} • {text} • {text} • {text} •
        </span>
      </motion.div>
    </div>
  );
};

export default MarqueeText;
