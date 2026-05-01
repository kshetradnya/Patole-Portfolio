import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BadgeIcon = ({ type }) => {
  const icons = {
    building: (<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M8 10h.01M16 10h.01M12 14h.01M8 14h.01M16 14h.01" /></svg>),
    bim: (<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>),
    network: (<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" /><line x1="12" y1="8" x2="5" y2="16" /><line x1="12" y1="8" x2="19" y2="16" /></svg>),
    star: (<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
    bolt: (<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>),
    globe: (<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>),
  };
  return icons[type] || icons.globe;
};

const VIVEK_BADGES = [
  { icon: "building", title: "VP, Tata Projects Limited", color: "#E8A020", stamp: "ACHIEVED" },
  { icon: "bim",      title: "BIM & Digital Engineering Pioneer", color: "#C4841A", stamp: "LED" },
  { icon: "network",  title: "35+ Years EPC Leadership", color: "#E8A020", stamp: "MILESTONE" },
  { icon: "star",     title: "100+ Large-Scale Projects", color: "#C4841A", stamp: "DELIVERED" },
  { icon: "bolt",     title: "Steel-Intensive Industrial Expert", color: "#E8A020", stamp: "SPECIALIST" },
  { icon: "globe",    title: "3 Continents of Impact", color: "#C4841A", stamp: "GLOBAL" },
];

const AchievementBadges = () => {
  return (
    <section className="py-20 md:py-28 px-4 md:px-8 relative z-20" style={{ background: '#0F0F0F' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/60 mb-4">// Recognition & Milestones</p>
          <h2 className="font-syne font-800 text-[clamp(2rem,6vw,5rem)] text-cream tracking-tight">
            VIVEK'S <span className="shimmer-gold">LEGACY</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {VIVEK_BADGES.map((badge, i) => (
            <motion.div
              key={badge.title}
              layout
              initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.04, rotate: 0.5 }}
              className="relative p-6 rounded-2xl border overflow-hidden cursor-default group"
              style={{ background: 'rgba(255,255,255,0.025)', borderColor: `${badge.color}20` }}
            >
              {/* Stamp */}
              <div className="stamp absolute top-4 right-4" style={{ color: badge.color, borderColor: badge.color }}>
                {badge.stamp}
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 0 50px ${badge.color}18` }} />

              <div className="flex flex-col gap-4 relative z-10">
                <div style={{ color: badge.color }}>
                  <BadgeIcon type={badge.icon} />
                </div>
                <h4 className="font-syne font-700 text-base text-cream/85 leading-tight pr-12">{badge.title}</h4>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: badge.color + 'BB' }}>
                  Vivek Patole
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementBadges;
