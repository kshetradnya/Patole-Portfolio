import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const stats = [
  { number: 70, suffix: "+", label: "Years Combined Experience" },
  { number: 4, suffix: "", label: "Family Members" },
  { number: 50, suffix: "+", label: "Projects Delivered" },
  { number: 3, suffix: "", label: "Industries Covered" },
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
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const NumberCounter = () => {
  return (
    <div className="w-full py-20 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="flex flex-col items-center text-center"
          >
            <span className="font-anton text-[clamp(3rem,6vw,5rem)] text-dark leading-none" style={{ color: 'var(--accent)' }}>
              <AnimatedCounter target={stat.number} suffix={stat.suffix} />
            </span>
            <span className="font-inter text-xs uppercase tracking-[0.2em] text-dark/50 mt-3">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NumberCounter;
