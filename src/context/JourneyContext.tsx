import React, { createContext, useContext, useState, useEffect } from 'react';

export interface JourneyState {
  fictionalMatch: string | null;
  compatibilityScore: number | null;
  partnerName: string;
  proposalDetails: {
    message: string;
    memory: string;
    tone: string;
    theme: string;
    photo?: string;
  } | null;
  datePlan: {
    location: string;
    flower: string;
    gift: string;
    food: string;
  } | null;
  songDetails: {
    title: string;
    lyrics: string;
    style: string;
  } | null;
}

interface JourneyContextType {
  state: JourneyState;
  updateState: (updates: Partial<JourneyState>) => void;
  resetJourney: () => void;
}

const defaultState: JourneyState = {
  fictionalMatch: null,
  compatibilityScore: null,
  partnerName: '',
  proposalDetails: null,
  datePlan: null,
  songDetails: null,
};

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export const JourneyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<JourneyState>(() => {
    const saved = localStorage.getItem('romanticJourneyState');
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('romanticJourneyState', JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<JourneyState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const resetJourney = () => {
    setState(defaultState);
    localStorage.removeItem('romanticJourneyState');
  };

  return (
    <JourneyContext.Provider value={{ state, updateState, resetJourney }}>
      {children}
    </JourneyContext.Provider>
  );
};

export const useJourney = () => {
  const context = useContext(JourneyContext);
  if (context === undefined) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
};
