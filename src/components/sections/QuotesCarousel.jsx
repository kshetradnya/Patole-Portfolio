import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  { text: "Every expert was once a beginner.", author: "Kshetradnya Patole", role: "Student & Web Developer", color: "#00d4ff" },
  { text: "Security is not a product, but a process.", author: "Anrunya Patole", role: "Cyber Security Specialist", color: "#8b5cf6" },
  { text: "Leadership is about making others better as a result of your presence.", author: "Vivek Patole", role: "VP, Tata Projects", color: "#f59e0b" },
  { text: "Education is the most powerful weapon to change the world.", author: "Bhavana Patole", role: "SIAC Director & HOD", color: "#10b981" },
];

const QuotesCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % quotes.length);
  const prev = () => setCurrent((c) => (c - 1 + quotes.length) % quotes.length);

  return (
    <section className="py-32 px-8 bg-cream relative z-20">
      <div className="max-w-4xl mx-auto text-center relative min-h-[300px] flex flex-col items-center justify-center">
        <p className="font-inter uppercase tracking-[0.3em] text-xs text-dark/40 mb-12">Words We Live By</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <p className="font-playfair italic text-3xl md:text-5xl text-dark leading-tight max-w-3xl">
              "{quotes[current].text}"
            </p>
            <div className="mt-10 flex flex-col items-center gap-1">
              <span className="font-anton text-lg tracking-wider" style={{ color: quotes[current].color }}>
                {quotes[current].author}
              </span>
              <span className="font-inter text-xs uppercase tracking-widest text-dark/40">
                {quotes[current].role}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-6 mt-16">
          <button onClick={prev} className="w-12 h-12 rounded-full border border-dark/20 flex items-center justify-center hover:bg-dark hover:text-cream transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="flex gap-2">
            {quotes.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className="w-2 h-2 rounded-full transition-all duration-300" style={{ backgroundColor: i === current ? quotes[current].color : 'rgba(0,0,0,0.15)' }} />
            ))}
          </div>
          <button onClick={next} className="w-12 h-12 rounded-full border border-dark/20 flex items-center justify-center hover:bg-dark hover:text-cream transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuotesCarousel;
