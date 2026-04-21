import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccent } from '../../context/AccentContext';

// ─── Family Data ─────────────────────────────────────────────────────────────
const familyTree = {
  greatGrandparents: [
    {
      id: 'ggp1',
      name: 'Shrikant',
      surname: 'Patole',
      role: 'Great Grandfather',
      gender: 'M',
      accent: '#64748b',
      bio: 'The foundational patriarch of the Patole lineage. Established family values rooted in discipline and service.',
      achievements: ['Established Family Estate', 'Community Elder'],
    },
    {
      id: 'ggp2',
      name: 'Savitribai',
      surname: 'Patole',
      role: 'Great Grandmother',
      gender: 'F',
      accent: '#78716c',
      bio: 'A pillar of strength and cultural preservation for the generations that followed.',
      achievements: ['Cultural Custodian', 'Family Matriarch'],
    },
  ],
  grandparents: [
    {
      id: 'gp1',
      name: 'Ramchandra',
      surname: 'Patole',
      role: 'Grandfather',
      gender: 'M',
      accent: '#94a3b8',
      bio: 'Carried the Patole name forward with dignity, championing education and community over personal gain.',
      achievements: ['Retired Educator', 'Community Leader'],
    },
    {
      id: 'gp2',
      name: 'Sulochana',
      surname: 'Patole',
      role: 'Grandmother',
      gender: 'F',
      accent: '#a8a29e',
      bio: 'The heart of the household. Known for uniting the extended family through wisdom and warmth.',
      achievements: ['Family Anchor', 'Social Reformist'],
    },
  ],
  parents: [
    {
      id: 'vivek',
      name: 'Vivek',
      surname: 'Patole',
      role: 'VP – Central Engineering',
      gender: 'M',
      accent: '#f59e0b',
      bio: 'Vice President – Central Engineering at Tata Projects Limited. Over three decades of excellence in steel-intensive infrastructure.',
      achievements: ['VP at Tata Projects', 'Infrastructure Leader', 'Engineering Alumni of Excellence'],
      image: '/vivek.png',
      socials: [{ platform: 'LinkedIn', url: 'https://www.linkedin.com/in/vivek-patole-8aab375/' }],
      projects: [
        { name: 'Where Engineering Meets Responsibility', link: 'https://ssmb.in/2026/01/16/where-engineering-meets-responsibility/' },
        { name: 'Steel-Intensive EPC Execution', link: 'https://ssmb.in/2025/09/05/steel-briefcase/' },
      ],
      isPrimary: true,
    },
    {
      id: 'bhavana',
      name: 'Bhavana',
      surname: 'Patole',
      role: 'Director, SIAC Mumbai',
      gender: 'F',
      accent: '#10b981',
      bio: 'Director of the State Institute for Administrative Careers. Researcher & historian at Elphinstone College.',
      achievements: ['SIAC Director', 'Published Historian', 'UPSC Coaching Pillar'],
      image: '/bhavana.png',
      socials: [{ platform: 'Mail', url: 'mailto:bhavana@patole.family' }],
      projects: [
        { name: 'In the Age of Awakening: The Role of Dnyanodaya', link: 'https://euacademic.org/UploadArticle/315.pdf' },
        { name: 'Leadership of Yashwantrao Chavan', link: 'https://oldgrt.lbp.world/UploadedData/720.pdf' },
      ],
      isPrimary: true,
    },
  ],
  children: [
    {
      id: 'anrunya',
      name: 'Anrunya',
      surname: 'Patole',
      role: 'Cyber Security Specialist',
      gender: 'F',
      accent: '#8b5cf6',
      bio: 'Pursuing MS-GBA at Virginia Tech, specializing in Cybersecurity Management & Analytics on top of a BTech in CSDS from NMIMS.',
      achievements: ['MS-GBA – Virginia Tech', 'BTech CSDS – NMIMS', 'Cyber Security Expert'],
      image: '/anrunya_original.png',
      socials: [{ platform: 'LinkedIn', url: 'https://linkedin.com' }],
      projects: [
        { name: 'Threat Vector Analysis', link: '#' },
        { name: 'Network Security Protocol', link: '#' },
      ],
      isPrimary: true,
    },
    {
      id: 'kshetradnya',
      name: 'Kshetradnya',
      surname: 'Patole',
      role: 'Student & Web Developer',
      gender: 'M',
      accent: '#00d4ff',
      bio: 'Beta House Captain, aspiring developer, and creator of this portfolio. Built with passion for digital experiences.',
      achievements: ['Built Patole.in', 'Beta House Captain 2025', 'Creative Problem Solver'],
      image: '/kshetradnya.png',
      socials: [
        { platform: 'Site', url: 'https://kshetradnya.in' },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/kshetradnyapatole/' },
      ],
      projects: [
        { name: 'Kshetradnya.in', link: 'https://kshetradnya.in' },
        { name: 'Interactive Biology', link: '#' },
      ],
      isPrimary: true,
    },
  ],
};

// ─── Avatar Component ─────────────────────────────────────────────────────────
const Avatar = ({ person, size = 'md' }) => {
  const [imgError, setImgError] = useState(false);
  const sizeMap = {
    sm: 'w-16 h-16 text-xs',
    md: 'w-20 h-20 text-sm',
    lg: 'w-24 h-24 text-base',
  };

  const initials = `${person.name[0]}${person.surname ? person.surname[0] : ''}`;
  const genderColor = person.gender === 'F' ? '#ec4899' : '#60a5fa';

  return (
    <div
      className={`${sizeMap[size]} rounded-full overflow-hidden border-2 flex-shrink-0 relative`}
      style={{ borderColor: person.accent || genderColor }}
    >
      {person.image && !imgError ? (
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover grayscale"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center font-anton"
          style={{ background: `${person.accent || genderColor}22`, color: person.accent || genderColor }}
        >
          {initials}
        </div>
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"
      />
    </div>
  );
};

// ─── Couple Node Component ────────────────────────────────────────────────────
const CoupleNode = ({ left, right, onSelect, size = 'md', isActive }) => {
  return (
    <div className="flex items-center gap-4">
      <PersonNode person={left} onSelect={onSelect} size={size} isActive={isActive} />
      {/* Marriage ligature */}
      <div className="flex flex-col items-center gap-1">
        <span
          className="font-inter text-[8px] uppercase tracking-[0.3em] text-cream/30"
          style={{ writingMode: 'horizontal-tb' }}
        >
          ∞
        </span>
      </div>
      <PersonNode person={right} onSelect={onSelect} size={size} isActive={isActive} />
    </div>
  );
};

// ─── Person Node Component ────────────────────────────────────────────────────
const PersonNode = ({ person, onSelect, size = 'md', isActive }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(person)}
      className="flex flex-col items-center gap-2 cursor-pointer group text-center focus:outline-none"
      aria-label={`View ${person.name}'s details`}
    >
      <div className={`relative transition-all duration-300 ${isActive ? 'ring-4 ring-offset-2 ring-offset-dark rounded-full' : ''}`}
        style={isActive ? { '--tw-ring-color': person.accent } : {}}
      >
        <Avatar person={person} size={size} />
        {/* Pulse ring */}
        {person.isPrimary && (
          <div
            className="absolute -inset-1 rounded-full border opacity-40 animate-ping pointer-events-none"
            style={{ borderColor: person.accent }}
          />
        )}
      </div>
      <div>
        <p className="font-anton text-cream text-sm leading-tight tracking-wide uppercase">{person.name}</p>
        <p className="font-inter text-[9px] uppercase tracking-[0.2em] opacity-50 mt-0.5" style={{ color: person.accent }}>
          {person.role?.split(',')[0]}
        </p>
      </div>
    </motion.button>
  );
};

// ─── SVG Connector Lines ──────────────────────────────────────────────────────
const TreeConnectors = ({ hasGrandparents, hasGreatGrandparents }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
    <defs>
      <linearGradient id="treeLineGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
      </linearGradient>
    </defs>

    {/* Great-grandparents to grandparents */}
    {hasGreatGrandparents && hasGrandparents && (
      <motion.path
        d="M 50% 8% C 50% 14%, 50% 14%, 50% 20%"
        stroke="url(#treeLineGrad)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    )}

    {/* Grandparents to parents */}
    {hasGrandparents && (
      <motion.path
        d="M 50% 28% C 50% 34%, 50% 34%, 50% 40%"
        stroke="url(#treeLineGrad)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      />
    )}

    {/* Parents to children fork */}
    <motion.path
      d="M 50% 60% C 50% 66%, 50% 66%, 50% 72% M 50% 72% C 50% 72%, 30% 72%, 30% 78% M 50% 72% C 50% 72%, 70% 72%, 70% 78%"
      stroke="url(#treeLineGrad)"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
    />
  </svg>
);

// ─── Main FamilyTreeSection Component ────────────────────────────────────────
const FamilyTreeSection = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const sectionRef = useRef(null);
  const { setAccent } = useAccent();

  const handleSelect = (person) => {
    setSelectedPerson(person);
    if (person.accent) setAccent(person.accent);
  };

  // All people for search
  const allPeople = [
    ...familyTree.greatGrandparents,
    ...familyTree.grandparents,
    ...familyTree.parents,
    ...familyTree.children,
  ];

  const matchedId = searchTerm.trim()
    ? allPeople.find(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))?.id
    : null;

  return (
    <section
      ref={sectionRef}
      id="legacy-tree"
      className="relative bg-dark py-24 px-4 md:px-12 overflow-hidden"
    >
      {/* ── Background watermark ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-anton text-[20vw] text-white/[0.015] leading-none tracking-wider">PATOLE</span>
      </div>

      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-3 block">
          Four Generations
        </span>
        <h2 className="font-anton text-6xl md:text-8xl text-cream leading-none">
          THE <span className="text-outline-cream">LEGACY</span> TREE
        </h2>
        <p className="font-inter text-cream/40 text-sm tracking-[0.2em] uppercase mt-4">
          Click any member to explore their story
        </p>
      </motion.div>

      {/* ── Search Bar (Feature 39) ── */}
      <div className="flex justify-center mb-12 relative z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search family member..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="bg-white/5 border border-cream/10 rounded-full py-2.5 pl-12 pr-6 text-sm font-inter text-cream/80 focus:outline-none focus:border-accent w-72 transition-all placeholder:text-cream/20"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/30 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
      </div>

      {/* ── Pedigree Tree ── */}
      <div className="relative z-10 max-w-4xl mx-auto">

        {/* GENERATION I – Great Grandparents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-4"
        >
          <div className="text-[9px] uppercase tracking-[0.4em] text-cream/20 font-bold mb-6 font-inter">Generation I · Great Grandparents</div>
          <CoupleNode
            left={familyTree.greatGrandparents[0]}
            right={familyTree.greatGrandparents[1]}
            onSelect={handleSelect}
            size="sm"
            isActive={matchedId === familyTree.greatGrandparents[0].id || matchedId === familyTree.greatGrandparents[1].id}
          />
        </motion.div>

        {/* Vertical Line */}
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-px h-10 bg-gradient-to-b from-cream/30 to-cream/10 origin-top"
          />
        </div>

        {/* GENERATION II – Grandparents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center mb-4"
        >
          <div className="text-[9px] uppercase tracking-[0.4em] text-cream/20 font-bold mb-6 font-inter">Generation II · Grandparents</div>
          <CoupleNode
            left={familyTree.grandparents[0]}
            right={familyTree.grandparents[1]}
            onSelect={handleSelect}
            size="sm"
            isActive={matchedId === familyTree.grandparents[0].id || matchedId === familyTree.grandparents[1].id}
          />
        </motion.div>

        {/* Vertical Line */}
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-px h-10 bg-gradient-to-b from-cream/30 to-cream/10 origin-top"
          />
        </div>

        {/* GENERATION III – Parents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center mb-4"
        >
          <div className="text-[9px] uppercase tracking-[0.4em] text-cream/20 font-bold mb-6 font-inter">Generation III · Parents</div>
          <CoupleNode
            left={familyTree.parents[0]}
            right={familyTree.parents[1]}
            onSelect={handleSelect}
            size="lg"
            isActive={matchedId === familyTree.parents[0].id || matchedId === familyTree.parents[1].id}
          />
        </motion.div>

        {/* Fork Line to children */}
        <div className="flex justify-center mb-0">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-px h-10 bg-gradient-to-b from-cream/30 to-cream/10 origin-top"
          />
        </div>

        {/* Horizontal branch */}
        <div className="flex justify-center mb-0">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-px bg-gradient-to-r from-transparent via-cream/30 to-transparent origin-center"
            style={{ width: '40%' }}
          />
        </div>

        {/* Two child stems */}
        <div className="flex justify-between mb-4" style={{ width: '40%', margin: '0 auto' }}>
          {[0, 1].map(i => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className="w-px h-8 bg-gradient-to-b from-cream/30 to-cream/10 origin-top"
            />
          ))}
        </div>

        {/* GENERATION IV – Children */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="text-[9px] uppercase tracking-[0.4em] text-cream/20 font-bold mb-6 font-inter w-full text-center">Generation IV · Children</div>
          <div className="flex justify-center gap-24 md:gap-40">
            {familyTree.children.map((child) => (
              <PersonNode
                key={child.id}
                person={child}
                onSelect={handleSelect}
                size="lg"
                isActive={matchedId === child.id}
              />
            ))}
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center items-center gap-8 mt-16 border-t border-cream/5 pt-8"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-px bg-white/30"></div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-cream/30 font-inter">Bloodline</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cream/30 text-lg">∞</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-cream/30 font-inter">Marriage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-amber-400/50"></div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-cream/30 font-inter">Primary Member</span>
          </div>
        </motion.div>
      </div>

      {/* ── Detail Panel ── */}
      <AnimatePresence>
        {selectedPerson && (
          <DetailPanel person={selectedPerson} onClose={() => setSelectedPerson(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

// ─── Detail Side Panel ────────────────────────────────────────────────────────
const DetailPanel = ({ person, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-end"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative z-10 bg-dark border-l border-cream/10 w-full max-w-xl h-full overflow-y-auto p-10 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-cream/10 flex items-center justify-center text-cream/50 hover:text-cream hover:border-cream/30 transition-all"
          aria-label="Close"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center gap-6 mb-10">
          <Avatar person={person} size="lg" />
          <div>
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold mb-1 block" style={{ color: person.accent }}>
              {person.role}
            </span>
            <h3 className="font-anton text-4xl text-cream tracking-wide leading-tight">
              {person.name.toUpperCase()}
              <br />
              <span style={{ color: person.accent }}>{person.surname?.toUpperCase()}</span>
            </h3>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <h4 className="text-[9px] uppercase tracking-[0.4em] text-cream/40 font-bold mb-4 font-inter">About</h4>
          <p className="font-inter text-cream/70 leading-relaxed text-sm">{person.bio || 'Historical records preserved in family memory.'}</p>
        </div>

        {/* Achievements */}
        {person.achievements?.length > 0 && (
          <div className="mb-8">
            <h4 className="text-[9px] uppercase tracking-[0.4em] text-cream/40 font-bold mb-4 font-inter">Milestones</h4>
            <ul className="space-y-3">
              {person.achievements.map((a, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: person.accent }} />
                  <span className="font-inter text-cream/60 text-sm">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Projects */}
        {person.projects?.length > 0 && (
          <div className="mb-8">
            <h4 className="text-[9px] uppercase tracking-[0.4em] text-cream/40 font-bold mb-4 font-inter">Works</h4>
            <div className="space-y-3">
              {person.projects.map((p, i) => (
                <a
                  key={i}
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between p-4 rounded-xl border border-cream/5 hover:border-cream/20 transition-all duration-300"
                >
                  <span className="font-inter text-cream/70 text-sm group-hover:text-cream transition-colors">{p.name}</span>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-cream/30 group-hover:text-cream transition-colors flex-shrink-0 ml-4">
                    <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Socials */}
        {person.socials?.length > 0 && (
          <div className="flex gap-4 pt-6 border-t border-cream/5">
            {person.socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-[9px] uppercase tracking-[0.3em] text-cream/30 hover:text-accent transition-colors font-inter font-bold"
              >
                {s.platform}
              </a>
            ))}
          </div>
        )}

        {/* Scroll to full profile */}
        {person.isPrimary && (
          <button
            onClick={() => {
              document.getElementById(person.id)?.scrollIntoView({ behavior: 'smooth' });
              onClose();
            }}
            className="mt-6 w-full py-3 rounded-full border font-inter text-xs font-bold uppercase tracking-[0.3em] transition-all duration-300 hover:bg-accent hover:border-accent hover:text-dark"
            style={{ borderColor: `${person.accent}60`, color: person.accent }}
          >
            View Full Profile ↓
          </button>
        )}
      </motion.aside>
    </motion.div>
  );
};

export default FamilyTreeSection;
