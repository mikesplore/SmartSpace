import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  setUser: (user?: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
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
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing tokens on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const refresh = localStorage.getItem('refresh_token');
    
    if (token && refresh) {
      setAccessToken(token);
      setRefreshToken(refresh);
      // You would typically fetch user data here with the token
      // For now, we'll use mock data
      setUserState({
        id: 1,
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe'
      });
    }
    setLoading(false);
  }, []);

  const setUser = (userData?: User) => {
    if (userData) {
      setUserState(userData);
    } else {
      // Fetch user data if no userData provided
      const token = localStorage.getItem('access_token');
      if (token) {
        // Mock user data - in real app, you'd fetch this from API
        setUserState({
          id: 1,
          email: 'user@example.com',
          firstName: 'John',
          lastName: 'Doe'
        });
      }
    }
  };

  const setTokens = (access: string, refresh: string) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  };

  const logout = () => {
    setUserState(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const isAuthenticated = !!accessToken && !!user;

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      refreshToken,
      loading,
      error,
      setUser,
      setTokens,
      logout,
      isAuthenticated,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
