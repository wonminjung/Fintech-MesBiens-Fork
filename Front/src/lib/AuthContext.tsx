import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  userID: string;
  setUserID: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userID, setUserID] = useState<string>("");

  return (
    <AuthContext.Provider value={{ userID, setUserID }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
