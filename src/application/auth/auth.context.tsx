'use client';

import { createContext, useContext, useState } from 'react';

interface AuthContextValue {
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
}

const AuthContext = createContext<AuthContextValue>({
  userEmail: null,
  setUserEmail: () => {},
});

export function AuthProvider({
  children,
  initialEmail,
}: {
  children: React.ReactNode;
  initialEmail?: string | null;
}) {
  const [userEmail, setUserEmail] = useState<string | null>(
    initialEmail ?? null,
  );
  return (
    <AuthContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
