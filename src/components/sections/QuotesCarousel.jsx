import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Vivek quotes only ─── */
const quotes = [
  {
    text: "Leadership is about making others better as a result of your presence — and leaving systems stronger than you found them.",
    author: "Vivek Patole",
    role: "VP – Central Engineering, Tata Projects",
    color: "#E8A020",
  },
  {
    text: "Every beam placed, every spec written, every project delivered — is a statement about standards that refuse to compromise.",
    author: "Vivek Patole",
    role: "35+ Years of Infrastructure Leadership",
    color: "#C4841A",
  },
  {
    text: "BIM is not a tool. It is a philosophy — a commitment to precision, collaboration, and accountability at every stage of delivery.",
    author: "Vivek Patole",
    role: "Pioneer in Digital Engineering, India",
    color: "#E8A020",
  },
  {
    text: "The best engineering is invisible. When a structure stands flawlessly for decades, you've done your job.",
    author: "Vivek Patole",
    role: "VP, Tata Projects Limited",
    color: "#C4841A",
  },
];

const AUTO_INTERVAL = 7000;

const QuotesCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);

  const next = () => { setCurrent(c => (c + 1) % quotes.length); setProgress(0); };
  const prev = () => { setCurrent(c => (c - 1 + quotes.length) % quotes.length); setProgress(0); };

  useEffect(() => {
    if (fullscreen) return;
    setProgress(0);
    const interval = setInterval(next, AUTO_INTERVAL);
    const tick = setInterval(() => setProgress(p => Math.min(p + 100 / (AUTO_INTERVAL / 100), 100)), 100);
    return () => { clearInterval(interval); clearInterval(tick); };
  }, [current, fullscreen]);

  const q = quotes[current];

  return (
    <>
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: '#FAF8F4' }}>
        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.025) 0px, rgba(0,0,0,0.025) 1px, transparent 1px, transparent 80px)', opacity: 0.8 }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-dark/25 mb-10">
            // In His Own Words
          </p>

          {/* Progress bar */}
          <div className="w-full h-px bg-dark/10 mb-14 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ width: `${progress}%`, backgroundColor: '#E8A020' }}
              transition={{ duration: 0 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Big quote mark */}
              <span
                className="font-cormorant select-none leading-none"
                style={{ fontSize: '7rem', color: 'rgba(232,160,32,0.12)', lineHeight: 1 }}
              >
                "
              </span>

              <p className="font-cormorant italic text-2xl md:text-4xl lg:text-5xl text-dark/80 leading-tight max-w-3xl -mt-8 px-2">
                {q.text}
              </p>

              <div className="flex flex-col items-center gap-1 mt-10">
                <div className="w-10 h-px mb-4" style={{ backgroundColor: '#E8A020' }} />
                <span className="font-syne font-700 text-base tracking-wide text-dark">
                  {q.author}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-dark/35 mt-1">
                  {q.role}
                </span>
              </div>

              <button
                onClick={() => setFullscreen(true)}
                className="mt-8 font-mono text-[9px] uppercase tracking-[0.25em] text-dark/25 hover:text-dark/50 transition-colors duration-300 flex items-center gap-2"
              >
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                Expand
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-dark/12 flex items-center justify-center hover:border-dark/35 hover:bg-dark hover:text-cream transition-all duration-300 text-dark"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div className="flex gap-2">
              {quotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setProgress(0); }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 28 : 8,
                    height: 8,
                    backgroundColor: i === current ? '#E8A020' : 'rgba(0,0,0,0.15)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-dark/12 flex items-center justify-center hover:border-dark/35 hover:bg-dark hover:text-cream transition-all duration-300 text-dark"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-8"
            style={{ background: '#0F0F0F' }}
            onClick={() => setFullscreen(false)}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 40% 40%, rgba(232,160,32,0.07) 0%, transparent 65%)' }}
            />
            <div
              className="absolute inset-0 blueprint-bg opacity-40 pointer-events-none"
            />

            <div
              className="relative z-10 max-w-4xl text-center"
              onClick={e => e.stopPropagation()}
            >
              <span
                className="font-cormorant select-none"
                style={{ fontSize: '8rem', color: 'rgba(232,160,32,0.12)', lineHeight: 1 }}
              >
                "
              </span>
              <p className="font-cormorant italic text-3xl md:text-5xl lg:text-6xl text-cream/90 leading-tight -mt-10">
                {q.text}
              </p>
              <div className="flex flex-col items-center gap-1 mt-12">
                <div className="w-12 h-px mb-5" style={{ backgroundColor: '#E8A020' }} />
                <span className="font-syne font-700 text-xl text-gold">{q.author}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/30 mt-1">{q.role}</span>
              </div>
              <button
                onClick={() => setFullscreen(false)}
                className="mt-14 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/25 hover:text-cream/60 transition-colors duration-300"
              >
                Close ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuotesCarousel;
