import React from 'react';
import { motion } from 'framer-motion';
import AnimatedHeading from '../ui/AnimatedHeading';

const timelineData = [
  { year: "1985", title: "Vivek begins engineering career", desc: "Foundation of decades of infrastructure leadership.", accent: "#f59e0b" },
  { year: "1995", title: "Bhavana enters academia", desc: "Beginning of a journey in educational excellence.", accent: "#10b981" },
  { year: "2018", title: "Anrunya begins BTech at NMIMS", desc: "Foundation in Computer Science and Data Science (CSDS), leading to advanced studies (MS-GBA & BIT CMA) at Virginia Tech.", accent: "#8b5cf6" },
  { year: "2023", title: "Vivek becomes VP at Tata Projects", desc: "A milestone in infrastructure leadership.", accent: "#f59e0b" },
  { year: "2024", title: "Kshetradnya completes Class 10", desc: "Graduating with a fire for web development.", accent: "#00d4ff" },
  { year: "2025", title: "Bhavana appointed SIAC Director", desc: "Academic leadership at the highest level.", accent: "#10b981" },
  { year: "2026", title: "The Patole Family Portfolio", desc: "A digital legacy, designed and built by Kshetradnya.", accent: "#00d4ff" },
];

const Timeline = () => {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-cream relative z-20" id="timeline">
      <div className="max-w-5xl mx-auto">
        <AnimatedHeading className="text-[clamp(2.5rem,8vw,5rem)] text-dark mb-16 md:mb-24" text1="OUR" text2="JOURNEY" />

        <div className="relative">
          {/* Vertical line - responsive position */}
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-dark/10 -translate-x-1/2" />

          {timelineData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center mb-10 md:mb-16 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Content */}
              <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                <span className="font-anton text-3xl md:text-5xl" style={{ color: item.accent }}>{item.year}</span>
                <h4 className="font-anton text-base md:text-xl mt-1 md:mt-2 text-dark uppercase tracking-tight leading-tight">{item.title}</h4>
                <p className="font-inter text-dark/70 text-[11px] md:text-sm mt-1 md:mt-2 max-w-xs md:max-w-none ml-0 md:ml-auto">{item.desc}</p>
              </div>

              {/* Center/Left dot */}
              <div className="absolute left-0 md:relative md:left-auto md:w-2/12 flex justify-center py-2 md:py-0">
                <div className="w-9 h-9 md:w-4 md:h-4 rounded-full border-4 bg-cream z-10 flex items-center justify-center" style={{ borderColor: item.accent }}>
                    <div className="w-2 h-2 rounded-full md:hidden" style={{ backgroundColor: item.accent }} />
                </div>
              </div>

              {/* Spacer for alternating */}
              <div className="hidden md:block w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
