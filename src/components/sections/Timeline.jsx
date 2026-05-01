import React from 'react';
import { motion } from 'framer-motion';

const timelineData = [
  { year: "1987", title: "Started Engineering", desc: "The beginning of a distinguished career in structural and civil engineering.", accent: "#E8A020" },
  { year: "1989", title: "First Internship", desc: "Gaining foundational industry experience at the prestigious Shapoorji Pallonji Group.", accent: "#C4841A" },
  { year: "1993", title: "First Professional Role", desc: "Starting the professional journey as an engineer at Dr. Kelkar's firm.", accent: "#E8A020" },
  { year: "2005", title: "Chief Engineering Role", desc: "Attaining the first senior leadership position, overseeing complex engineering operations.", accent: "#C4841A" },
  { year: "2025", title: "Vice President – Tata Projects", desc: "Currently serving as VP, leading central engineering at Tata Projects Limited.", accent: "#E8A020" },
];

const Timeline = () => {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 relative z-20" style={{ background: '#FAF8F4' }} id="timeline">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-dark/30 mb-4">// A Career of Excellence</p>
          <h2 className="font-syne font-800 text-[clamp(2.5rem,8vw,7rem)] leading-[0.88] tracking-tight text-dark">
            THE<br />
            <span className="font-cormorant italic font-400 text-[clamp(2.5rem,8vw,7rem)]" style={{ color: '#E8A020' }}>Journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(232,160,32,0.2) 10%, rgba(232,160,32,0.2) 90%, transparent)' }}
          />

          {timelineData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center mb-10 md:mb-14 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Content */}
              <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                <span
                  className="font-syne font-800 leading-none"
                  style={{ fontSize: 'clamp(2.2rem,5vw,4rem)', color: item.accent }}
                >
                  {item.year}
                </span>
                <h4 className="font-syne font-600 text-base md:text-lg text-dark tracking-tight leading-tight mt-1">{item.title}</h4>
                <p className="font-inter text-dark/50 text-xs md:text-sm mt-1.5 max-w-xs md:max-w-none ml-0 md:ml-auto">{item.desc}</p>
              </div>

              {/* Center dot */}
              <div className="absolute left-0 md:relative md:left-auto md:w-2/12 flex justify-center py-2 md:py-0">
                <div
                  className="w-9 h-9 md:w-5 md:h-5 rounded-full border-4 z-10 flex items-center justify-center"
                  style={{ borderColor: item.accent, background: '#FAF8F4' }}
                >
                  <div className="w-2 h-2 rounded-full md:hidden" style={{ backgroundColor: item.accent }} />
                </div>
              </div>

              {/* Spacer */}
              <div className="hidden md:block w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
