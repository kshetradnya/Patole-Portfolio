import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccent } from '../../context/AccentContext';

// ─────────────────────────────────────────────────────────────────────────────
// FAMILY DATA
// ─────────────────────────────────────────────────────────────────────────────
const DATA = {
  // ── PATERNAL SIDE ──────────────────────────────────────────────────────────
  paternal: {
    greatGrandparents: {
      left:  { id:'pggp1', name:'Govindrao', surname:'Patole', role:'Paternal Great-Grandfather', gender:'M', accent:'#475569', bio:'Established the Patole family in Maharashtra. A disciplined patriarch who valued education above all.', achievements:['Community Patriarch','Land & Family Legacy'] },
      right: { id:'pggp2', name:'Radhabai',  surname:'Patole', role:'Paternal Great-Grandmother', gender:'F', accent:'#64748b', bio:'Upheld cultural traditions and ensured every child in the family was educated.', achievements:['Cultural Custodian'] },
    },
    grandparents: {
      left:  { id:'pgp1', name:'Ramchandra', surname:'Patole', role:'Paternal Grandfather', gender:'M', accent:'#94a3b8', bio:'A retired educator who dedicated his life to public schooling and community leadership.', achievements:['Retired Educator','Community Leader'] },
      right: { id:'pgp2', name:'Sulochana',  surname:'Patole', role:'Paternal Grandmother', gender:'F', accent:'#a8a29e', bio:'The heart of the Patole household—brought the family together through wisdom and warmth.', achievements:['Family Matriarch','Social Reformist'] },
    },
    siblings: [
      {
        id:'uncle1', name:'Suresh', surname:'Patole', role:'Uncle · Civil Servant', gender:'M', accent:'#f97316',
        bio:'Senior civil servant continuing the Patole tradition of public service.', achievements:['Senior Civil Servant','State Award Recipient'],
        spouse: { id:'aunt1', name:'Meera', surname:'Patole', role:'Aunt · Teacher', gender:'F', accent:'#fb923c', bio:'Dedicated educator with 25+ years in primary school education.', achievements:['25 Years in Education'] },
        children: [
          { id:'cous1', name:'Rohan', surname:'Patole', role:'Cousin · Engg', gender:'M', accent:'#fbbf24', bio:'Pursuing a degree in Civil Engineering.', achievements:['First Class Graduate'] },
          { id:'cous2', name:'Priya', surname:'Patole', role:'Cousin · Med',  gender:'F', accent:'#f59e0b', bio:'Aspiring doctor preparing for post-graduate medicine.', achievements:['NEET Qualifier'] },
        ],
      },
    ],
  },
  // ── MATERNAL SIDE ──────────────────────────────────────────────────────────
  maternal: {
    greatGrandparents: {
      left:  { id:'mggp1', name:'Narayan',  surname:'Desai', role:'Maternal Great-Grandfather', gender:'M', accent:'#0f766e', bio:'A respected merchant who built family equity through honest trade in western Maharashtra.', achievements:['Merchant Pioneer','Charitable Donor'] },
      right: { id:'mggp2', name:'Lakshmibai',surname:'Desai', role:'Maternal Great-Grandmother', gender:'F', accent:'#0d9488', bio:'Known for her devotion to social causes and womens education in the village.', achievements:['Womens Rights Advocate'] },
    },
    grandparents: {
      left:  { id:'mgp1', name:'Vishwanath', surname:'Desai', role:'Maternal Grandfather', gender:'M', accent:'#14b8a6', bio:'Retired government officer who championed higher education for all his children.', achievements:['Retired Government Officer','4 Children Educated'] },
      right: { id:'mgp2', name:'Kamlabai',   surname:'Desai', role:'Maternal Grandmother', gender:'F', accent:'#2dd4bf', bio:'A warm and spirited homemaker who ensured every family gathering was memorable.', achievements:['Family Anchor'] },
    },
    siblings: [
      {
        id:'uncle2', name:'Ashok', surname:'Joshi', role:'Uncle · Biz', gender:'M', accent:'#06b6d4',
        bio:'Built a successful manufacturing business from scratch in Pune.', achievements:['Entrepreneur Award','50+ Employees'],
        spouse: { id:'aunt2', name:'Sunita', surname:'Joshi', role:'Aunt · Fashion', gender:'F', accent:'#22d3ee', bio:'Award-winning fashion designer with a boutique in Pune.', achievements:['Regional Design Award'] },
        children: [
          { id:'cous3', name:'Yash', surname:'Joshi', role:'Cousin · CA', gender:'M', accent:'#67e8f9', bio:'Completing Chartered Accountancy finals.', achievements:['CA Inter Rank Holder'] },
          { id:'cous4', name:'Neha', surname:'Joshi', role:'Cousin · Dev', gender:'F', accent:'#a5f3fc', bio:'Full-stack developer at a Pune startup.', achievements:['Hackathon Winner'] },
        ],
      },
    ],
  },
  // ── CORE ───────────────────────────────────────────────────────────────────
  parents: {
    father: {
      id:'vivek', name:'Vivek', surname:'Patole', role:'VP – Central Engineering', gender:'M', accent:'#f59e0b',
      bio:'Vice President – Central Engineering at Tata Projects Limited. Over 30 years of infrastructure excellence.', achievements:['VP at Tata Projects','Infrastructure Leader'],
      image:'/vivek.png', isPrimary:true,
    },
    mother: {
      id:'bhavana', name:'Bhavana', surname:'Patole', role:'Director, SIAC Mumbai', gender:'F', accent:'#10b981',
      bio:'Director of SIAC Mumbai and published historian at Elphinstone College.', achievements:['SIAC Director','Published Historian'],
      image:'/bhavana.png', isPrimary:true,
    },
  },
  children: [
    { id:'anrunya', name:'Anrunya', surname:'Patole', role:'Cyber Specialist', gender:'F', accent:'#8b5cf6', image:'/anrunya_original.png', isPrimary:true },
    { id:'kshetradnya', name:'Kshetradnya', surname:'Patole', role:'Web Developer', gender:'M', accent:'#00d4ff', image:'/kshetradnya.png', isPrimary:true },
  ],
};

const allPeople = [
  ...Object.values(DATA.paternal.greatGrandparents), ...Object.values(DATA.paternal.grandparents),
  ...DATA.paternal.siblings, ...DATA.paternal.siblings.map(u => u.spouse), ...DATA.paternal.siblings.flatMap(u => u.children),
  ...Object.values(DATA.maternal.greatGrandparents), ...Object.values(DATA.maternal.grandparents),
  ...DATA.maternal.siblings, ...DATA.maternal.siblings.map(u => u.spouse), ...DATA.maternal.siblings.flatMap(u => u.children),
  DATA.parents.father, DATA.parents.mother, ...DATA.children
];

// ─────────────────────────────────────────────────────────────────────────────
// UI COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const Avatar = ({ person, size = 'md' }) => {
  const [err, setErr] = useState(false);
  const sizes = { 
    xs:'w-8 h-8', 
    sm:'w-12 h-12', 
    md:'w-16 h-16', 
    lg:'w-24 h-24 md:w-32 md:h-32' // Enlarged primary family size
  };
  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden border-2 flex-shrink-0 relative`} style={{ borderColor: person.accent }}>
      {person.image && !err
        ? <img src={person.image} alt={person.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" onError={() => setErr(true)} />
        : <div className="w-full h-full flex items-center justify-center font-anton text-[10px]" style={{ background:`${person.accent}22`, color:person.accent }}>{person.name[0]}</div>
      }
    </div>
  );
};

const PersonCard = ({ person, onSelect, size = 'sm', highlight = false, dim = false }) => (
  <motion.button
    whileHover={{ scale: dim ? 1 : 1.1, y: dim ? 0 : -2 }}
    onClick={() => onSelect(person)}
    animate={{ opacity: dim ? 0.2 : 1 }}
    className={`flex flex-col items-center gap-2 group relative outline-none ${person.isPrimary && size === 'lg' ? 'scale-110' : ''}`}
    aria-label={person.name}
  >
    <div className="relative">
      <Avatar person={person} size={size} />
      {highlight && (
        <motion.div animate={{ scale:[1, 1.2, 1] }} transition={{ repeat:Infinity, duration:2 }} className="absolute -inset-2 rounded-full border-2" style={{ borderColor: person.accent, boxShadow: `0 0 16px ${person.accent}` }} />
      )}
      {person.isPrimary && !dim && <span className="absolute -inset-2 rounded-full border-2 opacity-50 animate-ping pointer-events-none" style={{ borderColor: person.accent }} />}
    </div>
    <span className={`font-anton text-cream uppercase tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity ${size === 'lg' ? 'text-sm mt-1' : 'text-[9px]'}`}>{person.name}</span>
    {highlight && <span className="absolute -top-10 bg-accent text-dark font-inter text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider shadow-lg">MATCH</span>}
  </motion.button>
);

const MarriageSymbol = () => (
  <motion.div 
    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
    transition={{ duration: 3, repeat: Infinity }}
    className="text-5xl text-accent font-anton select-none drop-shadow-[0_0_20px_rgba(0,212,255,0.6)] px-1"
  >∞</motion.div>
);

const ConnectLine = ({ type = 'v', length = 'h-8', color = 'bg-cream/15', className = "" }) => (
  <div className={`${type === 'v' ? `w-px ${length}` : `h-px ${length}`} ${color} ${className}`} />
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────────────────

const FamilyTreeSection = () => {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const { setAccent } = useAccent();

  const handleSelect = (p) => { setSelected(p); setAccent(p.accent); };
  const matchedIds = search.trim() ? allPeople.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p => p.id) : [];
  const isMatched = (id) => matchedIds.includes(id);
  const isDimmed = (id) => search.trim() && !isMatched(id);

  return (
    <section id="legacy-tree" className="relative bg-dark py-24 px-4 overflow-x-auto">
      {/* Background Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
        <span className="font-anton text-[25vw] leading-none uppercase tracking-widest">Patole</span>
      </div>

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="font-anton text-6xl md:text-8xl text-cream tracking-tight leading-none">THE <span className="text-outline-cream">LEGACY</span> DIAGRAM</h2>
        <div className="flex flex-col items-center mt-8 gap-4">
          {/* Enhanced Search */}
          <div className="relative group">
            <input 
              type="text" placeholder="Trace lineage..." value={search} onChange={e => setSearch(e.target.value)}
              className="bg-white/5 border border-cream/10 rounded-full py-2.5 pl-10 pr-10 text-xs font-inter text-cream/80 focus:outline-none focus:border-accent w-64 transition-all"
            />
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-accent w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            {search && <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream text-lg leading-none">×</button>}
          </div>
          <p className="font-inter text-cream/20 text-[10px] uppercase tracking-[0.4em]">Bi-Lateral Pedigree · 4 Generations</p>
        </div>
      </div>

      {/* Diagram Canvas */}
      <div className="relative z-10 mx-auto" style={{ minWidth: 1000, maxWidth: 1200 }}>
        
        {/* ROW 1: GREAT-GRANDPARENTS (GEN I) */}
        <div className="flex justify-between items-start px-20">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[8px] text-cream/20 font-bold uppercase tracking-widest">Paternal Gen I</span>
            <div className="flex items-end gap-2">
              <PersonCard person={DATA.paternal.greatGrandparents.left} onSelect={handleSelect} size="xs" highlight={isMatched('pggp1')} dim={isDimmed('pggp1')} />
              <MarriageSymbol />
              <PersonCard person={DATA.paternal.greatGrandparents.right} onSelect={handleSelect} size="xs" highlight={isMatched('pggp2')} dim={isDimmed('pggp2')} />
            </div>
            <ConnectLine length="h-10" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[8px] text-cream/20 font-bold uppercase tracking-widest">Maternal Gen I</span>
            <div className="flex items-end gap-2">
              <PersonCard person={DATA.maternal.greatGrandparents.left} onSelect={handleSelect} size="xs" highlight={isMatched('mggp1')} dim={isDimmed('mggp1')} />
              <MarriageSymbol />
              <PersonCard person={DATA.maternal.greatGrandparents.right} onSelect={handleSelect} size="xs" highlight={isMatched('mggp2')} dim={isDimmed('mggp2')} />
            </div>
            <ConnectLine length="h-10" />
          </div>
        </div>

        {/* ROW 2: GRANDPARENTS (GEN II) */}
        <div className="flex justify-between items-start px-20 -mt-2">
          <div className="flex flex-col items-center">
            <div className="flex items-end gap-3">
              <PersonCard person={DATA.paternal.grandparents.left} onSelect={handleSelect} size="md" highlight={isMatched('pgp1')} dim={isDimmed('pgp1')} />
              <MarriageSymbol />
              <PersonCard person={DATA.paternal.grandparents.right} onSelect={handleSelect} size="md" highlight={isMatched('pgp2')} dim={isDimmed('pgp2')} />
            </div>
            {/* The Sibling Bracket start */}
            <ConnectLine length="h-10" />
            <ConnectLine type="h" length="w-[300px]" className="-mt-px" />
            <div className="flex justify-between w-[300px]">
              <ConnectLine length="h-6" />
              <ConnectLine length="h-6" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-end gap-3">
              <PersonCard person={DATA.maternal.grandparents.left} onSelect={handleSelect} size="md" highlight={isMatched('mgp1')} dim={isDimmed('mgp1')} />
              <MarriageSymbol />
              <PersonCard person={DATA.maternal.grandparents.right} onSelect={handleSelect} size="md" highlight={isMatched('mgp2')} dim={isDimmed('mgp2')} />
            </div>
            {/* The Sibling Bracket start */}
            <ConnectLine length="h-10" />
            <ConnectLine type="h" length="w-[300px]" className="-mt-px" />
            <div className="flex justify-between w-[300px]">
              <ConnectLine length="h-6" />
              <ConnectLine length="h-6" />
            </div>
          </div>
        </div>

        {/* ROW 3: PARENTS & SIBLINGS (GEN III) */}
        <div className="flex justify-between items-start -mt-px px-5">
          {/* Paternal Siblings Unit */}
          <div className="flex gap-16">
            <div className="flex flex-col items-center">
              <div className="flex items-end gap-2">
                <PersonCard person={DATA.paternal.siblings[0]} onSelect={handleSelect} size="sm" highlight={isMatched('uncle1')} dim={isDimmed('uncle1')} />
                <MarriageSymbol />
                <PersonCard person={DATA.paternal.siblings[0].spouse} onSelect={handleSelect} size="sm" highlight={isMatched('aunt1')} dim={isDimmed('aunt1')} />
              </div>
              <ConnectLine length="h-6" />
              <ConnectLine type="h" length="w-20" />
              <div className="flex justify-between w-20">
                <ConnectLine length="h-6" />
                <ConnectLine length="h-6" />
              </div>
            </div>

            {/* VIVEK */}
            <div className="flex flex-col items-center pr-20">
              <PersonCard person={DATA.parents.father} onSelect={handleSelect} size="lg" highlight={isMatched('vivek')} dim={isDimmed('vivek')} />
            </div>
          </div>

          {/* Center Marriage Connecting Line */}
          <div className="flex flex-col items-center pt-8 justify-center absolute left-1/2 -translate-x-1/2">
             <div className="bg-accent/10 p-2 rounded-full backdrop-blur-sm border border-accent/20">
                <MarriageSymbol />
             </div>
             <div className="font-anton text-[9px] text-accent mt-2 uppercase tracking-[0.5em] font-bold">Core Family</div>
          </div>

          {/* Maternal Siblings Unit */}
          <div className="flex gap-16">
            {/* BHAVANA */}
            <div className="flex flex-col items-center pl-20">
              <PersonCard person={DATA.parents.mother} onSelect={handleSelect} size="lg" highlight={isMatched('bhavana')} dim={isDimmed('bhavana')} />
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-end gap-2">
                <PersonCard person={DATA.maternal.siblings[0]} onSelect={handleSelect} size="sm" highlight={isMatched('uncle2')} dim={isDimmed('uncle2')} />
                <MarriageSymbol />
                <PersonCard person={DATA.maternal.siblings[0].spouse} onSelect={handleSelect} size="sm" highlight={isMatched('aunt2')} dim={isDimmed('aunt2')} />
              </div>
              <ConnectLine length="h-6" />
              <ConnectLine type="h" length="w-20" />
              <div className="flex justify-between w-20">
                <ConnectLine length="h-6" />
                <ConnectLine length="h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Final Convergence to Generation IV */}
        <div className="flex justify-center -mt-px relative h-28">
             {/* Vivek & Bhavana Descend */}
             <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
                <ConnectLine length="h-12" color="bg-accent" />
                <ConnectLine type="h" length="w-64" color="bg-accent" />
                <div className="flex justify-between w-64">
                    <ConnectLine length="h-12" color="bg-accent" />
                    <ConnectLine length="h-12" color="bg-accent" />
                </div>
             </div>
             {/* Left Cousin Descend */}
             <div className="absolute left-10">
                 <div className="flex flex-col items-center">
                    <ConnectLine length="h-10" />
                    <div className="flex gap-12">
                        <PersonCard person={DATA.paternal.siblings[0].children[0]} onSelect={handleSelect} size="sm" highlight={isMatched('cous1')} dim={isDimmed('cous1')} />
                        <PersonCard person={DATA.paternal.siblings[0].children[1]} onSelect={handleSelect} size="sm" highlight={isMatched('cous2')} dim={isDimmed('cous2')} />
                    </div>
                 </div>
             </div>
             {/* Right Cousin Descend */}
             <div className="absolute right-10">
                 <div className="flex flex-col items-center">
                    <ConnectLine length="h-10" />
                    <div className="flex gap-12">
                        <PersonCard person={DATA.maternal.siblings[0].children[0]} onSelect={handleSelect} size="sm" highlight={isMatched('cous3')} dim={isDimmed('cous3')} />
                        <PersonCard person={DATA.maternal.siblings[0].children[1]} onSelect={handleSelect} size="sm" highlight={isMatched('cous4')} dim={isDimmed('cous4')} />
                    </div>
                 </div>
             </div>
        </div>

        {/* ROW 4: CHILDREN (GEN IV) */}
        <div className="flex justify-center gap-40 pt-10 px-10">
          <PersonCard person={DATA.children[0]} onSelect={handleSelect} size="lg" highlight={isMatched('anrunya')} dim={isDimmed('anrunya')} />
          <PersonCard person={DATA.children[1]} onSelect={handleSelect} size="lg" highlight={isMatched('kshetradnya')} dim={isDimmed('kshetradnya')} />
        </div>
        <div className="text-center mt-4">
           <span className="font-anton text-[8px] text-accent/40 uppercase tracking-[1em]">Generation IV</span>
        </div>

      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selected && (
          <DetailPanel person={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

const DetailPanel = ({ person, onClose }) => (
  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-[500] flex items-center justify-end p-4 md:p-10 pointer-events-none">
    <div className="absolute inset-0 bg-dark/90 backdrop-blur-md pointer-events-auto" onClick={onClose} />
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      className="relative z-10 w-full max-w-lg bg-dark/50 border border-cream/10 h-full rounded-3xl p-10 flex flex-col pointer-events-auto backdrop-blur-xl shadow-2xl"
    >
      <button onClick={onClose} className="absolute top-8 right-8 text-cream/40 hover:text-cream text-2xl transition-colors">×</button>
      
      <div className="flex items-center gap-6 mb-10">
        <Avatar person={person} size="lg" />
        <div>
          <span className="text-[10px] text-accent font-bold uppercase tracking-widest">{person.role}</span>
          <h3 className="font-anton text-4xl text-cream tracking-tight leading-none uppercase">{person.name}</h3>
        </div>
      </div>

      <div className="space-y-8 overflow-y-auto pr-4 custom-scrollbar">
        <div>
          <h4 className="font-anton text-[10px] text-cream/30 uppercase tracking-[0.4em] mb-3">Biography</h4>
          <p className="font-inter text-cream/70 text-sm leading-relaxed">{person.bio || "Preserving the legacy of the Patole family through generations of excellence and service."}</p>
        </div>

        {person.achievements && (
        <div>
          <h4 className="font-anton text-[10px] text-cream/30 uppercase tracking-[0.4em] mb-4">Milestones</h4>
          <div className="space-y-3">
            {person.achievements.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-1 h-1 rounded-full bg-accent mt-2" />
                <p className="font-inter text-cream/60 text-xs font-medium uppercase tracking-wider">{item}</p>
              </div>
            ))}
          </div>
        </div>
        )}

        {person.projects && (
        <div>
          <h4 className="font-anton text-[10px] text-cream/30 uppercase tracking-[0.4em] mb-4">Select Works</h4>
          <div className="grid gap-2">
            {person.projects.map((proj, i) => (
              <a key={i} href={proj.link} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl group hover:border-accent transition-all">
                <span className="font-inter text-cream text-[10px] font-bold uppercase tracking-widest">{proj.name}</span>
                <svg className="w-4 h-4 text-cream/30 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10"/></svg>
              </a>
            ))}
          </div>
        </div>
        )}
      </div>

      {person.isPrimary && (
        <button 
           onClick={() => { document.getElementById(person.id)?.scrollIntoView({ behavior:'smooth' }); onClose(); }}
           className="mt-auto w-full py-4 border border-accent text-accent font-anton uppercase tracking-widest text-[10px] rounded-full hover:bg-accent hover:text-dark transition-all"
        >
          View Full Profile ↓
        </button>
      )}
    </motion.div>
  </motion.div>
);

export default FamilyTreeSection;
