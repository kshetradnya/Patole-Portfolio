import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';


const PhilosophySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="min-h-screen text-cream py-24 px-4 md:py-36 md:px-8 relative z-20 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0F0F0F' }}
    >
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-bg opacity-60 pointer-events-none" />

      {/* Glow elements */}
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,160,32,0.05) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(196,132,26,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-[1300px] mx-auto w-full relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-mono uppercase tracking-[0.4em] md:tracking-[0.5em] text-[10px] md:text-xs text-cream/30 mb-10 md:mb-14"
        >
          Vivek Patole · Engineer · Leader
        </motion.p>

        <div className="relative">
          <motion.h2
            style={{ y: y1 }}
            className="font-syne font-800 text-[clamp(2.5rem,10vw,10rem)] leading-[0.85] uppercase tracking-tighter"
          >
            PIONEERING THE
          </motion.h2>

          <motion.div
            style={{ opacity }}
            className="font-cormorant italic text-[clamp(1.5rem,6vw,6rem)] text-gold leading-none my-6 md:my-8"
          >
            Digital &amp; Physical
          </motion.div>

          <motion.h2
            style={{ y: y2 }}
            className="font-syne font-800 text-[clamp(2.5rem,10vw,10rem)] leading-[0.85] uppercase tracking-tighter"
          >
            FRONTIERS.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 md:mt-28 max-w-2xl font-inter text-base md:text-lg text-cream/50 leading-relaxed px-4"
        >
          From the concrete pillars of India's industrial backbone to the precision of digital engineering workflows — Vivek Patole has spent 35+ years building systems, teams, and legacies that refuse to compromise.
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="mt-16 w-px h-24 md:h-32"
          style={{ background: 'linear-gradient(to bottom, #E8A020, transparent)' }}
        />

        {/* Creator CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-10 flex items-center gap-6"
        >
          <button
            onClick={() => document.getElementById('creator')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full border font-mono text-xs uppercase tracking-[0.2em] transition-all duration-400 hover:scale-105"
            style={{ borderColor: 'rgba(0,212,255,0.3)', color: '#00d4ff', background: 'rgba(0,212,255,0.05)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
            Kshetradnya's Creator Space
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-end mt-24 border-t px-8 lg:px-16 pt-8 gap-4 relative z-10"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/20">© {new Date().getFullYear()} Patole Family</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/20 text-center sm:text-right">
          Designed & Engineered by{' '}
          <button
            onClick={() => document.getElementById('creator')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[#00d4ff]/60 hover:text-[#00d4ff] transition-colors duration-300 bg-transparent border-none cursor-pointer font-mono text-[10px] uppercase tracking-[0.25em]"
          >
            Kshetradnya
          </button>
        </p>
      </footer>
    </section>
  );
};

export default PhilosophySection;
