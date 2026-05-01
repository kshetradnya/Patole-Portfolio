import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const stats = [
  { number: 35, suffix: "+", label: "Years of Engineering Excellence" },
  { number: 100, suffix: "+", label: "Projects Delivered · Tata Projects" },
  { number: 5,   suffix: "+", label: "Industries Served · EPC & Infrastructure" },
  { number: 3,   suffix: "",  label: "Continents of Global Impact" },
];

const AnimatedCounter = ({ target, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const NumberCounter = () => {
  return (
    <div className="w-full py-14 px-4 relative z-10" style={{ background: '#0F0F0F', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex flex-col items-center text-center px-4 border-r border-white/05 last:border-r-0"
          >
            <span className="font-syne font-800 text-[clamp(2.5rem,5vw,4.5rem)] leading-none shimmer-gold">
              <AnimatedCounter target={stat.number} suffix={stat.suffix} />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/35 mt-3 leading-relaxed">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NumberCounter;
