// context/SessionContext.tsx
"use client";

import { User } from "@/types/user";
import { createContext, useContext, ReactNode } from "react";

type SessionContextType = {
  user: User | null;
  isAuthenticated: boolean;
};

// Créer le contexte
const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({
  user,
  children,
}: {
  user: User | null;
  children: ReactNode;
}) => {
  return (
    <SessionContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession doit être utilisé à l'intérieur de SessionProvider");
  }
  return context;
};
