import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedHeading from '../ui/AnimatedHeading';
import { useAccent } from '../../context/AccentContext';

const SocialIcon = ({ platform }) => {
  const icons = {
    Github: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
        <path d="M9 18c-4.51 2-5-2-7-2"/>
      </svg>
    ),
    Linkedin: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    Twitter: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
      </svg>
    ),
    Mail: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    Globe: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
      </svg>
    ),
  };
  return icons[platform] || null;
};

const ArrowIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 7h10v10"/>
    <path d="M7 17 17 7"/>
  </svg>
);

const MemberSpotlight = ({ member, isAlternate }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "-40% 0px -40% 0px" });
  const { setAccent, setAccentDark, setActiveMember } = useAccent();

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
      className={`min-h-screen py-12 md:py-32 px-6 md:px-12 relative flex flex-col justify-center ${isAlternate ? 'bg-dark text-cream' : 'bg-cream text-dark'}`}
    >
      <div className="max-w-7xl mx-auto w-full">
        <AnimatedHeading 
          className="text-[clamp(2.5rem,12vw,8rem)]" 
          text1={member.name} 
          text2={member.surname}
          style1={{ color: isAlternate ? member.accent : member.accentDark }}
        />
        
        <div className={`mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isAlternate ? '' : 'lg:flex-row-reverse'}`}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`space-y-8 ${isAlternate ? 'order-1 lg:order-2' : ''}`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <p className="font-inter uppercase tracking-[0.2em] text-sm opacity-60">
                {member.role}
              </p>
              {member.socials && (
                <div className="flex items-center gap-4">
                  {member.socials.map((social) => (
                    <a 
                      key={social.platform} 
                      href={social.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="opacity-50 hover:opacity-100 hover:scale-110 transition-all duration-300"
                      style={{ color: member.accent }}
                      title={social.platform}
                    >
                      <SocialIcon platform={social.platform} />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <h4 className="font-playfair italic text-2xl md:text-5xl leading-tight">
              A commitment to <br className="hidden md:block"/>
              <span style={{ color: member.accent }}>outstanding achievements</span>
            </h4>
            <p className="font-inter text-lg opacity-80 max-w-lg leading-relaxed">
              {member.bio}
            </p>

            <div className="pt-8 space-y-2">
              <h5 className="font-anton tracking-wider text-xl mb-6">FEATURED WORKS</h5>
              <div className="flex flex-col border-t border-current/10">
                {member.projects?.map((proj) => (
                  <a 
                    key={proj.name} 
                    href={proj.link}
                    target={proj.link !== '#' ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex flex-col sm:flex-row sm:items-center justify-between py-5 md:py-6 border-b border-current/10 hover:px-6 transition-all duration-500 cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="font-anton text-xl md:text-2xl group-hover:text-[var(--accent)] transition-colors duration-300">
                        {proj.name}
                      </span>
                      <span className="font-inter text-[10px] md:text-xs uppercase tracking-widest opacity-50 mt-1">
                        {proj.type}
                      </span>
                    </div>
                    <span className="opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 max-sm:hidden">
                      <ArrowIcon color={member.accent} />
                    </span>
                  </a>
                ))}
              </div>
            </div>
            
            {member.hasCV && (
              <button 
                className="mt-12 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-transform hover:scale-105"
                style={{ backgroundColor: member.accent, color: isAlternate ? '#1a1a1a' : '#fff' }}
              >
                Download CV
              </button>
            )}
          </motion.div>

          {/* Parallax Image Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 1 }}
            className={`relative w-full aspect-[4/5] rounded-[32px] overflow-hidden group ${isAlternate ? 'order-2 lg:order-1' : ''}`}
            style={{ backgroundColor: isAlternate ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.03)" }}
          >
            {member.image ? (
              <img 
                src={member.image} 
                alt={member.name}
                className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90`}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-anton text-8xl text-current opacity-10">
                {member.name[0]}
              </div>
            )}
            
            {/* Color Overlay Effect mapped to scroll/hover */}
            <div 
              className={`absolute inset-0 opacity-20 hover:opacity-0 transition-opacity duration-700 pointer-events-none ${isAlternate ? 'mix-blend-overlay' : 'mix-blend-color'}`}
              style={{ backgroundColor: member.accent }} 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MemberSpotlight;
