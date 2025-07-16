# Using Axios for Authentication in SmartSpace

This guide explains how to use Axios for handling authentication in the SmartSpace application. It's designed to be beginner-friendly and provide a clear understanding of how authentication works with Axios.

## Table of Contents

1. [What is Axios?](#what-is-axios)
2. [Setting Up Axios](#setting-up-axios)
3. [Authentication Flow](#authentication-flow)
4. [Implementing Authentication](#implementing-authentication)
5. [Protecting Routes](#protecting-routes)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

## What is Axios?

Axios is a popular JavaScript library for making HTTP requests from the browser or Node.js. In our SmartSpace project, we use it to communicate with our backend API, including handling user authentication.

**Key features of Axios:**
- Promise-based
- Easy to use
- Supports request and response interception
- Automatic JSON data transformation
- Works in both browser and Node.js

## Setting Up Axios

### 1. Creating an Axios Instance

First, we'll set up a base Axios instance in our `api.js` file:

```javascript
// src/services/api.js
import axios from 'axios';

// Base URL for all API requests
const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
```

This creates a reusable Axios instance with our API's base URL and default headers.

### 2. Setting Up Token Storage

For authentication, we need to store and retrieve the user's token:

```javascript
// src/utils/tokenStorage.js

// Store token in localStorage
export const setToken = (token) => {
  localStorage.setItem('smartspace_token', token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('smartspace_token');
};

// Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem('smartspace_token');
};
```

## Authentication Flow

Here's the typical authentication flow in a React application using Axios:

1. **User logs in** by submitting credentials (email/password)
2. **Frontend sends** credentials to the backend API using Axios
3. **Backend validates** credentials and returns a token
4. **Frontend stores** the token (usually in localStorage)
5. **Axios adds** the token to all subsequent API requests
6. **Backend validates** the token with each request
7. **User logs out**, and the token is removed

## Implementing Authentication

### 1. Auth Service

Let's implement our authentication service:

```javascript
// src/services/auth.js
import apiClient from './api';
import { setToken, getToken, removeToken } from '../utils/tokenStorage';

// Login function
const login = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', {
      email,
      password
    });
    
    // Store the token
    const { token, user } = response.data;
    setToken(token);
    
    // Return user data
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Register function
const register = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    
    // If registration automatically logs in user
    if (response.data.token) {
      setToken(response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Logout function
const logout = () => {
  removeToken();
};

// Check if user is authenticated
const isAuthenticated = () => {
  const token = getToken();
  return !!token; // Convert to boolean
};

// Get current user data
const getCurrentUser = async () => {
  if (!isAuthenticated()) {
    return null;
  }
  
  try {
    const response = await apiClient.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Get user error:', error);
    // If there's an error (like expired token), log out
    if (error.response && error.response.status === 401) {
      logout();
    }
    return null;
  }
};

export default {
  login,
  logout,
  register,
  isAuthenticated,
  getCurrentUser,
  getToken
};
```

### 2. Axios Interceptors

Interceptors automatically add the authentication token to every request:

```javascript
// src/services/api.js
import axios from 'axios';
import { getToken } from '../utils/tokenStorage';

const API_BASE_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get the token
    const token = getToken();
    
    // If token exists, add it to the headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle expired tokens or auth errors
    if (error.response && error.response.status === 401) {
      // You can redirect to login or refresh token here
      console.log('Unauthorized - redirecting to login');
      // Example: window.location = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 3. Auth Context

Create a React Context to manage authentication state throughout the app:

```jsx
// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import authService from '../services/auth';

// Define types
type User = {
  id: string;
  email: string;
  name: string;
  // Add other user properties
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
};

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: () => false,
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in when app loads
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (err) {
        setError('Failed to load user');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await authService.login(email, password);
      setUser(userData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await authService.register(userData);
      if (result.user) {
        setUser(result.user);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return authService.isAuthenticated();
  };

  // Context value
  const contextValue: AuthContextType = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## Protecting Routes

Create a ProtectedRoute component to guard routes that require authentication:

```jsx
// src/components/auth/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
```

Use it in your routes:

```jsx
// Example usage in a router
<Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route 
    path="/dashboard" 
    element={
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    } 
  />
</Routes>
```

## Best Practices

1. **Never store sensitive data** in localStorage (only store the token)
2. **Use HTTPS** for all API requests in production
3. **Set token expiration** and handle renewal
4. **Implement proper error handling** for auth failures
5. **Use secure cookies** for token storage when possible
6. **Validate JWT tokens** on the backend for every protected route
7. **Implement logout on all tabs** using browser storage events

## Troubleshooting

### Common Issues and Solutions

1. **Token not being sent with requests**
   - Check that your interceptor is correctly adding the Authorization header
   - Verify token is properly stored in localStorage

2. **Getting 401 Unauthorized errors**
   - Token might be expired - implement token refresh
   - Check that your backend is correctly validating tokens

3. **Can't access protected routes**
   - Make sure ProtectedRoute component is checking auth correctly
   - Verify token is valid and not expired

4. **Authentication state lost on page refresh**
   - Ensure you're properly loading user data from token on app initialization

5. **CORS errors during authentication**
   - Make sure your backend has proper CORS headers configured
   - Check that your API URLs are correct

---

## Example: Login Form Usage

Here's how to use the auth service in a login form component:

```jsx
// src/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  
  const { login, error } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    try {
      await login(email, password);
      navigate('/dashboard'); // Redirect on success
    } catch (err) {
      setFormError('Invalid email or password');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login to SmartSpace</h2>
      
      {(formError || error) && (
        <div className="error-message">{formError || error}</div>
      )}
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
```

## Additional Resources

- [Axios Documentation](https://axios-http.com/docs/intro)
- [React Router Documentation](https://reactrouter.com/)
- [JWT.io](https://jwt.io/) - Learn about JWT tokens
- [Auth0 Blog](https://auth0.com/blog) - Advanced authentication topics

---

By following this guide, you should have a solid understanding of how to implement authentication with Axios in your SmartSpace React application. If you have any questions or need further clarification, please reach out to the team lead.
