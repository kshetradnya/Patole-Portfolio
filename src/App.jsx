import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AccentProvider } from './context/AccentContext';
import Navbar from './components/layout/Navbar';
import MemberSpotlight from './components/sections/MemberSpotlight';
import GallerySection from './components/sections/GallerySection';
import PhilosophySection from './components/sections/ContactSection';
import HorizontalGallery from './components/sections/HorizontalGallery';
import Timeline from './components/sections/Timeline';
import AchievementBadges from './components/sections/AchievementBadges';
import NumberCounter from './components/sections/NumberCounter';
import QuotesCarousel from './components/sections/QuotesCarousel';
import MarqueeText from './components/ui/MarqueeText';
import NoiseOverlay from './components/effects/NoiseOverlay';
import Preloader from './components/effects/Preloader';
import CustomCursor from './components/effects/CustomCursor';
import ScrollProgressBar from './components/effects/ScrollProgressBar';
import ScrollToTop from './components/effects/ScrollToTop';
import SectionDots from './components/effects/SectionDots';
import ParticleBackground from './components/effects/ParticleBackground';
import KonamiEaster from './components/effects/KonamiEaster';
import VivekShowcase from './components/sections/VivekShowcase';
import CreatorSection from './pages/CreatorPage';
import { familyMembers } from './data/familyData';

/* ── Word-swap animated tagline ──────────────────────── */
const SWAP_WORDS = ['Builders', 'Thinkers', 'Leaders', 'Pioneers'];

const WordSwap = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % SWAP_WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      className="relative inline-block overflow-hidden align-bottom"
      style={{ height: 'clamp(2.2rem, 6vw, 5.5rem)' }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ clipPath: 'inset(0 0 100% 0)', y: 20, opacity: 0 }}
          animate={{ clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1 }}
          exit={{ clipPath: 'inset(100% 0 0 0)', y: -20, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 font-cormorant italic text-gold leading-none"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)' }}
        >
          {SWAP_WORDS[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ── Vivek floating badge ────────────────────────────── */
const VivekHeroBadge = () => (
  <motion.button
    onClick={() => document.getElementById('vivek-showcase')?.scrollIntoView({ behavior: 'smooth' })}
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 1.6, duration: 0.9 }}
    whileHover={{ scale: 1.04 }}
    className="group hidden lg:flex items-center gap-4 glass-gold rounded-2xl px-5 py-4 cursor-pointer"
    style={{ border: '1px solid rgba(232,160,32,0.2)' }}
  >
    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
      <img
        src={`${import.meta.env.BASE_URL}vivek.png`}
        alt="Vivek Patole"
        className="w-full h-full object-cover object-top"
      />
    </div>
    <div>
      <p className="font-syne font-600 text-sm text-cream leading-tight">Vivek Patole</p>
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/70 mt-0.5">
        VP · Tata Projects · Engineer
      </p>
    </div>
    <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gold">
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
      </svg>
    </div>
  </motion.button>
);

/* ── Main App ─────────────────────────────────────────── */
function App() {
  const vivek = familyMembers[0];

  return (
    <AccentProvider>
      <div className="min-h-screen bg-dark">
        <Preloader />
        <ScrollProgressBar />
        <CustomCursor />
        <NoiseOverlay />
        <ScrollToTop />
        <SectionDots />
        <KonamiEaster />
        <Navbar />

        <main>
          {/* ── HERO ───────────────────────────────────── */}
          <section
            id="home"
            className="h-screen flex flex-col justify-center items-center relative overflow-hidden bg-dark"
          >
            <ParticleBackground />
            <div className="absolute inset-0 blueprint-bg opacity-100 pointer-events-none" />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(232,160,32,0.06) 0%, transparent 65%)' }}
            />

            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto w-full">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/55 mb-8"
              >
                VP · Central Engineering · Tata Projects Ltd
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-2"
              >
                <h1 className="font-syne font-800 text-[clamp(3.5rem,14vw,12rem)] leading-[0.88] tracking-tight text-cream">
                  VIVEK
                </h1>
                <h1 className="font-syne font-800 text-[clamp(3.5rem,14vw,12rem)] leading-[0.88] tracking-tight shimmer-gold">
                  PATOLE
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.9 }}
                className="mt-6 flex items-center gap-3"
                style={{ fontSize: 'clamp(1.1rem, 3vw, 2.2rem)' }}
              >
                <span className="font-inter text-cream/35">An Engineer of</span>
                <WordSwap />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.9 }}
                className="mt-12 flex flex-col sm:flex-row items-center gap-6"
              >
                <button
                  onClick={() => document.getElementById('vivek-showcase')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group flex items-center gap-3 px-7 py-3.5 rounded-full border border-gold/30 font-mono text-xs uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-dark transition-all duration-400"
                >
                  Explore the Journey
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-y-0.5 transition-transform duration-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </button>
                <VivekHeroBadge />
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-cream/20">Scroll</span>
              <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent" />
            </motion.div>
          </section>

          {/* ── STATS ──────────────────────────────────── */}
          <NumberCounter />

          {/* ── MARQUEE ────────────────────────────────── */}
          <div className="-mb-[2vw] relative z-30">
            <MarqueeText text="A JOURNEY OF EXCELLENCE" />
          </div>

          {/* ── VIVEK SHOWCASE ─────────────────────────── */}
          <VivekShowcase />

          {/* ── VIVEK SPOTLIGHT ────────────────────────── */}
          <MemberSpotlight member={vivek} isAlternate={false} />

          {/* ── QUOTES ─────────────────────────────────── */}
          <QuotesCarousel />

          {/* ── MARQUEE REVERSED ───────────────────────── */}
          <div className="my-[4vw]">
            <MarqueeText text="BUILDING A LASTING LEGACY" reverse={true} />
          </div>

          {/* ── TIMELINE ───────────────────────────────── */}
          <Timeline />

          {/* ── ACHIEVEMENT WALL ───────────────────────── */}
          <AchievementBadges />

          {/* ── HORIZONTAL GALLERY ─────────────────────── */}
          <HorizontalGallery />

          {/* ── PHOTO GALLERY ──────────────────────────── */}
          <GallerySection />

          {/* ── CREATOR SECTION (inline at bottom) ──────── */}
          <CreatorSection />

          {/* ── PHILOSOPHY / FOOTER ────────────────────── */}
          <PhilosophySection />
        </main>
      </div>
    </AccentProvider>
  );
}

export default App;
