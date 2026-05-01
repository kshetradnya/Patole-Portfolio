import React, { useState } from 'react';
import { familyMembers } from '../../data/familyData';
import { useAccent } from '../../context/AccentContext';
import { motion } from 'framer-motion';

const BentoCard = ({ member, isLarge, setAccent, setAccentDark }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => { setHovered(true); setAccent(member.accent); setAccentDark(member.accentDark); }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => document.getElementById(member.id)?.scrollIntoView({ behavior: 'smooth' })}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 ${isLarge ? 'col-span-2 row-span-2 min-h-[480px]' : 'min-h-[220px]'}`}
      style={{
        borderColor: hovered ? member.accent + '50' : 'rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      {/* Photo on hover */}
      {member.image && (
        <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: hovered ? 1 : 0 }}>
          <img src={`${import.meta.env.BASE_URL}${member.image}`} alt={member.name} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to top, ${member.accent}40 0%, rgba(15,15,15,0.5) 100%)`,
          }} />
        </div>
      )}

      {/* Default gradient background */}
      <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: hovered ? 0 : 1 }}>
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse at 30% 40%, ${member.accent}18 0%, transparent 65%)`,
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            {/* Member accent dot */}
            <div className="w-2 h-2 rounded-full mb-4 transition-all duration-300"
              style={{ backgroundColor: member.accent, boxShadow: hovered ? `0 0 12px ${member.accent}` : 'none' }} />
            <h3 className="font-syne font-800 text-[clamp(1.8rem,4vw,3.5rem)] leading-[0.9] text-cream tracking-tight">
              {member.name}
              <br />
              <span style={{ color: hovered ? member.accent : 'rgba(255,255,255,0.4)' }} className="transition-colors duration-300">
                {member.surname}
              </span>
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40 mt-3">{member.role}</p>
          </div>

          {/* Explore arrow */}
          <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-400"
            style={{
              borderColor: hovered ? member.accent : 'rgba(255,255,255,0.15)',
              color: hovered ? member.accent : 'rgba(255,255,255,0.3)',
              background: hovered ? member.accent + '15' : 'transparent',
            }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>

        {/* Hover quote */}
        <motion.p
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.4 }}
          className="font-cormorant italic text-lg text-cream/70 mt-4 line-clamp-2"
        >
          "{member.quote}"
        </motion.p>
      </div>
    </motion.div>
  );
};

const FamilyOverview = () => {
  const { setAccent, setAccentDark } = useAccent();
  // Vivek first (index 0), Bhavana second (index 1)
  const [vivek, bhavana, anrunya, kshetradnya] = familyMembers;

  return (
    <section
      className="py-20 md:py-32 px-4 md:px-8 bg-dark relative z-20 overflow-visible"
      id="family"
    >
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-bg opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/60 mb-4">// The Patole Family</p>
          <h2 className="font-syne font-800 text-[clamp(3rem,10vw,8rem)] leading-[0.88] tracking-tight text-cream">
            MEET THE<br />
            <span className="shimmer-gold">FAMILY</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-auto">
          {/* Vivek — large 2x2 */}
          <div className="lg:col-span-2 lg:row-span-2">
            <BentoCard member={vivek} isLarge setAccent={setAccent} setAccentDark={setAccentDark} />
          </div>

          {/* Bhavana — top right */}
          <BentoCard member={bhavana} setAccent={setAccent} setAccentDark={setAccentDark} />

          {/* Anrunya — top right */}
          <BentoCard member={anrunya} setAccent={setAccent} setAccentDark={setAccentDark} />

          {/* Kshetradnya — bottom right spanning 2 */}
          <div className="lg:col-span-2">
            <BentoCard member={kshetradnya} setAccent={setAccent} setAccentDark={setAccentDark} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyOverview;
