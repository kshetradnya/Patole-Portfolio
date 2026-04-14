import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedHeading from '../ui/AnimatedHeading';
import { useAccent } from '../../context/AccentContext';

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
      className={`min-h-screen py-32 px-8 relative flex flex-col justify-center ${isAlternate ? 'bg-dark text-cream rounded-[48px]' : 'bg-cream text-dark'}`}
    >
      <div className="max-w-7xl mx-auto w-full">
        <AnimatedHeading 
          className="text-[clamp(4rem,10vw,8rem)]" 
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
            <p className="font-inter uppercase tracking-[0.2em] text-sm opacity-60">
              {member.role}
            </p>
            <h4 className="font-playfair italic text-3xl md:text-5xl leading-tight">
              A commitment to <br/>
              <span style={{ color: member.accent }}>outstanding achievements</span>
            </h4>
            <p className="font-inter text-lg opacity-80 max-w-lg leading-relaxed">
              {member.bio}
            </p>

            <div className="pt-8 space-y-6">
              <h5 className="font-anton tracking-wider text-xl">KEY SKILLS</h5>
              <div className="space-y-4">
                {member.skills?.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm uppercase tracking-widest font-bold mb-2">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-current opacity-10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: member.accent }}
                      />
                    </div>
                  </div>
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
