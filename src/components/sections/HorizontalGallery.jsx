import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedHeading from "../ui/AnimatedHeading";

const HorizontalGallery = () => {
  const targetRef = useRef(null);

  // We track the scroll progress of our targetRef (which is 400vh tall).
  // When it starts to enter, scrollYProgress is 0. When it finishes leaving, it's 1.
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // We map the 0-1 vertical scroll progress to horizontal translation (from 0% to -75% since we have 4 items).
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const items = [
    { id: 1, title: "CYBER SECURITY", subtitle: "Defending the digital frontier.", owner: "Anrunya" },
    { id: 2, title: "INFRASTRUCTURE", subtitle: "Building modern marvels.", owner: "Vivek" },
    { id: 3, title: "ACADEMICS", subtitle: "Inspiring the next generation.", owner: "Bhavana" },
    { id: 4, title: "WEB DESIGN", subtitle: "Crafting digital experiences.", owner: "Kshetradnya" }
  ];

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-dark text-cream z-20">
      {/* The sticky container holds our horizontal slider */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute top-8 left-8 md:top-12 md:left-12 mix-blend-difference z-20">
          <h2 className="font-anton text-2xl md:text-4xl tracking-widest text-cream opacity-50">PROJECTS</h2>
        </div>
        
        {/* The horizontal track moving leftwards based on scroll */}
        <motion.div style={{ x }} className="flex gap-8 md:gap-32 px-8 md:px-[20vw]">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="w-[85vw] md:w-[60vw] h-[50vh] md:h-[60vh] shrink-0 flex flex-col justify-center relative group"
            >
              {/* Massive background number mapping */}
              <div className="absolute -left-6 -top-12 md:-left-20 md:-top-40 font-anton text-[30vw] md:text-[20vw] leading-none text-cream/5 select-none pointer-events-none">
                0{item.id}
              </div>
              
              <div className="relative z-10 glass border border-cream/10 rounded-[24px] md:rounded-[32px] w-full h-full p-6 md:p-16 flex flex-col justify-end overflow-hidden group-hover:border-[var(--accent)] transition-colors duration-700">
                {/* Image Placeholder that scales on hover */}
                <div className="absolute inset-0 bg-cream/5 group-hover:scale-105 transition-transform duration-1000 ease-out z-0 mix-blend-overlay" />
                
                <h3 className="font-anton text-4xl md:text-8xl tracking-wide leading-none z-10 mb-3 md:mb-4 group-hover:text-[var(--accent)] transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="font-playfair italic text-lg md:text-3xl opacity-80 z-10">
                  "{item.subtitle}"
                </p>
                <div className="mt-6 md:mt-8 flex items-center gap-4 z-10">
                  <span className="w-12 md:w-16 h-[2px] bg-cream group-hover:bg-[var(--accent)] transition-colors duration-500"></span>
                  <span className="uppercase tracking-widest text-[10px] md:text-xs font-bold">Discover</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalGallery;
