import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, slideUpString } from '../../utils/animations';

const AnimatedHeading = ({ text1, text2, accentWord, className = "text-massive", style1, style2 }) => {
  return (
    <motion.h1 
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={`${className} flex flex-col w-full items-center justify-center pointer-events-none z-10 px-4`}
    >
      <div className="overflow-hidden w-full flex justify-center pb-2">
        <motion.span variants={slideUpString} className="block text-center whitespace-normal break-words max-w-full transition-colors duration-700" style={style1}>
          {text1}
        </motion.span>
      </div>
      {(text2 || accentWord) && (
        <div className="overflow-hidden w-full flex justify-center pt-2">
          <motion.span variants={slideUpString} className="block text-center whitespace-normal break-words max-w-full transition-colors duration-700" style={style2}>
            {text2} 
            {accentWord && <span className="text-accent-italic text-accent mx-2 lowercase text-[0.6em] whitespace-nowrap">{accentWord}</span>}
          </motion.span>
        </div>
      )}
    </motion.h1>
  );
};

export default AnimatedHeading;
