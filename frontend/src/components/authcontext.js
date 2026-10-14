import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as apiLogin, logout as apiLogout } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (user && storedToken) {
      setCurrentUser(JSON.parse(user));
      setToken(storedToken);
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials, isAdmin = false) => {
    try {
      setError(null);
      const response = await apiLogin(credentials);
      
      const userData = {
        ...response.data.user,
        isAdmin: isAdmin
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', response.data.token);
      
      setCurrentUser(userData);
      setToken(response.data.token);
      
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return { 
        success: false, 
        error: err.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await apiLogout();
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setCurrentUser(null);
      setToken(null);
    }
  };

  const register = async (userData, isAdmin = false) => {
    try {
      setError(null);
      // We'll implement this in the component
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return { 
        success: false, 
        error: err.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
