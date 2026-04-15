import React, { useState, useEffect } from 'react';

const KonamiEaster = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [sequence, setSequence] = useState([]);
  const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

  useEffect(() => {
    const handleKey = (e) => {
      setSequence(prev => {
        const next = [...prev, e.key].slice(-10);
        if (next.join(',') === konamiCode.join(',')) {
          setUnlocked(true);
          setTimeout(() => setUnlocked(false), 6000);
        }
        return next;
      });
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  if (!unlocked) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-dark/95 backdrop-blur-xl" onClick={() => setUnlocked(false)}>
      <div className="text-center animate-bounce">
        <h2 className="font-anton text-[8vw] text-[var(--accent)] leading-none mb-4">🎉 EASTER EGG!</h2>
        <p className="font-playfair italic text-3xl text-cream mb-2">You found the Patole family secret!</p>
        <p className="text-cream/50 font-inter text-sm tracking-widest uppercase mt-8">Built with ❤️ by Kshetradnya</p>
        <p className="text-cream/30 font-inter text-xs mt-4">Click anywhere to close</p>
      </div>
    </div>
  );
};

export default KonamiEaster;
