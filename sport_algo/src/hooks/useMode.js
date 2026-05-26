import { createContext, createElement, useContext, useState } from 'react';

const ModeContext = createContext(null);

export function ModeProvider({ children }) {
  const [isPro, setIsPro] = useState(false);

  const toggleMode = () => setIsPro((c) => !c);

  return createElement(
    ModeContext.Provider,
    { value: { isPro, toggleMode } },
    children
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) throw new Error('useMode must be used within ModeProvider');
  return context;
}
