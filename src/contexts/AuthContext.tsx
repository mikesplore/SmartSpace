import React, { createContext } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  user: null;
  accessToken: null;
  refreshToken: null;
  loading: false;
  error: null;
  setUser: () => void;
  setTokens: () => void;
  logout: () => void;
  isAuthenticated: true;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  setUser: () => {},
  setTokens: () => {},
  logout: () => {},
  isAuthenticated: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <AuthContext.Provider value={{
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
    setUser: () => {},
    setTokens: () => {},
    logout: () => {},
    isAuthenticated: true,
  }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
  // Set up axios interceptor to handle token refresh
