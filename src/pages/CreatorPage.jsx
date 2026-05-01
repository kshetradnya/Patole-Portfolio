import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SOCIALS = [
  {
    id: 'website',
    label: 'kshetradnya.in',
    sublabel: 'Portfolio & Dev Hub',
    url: 'https://kshetradnya.in',
    icon: (<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>),
    color: '#00d4ff',
  },
  {
    id: 'github',
    label: 'github.com/kshetradnya',
    sublabel: 'Open Source & Projects',
    url: 'https://github.com/kshetradnya',
    icon: (<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>),
    color: '#c9d1d9',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    sublabel: 'Professional Network',
    url: 'https://www.linkedin.com/in/kshetradnyapatole/',
    icon: (<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>),
    color: '#0A66C2',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    sublabel: 'Coming Soon',
    url: '#',
    icon: (<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>),
    color: '#E1306C',
    disabled: true,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    sublabel: 'Coming Soon',
    url: '#',
    icon: (<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>),
    color: '#FF0000',
    disabled: true,
  },
  {
    id: 'email',
    label: 'kshetradnyap@gmail.com',
    sublabel: 'Drop a Message',
    url: 'mailto:kshetradnyap@gmail.com',
    icon: (<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>),
    color: '#00d4ff',
  },
];

const STACK = ['React', 'Vite', 'Tailwind', 'Framer Motion', 'GSAP', 'Three.js'];

const TypingText = ({ phrases }) => {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [display, setDisplay] = useState('');

  useEffect(() => {
    const current = phrases[phaseIdx];
    let timeout;
    if (!deleting && charIdx <= current.length) {
      setDisplay(current.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx(c => c + 1), 60);
    } else if (deleting && charIdx >= 0) {
      setDisplay(current.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx(c => c - 1), 35);
    }
    if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    }
    if (deleting && charIdx < 0) {
      setDeleting(false);
      setPhaseIdx(i => (i + 1) % phrases.length);
      setCharIdx(0);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phaseIdx, phrases]);

  return <span className="text-[#00d4ff] terminal-cursor">{display}</span>;
};

/* ── Exported as a section component (not a full page) ── */
const CreatorSection = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  return (
    <section
      id="creator"
      className="relative overflow-hidden"
      style={{ background: '#050505', color: '#FAF8F4' }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 creator-grid opacity-30 pointer-events-none" />
      {/* Cyan glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#00d4ff]/50 mb-6 flex items-center gap-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse inline-block" />
          Creator's Space — Kshetradnya Patole
        </motion.p>

        {/* Hero heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-syne font-800 text-[clamp(3rem,10vw,8rem)] leading-[0.88] tracking-tight mb-6">
            KSHETRA<br />
            <span style={{ WebkitTextStroke: '2px rgba(0,212,255,0.4)', color: 'transparent' }}>DNYA</span>
            <span style={{ color: '#00d4ff' }}>.</span>
          </h2>
          <p className="font-mono text-lg md:text-xl text-cream/50 mb-10 max-w-xl">
            I <TypingText phrases={['build things for the web.', 'design digital experiences.', 'write code that feels alive.', 'turn ideas into interfaces.']} />
          </p>
          <div className="flex flex-wrap gap-4 mb-20">
            <a
              href="https://kshetradnya.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-mono text-xs uppercase tracking-[0.2em] text-[#050505] font-700 hover:scale-105 transition-transform duration-300"
              style={{ background: '#00d4ff' }}
            >
              Visit kshetradnya.in
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <a
              href="mailto:kshetradnyap@gmail.com"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-mono text-xs uppercase tracking-[0.2em] border border-[#00d4ff]/30 text-[#00d4ff] hover:border-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>

        {/* Two-column: socials + stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">

          {/* SOCIALS */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/25 mb-6">// Find Me At</p>
            <div className="flex flex-col gap-3">
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.id}
                  href={s.url}
                  target={s.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  onMouseEnter={() => setHoveredSocial(s.id)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  onClick={s.disabled ? e => e.preventDefault() : undefined}
                  className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-350 ${s.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                  style={{
                    borderColor: hoveredSocial === s.id && !s.disabled ? s.color + '50' : 'rgba(255,255,255,0.06)',
                    background: hoveredSocial === s.id && !s.disabled ? s.color + '0A' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0"
                      style={{
                        color: hoveredSocial === s.id && !s.disabled ? s.color : 'rgba(255,255,255,0.35)',
                        background: hoveredSocial === s.id && !s.disabled ? s.color + '15' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${hoveredSocial === s.id && !s.disabled ? s.color + '40' : 'rgba(255,255,255,0.07)'}`,
                      }}
                    >
                      {s.icon}
                    </div>
                    <div>
                      <p className="font-mono text-sm text-cream/75 group-hover:text-cream transition-colors duration-300">{s.label}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-cream/25 mt-0.5">{s.sublabel}</p>
                    </div>
                  </div>
                  {s.disabled ? (
                    <span className="font-mono text-[9px] uppercase tracking-widest text-cream/20 border border-white/08 px-2.5 py-1 rounded-full">Soon</span>
                  ) : (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center border border-white/08 group-hover:border-current transition-all duration-300 flex-shrink-0"
                      style={{ color: s.color }}
                    >
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  )}
                </motion.a>
              ))}
            </div>
          </div>

          {/* STACK + META */}
          <div className="flex flex-col gap-10">
            {/* Stack */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/25 mb-5">// Tech I Work With</p>
              <div className="flex flex-wrap gap-3">
                {STACK.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="px-4 py-2 rounded-full font-mono text-xs tracking-widest text-[#00d4ff]/70 border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 hover:text-[#00d4ff] transition-all duration-300 cursor-default"
                    style={{ background: 'rgba(0,212,255,0.04)' }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Meta: built this site */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-6 md:p-8 rounded-2xl border border-[#00d4ff]/12 flex-1"
              style={{ background: 'rgba(0,212,255,0.025)' }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00d4ff]/50 mb-4">// Meta</p>
              <h3 className="font-syne font-700 text-xl md:text-2xl text-cream mb-3">I built this entire site.</h3>
              <p className="font-inter text-cream/50 text-sm leading-relaxed mb-5">
                From concept to code — every animation, section, and micro-interaction. Built with React, Vite, Tailwind, and Framer Motion.
              </p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400/70">Open to Collabs</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorSection;
