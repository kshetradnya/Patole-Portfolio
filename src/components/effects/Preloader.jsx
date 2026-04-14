import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds premium load
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          className="fixed inset-0 z-[100] bg-dark flex flex-col justify-center items-center text-cream overflow-hidden"
          exit={{ y: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="absolute inset-0 bg-topo opacity-10" />
          <motion.div className="flex overflow-hidden">
            <motion.h1 
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              className="font-anton text-[15vw] leading-none"
            >
              PATOLE
            </motion.h1>
          </motion.div>
          <motion.div className="overflow-hidden mt-4">
            <motion.p
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
              className="font-inter uppercase tracking-[0.5em] text-sm opacity-50"
            >
              Building the digital legacy
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
