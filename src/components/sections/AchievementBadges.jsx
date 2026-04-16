import React from 'react';
import { motion } from 'framer-motion';

const BadgeIcon = ({ type }) => {
  const icons = {
    graduation: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5"/>
      </svg>
    ),
    building: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M8 10h.01M16 10h.01M12 14h.01M8 14h.01M16 14h.01"/>
      </svg>
    ),
    shield: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    code: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
        <line x1="14" y1="4" x2="10" y2="20"/>
      </svg>
    ),
    network: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3"/>
        <circle cx="5" cy="19" r="3"/>
        <circle cx="19" cy="19" r="3"/>
        <line x1="12" y1="8" x2="5" y2="16"/>
        <line x1="12" y1="8" x2="19" y2="16"/>
      </svg>
    ),
    compass: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    ),
    book: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
        <path d="M8 7h6M8 11h4"/>
      </svg>
    ),
    globe: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
      </svg>
    ),
  };
  return icons[type] || icons.globe;
};

const badges = [
  { icon: "graduation", title: "Virginia Tech MS-GBA", member: "Anrunya", color: "#8b5cf6" },
  { icon: "building", title: "VP Tata Projects", member: "Vivek", color: "#f59e0b" },
  { icon: "compass", title: "SIAC Director", member: "Bhavana", color: "#10b981" },
  { icon: "code", title: "Portfolio Creator", member: "Kshetradnya", color: "#00d4ff" },
  { icon: "shield", title: "CSDS NMIMS & BIT CMA", member: "Anrunya", color: "#8b5cf6" },
  { icon: "network", title: "Engineering Excellence", member: "Vivek", color: "#f59e0b" },
  { icon: "book", title: "HOD Elphinstone", member: "Bhavana", color: "#10b981" },
  { icon: "globe", title: "Web Developer", member: "Kshetradnya", color: "#00d4ff" },
];

const AchievementBadges = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-dark relative z-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-anton text-[clamp(1.5rem,5vw,4rem)] text-cream text-center mb-12 md:mb-16 tracking-tight">ACHIEVEMENT WALL</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.08, rotate: 2 }}
              className="relative group flex flex-col items-center text-center p-5 md:p-8 rounded-2xl border border-cream/10 bg-cream/5 hover:bg-cream/10 transition-all duration-300 cursor-default"
            >
              <div className="mb-5 opacity-80 group-hover:opacity-100 transition-opacity duration-300" style={{ color: badge.color }}>
                <BadgeIcon type={badge.icon} />
              </div>
              <h4 className="font-anton text-sm tracking-wider text-cream">{badge.title}</h4>
              <p className="font-inter text-xs mt-2 uppercase tracking-widest" style={{ color: badge.color }}>{badge.member}</p>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 40px ${badge.color}` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementBadges;
