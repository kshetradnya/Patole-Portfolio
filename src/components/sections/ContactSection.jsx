import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PhilosophySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <section ref={containerRef} className="min-h-screen bg-dark text-cream py-20 px-4 md:py-32 md:px-8 relative z-20 flex flex-col items-center justify-center overflow-hidden rounded-t-[32px] md:rounded-t-[48px] -mt-10" id="philosophy">
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-[var(--accent)] mix-blend-screen rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-[var(--accent-dark)] mix-blend-screen rounded-full blur-[100px] opacity-20" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col items-center text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-inter uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-sm opacity-60 mb-8 md:mb-12"
        >
          The House of Patole
        </motion.p>
        
        <div className="relative">
          <motion.h2 
            style={{ y: y1 }}
            className="font-anton text-[clamp(2.5rem,10vw,10rem)] leading-[0.85] uppercase tracking-tighter mix-blend-difference z-20 relative"
          >
            PIONEERING THE
          </motion.h2>
          
          <motion.div 
            style={{ opacity }}
            className="font-playfair italic text-[clamp(1.5rem,6vw,6rem)] text-[var(--accent)] leading-none my-6 md:my-8 z-10 relative"
          >
            Digital & Physical
          </motion.div>

          <motion.h2 
            style={{ y: y2 }}
            className="font-anton text-[clamp(2.5rem,10vw,10rem)] leading-[0.85] uppercase tracking-tighter mix-blend-difference z-20 relative"
          >
            FRONTIERS.
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 md:mt-32 max-w-2xl text-base md:text-lg font-inter opacity-70 leading-relaxed px-4"
        >
          From the structural integrity of national infrastructure to the bleeding edge of cyber security, academic excellence, and modern web experiences. The Patole family brings absolute dedication and fearless innovation to everything we touch.
        </motion.div>

        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="mt-20 w-px h-32 bg-gradient-to-b from-[var(--accent)] to-transparent"
        />
      </div>

      <footer className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-end mt-24 border-t border-cream/10 pt-8 font-inter text-xs tracking-[0.2em] uppercase font-bold opacity-50 px-8 lg:px-16 gap-4">
        <div>© {new Date().getFullYear()} Patole Family</div>
        <div className="text-center sm:text-right tracking-widest">
          Engineered by <span className="text-[var(--accent)]">Kshetradnya</span>
        </div>
      </footer>
    </section>
  );
};

export default PhilosophySection;
