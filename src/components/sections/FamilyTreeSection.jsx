import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { familyMembers } from '../../data/familyData';
import { useAccent } from '../../context/AccentContext';
import { Zap, Shield, Laptop, BookOpen, GraduationCap, Link as LinkIcon, X, ArrowRight } from 'lucide-react';

// Feature 1: Dynamic Tree Structure Data
const treeStructure = {
  id: 'root',
  name: 'Parents',
  children: [
    { id: 'vivek', role: 'father' },
    { id: 'bhavana', role: 'mother' },
    { id: 'anrunya', role: 'daughter' },
    { id: 'kshetradnya', role: 'son' }
  ]
};

// Feature 12: Role-Specific Badges Mapping
const getRoleIcon = (id) => {
  switch (id) {
    case 'vivek': return <Zap size={14} />;
    case 'bhavana': return <BookOpen size={14} />;
    case 'anrunya': return <Shield size={14} />;
    case 'kshetradnya': return <Laptop size={14} />;
    default: return <Zap size={14} />;
  }
};

const FamilyTreeSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredMember, setHoveredMember] = useState(null);
  const { setAccent, setAccentDark } = useAccent();
  const containerRef = useRef(null);
  
  // Feature 10: Parallax Background Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Feature 14: Magnetic Cursor Interaction
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const getMemberData = (id) => familyMembers.find(m => m.id === id);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[120vh] bg-dark overflow-hidden py-32 px-4 md:px-12 flex flex-col items-center select-none"
      id="legacy-tree"
    >
      {/* Feature 28: Reactive Watermark */}
      <motion.div 
        style={{ x: (mousePos.x - 500) * 0.05, y: (mousePos.y - 500) * 0.05 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-0"
      >
        <h2 className="font-anton text-[25vw] leading-none">PATOLE</h2>
      </motion.div>

      {/* Feature 4: Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cream rounded-full opacity-20"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%" 
            }}
            animate={{ 
              y: [null, "-20%"],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 text-center mb-24"
      >
        <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Interactive Genealogy</span>
        <h2 className="font-anton text-6xl md:text-8xl text-cream leading-tight">
          THE <span className="text-outline-cream">LEGACY</span> TREE
        </h2>
      </motion.div>

      {/* Feature 1: Dynamic Tree Container */}
      <div className="relative w-full max-w-6xl py-20 flex flex-col items-center z-20">
        
        {/* SVG Layer for Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible hidden md:block">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--accent, #fff)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="var(--accent, #fff)" stopOpacity={hoveredMember ? "0.6" : "0.3"} />
              <stop offset="100%" stopColor="var(--accent, #fff)" stopOpacity="0.1" />
            </linearGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main vertical path with Feature 16: Hover Magnification & 27: Path Highlighting */}
          <motion.path 
            d="M 50% 0 L 50% 100%" 
            stroke="url(#lineGrad)" 
            strokeWidth={hoveredMember ? "4" : "2"}
            fill="none"
            strokeDasharray="10,10"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2 }}
            className="transition-all duration-700"
            style={{ filter: hoveredMember ? "url(#glow)" : "none" }}
          />

          {/* Feature 19: Contextual Relationship Labels */}
          <g className="opacity-10 text-[10px] font-anton tracking-[1em] fill-cream select-none">
            <text x="52%" y="10%">ORIGIN</text>
            <text x="52%" y="45%">LEGACY</text>
            <text x="52%" y="85%">SUCCESSION</text>
          </g>

          {/* Feature 17: Shared Legacy Connections (Horizontal Lines) */}
          <motion.path 
            d="M 25% 30% L 75% 30% M 25% 75% L 75% 75%" 
            stroke="url(#lineGrad)" 
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </svg>

        {/* Feature 11: Adaptive Mobile Layout (Grid to Stack) */}
        <div className="relative w-full h-full flex flex-col md:grid md:grid-cols-2 gap-y-16 md:gap-y-32 items-center justify-items-center">
          
          {/* Sub-label for Hierarchy (Mobile Friendly Version) */}
          <motion.div 
            className="md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-12 px-6 py-2 glass border border-cream/10 rounded-full text-[10px] text-accent font-bold uppercase tracking-[0.5em] z-30 mb-8 md:mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Ancestry
          </motion.div>

          {familyMembers.map((member, idx) => (
            <TreeMemberNode 
              key={member.id}
              member={member}
              index={idx}
              isHovered={hoveredMember === member.id}
              isSelected={selectedMember?.id === member.id}
              onHover={() => {
                setHoveredMember(member.id);
                setAccent(member.accent);
                setAccentDark(member.accentDark);
              }}
              onLeave={() => setHoveredMember(null)}
              onClick={() => setSelectedMember(member)}
            />
          ))}

          <motion.div 
            className="md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-24 px-6 py-2 glass border border-cream/10 rounded-full text-[10px] text-accent font-bold uppercase tracking-[0.5em] z-30 mt-16 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Descendants
          </motion.div>
        </div>
      </div>

      {/* Feature 7: Click-to-Expand Detail Panel */}
      <AnimatePresence>
        {selectedMember && (
          <DetailPanel 
            member={selectedMember} 
            onClose={() => setSelectedMember(null)} 
          />
        )}
      </AnimatePresence>

      {/* Feature 15: Section Scroll-Snap Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest text-cream mb-2">Scroll To Explore</span>
        <div className="w-[1px] h-10 bg-cream"></div>
      </div>
    </section>
  );
};

// Feature 2: Interactive Member Node Component
const TreeMemberNode = ({ member, index, isHovered, isSelected, onHover, onLeave, onClick }) => {
  // Feature 26: 3D Tilt Effect logic
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setRotate({ x, y });
  };

  // Feature 22: Keyboard Accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: "circOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        onLeave();
        setRotate({ x: 0, y: 0 });
      }}
      onMouseEnter={onHover}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${member.name}'s details`} // Feature 23: ARIA Structure
      style={{ 
        rotateX: rotate.y, 
        rotateY: rotate.x,
        perspective: 1000
      }}
      className={`group relative cursor-pointer z-20 outline-none`}
    >
      {/* Feature 29: Relational Highlighting Background */}
      <div 
        className={`absolute -inset-16 rounded-full opacity-0 blur-3xl transition-opacity duration-1000 pointer-events-none ${isHovered ? 'opacity-30' : ''}`}
        style={{ background: member.accent }}
      ></div>

      {/* Feature 8: Glassmorphism Node Content */}
      <div className={`relative w-48 h-48 md:w-56 md:h-56 rounded-full glass border border-cream/10 p-1 overflow-hidden transition-all duration-500 ${isHovered ? 'border-accent/60 scale-110 shadow-[0_0_50px_rgba(255,255,255,0.1)]' : 'group-hover:border-accent/40 group-hover:scale-105'}`}>
        
        {/* Feature 3: Avatar Hover Zoom */}
        <div className="w-full h-full rounded-full overflow-hidden relative bg-dark">
          <img 
            src={`/assets/${member.image}`} 
            alt={member.name}
            className={`w-full h-full object-cover transition-all duration-1000 ${isHovered ? 'grayscale-0 scale-110' : 'grayscale group-hover:grayscale-0 group-hover:scale-110'}`}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=' + member.name[0];
            }}
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-80"></div>
        </div>

        {/* Info */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 text-center px-4">
          <h3 className="font-anton text-xl md:text-2xl text-cream leading-tight tracking-wider uppercase">
            {member.name}
          </h3>
          <span className="text-[9px] md:text-[10px] text-accent font-bold uppercase tracking-[0.3em] mt-1.5 opacity-80 group-hover:opacity-100">
            {member.role ? member.role.split(',')[0] : ''}
          </span>
        </div>

        {/* Feature 12: Role Badge */}
        <div className="absolute top-6 right-6 w-8 h-8 rounded-full glass border border-cream/20 flex items-center justify-center text-cream group-hover:text-accent transition-all duration-500 group-hover:rotate-12">
          {getRoleIcon(member.id)}
        </div>

        {/* Feature 18: Achievement Tally Badge */}
        <div className="absolute top-6 left-6 w-6 h-6 rounded-full bg-accent text-dark flex items-center justify-center text-[10px] font-bold shadow-lg shadow-accent/20">
          {member.achievements?.length || 0}
        </div>
      </div>

      {/* Feature 13: Satellite Social Buttons (Orbital) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30"
          >
            {member.socials.slice(0, 3).map((social, i) => (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ x: 30, opacity: 0, rotate: -20 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="w-10 h-10 rounded-full glass border border-cream/20 flex items-center justify-center text-cream hover:bg-accent hover:text-dark hover:border-accent transition-all duration-300 group/social"
                onClick={(e) => e.stopPropagation()}
              >
                <LinkIcon size={14} className="group-hover/social:scale-110 transition-transform" />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature 25: Interactive Bio Snippets */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-8 glass border border-cream/10 p-5 rounded-2xl w-72 pointer-events-none z-30 shadow-2xl"
          >
            <div className="w-8 h-1 bg-accent mb-3"></div>
            <p className="text-[11px] text-cream/80 font-inter uppercase tracking-[0.25em] leading-relaxed">
              {member.bio}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Feature 7: Deep Dive Detail Panel
const DetailPanel = ({ member, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-end"
    >
      <div 
        className="absolute inset-0 bg-dark/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-2xl h-full glass border-l border-cream/10 shadow-2xl p-8 md:p-16 overflow-y-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-12 h-12 rounded-full glass border border-cream/10 flex items-center justify-center text-cream hover:text-accent transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="mb-12">
            <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">Legacy Snapshot</span>
            <h2 className="font-anton text-5xl md:text-7xl text-cream mb-4">{member.name.toUpperCase()} <span className="text-outline-cream">{member.surname.toUpperCase()}</span></h2>
            <p className="text-xl md:text-2xl text-cream italic font-playfair opacity-80">"{member.quote}"</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Column 1: Bio */}
            <div>
              <h4 className="text-accent text-[10px] uppercase tracking-[0.4em] font-bold mb-6">Manifesto</h4>
              <p className="text-cream/80 text-base leading-relaxed font-inter">
                {member.bio}
              </p>
            </div>

            {/* Column 2: Stats/Achievement Highlights */}
            <div className="space-y-8">
              <div>
                <h4 className="text-accent text-[10px] uppercase tracking-[0.4em] font-bold mb-6">Key Milestones ({member.achievements?.length})</h4>
                <div className="space-y-4">
                  {member.achievements?.map((ach, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 group-hover:scale-150 transition-transform"></div>
                      <span className="text-cream/70 text-sm font-medium leading-tight">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="mb-16">
            <h4 className="text-accent text-[10px] uppercase tracking-[0.4em] font-bold mb-8">Notable Ventures</h4>
            <div className="grid grid-cols-1 gap-4">
              {member.projects.map((proj, i) => (
                <a 
                  key={i}
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block glass border border-cream/5 p-6 rounded-2xl hover:border-accent/40 transition-all duration-500"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-accent font-bold uppercase tracking-widest mb-1 block opacity-60 group-hover:opacity-100">{proj.type}</span>
                      <h5 className="text-xl text-cream font-anton tracking-wide group-hover:text-accent transition-colors">{proj.name}</h5>
                    </div>
                    <div className="w-12 h-12 rounded-full glass border border-cream/10 bg-cream/5 flex items-center justify-center text-cream group-hover:bg-accent group-hover:text-dark transition-all duration-500">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Socials & Footer */}
          <div className="mt-auto pt-8 border-t border-cream/10 flex flex-wrap items-center justify-between gap-6">
            <div className="flex gap-4">
              {member.socials.map((social) => (
                <a 
                  key={social.platform}
                  href={social.url}
                  className="text-cream/50 hover:text-accent font-bold uppercase tracking-[0.3em] text-[10px]"
                >
                  {social.platform}
                </a>
              ))}
            </div>
            
            <button 
              onClick={() => {
                document.getElementById(member.id)?.scrollIntoView({ behavior: 'smooth' });
                onClose();
              }}
              className="text-xs font-bold uppercase tracking-[0.4em] text-accent flex items-center gap-2 group"
            >
              Full Profile <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FamilyTreeSection;
