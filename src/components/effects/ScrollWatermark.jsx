import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccent } from '../../context/AccentContext';
import { familyMembers } from '../../data/familyData';

const ScrollWatermark = () => {
  const { activeMember, accent } = useAccent();

  // Find the current active member's name, or default back to "PATOLE"
  const currentMember = familyMembers.find(m => m.id === activeMember);
  const displayName = currentMember ? currentMember.name : "PATOLE";
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden mix-blend-difference opacity-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={displayName}
          initial={{ opacity: 0, scale: 0.8, y: 50, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.2, y: -50, rotate: 2 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute"
        >
          <h1 
            className="font-anton uppercase"
            style={{ 
              fontSize: 'min(35vw, 600px)',
              lineHeight: 0.8,
              color: currentMember ? accent : '#000',
            }}
          >
            {displayName}
          </h1>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ScrollWatermark;
