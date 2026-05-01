import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HorizontalGallery = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const items = [
    { id: 1, title: "INFRASTRUCTURE", subtitle: "Building the physical backbone of modern India.", stat: "100+ Projects" },
    { id: 2, title: "BIM & DIGITAL", subtitle: "Pioneering digital twin workflows across EPC.", stat: "Industry First" },
    { id: 3, title: "STEEL EPC", subtitle: "Steel-intensive execution at mega scale.", stat: "35+ Years" },
    { id: 4, title: "LEADERSHIP", subtitle: "From engineer to VP — a career of impact.", stat: "Tata Projects" },
  ];

  return (
    <>
      {/* Desktop: scroll-jacked horizontal */}
      <section ref={targetRef} className="relative h-[400vh] bg-dark text-cream z-20 hidden lg:block">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="absolute top-8 left-12 z-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold/50">// Vivek's Domains</p>
            <h2 className="font-syne font-700 text-4xl tracking-tight text-cream/20 mt-1">EXPERTISE</h2>
          </div>

          <motion.div style={{ x }} className="flex gap-20 px-[20vw]">
            {items.map((item) => (
              <div
                key={item.id}
                className="w-[55vw] h-[55vh] shrink-0 flex flex-col justify-center relative group"
              >
                {/* Large bg number */}
                <div
                  className="absolute -left-16 -top-32 font-syne font-800 leading-none select-none pointer-events-none"
                  style={{ fontSize: '20vw', color: 'rgba(232,160,32,0.04)' }}
                >
                  0{item.id}
                </div>

                {/* Card */}
                <div
                  className="relative z-10 rounded-[32px] w-full h-full p-14 flex flex-col justify-end overflow-hidden border transition-all duration-700 group-hover:border-gold/30"
                  style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(232,160,32,0.07) 0%, transparent 70%)' }}
                  />

                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold/50 mb-4 z-10">{item.stat}</p>
                  <h3
                    className="font-syne font-800 text-6xl xl:text-8xl tracking-tight leading-none z-10 mb-4 transition-colors duration-500"
                    style={{ color: 'rgba(255,255,255,0.8)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="font-cormorant italic text-2xl text-cream/50 z-10 group-hover:text-cream/70 transition-colors duration-400">
                    "{item.subtitle}"
                  </p>
                  <div className="mt-8 flex items-center gap-4 z-10">
                    <span className="w-14 h-px bg-gold/30 group-hover:w-24 transition-all duration-500" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-gold/40 group-hover:text-gold/70 transition-colors duration-400">
                      Vivek Patole
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile: vertical cards */}
      <section className="bg-dark text-cream py-16 px-4 z-20 relative lg:hidden">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold/50 mb-2">// Vivek's Domains</p>
        <h2 className="font-syne font-700 text-3xl text-cream/20 mb-10">EXPERTISE</h2>
        <div className="flex flex-col gap-5">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative rounded-[20px] p-6 flex flex-col justify-end overflow-hidden min-h-[180px] border border-white/06"
              style={{ background: 'rgba(255,255,255,0.025)' }}
            >
              <span className="absolute right-4 top-3 font-syne font-800 leading-none text-cream/[0.04] select-none pointer-events-none" style={{ fontSize: '5rem' }}>
                0{item.id}
              </span>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold/50 mb-2">{item.stat}</p>
              <h3 className="font-syne font-700 text-2xl tracking-tight leading-tight z-10 mb-2 text-gold">{item.title}</h3>
              <p className="font-cormorant italic text-base text-cream/50 z-10">"{item.subtitle}"</p>
              <div className="mt-4 flex items-center gap-3 z-10">
                <span className="w-8 h-px bg-gold/30" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-gold/40">Vivek Patole</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HorizontalGallery;
