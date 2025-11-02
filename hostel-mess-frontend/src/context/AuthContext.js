/**
 * ============================================================================
 * Authentication Context
 * Hostel Mess Management System - NIT Jalandhar
 * ============================================================================
 * 
 * This context provides authentication state and methods throughout the app.
 * It manages:
 * - User authentication state
 * - JWT token storage and retrieval
 * - Login/logout functionality
 * - User data persistence (localStorage)
 * - Role-based access control helpers
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/index';

// ============================================================================
// Create Auth Context
// ============================================================================
const AuthContext = createContext();

// ============================================================================
// Custom Hook to Use Auth Context
// ============================================================================
/**
 * Hook to access authentication context
 * @returns {Object} Authentication context value
 * @throws {Error} If used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// ============================================================================
// Auth Provider Component
// ============================================================================
/**
 * Authentication Provider Component
 * 
 * Manages authentication state and provides auth methods to child components
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} AuthProvider component
 */
export const AuthProvider = ({ children }) => {
  // ==========================================================================
  // State Management
  // ==========================================================================
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // ==========================================================================
  // Authentication Methods (defined before useEffect to avoid dependency issues)
  // ==========================================================================

  /**
   * Logout function - Clears user session and removes stored data
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('preferredRole');
  };

  // ==========================================================================
  // Initialize Authentication on App Load
  // ==========================================================================
  useEffect(() => {
    /**
     * Initialize authentication from localStorage
     * Checks for stored token and user data on app startup
     */
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        // Restore user session if token and user data exist
        if (storedToken && storedUser) {
          try {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
          } catch (parseError) {
            console.error('Error parsing stored user data:', parseError);
            // Clear corrupted data
            logout();
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==========================================================================
  // Authentication Methods
  // ==========================================================================

  /**
   * Login function - Authenticates user and stores token
   * 
   * @param {string} identifier - Roll number (student) or Employee ID (admin)
   * @param {string} password - User password
   * @param {string} role - User role ('student' or 'admin')
   * @returns {Promise<Object>} Login response with token and user data
   * @throws {Error} If login fails
   */
  const login = async (identifier, password, role = 'student') => {
    try {
      const response = await apiLogin(identifier, password, role);
      
      if (response.token) {
        // Extract and structure user data
        const userData = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role || role,
          rollNumber: response.user.rollNumber,
          employeeId: response.user.employeeId,
          profileImage: response.user.profileImage,
        };

        // Update state
        setUser(userData);
        setToken(`Bearer ${response.token}`);
        
        // Persist to localStorage
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

  /**
   * Register function - Registers new user and logs them in
   * 
   * @param {Object} userData - User registration data
   * @param {string} role - User role ('student' or 'admin')
   * @returns {Promise<Object>} Registration response with token and user data
   * @throws {Error} If registration fails
   */
  const register = async (userData, role = 'student') => {
    try {
      const response = await apiRegister(userData, role);
      
      if (response.token) {
        // Extract and structure user data
        const newUser = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role || role,
          rollNumber: response.user.rollNumber,
          employeeId: response.user.employeeId,
          profileImage: response.user.profileImage,
        };

        // Update state
        setUser(newUser);
        setToken(`Bearer ${response.token}`);
        
        // Persist to localStorage
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

  /**
   * Update user data - Updates user information in state and localStorage
   * 
   * @param {Object} updatedUserData - Updated user data fields
   */
  const updateUser = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData };
    setUser(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData));
  };

  // ==========================================================================
  // Helper Functions
  // ==========================================================================

  /**
   * Check if user is authenticated
   * @returns {boolean} True if user has valid token and user data
   */
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  /**
   * Check if user has specific role
   * @param {string} requiredRole - Required role ('student' or 'admin')
   * @returns {boolean} True if user has the required role
   */
  const hasRole = (requiredRole) => {
    return user && user.role === requiredRole;
  };

  // ==========================================================================
  // Context Value
  // ==========================================================================
  const value = {
    // State
    user,
    token,
    loading,
    
    // Methods
    login,
    register,
    logout,
    updateUser,
    
    // Helpers
    isAuthenticated,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};