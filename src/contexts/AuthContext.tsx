import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../services/baseUrl';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: false,
  error: null,
  setUser: () => {},
  setToken: () => {},
  logout: () => {},
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      setLoading(true);
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Configure axios with the token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Verify token with backend
        const response = await axios.get(`${API_BASE_URL}/users/me`);
        
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          // If no user is returned, the token is invalid
          localStorage.removeItem('token');
          setToken(null);
          setError('Session expired. Please login again.');
        }
      } catch (err) {
        console.error('Token verification failed:', err);
        localStorage.removeItem('token');
        setToken(null);
        setError('Authentication failed. Please login again.');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  // Update axios headers when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    error,
    setUser,
    setToken,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
