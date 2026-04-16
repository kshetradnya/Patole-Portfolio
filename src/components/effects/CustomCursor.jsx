import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAccent } from '../../context/AccentContext';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { accent } = useAccent();

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <>
      {/* Outer blurred glow */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 rounded-full pointer-events-none z-0 mix-blend-screen opacity-30 hidden sm:block"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        style={{
          background: `radial-gradient(circle, ${accent} 0%, rgba(255,255,255,0) 70%)`
        }}
      />
    </>
  );
};

export default CustomCursor;
