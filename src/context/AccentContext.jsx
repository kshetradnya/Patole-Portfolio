import React, { createContext, useContext, useState, useEffect } from 'react';

const AccentContext = createContext();

export const AccentProvider = ({ children }) => {
  const [accent, setAccent] = useState('#E8A020'); // Default Vivek (Patriarch)
  const [accentDark, setAccentDark] = useState('#C4841A');
  const [activeMember, setActiveMember] = useState(null);

  // Update CSS variables when accent changes
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty('--accent-dark', accentDark);
  }, [accent, accentDark]);

  return (
    <AccentContext.Provider value={{ accent, setAccent, accentDark, setAccentDark, activeMember, setActiveMember }}>
      {children}
    </AccentContext.Provider>
  );
};

export const useAccent = () => useContext(AccentContext);
