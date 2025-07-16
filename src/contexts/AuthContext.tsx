import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../services/baseUrl';
import { refreshToken } from '../services/auth';

interface User {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
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
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('access_token')
  );
  const [refreshTokenState, setRefreshToken] = useState<string | null>(
    localStorage.getItem('refresh_token')
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Set up axios interceptor to handle token refresh
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // If error is 401 Unauthorized and we have a refresh token
        if (error.response?.status === 401 && refreshTokenState && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            // Try to refresh the token
            const response = await refreshToken(refreshTokenState);
            const { access_token, refresh_token } = response;
            
            // Update tokens
            setTokens(access_token, refresh_token);
            
            // Update the authorization header
            originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
            
            // Retry the original request
            return axios(originalRequest);
          } catch (refreshError) {
            // If refresh fails, log the user out
            logout();
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
    
    // Clean up interceptor on unmount
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [refreshTokenState]);

  // Function to set both tokens at once
  const setTokens = (access: string | null, refresh: string | null) => {
    if (access) {
      localStorage.setItem('access_token', access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    } else {
      localStorage.removeItem('access_token');
      delete axios.defaults.headers.common['Authorization'];
    }
    
    if (refresh) {
      localStorage.setItem('refresh_token', refresh);
    } else {
      localStorage.removeItem('refresh_token');
    }
    
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  // Load user data if we have a token
  useEffect(() => {
    const loadUserData = async () => {
      if (!accessToken) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        // Configure axios with the token
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        // Get user data
        const response = await axios.get(`${API_BASE_URL}/users/me/`);
        if (response.data) {
          setUser(response.data);
        }
      } catch (err) {
        console.error('Failed to load user data:', err);
        setError('Session expired. Please login again.');
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [accessToken]);

  const logout = () => {
    setTokens(null, null);
    setUser(null);
  };

  const value = {
    user,
    accessToken,
    refreshToken: refreshTokenState,
    loading,
    error,
    setUser,
    setTokens,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
