import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { pedigreeData } from '../../data/extendedFamilyData';
import { useAccent } from '../../context/AccentContext';

// Manual SVG Icons
const Icons = {
  Zap: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Shield: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Laptop: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  BookOpen: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a4 4 0 0 0-4-4H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a4 4 0 0 1 4-4h6z"/>
    </svg>
  ),
  Link: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  X: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  ArrowRight: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Search: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  ZoomIn: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  ),
  ZoomOut: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  ),
  Reset: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
    </svg>
  )
};

const getRoleIcon = (id) => {
  if (id.includes('g-father')) return Icons.Zap;
  if (id.includes('mother')) return Icons.BookOpen;
  if (id === 'vivek') return Icons.Zap;
  if (id === 'bhavana') return Icons.BookOpen;
  if (id === 'anrunya') return Icons.Shield;
  if (id === 'kshetradnya') return Icons.Laptop;
  return Icons.Zap;
};

// SVG Smooth Curve Generator (Bezier)
// F33 & F34: Smooth Spousal Brackets and Flowing Sibling Branches
const CurveConnection = ({ startX, startY, endX, endY, type, isFocused }) => {
  let d = "";
  
  if (type === "spouse") {
    // Horizontal connection between spouses
    d = `M ${startX} ${startY} L ${endX} ${endY}`;
  } else if (type === "child") {
    // Smooth bezier from parents down to child
    const midY = startY + (endY - startY) / 2;
    d = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
  } else if (type === "sibling-trunk") {
    // Drops down from spouse line
    d = `M ${startX} ${startY} L ${endX} ${endY}`;
  }

  return (
    <motion.path 
      d={d}
      stroke={isFocused ? "var(--accent)" : "rgba(255,255,255,0.15)"}
      strokeWidth={isFocused ? "4" : "2"}
      fill="none"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="transition-colors duration-500"
    />
  );
};

const FamilyTreeSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredMember, setHoveredMember] = useState(null);
  const [scale, setScale] = useState(0.8);
  const [searchTerm, setSearchTerm] = useState("");
  const [collapsedBranches, setCollapsedBranches] = useState({});
  const { setAccent, setAccentDark } = useAccent();
  const containerRef = useRef(null);
  const workspaceRef = useRef(null);

  // F31: Pan & Zoom Control Logic
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.4));
  const handleReset = () => setScale(0.8);

  // Toggle Collapse (F38)
  const toggleCollapse = (nodeId) => {
    setCollapsedBranches(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  // Node Positions mapped out for the Pedigree chart
  // This abstracts a generic tree for UI positioning in a 2000x1200 canvas
  const canvasW = 2400;
  const canvasH = 1600;
  const positions = {
    'gg-father': { x: canvasW/2 - 200, y: 150 },
    'gg-mother': { x: canvasW/2 + 200, y: 150 },
    'g-father': { x: canvasW/2 - 250, y: 550 },
    'g-mother': { x: canvasW/2 + 250, y: 550 },
    'vivek': { x: canvasW/2 - 200, y: 950 },
    'bhavana': { x: canvasW/2 + 200, y: 950 },
    'anrunya': { x: canvasW/2 - 250, y: 1350 },
    'kshetradnya': { x: canvasW/2 + 250, y: 1350 }
  };

  // Check Focus Mode (F40)
  const isNodeFocused = (id) => {
    if (searchTerm && pedigreeData) {
       // Search highlight (F39)
       // Flat search helper
       const allMembers = [
         ...pedigreeData.partners, 
         ...pedigreeData.children[0].partners, 
         ...pedigreeData.children[0].children[0].partners,
         ...pedigreeData.children[0].children[0].children[0].partners,
         ...pedigreeData.children[0].children[0].children[1].partners
       ];
       const found = allMembers.find(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));
       if (found && found.id === id) return true;
    }
    if (!hoveredMember) return true; // everything normal
    return hoveredMember === id;
  };

  const getFilteredOpacity = (id) => {
    if (!hoveredMember && !searchTerm) return 1;
    return isNodeFocused(id) ? 1 : 0.2;
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100vh] bg-dark overflow-hidden py-24 flex flex-col items-center select-none"
      id="legacy-tree"
    >
      <div className="text-center z-50 mb-8 pointer-events-none">
         <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Interactive Pedigree</span>
         <h2 className="font-anton text-6xl md:text-8xl text-cream leading-tight drop-shadow-2xl">
           THE <span className="text-outline-cream">LEGACY</span> TREE
         </h2>
      </div>

      {/* F39: Search & Top UI Bar */}
      <div className="absolute top-8 left-8 z-50 flex items-center gap-4">
        <div className="relative group flex items-center">
          <div className="absolute left-4 text-cream/50 pointer-events-none">
            {Icons.Search}
          </div>
          <input 
            type="text" 
            placeholder="FIND MEMBER..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-black/40 border border-cream/10 rounded-full py-3 pl-12 pr-6 text-sm font-inter uppercase tracking-widest text-cream focus:outline-none focus:border-accent w-64 transition-all glass"
          />
        </div>
      </div>

      {/* F31 & F35: Zoom & Pan Controls Map overlay */}
      <div className="absolute bottom-8 right-8 z-50 flex flex-col gap-2 glass p-2 rounded-2xl border border-cream/10 bg-black/50">
        <button onClick={handleZoomIn} className="w-10 h-10 flex items-center justify-center text-cream hover:text-accent hover:bg-white/5 rounded-xl transition-colors" aria-label="Zoom In">{Icons.ZoomIn}</button>
        <button onClick={handleReset} className="w-10 h-10 flex items-center justify-center text-cream hover:text-accent hover:bg-white/5 rounded-xl transition-colors" aria-label="Reset View">{Icons.Reset}</button>
        <button onClick={handleZoomOut} className="w-10 h-10 flex items-center justify-center text-cream hover:text-accent hover:bg-white/5 rounded-xl transition-colors" aria-label="Zoom Out">{Icons.ZoomOut}</button>
      </div>

      {/* F36: Mini-map Navigation overlay */}
      <div className="absolute bottom-8 left-8 z-50 w-48 h-32 glass border border-cream/10 rounded-2xl bg-black/50 overflow-hidden opacity-50 hover:opacity-100 transition-opacity hidden md:block">
        <div className="absolute inset-2 border border-accent/30 rounded-lg pointer-events-none"></div>
        {/* Simple mock dot representations */}
        {Object.values(positions).map((pos, i) => (
          <div key={i} className="absolute w-2 h-2 bg-cream rounded-full" style={{ left: `${(pos.x / canvasW) * 100}%`, top: `${(pos.y / canvasH) * 100}%` }}></div>
        ))}
      </div>

      {/* Workspace Container for Zoom & Pan */}
      {/* F37: Draggable Grab Cursor interactions */}
      <div className="relative w-full flex-grow overflow-hidden cursor-grab active:cursor-grabbing border-y border-cream/5" style={{ minHeight: '80vh' }}>
        
        <motion.div 
          ref={workspaceRef}
          drag
          dragConstraints={{ left: -canvasW/2, right: canvasW/2, top: -canvasH/2, bottom: canvasH/2 }}
          dragElastic={0.1}
          animate={{ scale }}
          style={{ width: canvasW, height: canvasH, originX: 0.5, originY: 0.2 }}
          className="absolute left-1/2 top-0 -translate-x-1/2"
        >
          {/* F32: Generation Depth Background Labels */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
             <div className="h-[400px] flex items-center justify-center border-b border-cream/5 relative"><span className="absolute left-10 font-anton text-[8rem] text-white/[0.02]">GEN I</span></div>
             <div className="h-[400px] flex items-center justify-center border-b border-cream/5 relative"><span className="absolute left-10 font-anton text-[8rem] text-white/[0.02]">GEN II</span></div>
             <div className="h-[400px] flex items-center justify-center border-b border-cream/5 relative"><span className="absolute left-10 font-anton text-[8rem] text-white/[0.02]">GEN III</span></div>
             <div className="h-[400px] flex items-center justify-center relative"><span className="absolute left-10 font-anton text-[8rem] text-white/[0.02]">GEN IV</span></div>
          </div>

          {/* SVG Connections Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Gen 1 Spouses */}
            <CurveConnection startX={positions['gg-father'].x} startY={positions['gg-father'].y} endX={positions['gg-mother'].x} endY={positions['gg-mother'].y} type="spouse" isFocused={hoveredMember === 'gg-father' || hoveredMember === 'gg-mother'} />
            <CurveConnection startX={canvasW/2} startY={positions['gg-father'].y} endX={canvasW/2} endY={positions['g-father'].y - 120} type="sibling-trunk" isFocused={hoveredMember === 'g-father' || hoveredMember === 'g-mother'} />
            
            {!collapsedBranches['grandparents'] && (
              <>
                <CurveConnection startX={canvasW/2} startY={positions['g-father'].y - 120} endX={positions['g-father'].x} endY={positions['g-father'].y} type="child" isFocused={hoveredMember === 'g-father'} />
                
                {/* Gen 2 Spouses */}
                <CurveConnection startX={positions['g-father'].x} startY={positions['g-father'].y} endX={positions['g-mother'].x} endY={positions['g-mother'].y} type="spouse" isFocused={hoveredMember === 'g-father' || hoveredMember === 'g-mother'} />
                <CurveConnection startX={canvasW/2} startY={positions['g-father'].y} endX={canvasW/2} endY={positions['vivek'].y - 120} type="sibling-trunk" isFocused={hoveredMember === 'vivek'} />
                
                {!collapsedBranches['parents'] && (
                  <>
                    <CurveConnection startX={canvasW/2} startY={positions['vivek'].y - 120} endX={positions['vivek'].x} endY={positions['vivek'].y} type="child" isFocused={hoveredMember === 'vivek'} />
                    
                    {/* Gen 3 Spouses */}
                    <CurveConnection startX={positions['vivek'].x} startY={positions['vivek'].y} endX={positions['bhavana'].x} endY={positions['bhavana'].y} type="spouse" isFocused={hoveredMember === 'vivek' || hoveredMember === 'bhavana'} />
                    <CurveConnection startX={canvasW/2} startY={positions['vivek'].y} endX={canvasW/2} endY={positions['anrunya'].y - 120} type="sibling-trunk" isFocused={hoveredMember === 'anrunya' || hoveredMember === 'kshetradnya'} />
                    
                    {!collapsedBranches['children'] && (
                      <>
                        <CurveConnection startX={canvasW/2} startY={positions['anrunya'].y - 120} endX={positions['anrunya'].x} endY={positions['anrunya'].y} type="child" isFocused={hoveredMember === 'anrunya'} />
                        <CurveConnection startX={canvasW/2} startY={positions['kshetradnya'].y - 120} endX={positions['kshetradnya'].x} endY={positions['kshetradnya'].y} type="child" isFocused={hoveredMember === 'kshetradnya'} />
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </svg>

          {/* Node Overlay Layer */}
          {/* Gen I Nodes */}
          <PedigreeNode member={pedigreeData.partners[0]} pos={positions['gg-father']} onClick={() => setSelectedMember(pedigreeData.partners[0])} onHover={setHoveredMember} opacity={getFilteredOpacity('gg-father')} />
          <PedigreeNode member={pedigreeData.partners[1]} pos={positions['gg-mother']} onClick={() => setSelectedMember(pedigreeData.partners[1])} onHover={setHoveredMember} opacity={getFilteredOpacity('gg-mother')} />
          
          <CollapseToggle onClick={() => toggleCollapse('grandparents')} isCollapsed={collapsedBranches['grandparents']} pos={{x: canvasW/2, y: positions['gg-father'].y + 60}} />

          {/* Gen II Nodes */}
          {!collapsedBranches['grandparents'] && (
            <>
              <PedigreeNode member={pedigreeData.children[0].partners[0]} pos={positions['g-father']} onClick={() => setSelectedMember(pedigreeData.children[0].partners[0])} onHover={setHoveredMember} opacity={getFilteredOpacity('g-father')} />
              <PedigreeNode member={pedigreeData.children[0].partners[1]} pos={positions['g-mother']} onClick={() => setSelectedMember(pedigreeData.children[0].partners[1])} onHover={setHoveredMember} opacity={getFilteredOpacity('g-mother')} />
              
              <CollapseToggle onClick={() => toggleCollapse('parents')} isCollapsed={collapsedBranches['parents']} pos={{x: canvasW/2, y: positions['g-father'].y + 60}} />

              {/* Gen III Nodes */}
              {!collapsedBranches['parents'] && (
                <>
                  <PedigreeNode member={pedigreeData.children[0].children[0].partners[0]} pos={positions['vivek']} onClick={() => setSelectedMember(pedigreeData.children[0].children[0].partners[0])} onHover={setHoveredMember} opacity={getFilteredOpacity('vivek')} />
                  <PedigreeNode member={pedigreeData.children[0].children[0].partners[1]} pos={positions['bhavana']} onClick={() => setSelectedMember(pedigreeData.children[0].children[0].partners[1])} onHover={setHoveredMember} opacity={getFilteredOpacity('bhavana')} />
                  
                  <CollapseToggle onClick={() => toggleCollapse('children')} isCollapsed={collapsedBranches['children']} pos={{x: canvasW/2, y: positions['vivek'].y + 60}} />

                  {/* Gen IV Nodes */}
                  {!collapsedBranches['children'] && (
                    <>
                      <PedigreeNode member={pedigreeData.children[0].children[0].children[0].partners[0]} pos={positions['anrunya']} onClick={() => setSelectedMember(pedigreeData.children[0].children[0].children[0].partners[0])} onHover={setHoveredMember} opacity={getFilteredOpacity('anrunya')} />
                      <PedigreeNode member={pedigreeData.children[0].children[0].children[1].partners[0]} pos={positions['kshetradnya']} onClick={() => setSelectedMember(pedigreeData.children[0].children[0].children[1].partners[0])} onHover={setHoveredMember} opacity={getFilteredOpacity('kshetradnya')} />
                    </>
                  )}
                </>
              )}
            </>
          )}

        </motion.div>
      </div>

      {/* F7: Click-to-Expand Detail Panel */}
      <AnimatePresence>
        {selectedMember && (
          <DetailPanel 
            member={selectedMember} 
            onClose={() => setSelectedMember(null)} 
          />
        )}
      </AnimatePresence>

    </section>
  );
};

// Node Collapse Button (F38)
const CollapseToggle = ({ onClick, isCollapsed, pos }) => (
  <button 
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    className="absolute z-30 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full glass border border-cream/20 flex items-center justify-center text-cream hover:bg-accent hover:text-dark hover:border-accent transition-all shadow-xl"
    style={{ left: pos.x, top: pos.y }}
    aria-label="Toggle Branch"
  >
    <span className="font-anton text-xl leading-none">{isCollapsed ? '+' : '-'}</span>
  </button>
);

const PedigreeNode = ({ member, pos, onClick, onHover, opacity }) => {
  const isHovered = opacity === 1;

  // Extended members logic for images
  const imgSrc = member.image.includes('placeholder') 
    ? 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=' + member.name[0]
    : `/${member.image}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity, scale: 1 }}
      animate={{ opacity }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
      className={`absolute z-20 outline-none w-56 h-56 cursor-pointer -translate-x-1/2 -translate-y-1/2 group transition-opacity duration-300`}
      style={{ left: pos.x, top: pos.y }}
    >
      <div className={`relative w-full h-full rounded-2xl glass border border-cream/10 p-1 overflow-hidden transition-all duration-500 hover:border-accent/60 hover:scale-105 shadow-2xl`}>
        
        <div className="w-full h-full rounded-xl overflow-hidden relative bg-dark">
          <img 
            src={imgSrc} 
            alt={member.name}
            className={`w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-90"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 text-center px-4 pointer-events-none">
          <h3 className="font-anton text-2xl text-cream leading-tight tracking-wider uppercase drop-shadow-md">
            {member.name}
          </h3>
          <span className="text-[10px] text-accent font-bold uppercase tracking-[0.3em] mt-1 drop-shadow-md">
            {member.role ? member.role.split(',')[0] : ''}
          </span>
        </div>

        <div className="absolute top-4 right-4 w-8 h-8 rounded-full glass border border-cream/20 flex items-center justify-center text-cream group-hover:text-accent group-hover:rotate-12 transition-all duration-500">
          {getRoleIcon(member.id)}
        </div>
        
        {member.isPrimary && (
           <div className="absolute top-4 left-4 w-12 py-1 rounded-full bg-accent text-dark flex items-center justify-center text-[8px] font-bold tracking-widest uppercase">
             Primary
           </div>
        )}
      </div>

       {/* F40: Focus Info overlay inside node */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 glass border border-cream/10 p-4 rounded-xl w-64 pointer-events-none z-30 shadow-2xl text-center"
          >
            <p className="text-[10px] text-cream font-inter uppercase tracking-[0.2em] leading-relaxed">
              {member.bio ? member.bio.substring(0, 60) + '...' : 'Extended Ancestry'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Feature 7: Deep Dive Detail Panel
const DetailPanel = ({ member, onClose }) => {
  const imgSrc = member.image.includes('placeholder') 
    ? 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=' + member.name[0]
    : `/${member.image}`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-end"
    >
      <div className="absolute inset-0 bg-dark/80 backdrop-blur-md" onClick={onClose} />
      
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-2xl h-full glass border-l border-cream/10 shadow-2xl p-8 md:p-16 overflow-y-auto"
      >
        <button onClick={onClose} className="absolute top-8 right-8 w-12 h-12 rounded-full glass border border-cream/10 flex items-center justify-center text-cream hover:text-accent transition-colors">
          {Icons.X}
        </button>

        <div className="flex flex-col h-full">
          <header className="mb-12 flex items-center gap-8">
            <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border border-cream/20">
              <img src={imgSrc} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-accent uppercase tracking-widest text-xs font-bold mb-2 block">Pedigree Snapshot</span>
              <h2 className="font-anton text-4xl md:text-5xl text-cream tracking-tight">{member.name.toUpperCase()} <span className="text-outline-cream">{member.surname.toUpperCase()}</span></h2>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h4 className="text-accent text-[10px] uppercase tracking-[0.4em] font-bold mb-6">Manifesto</h4>
              <p className="text-cream/80 text-base leading-relaxed font-inter">
                {member.bio || "Data not fully logged in pedigree archives."}
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-accent text-[10px] uppercase tracking-[0.4em] font-bold mb-6">Key Milestones</h4>
                <div className="space-y-4">
                  {member.achievements?.length > 0 ? member.achievements.map((ach, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 group-hover:scale-150 transition-transform"></div>
                      <span className="text-cream/70 text-sm font-medium leading-tight">{ach}</span>
                    </div>
                  )) : (
                    <span className="text-cream/50 text-sm italic">Historical records unverified.</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {member.projects && member.projects.length > 0 && (
            <div className="mb-16">
              <h4 className="text-accent text-[10px] uppercase tracking-[0.4em] font-bold mb-8">Notable Ventures</h4>
              <div className="grid grid-cols-1 gap-4">
                {member.projects.map((proj, i) => (
                  <a key={i} href={proj.link} target="_blank" rel="noopener noreferrer" className="group block glass border border-cream/5 p-6 rounded-2xl hover:border-accent/40 transition-all duration-500">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-accent font-bold uppercase tracking-widest mb-1 block opacity-60 group-hover:opacity-100">{proj.type}</span>
                        <h5 className="text-xl text-cream font-anton tracking-wide group-hover:text-accent transition-colors">{proj.name}</h5>
                      </div>
                      <div className="w-12 h-12 rounded-full glass border border-cream/10 bg-cream/5 flex items-center justify-center text-cream group-hover:bg-accent group-hover:text-dark transition-all duration-500">
                        {Icons.ArrowRight}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto pt-8 border-t border-cream/10 flex flex-wrap items-center justify-between gap-6">
            <div className="flex gap-4">
              {member.socials && member.socials.map((social) => (
                <a key={social.platform} href={social.url} className="text-cream/50 hover:text-accent font-bold uppercase tracking-[0.3em] text-[10px]">
                  {social.platform}
                </a>
              ))}
            </div>
            
            {member.isPrimary && (
              <button 
                onClick={() => {
                  document.getElementById(member.id)?.scrollIntoView({ behavior: 'smooth' });
                  onClose();
                }}
                className="text-xs font-bold uppercase tracking-[0.4em] text-accent flex items-center gap-2 group"
              >
                Full Profile {Icons.ArrowRight}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FamilyTreeSection;
