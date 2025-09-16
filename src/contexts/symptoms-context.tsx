'use client';

import { createContext, useContext, useState } from 'react';
import type { Symptom } from '@/lib/types';
import { mockSymptomHistory } from '@/lib/data';

interface SymptomsContextType {
  symptoms: Symptom[];
  addSymptom: (symptom: Symptom) => void;
}

const SymptomsContext = createContext<SymptomsContextType | undefined>(undefined);

export function SymptomsProvider({ children }: { children: React.ReactNode }) {
  const [symptoms, setSymptoms] = useState<Symptom[]>(mockSymptomHistory);

  const addSymptom = (newSymptom: Symptom) => {
    setSymptoms(prevSymptoms => [newSymptom, ...prevSymptoms]);
  };

  return (
    <SymptomsContext.Provider value={{ symptoms, addSymptom }}>
      {children}
    </SymptomsContext.Provider>
  );
}

export function useSymptoms() {
  const context = useContext(SymptomsContext);
  if (context === undefined) {
    throw new Error('useSymptoms must be used within a SymptomsProvider');
  }
  return context;
}