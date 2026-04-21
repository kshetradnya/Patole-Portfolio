import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccent } from '../../context/AccentContext';

// ─────────────────────────────────────────────────────────────────────────────
// FAMILY DATA  (same as before – full copy)
// ─────────────────────────────────────────────────────────────────────────────
const DATA = {
  paternal: {
    greatGrandparents: {
      left:  { id:'pggp1', name:'Govindrao', surname:'Patole', role:'Paternal Great-Grandfather', gender:'M', accent:'#475569', bio:'Patriarch of the Patole family.', achievements:['Community Patriarch'] },
      right: { id:'pggp2', name:'Radhabai',  surname:'Patole', role:'Paternal Great-Grandmother', gender:'F', accent:'#64748b', bio:'Custodian of tradition.', achievements:['Cultural Custodian'] },
    },
    grandparents: {
      left:  { id:'pgp1', name:'Ramchandra', surname:'Patole', role:'Paternal Grandfather', gender:'M', accent:'#94a3b8', bio:'A retired educator dedicated to public schooling.', achievements:['Retired Educator'] },
      right: { id:'pgp2', name:'Sulochana',  surname:'Patole', role:'Paternal Grandmother', gender:'F', accent:'#a8a29e', bio:'Heart of the Patole household.', achievements:['Family Matriarch'] },
    },
    siblings: [
      {
        id:'uncle1', name:'Suresh', surname:'Patole', role:'Uncle · Civil Servant', gender:'M', accent:'#f97316',
        bio:'Senior civil servant continuing the Patole tradition.', achievements:['Senior Civil Servant'],
        spouse: { id:'aunt1', name:'Meera', surname:'Patole', role:'Aunt · Teacher', gender:'F', accent:'#fb923c', bio:'Dedicated educator.', achievements:['25 Years in Education'] },
        children: [
          { id:'cous1', name:'Rohan', surname:'Patole', role:'Cousin · Engg', gender:'M', accent:'#fbbf24', bio:'Civil Engineering student.', achievements:['First Class'] },
          { id:'cous2', name:'Priya', surname:'Patole', role:'Cousin · Med',  gender:'F', accent:'#f59e0b', bio:'Aspiring doctor.', achievements:['NEET Qualifier'] },
        ],
      },
    ],
  },
  maternal: {
    greatGrandparents: {
      left:  { id:'mggp1', name:'Narayan',   surname:'Desai', role:'Maternal Great-Grandfather', gender:'M', accent:'#0f766e', bio:'Respected merchant.', achievements:['Merchant Pioneer'] },
      right: { id:'mggp2', name:'Lakshmibai',surname:'Desai', role:'Maternal Great-Grandmother', gender:'F', accent:'#0d9488', bio:'Social reformist.', achievements:["Women's Rights Advocate"] },
    },
    grandparents: {
      left:  { id:'mgp1', name:'Vishwanath', surname:'Desai', role:'Maternal Grandfather', gender:'M', accent:'#14b8a6', bio:'Retired government officer.', achievements:['Retired Officer'] },
      right: { id:'mgp2', name:'Kamlabai',   surname:'Desai', role:'Maternal Grandmother', gender:'F', accent:'#2dd4bf', bio:'Warm homemaker.', achievements:['Family Anchor'] },
    },
    siblings: [
      {
        id:'uncle2', name:'Ashok', surname:'Joshi', role:'Uncle · Biz', gender:'M', accent:'#06b6d4',
        bio:'Built a manufacturing business in Pune.', achievements:['Entrepreneur Award'],
        spouse: { id:'aunt2', name:'Sunita', surname:'Joshi', role:'Aunt · Fashion', gender:'F', accent:'#22d3ee', bio:'Award-winning fashion designer.', achievements:['Regional Design Award'] },
        children: [
          { id:'cous3', name:'Yash', surname:'Joshi', role:'Cousin · CA',  gender:'M', accent:'#67e8f9', bio:'CA Finals student.', achievements:['CA Inter Rank Holder'] },
          { id:'cous4', name:'Neha', surname:'Joshi', role:'Cousin · Dev', gender:'F', accent:'#a5f3fc', bio:'Full-stack developer.', achievements:['Hackathon Winner'] },
        ],
      },
    ],
  },
  parents: {
    father: { id:'vivek',     name:'Vivek',      surname:'Patole', role:'VP – Central Engineering', gender:'M', accent:'#f59e0b', bio:'VP – Central Engineering, Tata Projects.', image:'/vivek.png', isPrimary:true },
    mother: { id:'bhavana',   name:'Bhavana',    surname:'Patole', role:'Director, SIAC Mumbai',    gender:'F', accent:'#10b981', bio:'Director, SIAC & published historian.',  image:'/bhavana.png', isPrimary:true },
  },
  children: [
    { id:'anrunya',     name:'Anrunya',     surname:'Patole', role:'Cyber Specialist', gender:'F', accent:'#8b5cf6', image:'/anrunya_original.png', isPrimary:true },
    { id:'kshetradnya', name:'Kshetradnya', surname:'Patole', role:'Web Developer',    gender:'M', accent:'#00d4ff', image:'/kshetradnya.png',       isPrimary:true },
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
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const Avatar = ({ person, size = 'md' }) => {
  const [err, setErr] = useState(false);
  const sizes = { xs:'w-8 h-8', sm:'w-11 h-11', md:'w-16 h-16', lg:'w-20 h-20 md:w-28 md:h-28' };
  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden border-2 flex-shrink-0`} style={{ borderColor: person.accent }}>
      {person.image && !err
        ? <img src={person.image} alt={person.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" onError={() => setErr(true)} />
        : <div className="w-full h-full flex items-center justify-center font-anton text-[10px]" style={{ background:`${person.accent}22`, color:person.accent }}>{person.name[0]}</div>
      }
    </div>
  );
};

const PersonCard = ({ person, onSelect, size = 'sm', highlight = false, dim = false }) => (
  <motion.button
    whileHover={{ scale: dim ? 1 : 1.08, y: dim ? 0 : -2 }}
    onClick={() => onSelect(person)}
    animate={{ opacity: dim ? 0.2 : 1 }}
    className={`flex flex-col items-center gap-1.5 group relative outline-none ${person.isPrimary && size === 'lg' ? 'scale-110' : ''}`}
    aria-label={person.name}
  >
    <div className="relative">
      <Avatar person={person} size={size} />
      {highlight && (
        <motion.div animate={{ scale:[1,1.2,1] }} transition={{ repeat:Infinity, duration:2 }}
          className="absolute -inset-2 rounded-full border-2"
          style={{ borderColor: person.accent, boxShadow:`0 0 16px ${person.accent}` }}
        />
      )}
      {person.isPrimary && !dim && <span className="absolute -inset-2 rounded-full border-2 opacity-40 animate-ping pointer-events-none" style={{ borderColor: person.accent }} />}
    </div>
    <span className={`font-anton text-cream uppercase tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity ${size === 'lg' ? 'text-xs mt-0.5' : 'text-[8px]'}`}>{person.name}</span>
    {highlight && <span className="absolute -top-8 bg-accent text-dark font-inter text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-lg">MATCH</span>}
  </motion.button>
);

const MarriageSymbol = ({ size = 'md' }) => (
  <motion.div
    animate={{ scale:[1,1.15,1], opacity:[0.6,1,0.6] }}
    transition={{ duration:3, repeat:Infinity }}
    className={`font-anton select-none drop-shadow-[0_0_18px_rgba(0,212,255,0.5)] ${size === 'sm' ? 'text-3xl' : 'text-5xl'} text-accent px-1`}
  >∞</motion.div>
);

const Line = ({ type='v', length='h-8', color='bg-cream/15', className='' }) => (
  <div className={`${type==='v' ? `w-px ${length}` : `h-px ${length}`} ${color} ${className}`} />
);

// ─────────────────────────────────────────────────────────────────────────────
// DETAIL PANEL
// ─────────────────────────────────────────────────────────────────────────────
const DetailPanel = ({ person, onClose }) => (
  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-[500] flex items-center justify-end pointer-events-none">
    <div className="absolute inset-0 bg-dark/90 backdrop-blur-md pointer-events-auto" onClick={onClose} />
    <motion.div
      initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }}
      transition={{ type:'spring', damping:28, stiffness:280 }}
      className="relative z-10 w-full max-w-md md:max-w-lg bg-dark/60 border-l border-cream/10 h-full p-6 md:p-10 flex flex-col pointer-events-auto backdrop-blur-xl shadow-2xl overflow-y-auto"
    >
      <button onClick={onClose} className="absolute top-5 right-5 text-cream/40 hover:text-cream text-2xl transition-colors w-10 h-10 flex items-center justify-center">×</button>
      <div className="flex items-center gap-4 mb-8 pr-12">
        <Avatar person={person} size="lg" />
        <div>
          <span className="text-[9px] text-accent font-bold uppercase tracking-widest block mb-1">{person.role}</span>
          <h3 className="font-anton text-3xl md:text-4xl text-cream tracking-tight leading-none uppercase">{person.name}</h3>
        </div>
      </div>
      <p className="font-inter text-cream/60 text-sm leading-relaxed mb-6">{person.bio || 'Preserving the Patole legacy through excellence.'}</p>
      {person.achievements && (
        <div className="mb-6">
          <h4 className="font-anton text-[9px] text-cream/25 uppercase tracking-[0.4em] mb-3">Milestones</h4>
          <ul className="space-y-2">
            {person.achievements.map((a,i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: person.accent }} />
                <span className="font-inter text-cream/55 text-sm">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {person.isPrimary && (
        <button onClick={() => { document.getElementById(person.id)?.scrollIntoView({ behavior:'smooth' }); onClose(); }}
          className="mt-auto w-full py-3 border font-inter text-xs font-bold uppercase tracking-[0.3em] rounded-full transition-all duration-300"
          style={{ borderColor:`${person.accent}60`, color:person.accent }}
          onMouseEnter={e => { e.currentTarget.style.background=person.accent; e.currentTarget.style.color='#1a1a1a'; }}
          onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color=person.accent; }}
        >View Full Profile ↓</button>
      )}
    </motion.div>
  </motion.div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE TREE – vertical accordion-style list by generation
// ─────────────────────────────────────────────────────────────────────────────
const MobilePersonRow = ({ person, onSelect, highlight, dim }) => (
  <motion.button
    onClick={() => onSelect(person)}
    animate={{ opacity: dim ? 0.25 : 1 }}
    whileTap={{ scale: 0.97 }}
    className="flex items-center gap-3 w-full text-left"
    aria-label={person.name}
  >
    <div className="relative flex-shrink-0">
      <Avatar person={person} size={person.isPrimary ? 'md' : 'sm'} />
      {highlight && (
        <span className="absolute -inset-1.5 rounded-full border-2 animate-pulse" style={{ borderColor: person.accent, boxShadow:`0 0 10px ${person.accent}` }} />
      )}
    </div>
    <div className="flex flex-col min-w-0">
      <span className="font-anton text-cream text-sm uppercase tracking-tight">{person.name} <span className="text-cream/40 text-[9px] normal-case font-inter">{person.surname}</span></span>
      <span className="font-inter text-[10px] uppercase tracking-wider truncate" style={{ color: person.accent }}>{person.role}</span>
    </div>
    {highlight && <span className="ml-auto flex-shrink-0 bg-accent text-dark font-inter text-[8px] px-2 py-0.5 rounded-full font-bold uppercase">MATCH</span>}
  </motion.button>
);

const MobileGenBlock = ({ label, color, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-3 w-full mb-3"
      >
        <div className="w-[3px] h-4 rounded-full" style={{ background: color }} />
        <span className="font-inter text-[9px] uppercase tracking-[0.4em] font-bold" style={{ color }}>{label}</span>
        <div className="flex-1 h-px ml-2" style={{ background: `${color}30` }} />
        <span className="font-inter text-[10px] text-cream/30 ml-2">{open ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
            className="overflow-hidden pl-4 flex flex-col gap-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileCouple = ({ left, right, onSelect, isMatched, isDimmed }) => (
  <div className="flex flex-col gap-2 pl-2 border-l border-cream/10">
    <MobilePersonRow person={left} onSelect={onSelect} highlight={isMatched(left.id)} dim={isDimmed(left.id)} />
    <div className="flex items-center gap-2 pl-2">
      <span className="font-anton text-xl text-accent" style={{ filter:'drop-shadow(0 0 8px var(--accent))' }}>∞</span>
      <span className="font-inter text-[9px] text-cream/25 uppercase tracking-widest">Married</span>
    </div>
    <MobilePersonRow person={right} onSelect={onSelect} highlight={isMatched(right.id)} dim={isDimmed(right.id)} />
  </div>
);

const MobileFamilyTree = ({ onSelect, isMatched, isDimmed }) => (
  <div className="py-6 px-4">
    {/* Gen I */}
    <MobileGenBlock label="Generation I · Great-Grandparents" color="#94a3b8">
      <div>
        <p className="font-inter text-[8px] uppercase tracking-widest text-cream/25 mb-2">Paternal</p>
        <MobileCouple left={DATA.paternal.greatGrandparents.left} right={DATA.paternal.greatGrandparents.right} onSelect={onSelect} isMatched={isMatched} isDimmed={isDimmed} />
      </div>
      <div className="mt-4">
        <p className="font-inter text-[8px] uppercase tracking-widest text-cream/25 mb-2">Maternal</p>
        <MobileCouple left={DATA.maternal.greatGrandparents.left} right={DATA.maternal.greatGrandparents.right} onSelect={onSelect} isMatched={isMatched} isDimmed={isDimmed} />
      </div>
    </MobileGenBlock>

    {/* Gen II */}
    <MobileGenBlock label="Generation II · Grandparents" color="#14b8a6">
      <div>
        <p className="font-inter text-[8px] uppercase tracking-widest text-cream/25 mb-2">Paternal</p>
        <MobileCouple left={DATA.paternal.grandparents.left} right={DATA.paternal.grandparents.right} onSelect={onSelect} isMatched={isMatched} isDimmed={isDimmed} />
      </div>
      <div className="mt-4">
        <p className="font-inter text-[8px] uppercase tracking-widest text-cream/25 mb-2">Maternal</p>
        <MobileCouple left={DATA.maternal.grandparents.left} right={DATA.maternal.grandparents.right} onSelect={onSelect} isMatched={isMatched} isDimmed={isDimmed} />
      </div>
    </MobileGenBlock>

    {/* Gen III */}
    <MobileGenBlock label="Generation III · Parents & Siblings" color="#f59e0b">
      {/* Core couple */}
      <div className="bg-accent/5 border border-accent/20 rounded-2xl p-3">
        <p className="font-inter text-[8px] uppercase tracking-widest text-accent/60 mb-3">Core Family</p>
        <MobileCouple left={DATA.parents.father} right={DATA.parents.mother} onSelect={onSelect} isMatched={isMatched} isDimmed={isDimmed} />
      </div>
      {/* Paternal siblings */}
      {DATA.paternal.siblings.map(u => (
        <div key={u.id}>
          <p className="font-inter text-[8px] uppercase tracking-widest text-cream/25 mb-2">Paternal — Uncle & Aunt</p>
          <MobileCouple left={u} right={u.spouse} onSelect={onSelect} isMatched={isMatched} isDimmed={isDimmed} />
        </div>
      ))}
      {/* Maternal siblings */}
      {DATA.maternal.siblings.map(u => (
        <div key={u.id}>
          <p className="font-inter text-[8px] uppercase tracking-widest text-cream/25 mb-2">Maternal — Uncle & Aunt</p>
          <MobileCouple left={u} right={u.spouse} onSelect={onSelect} isMatched={isMatched} isDimmed={isDimmed} />
        </div>
      ))}
    </MobileGenBlock>

    {/* Gen IV */}
    <MobileGenBlock label="Generation IV · Children & Cousins" color="#8b5cf6">
      {/* Core children */}
      <div className="bg-accent/5 border border-accent/20 rounded-2xl p-3 flex flex-col gap-3">
        <p className="font-inter text-[8px] uppercase tracking-widest text-accent/60 mb-1">Children of Vivek & Bhavana</p>
        {DATA.children.map(c => (
          <MobilePersonRow key={c.id} person={c} onSelect={onSelect} highlight={isMatched(c.id)} dim={isDimmed(c.id)} />
        ))}
      </div>
      {/* Paternal cousins */}
      <div>
        <p className="font-inter text-[8px] uppercase tracking-widest text-cream/25 mb-2">Paternal Cousins</p>
        <div className="flex flex-col gap-3 pl-2 border-l border-cream/10">
          {DATA.paternal.siblings.flatMap(u => u.children).map(c => (
            <MobilePersonRow key={c.id} person={c} onSelect={onSelect} highlight={isMatched(c.id)} dim={isDimmed(c.id)} />
          ))}
        </div>
      </div>
      {/* Maternal cousins */}
      <div>
        <p className="font-inter text-[8px] uppercase tracking-widest text-cream/25 mb-2">Maternal Cousins</p>
        <div className="flex flex-col gap-3 pl-2 border-l border-cream/10">
          {DATA.maternal.siblings.flatMap(u => u.children).map(c => (
            <MobilePersonRow key={c.id} person={c} onSelect={onSelect} highlight={isMatched(c.id)} dim={isDimmed(c.id)} />
          ))}
        </div>
      </div>
    </MobileGenBlock>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP TREE (unchanged visual structure)
// ─────────────────────────────────────────────────────────────────────────────
const DesktopFamilyTree = ({ onSelect, isMatched, isDimmed }) => {
  const dim = isDimmed; // alias for readability
  return (
    <div className="relative z-10 mx-auto" style={{ minWidth: 1000, maxWidth: 1200 }}>

      {/* ROW 1: GREAT-GRANDPARENTS */}
      <div className="flex justify-between items-start px-20">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[8px] text-cream/20 font-bold uppercase tracking-widest">Paternal Gen I</span>
          <div className="flex items-end gap-2">
            <PersonCard person={DATA.paternal.greatGrandparents.left} onSelect={onSelect} size="xs" highlight={isMatched('pggp1')} dim={dim('pggp1')} />
            <MarriageSymbol size="sm" />
            <PersonCard person={DATA.paternal.greatGrandparents.right} onSelect={onSelect} size="xs" highlight={isMatched('pggp2')} dim={dim('pggp2')} />
          </div>
          <Line length="h-10" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[8px] text-cream/20 font-bold uppercase tracking-widest">Maternal Gen I</span>
          <div className="flex items-end gap-2">
            <PersonCard person={DATA.maternal.greatGrandparents.left} onSelect={onSelect} size="xs" highlight={isMatched('mggp1')} dim={dim('mggp1')} />
            <MarriageSymbol size="sm" />
            <PersonCard person={DATA.maternal.greatGrandparents.right} onSelect={onSelect} size="xs" highlight={isMatched('mggp2')} dim={dim('mggp2')} />
          </div>
          <Line length="h-10" />
        </div>
      </div>

      {/* ROW 2: GRANDPARENTS */}
      <div className="flex justify-between items-start px-20 -mt-2">
        <div className="flex flex-col items-center">
          <div className="flex items-end gap-3">
            <PersonCard person={DATA.paternal.grandparents.left} onSelect={onSelect} size="md" highlight={isMatched('pgp1')} dim={dim('pgp1')} />
            <MarriageSymbol />
            <PersonCard person={DATA.paternal.grandparents.right} onSelect={onSelect} size="md" highlight={isMatched('pgp2')} dim={dim('pgp2')} />
          </div>
          <Line length="h-10" />
          <Line type="h" length="w-[300px]" className="-mt-px" />
          <div className="flex justify-between w-[300px]">
            <Line length="h-6" />
            <Line length="h-6" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-end gap-3">
            <PersonCard person={DATA.maternal.grandparents.left} onSelect={onSelect} size="md" highlight={isMatched('mgp1')} dim={dim('mgp1')} />
            <MarriageSymbol />
            <PersonCard person={DATA.maternal.grandparents.right} onSelect={onSelect} size="md" highlight={isMatched('mgp2')} dim={dim('mgp2')} />
          </div>
          <Line length="h-10" />
          <Line type="h" length="w-[300px]" className="-mt-px" />
          <div className="flex justify-between w-[300px]">
            <Line length="h-6" />
            <Line length="h-6" />
          </div>
        </div>
      </div>

      {/* ROW 3: PARENTS & SIBLINGS */}
      <div className="flex justify-between items-start -mt-px px-5">
        {/* Paternal sibling unit */}
        <div className="flex gap-16">
          <div className="flex flex-col items-center">
            <div className="flex items-end gap-2">
              <PersonCard person={DATA.paternal.siblings[0]} onSelect={onSelect} size="sm" highlight={isMatched('uncle1')} dim={dim('uncle1')} />
              <MarriageSymbol size="sm" />
              <PersonCard person={DATA.paternal.siblings[0].spouse} onSelect={onSelect} size="sm" highlight={isMatched('aunt1')} dim={dim('aunt1')} />
            </div>
            <Line length="h-6" />
            <Line type="h" length="w-20" />
            <div className="flex justify-between w-20"><Line length="h-6" /><Line length="h-6" /></div>
          </div>
          <div className="flex flex-col items-center pr-20">
            <PersonCard person={DATA.parents.father} onSelect={onSelect} size="lg" highlight={isMatched('vivek')} dim={dim('vivek')} />
          </div>
        </div>

        {/* Center marriage symbol */}
        <div className="flex flex-col items-center pt-8 justify-center absolute left-1/2 -translate-x-1/2">
          <div className="bg-accent/10 p-2 rounded-full backdrop-blur-sm border border-accent/20">
            <MarriageSymbol />
          </div>
          <div className="font-anton text-[9px] text-accent mt-2 uppercase tracking-[0.5em] font-bold">Core Family</div>
        </div>

        {/* Maternal sibling unit */}
        <div className="flex gap-16">
          <div className="flex flex-col items-center pl-20">
            <PersonCard person={DATA.parents.mother} onSelect={onSelect} size="lg" highlight={isMatched('bhavana')} dim={dim('bhavana')} />
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-end gap-2">
              <PersonCard person={DATA.maternal.siblings[0]} onSelect={onSelect} size="sm" highlight={isMatched('uncle2')} dim={dim('uncle2')} />
              <MarriageSymbol size="sm" />
              <PersonCard person={DATA.maternal.siblings[0].spouse} onSelect={onSelect} size="sm" highlight={isMatched('aunt2')} dim={dim('aunt2')} />
            </div>
            <Line length="h-6" />
            <Line type="h" length="w-20" />
            <div className="flex justify-between w-20"><Line length="h-6" /><Line length="h-6" /></div>
          </div>
        </div>
      </div>

      {/* Converging descent lines */}
      <div className="flex justify-center relative h-28 -mt-px">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
          <Line length="h-12" color="bg-accent" />
          <Line type="h" length="w-64" color="bg-accent" />
          <div className="flex justify-between w-64"><Line length="h-12" color="bg-accent" /><Line length="h-12" color="bg-accent" /></div>
        </div>
        {/* Paternal cousins */}
        <div className="absolute left-10">
          <div className="flex flex-col items-center">
            <Line length="h-10" />
            <div className="flex gap-12">
              {DATA.paternal.siblings[0].children.map(c => (
                <PersonCard key={c.id} person={c} onSelect={onSelect} size="sm" highlight={isMatched(c.id)} dim={dim(c.id)} />
              ))}
            </div>
          </div>
        </div>
        {/* Maternal cousins */}
        <div className="absolute right-10">
          <div className="flex flex-col items-center">
            <Line length="h-10" />
            <div className="flex gap-12">
              {DATA.maternal.siblings[0].children.map(c => (
                <PersonCard key={c.id} person={c} onSelect={onSelect} size="sm" highlight={isMatched(c.id)} dim={dim(c.id)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ROW 4: CHILDREN */}
      <div className="flex justify-center gap-40 pt-10 px-10">
        {DATA.children.map(c => (
          <PersonCard key={c.id} person={c} onSelect={onSelect} size="lg" highlight={isMatched(c.id)} dim={dim(c.id)} />
        ))}
      </div>
      <div className="text-center mt-4 mb-12">
        <span className="font-anton text-[8px] text-accent/40 uppercase tracking-[1em]">Generation IV</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
const FamilyTreeSection = () => {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const { setAccent } = useAccent();

  const handleSelect = (p) => { setSelected(p); setAccent(p.accent); };
  const matchedIds = search.trim() ? allPeople.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p => p.id) : [];
  const isMatched = (id) => matchedIds.includes(id);
  const isDimmed = (id) => search.trim().length > 0 && !isMatched(id);

  return (
    <section id="legacy-tree" className="relative bg-dark py-16 md:py-24 px-4 overflow-x-auto">
      {/* BG watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.015]">
        <span className="font-anton text-[25vw] leading-none uppercase tracking-widest">Patole</span>
      </div>

      {/* Header */}
      <div className="text-center mb-10 relative z-10">
        <h2 className="font-anton text-5xl md:text-7xl lg:text-8xl text-cream tracking-tight leading-none">
          THE <span className="text-outline-cream">LEGACY</span> DIAGRAM
        </h2>
        <p className="font-inter text-cream/20 text-[10px] uppercase tracking-[0.4em] mt-3 hidden md:block">
          Bi-Lateral Pedigree · 4 Generations
        </p>
      </div>

      {/* Search */}
      <div className="flex flex-col items-center mb-8 md:mb-10 relative z-10 gap-2">
        <div className="relative w-full max-w-xs md:max-w-sm">
          <input
            type="text" placeholder="Search family member…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-white/5 border border-cream/10 rounded-full py-2.5 pl-10 pr-10 text-xs font-inter text-cream/80 focus:outline-none focus:border-accent w-full placeholder:text-cream/20 transition-all"
          />
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-accent w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          {search && <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream text-lg leading-none">×</button>}
        </div>
        <AnimatePresence>
          {search.trim() && (
            <motion.p initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }}
              className="font-inter text-[9px] uppercase tracking-[0.3em]"
              style={{ color: matchedIds.length > 0 ? 'var(--accent)' : '#ef4444' }}
            >
              {matchedIds.length > 0 ? `${matchedIds.length} match${matchedIds.length > 1 ? 'es' : ''} found` : 'No matches found'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── MOBILE TREE ──────────────────────────────────────────────────────── */}
      <div className="lg:hidden relative z-10 max-w-lg mx-auto">
        <MobileFamilyTree onSelect={handleSelect} isMatched={isMatched} isDimmed={isDimmed} />
      </div>

      {/* ── DESKTOP TREE ─────────────────────────────────────────────────────── */}
      <div className="hidden lg:block">
        <DesktopFamilyTree onSelect={handleSelect} isMatched={isMatched} isDimmed={isDimmed} />
      </div>

      {/* Legend (desktop only) */}
      <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
        className="hidden md:flex justify-center flex-wrap items-center gap-8 border-t border-cream/5 pt-8 mt-4 relative z-10"
      >
        {[
          { icon:<div className="w-6 h-px bg-cream/25"/>, label:'Bloodline' },
          { icon:<span className="font-anton text-cream/30 text-xl leading-none">∞</span>, label:'Marriage' },
          { icon:<div className="w-3 h-3 rounded-full border" style={{ borderColor:'#f59e0b60' }}/>, label:'Primary Member' },
          { icon:<span className="font-inter text-[10px] text-cream/30">P</span>, label:'Paternal' },
          { icon:<span className="font-inter text-[10px] text-cream/30">M</span>, label:'Maternal' },
        ].map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            {icon}
            <span className="text-[8px] uppercase tracking-[0.3em] text-cream/25 font-inter">{label}</span>
          </div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selected && <DetailPanel person={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default FamilyTreeSection;
