import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useAccent } from '../../context/AccentContext';


const SocialIcon = ({ platform }) => {
  const icons = {
    Github: (<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>),
    Linkedin: (<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>),
    Twitter: (<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>),
    Mail: (<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>),
    Globe: (<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>),
  };
  return icons[platform] || null;
};

// Per-member pattern overlays
const PatternOverlay = ({ pattern, accent }) => {
  if (pattern === 'blueprint') return (
    <div className="absolute inset-0 blueprint-bg opacity-100 pointer-events-none" />
  );
  if (pattern === 'circuit') return (
    <div className="absolute inset-0 pointer-events-none opacity-10"
      style={{ backgroundImage: `radial-gradient(${accent}80 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
  );
  if (pattern === 'parchment') return (
    <div className="absolute inset-0 pointer-events-none opacity-20"
      style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(16,185,129,0.06) 0px, rgba(16,185,129,0.06) 1px, transparent 1px, transparent 28px)' }} />
  );
  if (pattern === 'terminal') return (
    <div className="absolute inset-0 pointer-events-none"
      style={{ backgroundImage: 'radial-gradient(rgba(0,212,255,0.08) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
  );
  return null;
};

const MemberSpotlight = ({ member, isAlternate }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "-40% 0px -40% 0px" });
  const { setAccent, setAccentDark, setActiveMember } = useAccent();

  const isDark = isAlternate;

  useEffect(() => {
    if (isInView) {
      setAccent(member.accent);
      setAccentDark(member.accentDark);
      setActiveMember(member.id);
    }
  }, [isInView, member, setAccent, setAccentDark, setActiveMember]);

  return (
    <section
      ref={containerRef}
      id={member.id}
      className="min-h-screen py-16 md:py-32 px-6 md:px-12 relative flex flex-col justify-center overflow-hidden"
      style={{ background: isDark ? '#0F0F0F' : '#FAF8F4', color: isDark ? '#FAF8F4' : '#0F0F0F' }}
    >
      {/* Per-member pattern */}
      <PatternOverlay pattern={member.pattern} accent={member.accent} />

      {/* Vivek scan-line */}
      {member.id === 'vivek' && <div className="scan-line" />}

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${member.accent}0A 0%, transparent 65%)` }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Big name heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] mb-4" style={{ color: member.accent + 'AA' }}>
            // {member.role}
          </p>
          <h2 className="font-syne font-800 text-[clamp(3rem,12vw,9rem)] leading-[0.88] tracking-tight">
            {member.name}
            <br />
            <span style={{ color: member.accent }}>{member.surname}</span>
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className={`mt-12 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start`}>

          {/* Left: text info */}
          <motion.div
            initial={{ opacity: 0, x: isAlternate ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col gap-8 ${isAlternate ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <p className="font-cormorant italic text-2xl md:text-3xl leading-relaxed opacity-80">
              "{member.quote}"
            </p>

            <p className="font-inter text-base md:text-lg opacity-70 leading-relaxed max-w-xl">
              {member.bio}
            </p>

            {/* Achievements */}
            <div className="flex flex-col gap-2">
              {member.achievements?.map((ach, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: member.accent }} />
                  <span className="font-inter text-sm opacity-70">{ach}</span>
                </motion.div>
              ))}
            </div>

            {/* Projects */}
            <div className="border-t pt-6" style={{ borderColor: 'currentColor', opacity: 1 }}>
              <h5 className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-40 mb-5">Featured Work</h5>
              <div className="flex flex-col" style={{ borderTop: `1px solid ${member.accent}20` }}>
                {member.projects?.map((proj) => (
                  <a
                    key={proj.name}
                    href={proj.link}
                    target={proj.link !== '#' ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center justify-between py-4 border-b transition-all duration-400 hover:px-3"
                    style={{ borderColor: `${member.accent}20` }}
                  >
                    <div>
                      <span className="font-syne font-600 text-base capitalize group-hover:text-current transition-colors duration-300"
                        style={{ color: 'currentColor' }}>
                        {proj.name}
                      </span>
                      <span className="block font-mono text-[10px] uppercase tracking-widest opacity-40 mt-0.5">{proj.type}</span>
                    </div>
                    {proj.link !== '#' && (
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-400" style={{ color: member.accent }}>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Socials + CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {member.socials && (
                <div className="flex items-center gap-3">
                  {member.socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110"
                      style={{
                        borderColor: `${member.accent}40`,
                        color: member.accent,
                      }}
                      title={social.platform}
                    >
                      <SocialIcon platform={social.platform} />
                    </a>
                  ))}
                </div>
              )}


            </div>
          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full aspect-[4/5] rounded-3xl overflow-hidden group ${isAlternate ? 'lg:order-1' : 'lg:order-2'}`}
            style={{ background: `${member.accent}08` }}
          >
            {member.image && (
              <img
                src={`${import.meta.env.BASE_URL}${member.image}`}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            )}
            {/* Accent color overlay */}
            <div
              className="absolute inset-0 opacity-15 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${member.accent}60, transparent)`,
                mixBlendMode: isDark ? 'overlay' : 'color',
              }}
            />
            {/* Title badge */}
            <div className="absolute bottom-5 left-5 glass rounded-xl px-4 py-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/60">{member.title}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MemberSpotlight;
