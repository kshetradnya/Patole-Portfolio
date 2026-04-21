import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccent } from '../../context/AccentContext';

// ─────────────────────────────────────────────────────────────────────────────
// FAMILY DATA
// ─────────────────────────────────────────────────────────────────────────────
const DATA = {
  // ── PATERNAL SIDE (Vivek's lineage) ────────────────────────────────────────
  paternal: {
    greatGrandparents: {
      left:  { id:'pggp1', name:'Govindrao', surname:'Patole', role:'Paternal Great-Grandfather', gender:'M', accent:'#475569', bio:'Established the Patole family in Maharashtra. A disciplined patriarch who valued education above all.', achievements:['Community Patriarch','Land & Family Legacy'] },
      right: { id:'pggp2', name:'Radhabai',  surname:'Patole', role:'Paternal Great-Grandmother', gender:'F', accent:'#64748b', bio:'Upheld cultural traditions and ensured every child in the family was educated.', achievements:['Cultural Custodian'] },
    },
    grandparents: {
      left:  { id:'pgp1', name:'Ramchandra', surname:'Patole', role:'Paternal Grandfather', gender:'M', accent:'#94a3b8', bio:'A retired educator who dedicated his life to public schooling and community leadership.', achievements:['Retired Educator','Community Leader'] },
      right: { id:'pgp2', name:'Sulochana',  surname:'Patole', role:'Paternal Grandmother', gender:'F', accent:'#a8a29e', bio:'The heart of the Patole household—brought the family together through wisdom and warmth.', achievements:['Family Matriarch','Social Reformist'] },
    },
    uncles: [
      {
        id:'uncle1', name:'Suresh', surname:'Patole', role:'Uncle · Civil Servant', gender:'M', accent:'#f97316',
        bio:'Senior civil servant continuing the Patole tradition of public service.', achievements:['Senior Civil Servant','State Award Recipient'],
        spouse: { id:'aunt1', name:'Meera', surname:'Patole', role:'Aunt · Teacher', gender:'F', accent:'#fb923c', bio:'Dedicated educator with 25+ years in primary school education.', achievements:['25 Years in Education'] },
        children: [
          { id:'cous1', name:'Rohan', surname:'Patole', role:'Cousin · Engineering', gender:'M', accent:'#fbbf24', bio:'Pursuing a degree in Civil Engineering.', achievements:['First Class Graduate'] },
          { id:'cous2', name:'Priya', surname:'Patole', role:'Cousin · Medicine',    gender:'F', accent:'#f59e0b', bio:'Aspiring doctor preparing for post-graduate medicine.', achievements:['NEET Qualifier'] },
        ],
      },
    ],
  },

  // ── MATERNAL SIDE (Bhavana's lineage) ──────────────────────────────────────
  maternal: {
    greatGrandparents: {
      left:  { id:'mggp1', name:'Narayan',  surname:'Desai', role:'Maternal Great-Grandfather', gender:'M', accent:'#0f766e', bio:'A respected merchant who built family equity through honest trade in western Maharashtra.', achievements:['Merchant Pioneer','Charitable Donor'] },
      right: { id:'mggp2', name:'Lakshmibai',surname:'Desai', role:'Maternal Great-Grandmother', gender:'F', accent:'#0d9488', bio:'Known for her devotion to social causes and womens education in the village.', achievements:['Womens Rights Advocate'] },
    },
    grandparents: {
      left:  { id:'mgp1', name:'Vishwanath', surname:'Desai', role:'Maternal Grandfather', gender:'M', accent:'#14b8a6', bio:'Retired government officer who championed higher education for all his children.', achievements:['Retired Government Officer','4 Children Educated'] },
      right: { id:'mgp2', name:'Kamlabai',   surname:'Desai', role:'Maternal Grandmother', gender:'F', accent:'#2dd4bf', bio:'A warm and spirited homemaker who ensured every family gathering was memorable.', achievements:['Family Anchor'] },
    },
    uncles: [
      {
        id:'uncle2', name:'Ashok', surname:'Joshi', role:'Uncle · Businessman', gender:'M', accent:'#06b6d4',
        bio:'Built a successful manufacturing business from scratch in Pune.', achievements:['Entrepreneur Award','50+ Employees'],
        spouse: { id:'aunt2', name:'Sunita', surname:'Joshi', role:'Aunt · Fashion Designer', gender:'F', accent:'#22d3ee', bio:'Award-winning fashion designer with a boutique in Pune.', achievements:['Regional Design Award'] },
        children: [
          { id:'cous3', name:'Yash', surname:'Joshi', role:'Cousin · CA', gender:'M', accent:'#67e8f9', bio:'Completing Chartered Accountancy finals.', achievements:['CA Inter Rank Holder'] },
          { id:'cous4', name:'Neha', surname:'Joshi', role:'Cousin · Tech',  gender:'F', accent:'#a5f3fc', bio:'Full-stack developer at a Pune startup.', achievements:['Hackathon Winner'] },
        ],
      },
    ],
  },

  // ── CORE FAMILY ────────────────────────────────────────────────────────────
  parents: {
    father: {
      id:'vivek', name:'Vivek', surname:'Patole', role:'VP – Central Engineering', gender:'M', accent:'#f59e0b',
      bio:'Vice President – Central Engineering at Tata Projects Limited. Three decades of steel-intensive infrastructure, EPC, and digital engineering.', achievements:['VP at Tata Projects','30+ Years EPC Excellence','Infrastructure Leader'],
      image:'/vivek.png', isPrimary:true,
      socials:[{platform:'LinkedIn',url:'https://www.linkedin.com/in/vivek-patole-8aab375/'}],
      projects:[{name:'Where Engineering Meets Responsibility',link:'https://ssmb.in/2026/01/16/where-engineering-meets-responsibility/'},{name:'Steel-Intensive EPC Execution',link:'https://ssmb.in/2025/09/05/steel-briefcase/'}],
    },
    mother: {
      id:'bhavana', name:'Bhavana', surname:'Patole', role:'Director, SIAC Mumbai', gender:'F', accent:'#10b981',
      bio:'Director of the State Institute for Administrative Careers. Historian & published researcher at Elphinstone College, Mumbai.', achievements:['SIAC Director','Published Historian','UPSC Coaching Pillar'],
      image:'/bhavana.png', isPrimary:true,
      socials:[{platform:'Mail',url:'mailto:bhavana@patole.family'}],
      projects:[{name:'In the Age of Awakening',link:'https://euacademic.org/UploadArticle/315.pdf'},{name:'Leadership of Yashwantrao Chavan',link:'https://oldgrt.lbp.world/UploadedData/720.pdf'},{name:'UPSC Coaching Program',link:'https://www.siac.org.in/from-directors-desk/'}],
    },
  },
  children: [
    { id:'anrunya', name:'Anrunya', surname:'Patole', role:'Cyber Security Specialist', gender:'F', accent:'#8b5cf6', bio:'Pursuing MS-GBA at Virginia Tech, specialising in Cybersecurity Management & Analytics. BTech CSDS from NMIMS.', achievements:['MS-GBA – Virginia Tech','BTech CSDS – NMIMS','Cyber Security Researcher'], image:'/anrunya_original.png', isPrimary:true, socials:[{platform:'LinkedIn',url:'https://linkedin.com'}], projects:[{name:'Threat Vector Analysis',link:'#'},{name:'Network Security Protocol',link:'#'}] },
    { id:'kshetradnya', name:'Kshetradnya', surname:'Patole', role:'Student & Web Developer', gender:'M', accent:'#00d4ff', bio:'Beta House Captain & creator of this portfolio. Building the digital experiences of tomorrow.', achievements:['Built Patole.in','Beta House Captain 2025','Creative Technologist'], image:'/kshetradnya.png', isPrimary:true, socials:[{platform:'Site',url:'https://kshetradnya.in'},{platform:'LinkedIn',url:'https://www.linkedin.com/in/kshetradnyapatole/'}], projects:[{name:'Kshetradnya.in',link:'https://kshetradnya.in'},{name:'Interactive Biology',link:'#'}] },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ALL PEOPLE (for search)
// ─────────────────────────────────────────────────────────────────────────────
const allPeople = [
  DATA.paternal.greatGrandparents.left, DATA.paternal.greatGrandparents.right,
  DATA.paternal.grandparents.left, DATA.paternal.grandparents.right,
  ...DATA.paternal.uncles, ...DATA.paternal.uncles.map(u => u.spouse), ...DATA.paternal.uncles.flatMap(u => u.children),
  DATA.maternal.greatGrandparents.left, DATA.maternal.greatGrandparents.right,
  DATA.maternal.grandparents.left, DATA.maternal.grandparents.right,
  ...DATA.maternal.uncles, ...DATA.maternal.uncles.map(u => u.spouse), ...DATA.maternal.uncles.flatMap(u => u.children),
  DATA.parents.father, DATA.parents.mother,
  ...DATA.children,
];

// ─────────────────────────────────────────────────────────────────────────────
// AVATAR
// ─────────────────────────────────────────────────────────────────────────────
const Avatar = ({ person, size = 'md' }) => {
  const [err, setErr] = useState(false);
  const sizes = { xs: 'w-10 h-10', sm: 'w-14 h-14', md: 'w-16 h-16', lg: 'w-24 h-24' };
  const initials = `${person.name[0]}${person.surname?.[0] ?? ''}`;
  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden border-2 flex-shrink-0`} style={{ borderColor: person.accent }}>
      {person.image && !err
        ? <img src={person.image} alt={person.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" onError={() => setErr(true)} />
        : <div className="w-full h-full flex items-center justify-center font-anton text-sm" style={{ background: `${person.accent}22`, color: person.accent }}>{initials}</div>
      }
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PERSON CARD
// ─────────────────────────────────────────────────────────────────────────────
const Card = ({ person, onSelect, size = 'sm', highlight = false, dim = false }) => (
  <motion.button
    whileHover={{ scale: dim ? 1 : 1.08, y: dim ? 0 : -3 }}
    whileTap={{ scale: 0.97 }}
    onClick={() => onSelect(person)}
    animate={{ opacity: dim ? 0.18 : 1 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none"
    style={{ filter: dim ? 'grayscale(1)' : 'none' }}
    aria-label={`Open ${person.name}'s profile`}
  >
    <div className="relative">
      <Avatar person={person} size={size} />
      {/* Search highlight ring */}
      {highlight && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -inset-2 rounded-full border-2"
          style={{ borderColor: person.accent, boxShadow: `0 0 16px ${person.accent}` }}
        />
      )}
      {person.isPrimary && !dim && (
        <span className="absolute -inset-1 rounded-full border opacity-20 animate-ping pointer-events-none" style={{ borderColor: person.accent }} />
      )}
    </div>
    <p className="font-anton text-cream text-[10px] leading-tight tracking-widest uppercase text-center" style={{ maxWidth: 72 }}>{person.name}</p>
    <p className="font-inter text-[8px] leading-tight tracking-[0.1em] text-center opacity-40 line-clamp-1" style={{ color: person.accent, maxWidth: 80 }}>{person.role?.split(/[,·–]/)[0].trim()}</p>
    {highlight && (
      <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        className="font-inter text-[7px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full"
        style={{ background: person.accent, color: '#1a1a1a' }}
      >Found</motion.span>
    )}
  </motion.button>
);

// ─────────────────────────────────────────────────────────────────────────────
// MARRIED PAIR  (two cards + ∞ symbol)
// ─────────────────────────────────────────────────────────────────────────────
const Pair = ({ left, right, onSelect, size = 'sm', hlLeft = false, hlRight = false, dimLeft = false, dimRight = false }) => (
  <div className="flex items-end gap-2">
    <Card person={left}  onSelect={onSelect} size={size} highlight={hlLeft}  dim={dimLeft} />
    <motion.span
      animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      className="font-anton text-5xl mb-3 select-none"
      style={{ color: 'var(--accent)', filter: 'drop-shadow(0 0 8px var(--accent))' }}
    >∞</motion.span>
    <Card person={right} onSelect={onSelect} size={size} highlight={hlRight} dim={dimRight} />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// UNCLE / AUNT + COUSINS
// ─────────────────────────────────────────────────────────────────────────────
const UncleUnit = ({ uncle, onSelect, isMatched, searchActive }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col items-center">
      <Pair
        left={uncle} right={uncle.spouse} onSelect={onSelect} size="xs"
        hlLeft={isMatched(uncle.id)} hlRight={isMatched(uncle.spouse.id)}
        dimLeft={searchActive && !isMatched(uncle.id)}
        dimRight={searchActive && !isMatched(uncle.spouse.id)}
      />
      <button
        onClick={() => setOpen(o => !o)}
        className="w-5 h-5 mt-0.5 rounded-full border border-cream/20 text-[10px] text-cream/40 hover:text-accent hover:border-accent transition-all flex items-center justify-center"
      >{open ? '−' : '+'}</button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex flex-col items-center overflow-hidden">
            <div className="w-px h-4 bg-cream/15" />
            {uncle.children.length > 1 && <div className="h-px bg-cream/15" style={{ width: uncle.children.length * 52 }} />}
            <div className="flex gap-4 mt-0">
              {uncle.children.map(c => (
                <div key={c.id} className="flex flex-col items-center">
                  <div className="w-px h-4 bg-cream/15" />
                  <Card person={c} onSelect={onSelect} size="xs" highlight={isMatched(c.id)} dim={searchActive && !isMatched(c.id)} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SIDE LABEL (Paternal / Maternal)
// ─────────────────────────────────────────────────────────────────────────────
const SideLabel = ({ text, color, right = false }) => (
  <div className={`flex items-center gap-2 ${right ? 'flex-row-reverse' : ''}`}>
    <div className="w-px h-6" style={{ background: color + '60' }} />
    <span className="font-inter text-[8px] uppercase tracking-[0.4em] font-bold" style={{ color: color + '80' }}>{text}</span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const FamilyTreeSection = () => {
  const [selected, setSelected] = useState(null);
  const [search, setSearch]     = useState('');
  const { setAccent }           = useAccent();

  const handleSelect = (p) => { setSelected(p); if (p.accent) setAccent(p.accent); };

  const matchedIds = search.trim()
    ? allPeople.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p => p.id)
    : [];
  const isMatched    = (id) => matchedIds.includes(id);
  const searchActive = search.trim().length > 0;
  const dim          = (id) => searchActive && !isMatched(id);

  return (
    <section id="legacy-tree" className="relative bg-dark py-20 px-4 overflow-x-auto">

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-anton text-[20vw] text-white/[0.015] leading-none tracking-wider">PATOLE</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-10 relative z-10">
        <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-3 block font-inter">Extended Family Pedigree</span>
        <h2 className="font-anton text-6xl md:text-8xl text-cream leading-none">THE <span className="text-outline-cream">LEGACY</span> TREE</h2>
        <p className="font-inter text-cream/30 text-xs tracking-[0.2em] uppercase mt-3">Click any member to explore · Both paternal &amp; maternal lineages</p>
      </motion.div>

      {/* Search */}
      <div className="flex flex-col items-center mb-10 relative z-10 gap-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search family member…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-white/5 border border-cream/10 rounded-full py-2.5 pl-10 pr-5 text-xs font-inter text-cream/80 focus:outline-none focus:border-accent w-60 placeholder:text-cream/20 transition-all"
          />
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/30 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream transition-colors text-lg leading-none">&times;</button>
          )}
        </div>
        {/* Result feedback */}
        <AnimatePresence>
          {searchActive && (
            <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              className="font-inter text-[9px] uppercase tracking-[0.3em]"
              style={{ color: matchedIds.length > 0 ? 'var(--accent)' : '#ef4444' }}
            >
              {matchedIds.length > 0 ? `${matchedIds.length} match${matchedIds.length > 1 ? 'es' : ''} found` : 'No matches found'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ════════════════════════════════ PEDIGREE TREE ════════════════════════ */}
      <div className="relative z-10 mx-auto" style={{ minWidth: 920, maxWidth: 1100 }}>

        {/* ── ROW 1: GREAT-GRANDPARENTS ─────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="flex justify-between items-start mb-0"
        >
          {/* Paternal GGPs */}
          <div className="flex flex-col items-center gap-2">
            <SideLabel text="Paternal" color="#94a3b8" />
            <Pair
              left={DATA.paternal.greatGrandparents.left} right={DATA.paternal.greatGrandparents.right}
              onSelect={handleSelect} size="xs"
              hlLeft={isMatched(DATA.paternal.greatGrandparents.left.id)}   hlRight={isMatched(DATA.paternal.greatGrandparents.right.id)}
              dimLeft={dim(DATA.paternal.greatGrandparents.left.id)}         dimRight={dim(DATA.paternal.greatGrandparents.right.id)}
            />
          </div>

          {/* Gen I label in the middle */}
          <div className="flex flex-col items-center justify-center pt-6">
            <span className="font-inter text-[8px] uppercase tracking-[0.5em] text-cream/15 font-bold">Generation I</span>
          </div>

          {/* Maternal GGPs */}
          <div className="flex flex-col items-center gap-2">
            <SideLabel text="Maternal" color="#14b8a6" right />
            <Pair
              left={DATA.maternal.greatGrandparents.left} right={DATA.maternal.greatGrandparents.right}
              onSelect={handleSelect} size="xs"
              hlLeft={isMatched(DATA.maternal.greatGrandparents.left.id)}   hlRight={isMatched(DATA.maternal.greatGrandparents.right.id)}
              dimLeft={dim(DATA.maternal.greatGrandparents.left.id)}         dimRight={dim(DATA.maternal.greatGrandparents.right.id)}
            />
          </div>
        </motion.div>

        {/* Connectors GGP → GP */}
        <div className="flex justify-between px-8">
          <div className="w-px h-8 bg-gradient-to-b from-cream/20 to-cream/5" style={{ marginLeft: 48 }} />
          <div className="w-px h-8 bg-gradient-to-b from-cream/20 to-cream/5" style={{ marginRight: 48 }} />
        </div>

        {/* ── ROW 2: GRANDPARENTS + UNCLES ─────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: -15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="flex justify-between items-start mb-0"
        >
          {/* Paternal side: GP + Uncle branch */}
          <div className="flex items-start gap-6">
            <div className="flex flex-col items-center">
              <span className="font-inter text-[7px] uppercase tracking-[0.35em] text-cream/15 mb-3 font-bold">Gen II</span>
              <Pair
                left={DATA.paternal.grandparents.left} right={DATA.paternal.grandparents.right}
                onSelect={handleSelect} size="sm"
                hlLeft={isMatched(DATA.paternal.grandparents.left.id)}   hlRight={isMatched(DATA.paternal.grandparents.right.id)}
                dimLeft={dim(DATA.paternal.grandparents.left.id)}         dimRight={dim(DATA.paternal.grandparents.right.id)}
              />
            </div>
            {/* Horizontal line to uncle */}
            <div className="flex items-center" style={{ marginTop: 48 }}>
              <div className="h-px w-6 bg-cream/15" />
              <div className="w-px h-8 bg-cream/15" style={{ marginTop: -32 }} />
            </div>
            {/* Uncles (Patole side) */}
            <div className="flex flex-col items-start gap-3 pt-1">
              {DATA.paternal.uncles.map(u => (
                <UncleUnit key={u.id} uncle={u} onSelect={handleSelect} isMatched={isMatched} searchActive={searchActive} />
              ))}
            </div>
          </div>

          {/* Maternal side: Uncle branch + GP */}
          <div className="flex items-start gap-6">
            {/* Uncles (maternal side) */}
            <div className="flex flex-col items-end gap-3 pt-1">
              {DATA.maternal.uncles.map(u => (
                <UncleUnit key={u.id} uncle={u} onSelect={handleSelect} isMatched={isMatched} searchActive={searchActive} />
              ))}
            </div>
            <div className="flex items-center" style={{ marginTop: 48 }}>
              <div className="w-px h-8 bg-cream/15" style={{ marginTop: -32 }} />
              <div className="h-px w-6 bg-cream/15" />
            </div>
            <div className="flex flex-col items-center">
              <span className="font-inter text-[7px] uppercase tracking-[0.35em] text-cream/15 mb-3 font-bold">Gen II</span>
              <Pair
                left={DATA.maternal.grandparents.left} right={DATA.maternal.grandparents.right}
                onSelect={handleSelect} size="sm"
                hlLeft={isMatched(DATA.maternal.grandparents.left.id)}   hlRight={isMatched(DATA.maternal.grandparents.right.id)}
                dimLeft={dim(DATA.maternal.grandparents.left.id)}         dimRight={dim(DATA.maternal.grandparents.right.id)}
              />
            </div>
          </div>
        </motion.div>

        {/* Converging lines from GPs to parents */}
        <div className="relative h-16 flex items-center justify-between px-6">
          {/* Left descending line */}
          <div className="flex-1 border-b border-l border-cream/15 rounded-bl-2xl" style={{ height: 40 }} />
          {/* Gen III label */}
          <span className="font-inter text-[7px] uppercase tracking-[0.4em] text-cream/15 font-bold px-3 whitespace-nowrap">Generation III</span>
          {/* Right descending line */}
          <div className="flex-1 border-b border-r border-cream/15 rounded-br-2xl" style={{ height: 40 }} />
        </div>

        {/* ── ROW 3: PARENTS ──────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center mb-0"
        >
          <Pair
            left={DATA.parents.father}
            right={DATA.parents.mother}
            onSelect={handleSelect}
            size="lg"
            hlLeft={isMatched(DATA.parents.father.id)}
            hlRight={isMatched(DATA.parents.mother.id)}
            dimLeft={dim(DATA.parents.father.id)}
            dimRight={dim(DATA.parents.mother.id)}
          />
        </motion.div>

        {/* Line from parents down + fork to children */}
        <div className="flex flex-col items-center">
          <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }} className="w-px h-8 bg-gradient-to-b from-cream/30 to-cream/10 origin-top" />
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.4 }} className="h-px bg-cream/20 origin-center" style={{ width: 220 }} />
          <div className="flex justify-between" style={{ width: 220 }}>
            {DATA.children.map(c => (
              <motion.div key={c.id} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.5 }} className="w-px h-6 bg-gradient-to-b from-cream/20 to-cream/5 origin-top" />
            ))}
          </div>
        </div>

        {/* ── ROW 4: CHILDREN ─────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.45 }}
          className="flex justify-center gap-24 mb-0"
        >
          {DATA.children.map(c => (
            <Card key={c.id} person={c} onSelect={handleSelect} size="lg" highlight={isMatched(c.id)} dim={dim(c.id)} />
          ))}
        </motion.div>

        {/* Gen IV label */}
        <div className="flex justify-center mt-4 mb-10">
          <span className="font-inter text-[8px] uppercase tracking-[0.5em] text-cream/15 font-bold">Generation IV</span>
        </div>

        {/* Legend */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center flex-wrap items-center gap-8 border-t border-cream/5 pt-8"
        >
          {[
            { icon: <div className="w-6 h-px bg-cream/25" />, label: 'Bloodline' },
            { icon: <span className="font-anton text-cream/30 text-xl leading-none">∞</span>, label: 'Marriage' },
            { icon: <div className="w-3 h-3 rounded-full border" style={{ borderColor: '#f59e0b60' }} />, label: 'Primary Member' },
            { icon: <span className="font-inter text-[10px] text-cream/30">P</span>, label: 'Paternal Side' },
            { icon: <span className="font-inter text-[10px] text-cream/30">M</span>, label: 'Maternal Side' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              {icon}
              <span className="text-[8px] uppercase tracking-[0.3em] text-cream/25 font-inter">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selected && <DetailPanel person={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// DETAIL PANEL
// ─────────────────────────────────────────────────────────────────────────────
const DetailPanel = ({ person, onClose }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-end">
    <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" onClick={onClose} />
    <motion.aside
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      className="relative z-10 bg-dark border-l border-cream/10 w-full max-w-xl h-full overflow-y-auto p-10 shadow-2xl"
    >
      <button onClick={onClose} aria-label="Close"
        className="absolute top-6 right-6 w-10 h-10 rounded-full border border-cream/10 flex items-center justify-center text-cream/50 hover:text-cream hover:border-cream/30 transition-all"
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <div className="flex items-center gap-5 mb-9">
        <Avatar person={person} size="lg" />
        <div>
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold font-inter block mb-1" style={{ color: person.accent }}>{person.role}</span>
          <h3 className="font-anton text-4xl text-cream leading-tight">
            {person.name.toUpperCase()}<br />
            <span style={{ color: person.accent }}>{person.surname?.toUpperCase()}</span>
          </h3>
        </div>
      </div>

      <p className="font-inter text-cream/60 text-sm leading-relaxed mb-8">{person.bio ?? 'Historical records preserved in family memory.'}</p>

      {person.achievements?.length > 0 && (
        <div className="mb-8">
          <h4 className="text-[9px] uppercase tracking-[0.4em] text-cream/30 font-bold font-inter mb-4">Milestones</h4>
          <ul className="space-y-2">
            {person.achievements.map((a, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: person.accent }} />
                <span className="font-inter text-cream/55 text-sm">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {person.projects?.length > 0 && (
        <div className="mb-8">
          <h4 className="text-[9px] uppercase tracking-[0.4em] text-cream/30 font-bold font-inter mb-4">Works</h4>
          <div className="space-y-2">
            {person.projects.map((p, i) => (
              <a key={i} href={p.link} target="_blank" rel="noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-cream/5 hover:border-cream/20 transition-all duration-300"
              >
                <span className="font-inter text-cream/60 text-sm group-hover:text-cream transition-colors">{p.name}</span>
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-cream/25 group-hover:text-cream ml-3 flex-shrink-0"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </a>
            ))}
          </div>
        </div>
      )}

      {person.socials?.length > 0 && (
        <div className="flex gap-4 pt-5 border-t border-cream/5 mb-5">
          {person.socials.map(s => (
            <a key={s.platform} href={s.url} target="_blank" rel="noreferrer"
              className="text-[9px] uppercase tracking-[0.3em] text-cream/30 hover:text-accent transition-colors font-inter font-bold"
            >{s.platform}</a>
          ))}
        </div>
      )}

      {person.isPrimary && (
        <button
          onClick={() => { document.getElementById(person.id)?.scrollIntoView({ behavior: 'smooth' }); onClose(); }}
          className="w-full py-3 rounded-full border font-inter text-xs font-bold uppercase tracking-[0.3em] transition-all duration-300"
          style={{ borderColor: `${person.accent}60`, color: person.accent }}
          onMouseEnter={e => { e.currentTarget.style.background = person.accent; e.currentTarget.style.color = '#1a1a1a'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = person.accent; }}
        >View Full Profile ↓</button>
      )}
    </motion.aside>
  </motion.div>
);

export default FamilyTreeSection;
