import React from 'react';
import { motion } from 'framer-motion';

const MarqueeText = ({ text, reverse = false }) => {
  return (
    <div className="relative w-full overflow-hidden whitespace-nowrap py-3 md:py-6 flex -rotate-1 scale-105 z-30"
      style={{ background: '#0F0F0F', borderTop: '1px solid rgba(232,160,32,0.15)', borderBottom: '1px solid rgba(232,160,32,0.15)' }}>
      <motion.div
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
        className="flex whitespace-nowrap"
      >
        <span className="font-syne font-800 text-3xl md:text-7xl tracking-widest uppercase px-8"
          style={{ color: 'rgba(232,160,32,0.15)' }}>
          {text} &nbsp;◆&nbsp; {text} &nbsp;◆&nbsp; {text} &nbsp;◆&nbsp; {text} &nbsp;◆&nbsp;
        </span>
        <span className="font-syne font-800 text-3xl md:text-7xl tracking-widest uppercase px-8"
          style={{ color: 'rgba(232,160,32,0.15)' }}>
          {text} &nbsp;◆&nbsp; {text} &nbsp;◆&nbsp; {text} &nbsp;◆&nbsp; {text} &nbsp;◆&nbsp;
        </span>
      </motion.div>
    </div>
  );
};

export default MarqueeText;
