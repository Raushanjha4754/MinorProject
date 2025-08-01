// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/index';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (identifier, password, role = 'student') => {
    try {
      const response = await apiLogin(identifier, password, role);
      
      if (response.token) {
        const userData = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role || role,
          rollNumber: response.user.rollNumber,
          employeeId: response.user.employeeId,
          profileImage: response.user.profileImage,
        };

        setUser(userData);
        setToken(`Bearer ${response.token}`);
        
        localStorage.setItem('token', `Bearer ${response.token}`);
        localStorage.setItem('user', JSON.stringify(userData));
        
        return response;
      } else {
        throw new Error('Login failed - no token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData, role = 'student') => {
    try {
      const response = await apiRegister(userData, role);
      
      if (response.token) {
        const newUser = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role || role,
          rollNumber: response.user.rollNumber,
          employeeId: response.user.employeeId,
          profileImage: response.user.profileImage,
        };

        setUser(newUser);
        setToken(`Bearer ${response.token}`);
        
        localStorage.setItem('token', `Bearer ${response.token}`);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        return response;
      } else {
        throw new Error('Registration failed - no token received');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('preferredRole');
  };

  const updateUser = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData };
    setUser(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData));
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const hasRole = (requiredRole) => {
    return user && user.role === requiredRole;
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};