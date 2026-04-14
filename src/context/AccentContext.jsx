import React, { createContext, useContext, useState, useEffect } from 'react';

const AccentContext = createContext();

export const AccentProvider = ({ children }) => {
  const [accent, setAccent] = useState('#00d4ff'); // Default Kshetradnya
  const [accentDark, setAccentDark] = useState('#0066ff');
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
