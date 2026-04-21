import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccent } from '../../context/AccentContext';

// ─────────────────────────────────────────────────────────────────────────────
// FAMILY DATA  (mock extended data – add real names as needed)
// ─────────────────────────────────────────────────────────────────────────────
const TREE = {
  // ── Gen I ──────────────────────────────────────────────────────────────────
  greatGrandparents: {
    left:  { id:'ggp1', name:'Shrikant',  surname:'Patole', role:'Great Grandfather', gender:'M', accent:'#64748b', bio:'The foundational patriarch of the Patole lineage. Known for service, discipline, and community leadership.', achievements:['Community Elder','Family Patriarch'] },
    right: { id:'ggp2', name:'Savitribai', surname:'Patole', role:'Great Grandmother', gender:'F', accent:'#78716c', bio:'A pillar of cultural preservation and warmth that rippled through every generation that followed.', achievements:['Cultural Custodian','Family Matriarch'] },
  },

  // ── Gen II ─────────────────────────────────────────────────────────────────
  grandparents: {
    left:  { id:'gp1', name:'Ramchandra', surname:'Patole', role:'Grandfather', gender:'M', accent:'#94a3b8', bio:'Championed education and community well-being. His legacy lives on in his children\'s professional achievements.', achievements:['Retired Educator','Community Leader'] },
    right: { id:'gp2', name:'Sulochana',  surname:'Patole', role:'Grandmother', gender:'F', accent:'#a8a29e', bio:'The heart of the household – known for uniting the extended family through wisdom and unwavering warmth.', achievements:['Family Anchor','Social Reformist'] },
  },

  // ── Gen III – main parents + their siblings ─────────────────────────────────
  gen3: {
    // Patole side siblings (Vivek's brothers/sisters)
    leftSiblings: [
      {
        id:'uncle1',
        name:'Suresh',    surname:'Patole', role:'Uncle · Civil Servant',   gender:'M', accent:'#f97316',
        bio:'Suresh Patole serves as a senior civil servant, continuing the family tradition of public service.', achievements:['Senior Civil Servant','State Award Recipient'],
        spouse: { id:'aunt1s', name:'Meera', surname:'Patole', role:'Aunt · Teacher', gender:'F', accent:'#fb923c', bio:'A dedicated school teacher known for her warmth in the classroom.', achievements:['25 Years in Education'] },
        children: [
          { id:'cous1', name:'Rohan',   surname:'Patole', role:'Cousin · Engineering Student', gender:'M', accent:'#fbbf24', bio:'Currently pursuing Engineering.', achievements:['First Class Graduate'] },
          { id:'cous2', name:'Priya',   surname:'Patole', role:'Cousin · Medical Student',     gender:'F', accent:'#f59e0b', bio:'Aspiring doctor at a private medical college.', achievements:['NEET Qualifier'] },
        ],
      },
    ],
    // Core couple
    parents: {
      left: {
        id:'vivek', name:'Vivek', surname:'Patole', role:'VP – Central Engineering', gender:'M', accent:'#f59e0b',
        bio:'Vice President – Central Engineering at Tata Projects Limited. Over three decades of excellence in steel-intensive infrastructure.', achievements:['VP at Tata Projects','Infrastructure Leader','30+ Years EPC Excellence'],
        image:'/vivek.png', isPrimary:true,
        socials:[{platform:'LinkedIn',url:'https://www.linkedin.com/in/vivek-patole-8aab375/'}],
        projects:[
          {name:'Where Engineering Meets Responsibility', link:'https://ssmb.in/2026/01/16/where-engineering-meets-responsibility/'},
          {name:'Steel-Intensive EPC Execution',          link:'https://ssmb.in/2025/09/05/steel-briefcase/'},
        ],
      },
      right: {
        id:'bhavana', name:'Bhavana', surname:'Patole', role:'Director, SIAC Mumbai', gender:'F', accent:'#10b981',
        bio:'Director of the State Institute for Administrative Careers. Historian & researcher at Elphinstone College, Mumbai.', achievements:['SIAC Director','Published Historian','UPSC Coaching Pillar'],
        image:'/bhavana.png', isPrimary:true,
        socials:[{platform:'Mail',url:'mailto:bhavana@patole.family'}],
        projects:[
          {name:'In the Age of Awakening: Role of Dnyanodaya',   link:'https://euacademic.org/UploadArticle/315.pdf'},
          {name:'Leadership of Yashwantrao Chavan',               link:'https://oldgrt.lbp.world/UploadedData/720.pdf'},
          {name:'UPSC Civil Services Coaching Program',           link:'https://www.siac.org.in/from-directors-desk/'},
        ],
      },
    },
    // Maternal side siblings (Bhavana's brothers/sisters)
    rightSiblings: [
      {
        id:'uncle2',
        name:'Ashok',  surname:'Joshi', role:'Uncle · Businessman',  gender:'M', accent:'#06b6d4',
        bio:'Ashok Joshi built a successful business in the manufacturing sector, growing it from the ground up.', achievements:['Entrepreneur Award','50+ Employees'],
        spouse: { id:'aunt2s', name:'Sunita', surname:'Joshi', role:'Aunt · Fashion Designer', gender:'F', accent:'#22d3ee', bio:'A celebrated fashion designer with a boutique in Pune.', achievements:['Regional Design Competition Winner'] },
        children: [
          { id:'cous3', name:'Yash',  surname:'Joshi', role:'Cousin · CA Finalist', gender:'M', accent:'#67e8f9', bio:'Completing the final leg of his Chartered Accountancy.', achievements:['CA Inter Rank Holder'] },
          { id:'cous4', name:'Neha',  surname:'Joshi', role:'Cousin · Software Dev', gender:'F', accent:'#a5f3fc', bio:'Full-stack developer at a Pune-based startup.', achievements:['Hackathon Winner','React Expert'] },
        ],
      },
    ],
  },

  // ── Gen IV – core children ──────────────────────────────────────────────────
  children: [
    {
      id:'anrunya', name:'Anrunya', surname:'Patole', role:'Cyber Security Specialist', gender:'F', accent:'#8b5cf6',
      bio:'Pursuing MS-GBA at Virginia Tech, specialising in Cybersecurity Management & Analytics on top of a BTech in CSDS from NMIMS.', achievements:['MS-GBA – Virginia Tech','BTech CSDS – NMIMS','Cyber Security Researcher'],
      image:'/anrunya_original.png', isPrimary:true,
      socials:[{platform:'LinkedIn',url:'https://linkedin.com'}],
      projects:[{name:'Threat Vector Analysis',link:'#'},{name:'Network Security Protocol',link:'#'}],
    },
    {
      id:'kshetradnya', name:'Kshetradnya', surname:'Patole', role:'Student & Web Developer', gender:'M', accent:'#00d4ff',
      bio:'Beta House Captain, aspiring developer and creator of this portfolio. Building the digital experiences of tomorrow.', achievements:['Built Patole.in','Beta House Captain 2025','Creative Technologist'],
      image:'/kshetradnya.png', isPrimary:true,
      socials:[{platform:'Site',url:'https://kshetradnya.in'},{platform:'LinkedIn',url:'https://www.linkedin.com/in/kshetradnyapatole/'}],
      projects:[{name:'Kshetradnya.in',link:'https://kshetradnya.in'},{name:'Interactive Biology',link:'#'}],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// AVATAR
// ─────────────────────────────────────────────────────────────────────────────
const Avatar = ({ person, size = 'md' }) => {
  const [err, setErr] = useState(false);
  const cls = { xs:'w-10 h-10 text-[10px]', sm:'w-14 h-14 text-xs', md:'w-18 h-18 text-sm', lg:'w-24 h-24 text-base' };
  const initials = `${person.name[0]}${person.surname?.[0] ?? ''}`;
  return (
    <div className={`${cls[size] ?? 'w-16 h-16'} rounded-full overflow-hidden border-2 flex-shrink-0 relative`} style={{ borderColor: person.accent ?? '#64748b' }}>
      {person.image && !err
        ? <img src={person.image} alt={person.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" onError={() => setErr(true)} />
        : <div className="w-full h-full flex items-center justify-center font-anton" style={{ background:`${person.accent}22`, color:person.accent }}>{initials}</div>
      }
      <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent pointer-events-none" />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PERSON CARD – clickable
// ─────────────────────────────────────────────────────────────────────────────
const PersonCard = ({ person, onSelect, size = 'md', highlight = false }) => (
  <motion.button
    whileHover={{ scale: 1.06, y: -4 }}
    whileTap={{ scale: 0.97 }}
    onClick={() => onSelect(person)}
    className={`flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none group ${highlight ? 'ring-2 ring-offset-2 ring-offset-dark rounded-full' : ''}`}
    style={highlight ? { '--tw-ring-color': person.accent } : {}}
    aria-label={`Open ${person.name}'s profile`}
  >
    <div className="relative">
      <Avatar person={person} size={size} />
      {person.isPrimary && (
        <span className="absolute -inset-1 rounded-full border opacity-30 animate-ping pointer-events-none" style={{ borderColor: person.accent }} />
      )}
    </div>
    <p className="font-anton text-cream text-[11px] xl:text-xs leading-tight tracking-widest uppercase max-w-[80px] text-center">{person.name}</p>
    <p className="font-inter text-[8px] leading-tight tracking-[0.15em] max-w-[90px] text-center line-clamp-1 opacity-50" style={{ color: person.accent }}>{person.role?.split(/[,·–]/)[0].trim()}</p>
  </motion.button>
);

// ─────────────────────────────────────────────────────────────────────────────
// CONNECTOR HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const VLine = ({ delay = 0, h = 'h-8' }) => (
  <motion.div
    initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
    transition={{ duration: 0.45, delay }}
    className={`w-px ${h} bg-gradient-to-b from-cream/25 to-cream/5 origin-top mx-auto`}
  />
);

const HLine = ({ delay = 0, w = '40%' }) => (
  <motion.div
    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
    transition={{ duration: 0.45, delay }}
    className="h-px bg-gradient-to-r from-transparent via-cream/25 to-transparent mx-auto origin-center"
    style={{ width: w }}
  />
);

const MarriedGroup = ({ left, right, onSelect, size = 'md' }) => (
  <div className="flex items-end gap-3">
    <PersonCard person={left}  onSelect={onSelect} size={size} />
    <span className="text-cream/20 text-xl mb-6 select-none">∞</span>
    <PersonCard person={right} onSelect={onSelect} size={size} />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SIBLING + THEIR FAMILY UNIT  (uncle/aunt + cousins)
// ─────────────────────────────────────────────────────────────────────────────
const SiblingUnit = ({ uncle, onSelect, side }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col items-center gap-0">
      {/* Uncle + Spouse */}
      <div className="flex flex-col items-center">
        <MarriedGroup left={uncle} right={uncle.spouse} onSelect={onSelect} size="sm" />
        {/* Collapse toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          className="mt-1 w-5 h-5 rounded-full border border-cream/20 flex items-center justify-center text-cream/40 hover:text-accent hover:border-accent text-[10px] transition-all leading-none"
          aria-label="Toggle cousins"
        >{open ? '−' : '+'}</button>
      </div>

      {/* Cousins */}
      <AnimatePresence>
        {open && uncle.children?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="flex flex-col items-center overflow-hidden"
          >
            <VLine h="h-6" />
            <HLine w={uncle.children.length > 1 ? '60%' : '0%'} />
            <div className="flex gap-6 mt-2">
              {uncle.children.map(c => (
                <div key={c.id} className="flex flex-col items-center">
                  <VLine h="h-4" />
                  <PersonCard person={c} onSelect={onSelect} size="xs" />
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
// GENERATION ROW LABEL
// ─────────────────────────────────────────────────────────────────────────────
const GenLabel = ({ roman, label }) => (
  <div className="flex items-center gap-3 mb-6 w-full justify-center">
    <div className="h-px bg-cream/10 flex-1 max-w-[80px]" />
    <span className="text-[8px] uppercase tracking-[0.4em] text-cream/25 font-inter whitespace-nowrap">
      Gen {roman} · {label}
    </span>
    <div className="h-px bg-cream/10 flex-1 max-w-[80px]" />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SEARCH
// ─────────────────────────────────────────────────────────────────────────────
const allPeople = [
  TREE.greatGrandparents.left, TREE.greatGrandparents.right,
  TREE.grandparents.left, TREE.grandparents.right,
  TREE.gen3.parents.left, TREE.gen3.parents.right,
  ...TREE.gen3.leftSiblings, ...TREE.gen3.leftSiblings.map(u => u.spouse), ...TREE.gen3.leftSiblings.flatMap(u => u.children),
  ...TREE.gen3.rightSiblings, ...TREE.gen3.rightSiblings.map(u => u.spouse), ...TREE.gen3.rightSiblings.flatMap(u => u.children),
  ...TREE.children,
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────────────────
const FamilyTreeSection = () => {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const { setAccent } = useAccent();

  const handleSelect = (p) => { setSelected(p); if (p.accent) setAccent(p.accent); };

  const matchId = search.trim()
    ? allPeople.find(p => p.name.toLowerCase().includes(search.toLowerCase()))?.id
    : null;

  return (
    <section id="legacy-tree" className="relative bg-dark py-24 px-4 md:px-8 overflow-x-auto">

      {/* watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-anton text-[22vw] text-white/[0.015] leading-none">PATOLE</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
        className="text-center mb-10 relative z-10"
      >
        <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-3 block font-inter">Extended Family Pedigree</span>
        <h2 className="font-anton text-6xl md:text-8xl text-cream leading-none">
          THE <span className="text-outline-cream">LEGACY</span> TREE
        </h2>
        <p className="font-inter text-cream/30 text-xs tracking-[0.2em] uppercase mt-3">Click any member · Scroll horizontally on mobile</p>
      </motion.div>

      {/* Search */}
      <div className="flex justify-center mb-12 relative z-10">
        <div className="relative">
          <input type="text" placeholder="Search family member…" value={search} onChange={e => setSearch(e.target.value)}
            className="bg-white/5 border border-cream/10 rounded-full py-2.5 pl-11 pr-5 text-xs font-inter text-cream/80 focus:outline-none focus:border-accent w-64 placeholder:text-cream/20 transition-all"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/30 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════ PEDIGREE CANVAS ════ */}
      <div className="relative z-10 min-w-max mx-auto" style={{ maxWidth: '100vw', overflowX: 'auto' }}>
        <div className="px-4 md:px-12 flex flex-col items-center gap-0" style={{ minWidth: 900 }}>

          {/* ── GEN I ──────────────────────────────────────────── */}
          <GenLabel roman="I" label="Great Grandparents" />
          <MarriedGroup left={TREE.greatGrandparents.left} right={TREE.greatGrandparents.right} onSelect={handleSelect} size="sm" />
          <VLine delay={0.1} />

          {/* ── GEN II ─────────────────────────────────────────── */}
          <GenLabel roman="II" label="Grandparents" />
          <MarriedGroup left={TREE.grandparents.left} right={TREE.grandparents.right} onSelect={handleSelect} size="sm" />
          <VLine delay={0.2} />

          {/* ── GEN III ────────────────────────────────────────── */}
          <GenLabel roman="III" label="Parents, Aunts & Uncles" />

          {/* Full-width row: left siblings | parents | right siblings */}
          <div className="flex items-start justify-center gap-10 w-full">

            {/* ── Left siblings (Patole side) ── */}
            <div className="flex flex-col gap-6 items-end pt-8">
              {TREE.gen3.leftSiblings.map(uncle => (
                <div key={uncle.id} className="flex flex-col items-center">
                  <SiblingUnit uncle={uncle} onSelect={handleSelect} side="left" />
                </div>
              ))}
            </div>

            {/* ── Horizontal connector bar at same vertical level ── */}
            <div className="flex flex-col items-center">
              {/* Top stems meeting horizontal line */}
              <div className="flex items-end gap-0">
                {/* Left branch stem */}
                <div className="w-16 h-px bg-cream/15 mt-[2.5rem]" />
                {/* Parents */}
                <div className="flex flex-col items-center">
                  <MarriedGroup left={TREE.gen3.parents.left} right={TREE.gen3.parents.right} onSelect={handleSelect} size="lg" />
                </div>
                {/* Right branch stem */}
                <div className="w-16 h-px bg-cream/15 mt-[2.5rem]" />
              </div>

              {/* Descend to Gen IV */}
              <VLine delay={0.4} />
              <HLine w="200px" delay={0.5} />
              <div className="flex gap-20 mt-0">
                {TREE.children.map(c => (
                  <div key={c.id} className="flex flex-col items-center">
                    <VLine h="h-5" />
                    <PersonCard person={c} onSelect={handleSelect} size="lg" highlight={matchId === c.id} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right siblings (maternal side) ── */}
            <div className="flex flex-col gap-6 items-start pt-8">
              {TREE.gen3.rightSiblings.map(uncle => (
                <div key={uncle.id} className="flex flex-col items-center">
                  <SiblingUnit uncle={uncle} onSelect={handleSelect} side="right" />
                </div>
              ))}
            </div>
          </div>

          {/* ── GEN IV LABEL (children level) ──────────────────── */}
          <GenLabel roman="IV" label="Children & Cousins" />

          {/* Cousins are rendered inside SiblingUnit above; this label is purely decorative context */}

        </div>
      </div>

      {/* ── Legend ──────────────────────────────────────────────────────────── */}
      <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.6 }}
        className="flex justify-center flex-wrap items-center gap-8 mt-14 border-t border-cream/5 pt-8 max-w-xl mx-auto relative z-10"
      >
        {[
          { icon: <div className="w-6 h-px bg-cream/30" />,                  label:'Bloodline' },
          { icon: <span className="text-cream/30 text-base leading-none">∞</span>, label:'Marriage'  },
          { icon: <div className="w-3 h-3 rounded-full border border-amber-400/60" />, label:'Primary Member' },
        ].map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            {icon}
            <span className="text-[8px] uppercase tracking-[0.3em] text-cream/25 font-inter">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── Detail Panel ─────────────────────────────────────────────────────── */}
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
  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-[200] flex items-center justify-end">
    <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" onClick={onClose} />

    <motion.aside
      initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }}
      transition={{ type:'spring', damping:28, stiffness:280 }}
      className="relative z-10 bg-dark border-l border-cream/10 w-full max-w-xl h-full overflow-y-auto p-10 shadow-2xl"
    >
      {/* Close */}
      <button onClick={onClose} aria-label="Close"
        className="absolute top-6 right-6 w-10 h-10 rounded-full border border-cream/10 flex items-center justify-center text-cream/50 hover:text-cream hover:border-cream/30 transition-all"
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      {/* Header */}
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

      {/* Bio */}
      <p className="font-inter text-cream/60 text-sm leading-relaxed mb-8">{person.bio ?? 'Historical records preserved in family memory.'}</p>

      {/* Achievements */}
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

      {/* Projects */}
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

      {/* Socials */}
      {person.socials?.length > 0 && (
        <div className="flex gap-4 pt-5 border-t border-cream/5 mb-5">
          {person.socials.map(s => (
            <a key={s.platform} href={s.url} target="_blank" rel="noreferrer"
              className="text-[9px] uppercase tracking-[0.3em] text-cream/30 hover:text-accent transition-colors font-inter font-bold"
            >{s.platform}</a>
          ))}
        </div>
      )}

      {/* Full profile CTA */}
      {person.isPrimary && (
        <button
          onClick={() => { document.getElementById(person.id)?.scrollIntoView({ behavior:'smooth' }); onClose(); }}
          className="w-full py-3 rounded-full border font-inter text-xs font-bold uppercase tracking-[0.3em] transition-all duration-300 hover:text-dark"
          style={{ borderColor:`${person.accent}60`, color:person.accent, ':hover':{ background:person.accent } }}
          onMouseEnter={e => { e.currentTarget.style.background = person.accent; e.currentTarget.style.color = '#1a1a1a'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = person.accent; }}
        >
          View Full Profile ↓
        </button>
      )}
    </motion.aside>
  </motion.div>
);

export default FamilyTreeSection;
