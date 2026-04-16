import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const achievements = [
  "Completed Advanced Frontend Architecture Bootcamp",
  "Top 1% in Global UI/UX Design Hackathon",
  "Built 10+ Production Ready Web Applications",
  "Open Source Contributor to React Libraries"
];

const projects = [
  { name: "Japanese Learning Hub", type: "Language App", link: "#" },
  { name: "Family Digital Archive", type: "React Web App", link: "#" },
  { name: "Future Startup", type: "Incubation", link: "#" }
];

const ProfessionalPortfolio = ({ onExit }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-inter overflow-hidden relative selection:bg-[#444] selection:text-white"
    >
      <div className="fixed top-8 right-8 z-50">
        <button 
          onClick={onExit}
          className="text-xs uppercase tracking-widest px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
        >
          Return to Family
        </button>
      </div>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center px-8 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="z-10"
        >
          <h2 className="text-sm md:text-md uppercase tracking-[0.4em] mb-6 text-white/50">
            Frontend Developer & UI Engineer
          </h2>
          <h1 className="text-[12vw] md:text-[8vw] font-anton leading-[0.85] tracking-tighter mix-blend-difference mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
            KSHETRADNYA
            <br />
            PATOLE
          </h1>
          <p className="max-w-xl text-lg md:text-xl text-white/70 leading-relaxed font-light">
            Crafting state-of-the-art web experiences. Bridging the gap between 
            astounding design and flawless engineering.
          </p>
        </motion.div>
        
        <motion.div 
          style={{ y }}
          className="absolute right-0 top-[20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-[120px] -z-10"
        />
      </section>

      {/* Projects Section */}
      <section className="py-32 px-8 md:px-24 bg-white text-black min-h-screen rounded-t-[3rem] md:rounded-t-[5rem] relative">
        <h3 className="text-4xl md:text-6xl font-anton tracking-tight mb-20 text-black">SELECTED WORKS</h3>
        <div className="space-y-12">
          {projects.map((proj, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group border-b border-black/10 pb-8 hover:border-black transition-colors duration-500"
            >
              <a href={proj.link} className="flex flex-col md:flex-row md:items-end justify-between cursor-none">
                <div>
                  <span className="text-sm block mb-4 opacity-50 uppercase tracking-widest">{proj.type}</span>
                  <h4 className="text-4xl md:text-7xl font-light tracking-tighter group-hover:italic transition-all duration-300">
                    {proj.name}
                  </h4>
                </div>
                <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center overflow-hidden opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 max-md:hidden">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements / LinkedIn Section */}
      <section className="py-32 px-8 md:px-24 min-h-screen flex flex-col justify-center">
        <h3 className="text-4xl md:text-6xl font-anton tracking-tight mb-16 text-white">ACHIEVEMENTS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {achievements.map((ach, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="border-l-2 border-white/20 pl-6 hover:border-white transition-colors duration-500"
            >
              <p className="text-xl md:text-2xl font-light text-white/80">{ach}</p>
            </motion.div>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 pt-12 border-t border-white/10"
        >
          <a
            href="https://www.linkedin.com/in/kshetradnya-patole-80535825b/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-4 text-xl font-light hover:italic transition-all duration-300"
          >
            Connect on LinkedIn
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </section>
      
    </div>
  );
};

export default ProfessionalPortfolio;
