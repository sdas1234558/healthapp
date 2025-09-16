'use client';

import { createContext, useContext, useState } from 'react';

interface UserContextType {
  firstName: string;
  email: string;
  setUserInfo: (firstName: string, email: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  const setUserInfo = (newFirstName: string, newEmail: string) => {
    setFirstName(newFirstName);
    setEmail(newEmail);
  };

  return (
    <UserContext.Provider value={{ firstName, email, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}