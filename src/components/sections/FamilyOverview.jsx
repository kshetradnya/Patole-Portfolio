import React, { useState } from 'react';
import { familyMembers } from '../../data/familyData';
import { useAccent } from '../../context/AccentContext';
import AnimatedHeading from '../ui/AnimatedHeading';

const TiltCard = ({ member, setAccent, setAccentDark }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage offset from center (-1 to 1)
    const middleX = rect.width / 2;
    const middleY = rect.height / 2;
    const rotateX = ((y - middleY) / middleY) * -15; // Vertical mouse moves X axis
    const rotateY = ((x - middleX) / middleX) * 15;  // Horizontal mouse moves Y axis
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1500px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out"
      }}
      className="p-8 border border-cream/10 rounded-3xl glass text-cream hover:border-cream/30 group cursor-pointer relative overflow-hidden"
      onMouseEnter={() => {
        setAccent(member.accent);
        setAccentDark(member.accentDark);
      }}
      onClick={() => {
        document.getElementById(member.id)?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" 
        style={{ transform: "translateZ(50px)", backgroundColor: member.accent }}
      ></div>

      <div className="relative z-10" style={{ transform: "translateZ(75px)" }}>
        <h3 className="font-anton text-5xl mb-2 transition-colors duration-500" style={{ color: "white" }}>
          <span className="group-hover:text-[var(--accent)] transition-colors duration-500">{member.name}</span>
          <br />{member.surname}
        </h3>
        <p className="font-inter text-cream/70 mb-8 uppercase tracking-widest text-sm opacity-80">{member.title}</p>
        <p className="font-playfair italic text-2xl text-cream/90 group-hover:text-cream transition-colors duration-300">"{member.quote}"</p>
        
        <div className="mt-8 flex items-center gap-4">
          <span className="text-sm font-bold tracking-widest uppercase transition-colors duration-500 group-hover:text-[var(--accent)]">Explore Profile</span>
          <div className="w-8 h-[1px] bg-cream/30 group-hover:w-16 group-hover:bg-[var(--accent)] transition-all duration-500"></div>
        </div>
      </div>
    </div>
  );
};

const FamilyOverview = () => {
  const { setAccent, setAccentDark } = useAccent();

  return (
    <section className="min-h-screen bg-dark py-24 px-8 rounded-[48px] -mt-10 relative z-20 overflow-visible" id="family" style={{ perspective: "1500px" }}>
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <AnimatedHeading className="text-[clamp(3rem,8vw,6rem)] text-cream" text1="MEET THE" text2="FAMILY" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full mt-24">
          {familyMembers.map((member) => (
            <TiltCard 
              key={member.id} 
              member={member} 
              setAccent={setAccent} 
              setAccentDark={setAccentDark} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FamilyOverview;
