import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = ['home', 'family', 'kshetradnya', 'anrunya', 'vivek', 'bhavana', 'timeline', 'philosophy'];

const SectionDots = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            // Check if section has dark bg
            const bg = window.getComputedStyle(entry.target).backgroundColor;
            const el = entry.target;
            const isDark = el.classList.contains('bg-dark') || 
                           el.closest('.bg-dark') !== null ||
                           bg.includes('26, 26, 26') || bg.includes('rgb(26');
            setOnDark(isDark);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const dotInactiveColor = onDark ? 'rgba(240,239,233,0.25)' : 'rgba(0,0,0,0.2)';
  const labelColor = onDark ? 'text-cream' : 'text-dark';

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 hidden lg:flex">
      {sections.map((id) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="group relative flex items-center justify-end"
          title={id.charAt(0).toUpperCase() + id.slice(1)}
        >
          <span className={`absolute right-6 mr-2 font-inter text-xs uppercase tracking-widest opacity-0 group-hover:opacity-70 transition-opacity duration-300 whitespace-nowrap ${labelColor}`}>
            {id}
          </span>
          <motion.div
            className="w-2.5 h-2.5 rounded-full border-2 transition-colors duration-300"
            style={{
              borderColor: activeSection === id ? 'var(--accent)' : dotInactiveColor,
              backgroundColor: activeSection === id ? 'var(--accent)' : 'transparent',
            }}
            animate={{
              scale: activeSection === id ? 1.3 : 1,
            }}
          />
        </button>
      ))}
    </div>
  );
};

export default SectionDots;
