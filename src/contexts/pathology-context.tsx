'use client';

import { createContext, useContext, useState } from 'react';
import type { BookingDetails, PathologyLab } from '@/lib/pathology-types';
import { mockPathologyLabs } from '@/lib/pathology-data';

interface PathologyContextType {
  labs: PathologyLab[];
  selectedLab: PathologyLab | null;
  setSelectedLab: (lab: PathologyLab | null) => void;
  bookings: BookingDetails[];
  addBooking: (booking: BookingDetails) => void;
  cancelBooking: (labId: string, testId: string) => void;
}

const PathologyContext = createContext<PathologyContextType | undefined>(undefined);

export function PathologyProvider({ children }: { children: React.ReactNode }) {
  const [labs, setLabs] = useState<PathologyLab[]>(mockPathologyLabs);
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [selectedLab, setSelectedLab] = useState<PathologyLab | null>(null);

  const addBooking = (booking: BookingDetails) => {
    setBookings(prev => [...prev, booking]);
  };

  const cancelBooking = (labId: string, testId: string) => {
    setBookings(current =>
      current.filter(b => b.labId !== labId || b.testId !== testId)
    );
  };

  return (
    <PathologyContext.Provider
      value={{
        labs,
        selectedLab,
        setSelectedLab,
        bookings,
        addBooking,
        cancelBooking
      }}
    >
      {children}
    </PathologyContext.Provider>
  );
}

export function usePathology() {
  const context = useContext(PathologyContext);
  if (context === undefined) {
    throw new Error('usePathology must be used within a PathologyProvider');
  }
  return context;
}