import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HorizontalGallery = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const items = [
    { id: 1, title: "DATA & CYBER ANALYTICS", subtitle: "Defending the digital frontier with data.", owner: "Anrunya" },
    { id: 2, title: "INFRASTRUCTURE", subtitle: "Building modern marvels.", owner: "Vivek" },
    { id: 3, title: "ACADEMICS", subtitle: "Inspiring the next generation.", owner: "Bhavana" },
    { id: 4, title: "WEB DESIGN", subtitle: "Crafting digital experiences.", owner: "Kshetradnya" }
  ];

  return (
    <>
      {/* ── DESKTOP: horizontal scroll-jacked gallery (unchanged) ────────── */}
      <section ref={targetRef} className="relative h-[400vh] bg-dark text-cream z-20 hidden lg:block">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="absolute top-8 left-8 lg:top-12 lg:left-12 mix-blend-difference z-20">
            <h2 className="font-anton text-2xl lg:text-4xl tracking-widest text-cream opacity-50">PROJECTS</h2>
          </div>
          <motion.div style={{ x }} className="flex gap-8 lg:gap-32 px-8 lg:px-[20vw]">
            {items.map((item) => (
              <div
                key={item.id}
                className="w-[85vw] lg:w-[60vw] h-[50vh] lg:h-[60vh] shrink-0 flex flex-col justify-center relative group"
              >
                <div className="absolute -left-6 -top-12 lg:-left-20 lg:-top-40 font-anton text-[30vw] lg:text-[20vw] leading-none text-cream/5 select-none pointer-events-none">
                  0{item.id}
                </div>
                <div className="relative z-10 glass border border-cream/10 rounded-[24px] lg:rounded-[32px] w-full h-full p-6 lg:p-16 flex flex-col justify-end overflow-hidden group-hover:border-[var(--accent)] transition-colors duration-700">
                  <div className="absolute inset-0 bg-cream/5 group-hover:scale-105 transition-transform duration-1000 ease-out z-0 mix-blend-overlay" />
                  <h3 className="font-anton text-4xl lg:text-8xl tracking-wide leading-none z-10 mb-3 lg:mb-4 group-hover:text-[var(--accent)] transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="font-playfair italic text-lg lg:text-3xl opacity-80 z-10">
                    "{item.subtitle}"
                  </p>
                  <div className="mt-6 lg:mt-8 flex items-center gap-4 z-10">
                    <span className="w-12 lg:w-16 h-[2px] bg-cream group-hover:bg-[var(--accent)] transition-colors duration-500"></span>
                    <span className="uppercase tracking-widest text-[10px] lg:text-xs font-bold">Discover</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MOBILE: vertical stacked cards (no scroll-jacking) ───────────── */}
      <section className="bg-dark text-cream py-16 px-4 z-20 relative lg:hidden">
        <h2 className="font-anton text-3xl tracking-widest text-cream opacity-50 mb-10">PROJECTS</h2>
        <div className="flex flex-col gap-5">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative glass border border-cream/10 rounded-[20px] p-6 flex flex-col justify-end overflow-hidden min-h-[180px]"
            >
              <span className="absolute right-4 top-3 font-anton text-[80px] leading-none text-cream/[0.05] select-none pointer-events-none">
                0{item.id}
              </span>
              <h3 className="font-anton text-2xl tracking-wide leading-tight z-10 mb-2 text-[var(--accent)]">
                {item.title}
              </h3>
              <p className="font-playfair italic text-base opacity-70 z-10">"{item.subtitle}"</p>
              <div className="mt-4 flex items-center gap-3 z-10">
                <span className="w-8 h-[1px] bg-cream/40"></span>
                <span className="uppercase tracking-widest text-[9px] font-bold opacity-60">{item.owner}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HorizontalGallery;
