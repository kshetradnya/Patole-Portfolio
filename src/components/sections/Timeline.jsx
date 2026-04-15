import React from 'react';
import { motion } from 'framer-motion';
import AnimatedHeading from '../ui/AnimatedHeading';

const timelineData = [
  { year: "1985", title: "Vivek begins engineering career", desc: "Foundation of decades of infrastructure leadership.", accent: "#f59e0b" },
  { year: "1995", title: "Bhavana enters academia", desc: "Beginning of a journey in educational excellence.", accent: "#10b981" },
  { year: "2018", title: "Anrunya starts at Virginia Tech", desc: "Masters in Cyber Security from a world-class institution.", accent: "#8b5cf6" },
  { year: "2023", title: "Vivek becomes VP at Tata Projects", desc: "A milestone in infrastructure leadership.", accent: "#f59e0b" },
  { year: "2024", title: "Kshetradnya completes Class 10", desc: "Graduating with a fire for web development.", accent: "#00d4ff" },
  { year: "2025", title: "Bhavana appointed SIAC Director", desc: "Academic leadership at the highest level.", accent: "#10b981" },
  { year: "2026", title: "The Patole Family Portfolio", desc: "A digital legacy, designed and built by Kshetradnya.", accent: "#00d4ff" },
];

const Timeline = () => {
  return (
    <section className="py-32 px-8 bg-cream relative z-20" id="timeline">
      <div className="max-w-5xl mx-auto">
        <AnimatedHeading className="text-[clamp(3rem,6vw,5rem)] text-dark mb-24" text1="OUR" text2="JOURNEY" />

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-dark/10 -translate-x-1/2 hidden md:block" />

          {timelineData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`relative flex flex-col md:flex-row items-center mb-16 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Content */}
              <div className={`w-full md:w-5/12 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                <span className="font-anton text-5xl" style={{ color: item.accent }}>{item.year}</span>
                <h4 className="font-anton text-xl mt-2 text-dark">{item.title}</h4>
                <p className="font-inter text-dark/60 text-sm mt-2">{item.desc}</p>
              </div>

              {/* Center dot */}
              <div className="w-2/12 flex justify-center my-4 md:my-0">
                <div className="w-4 h-4 rounded-full border-4 bg-cream z-10" style={{ borderColor: item.accent }} />
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
