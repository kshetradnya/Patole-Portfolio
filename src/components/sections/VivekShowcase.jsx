import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const EngineeringBadge = ({ label }) => (
  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8A020]/30 bg-[#E8A020]/08 text-[#E8A020] font-mono text-xs tracking-widest uppercase transition-all duration-300 hover:border-[#E8A020]/70 hover:bg-[#E8A020]/15 cursor-default"
    style={{ background: 'rgba(232,160,32,0.06)' }}>
    <span className="w-1.5 h-1.5 rounded-full bg-[#E8A020] animate-pulse" />
    {label}
  </span>
);

const ArticleCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.a
      ref={ref}
      href={project.link}
      target={project.link !== '#' ? "_blank" : undefined}
      rel="noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group relative flex flex-col gap-4 p-6 md:p-8 border border-[#E8A020]/15 rounded-2xl hover:border-[#E8A020]/40 transition-all duration-500 overflow-hidden"
      style={{ background: 'rgba(232,160,32,0.03)' }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
        style={{ background: 'radial-gradient(ellipse at center, rgba(232,160,32,0.07) 0%, transparent 70%)' }} />

      <div className="flex items-start justify-between gap-4 relative z-10">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#E8A020]/60 block mb-3">
            {project.type}
          </span>
          <h4 className="font-syne font-700 text-lg md:text-xl text-cream/90 group-hover:text-cream leading-tight capitalize transition-colors duration-300">
            {project.name}
          </h4>
        </div>
        {project.link !== '#' && (
          <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[#E8A020]/30 flex items-center justify-center group-hover:border-[#E8A020] group-hover:bg-[#E8A020]/10 transition-all duration-300">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#E8A020" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        )}
      </div>
    </motion.a>
  );
};

const StatBlock = ({ value, label, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center md:items-start text-center md:text-left"
    >
      <span className="font-syne font-800 text-[clamp(2.5rem,5vw,4rem)] leading-none shimmer-gold">
        {value}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/40 mt-2 max-w-[120px]">
        {label}
      </span>
    </motion.div>
  );
};

const VivekShowcase = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-3%', '6%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 0.4, 0.3, 0.5]);

  const badges = ['BIM', 'Steel EPC', 'Industrial', 'Energy Projects', 'Digital Engineering', 'Infrastructure'];
  const stats = [
    { value: '35+', label: 'Years of Experience' },
    { value: '100+', label: 'Projects Delivered' },
    { value: '5+', label: 'Industries Served' },
  ];
  const projects = [
    { name: "Where Engineering Meets Responsibility", type: "Tata Projects – Digital Engineering", link: "https://ssmb.in/2026/01/16/where-engineering-meets-responsibility/" },
    { name: "Steel-Intensive EPC Execution", type: "Industrial & Energy Projects Feature", link: "https://ssmb.in/2025/09/05/steel-briefcase/" },
    { name: "Advanced Specification Systems", type: "Design & Engineering Research", link: "#" },
  ];

  return (
    <section
      ref={containerRef}
      id="vivek-showcase"
      className="relative bg-dark overflow-hidden"
      style={{ minHeight: '250vh' }}
    >
      {/* Blueprint grid bg */}
      <div className="absolute inset-0 blueprint-bg opacity-100 pointer-events-none" />

      {/* Scan line effect */}
      <div className="scan-line z-10" />

      {/* Golden radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,160,32,0.06) 0%, transparent 70%)' }} />

      {/* Sticky layout */}
      <div className="sticky top-0 h-screen flex items-stretch overflow-hidden">
        {/* Left — Pinned portrait */}
        <div className="hidden lg:block relative w-[45%] overflow-hidden">
          <motion.div ref={imageRef} style={{ y: imageY }} className="absolute inset-0 scale-105">
            <img
              src={`${import.meta.env.BASE_URL}vivek.png`}
              alt="Vivek Patole"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          {/* Gold gradient overlay on image */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(232,160,32,0.25) 0%, rgba(15,15,15,0.6) 100%)' }}
          />
          {/* Bottom fade into dark */}
          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #0F0F0F, transparent)' }} />
        </div>

        {/* Right — Scrolling content panels */}
        <div className="w-full lg:w-[55%] overflow-y-auto h-screen scrollbar-hide px-6 md:px-10 lg:px-14 py-16 md:py-24 flex flex-col gap-24">

          {/* Mobile portrait */}
          <div className="block lg:hidden w-full aspect-[4/3] relative rounded-2xl overflow-hidden mb-4">
            <img src={`${import.meta.env.BASE_URL}vivek.png`} alt="Vivek Patole" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, #0F0F0F)' }} />
          </div>

          {/* Panel 1 — Intro */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-px bg-[#E8A020]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8A020]/70">
                Patriarch · Engineer · Leader
              </span>
            </div>

            <h2 className="font-syne font-800 text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight text-cream">
              Vivek
              <br />
              <span className="shimmer-gold">Patole</span>
            </h2>

            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cream/40">
              VP – Central Engineering · Tata Projects Limited
            </p>

            <p className="font-cormorant text-xl md:text-2xl text-cream/70 leading-relaxed max-w-lg italic">
              From the shores of Maharashtra to the boardrooms of Tata Projects — 35+ years engineering the physical fabric of modern India.
            </p>
          </motion.div>

          {/* Panel 2 — Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-3 gap-6 border-t border-b border-[#E8A020]/15 py-8"
          >
            {stats.map((s, i) => <StatBlock key={s.label} {...s} index={i} />)}
          </motion.div>

          {/* Panel 3 — Engineering Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-5"
          >
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40">Domains of Expertise</h3>
            <div className="flex flex-wrap gap-3">
              {badges.map((badge, i) => (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <EngineeringBadge label={badge} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Panel 4 — Extended bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h3 className="font-syne font-600 text-xl text-cream/80">The Engineer</h3>
            <p className="font-inter text-base md:text-lg text-cream/60 leading-relaxed">
              Vice President – Central Engineering at Tata Projects Limited, Vivek has spent decades building the structural DNA of India. His work spans steel-intensive infrastructure, industrial complexes, and energy projects — all executed with the precision of advanced BIM workflows and digital engineering practices that are decades ahead of the industry curve.
            </p>
            <p className="font-inter text-base md:text-lg text-cream/60 leading-relaxed">
              A leader who doesn't just build structures — he builds teams, systems, and legacies. His philosophy: every beam placed, every spec written, every project delivered is a statement about standards that refuse to compromise.
            </p>
          </motion.div>

          {/* Panel 5 — Articles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-syne font-600 text-xl text-cream/80">Published Work</h3>
              <div className="w-8 h-px bg-[#E8A020]/30" />
            </div>
            <div className="flex flex-col gap-4">
              {projects.map((proj, i) => <ArticleCard key={proj.name} project={proj} index={i} />)}
            </div>
          </motion.div>

          {/* Panel 6 — Full-width quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1 }}
            className="relative p-8 md:p-12 rounded-2xl overflow-hidden border border-[#E8A020]/20"
            style={{ background: 'linear-gradient(135deg, rgba(232,160,32,0.06) 0%, rgba(196,132,26,0.04) 100%)' }}
          >
            <span className="absolute top-4 left-6 font-cormorant text-[8rem] leading-none text-[#E8A020]/10 select-none">"</span>
            <p className="font-cormorant italic text-2xl md:text-3xl text-cream/85 leading-relaxed relative z-10 mt-6">
              Leadership is about making others better as a result of your presence — and leaving systems stronger than you found them.
            </p>
            <div className="mt-6 flex items-center gap-4 relative z-10">
              <div className="w-8 h-px bg-[#E8A020]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E8A020]">Vivek Patole</span>
            </div>
          </motion.div>

          {/* Panel 7 — LinkedIn CTA */}
          <motion.a
            href="https://www.linkedin.com/in/vivek-patole-8aab375/"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center justify-between gap-6 p-6 md:p-8 rounded-2xl border border-[#E8A020]/30 hover:border-[#E8A020] transition-all duration-400 mb-16"
            style={{ background: 'rgba(232,160,32,0.05)' }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E8A020]/10 border border-[#E8A020]/30 flex items-center justify-center group-hover:bg-[#E8A020]/20 transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8A020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <div>
                <p className="font-syne font-600 text-cream text-lg">Connect with Vivek</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40 mt-1">LinkedIn · Tata Projects</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-[#E8A020]/30 flex items-center justify-center group-hover:border-[#E8A020] group-hover:bg-[#E8A020]/10 transition-all duration-300">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#E8A020" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </motion.a>

        </div>
      </div>
    </section>
  );
};

export default VivekShowcase;
