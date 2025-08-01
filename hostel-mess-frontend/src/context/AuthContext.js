// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api'; 


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await api.getMe();
          
          // Handle both response formats:
          const userData = response.user || response;  // This is the critical fix
          
          if (!userData?.role) {
            throw new Error('Invalid user data format');
          }
          
          setUser(userData);
          localStorage.setItem('userRole', userData.role);
        }
      } catch (err) {
        console.error('Auth load error:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

// src/context/AuthContext.js
const login = async (identifier, password, role) => {
  
  try {
    setLoading(true);
    const { token, user } = await api.login(identifier, password, role);
    
    // Store auth data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Set user state
    setUser(user);
    return user;
    
  }
  catch (err) {
    console.error('Login error:', err);
    // Clear any partial auth state on error
    localStorage.removeItem('token');
    // localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    setUser(null);
    throw err;
  } finally {
    setLoading(false);
  }
};

// Update loadUser in useEffect
const loadUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    console.log('Attempting to load user with token:', token); // Debug
    
    const response = await api.getMe();
    console.log('User data response:', response); // Debug

    if (!response.data) {
      throw new Error('Invalid user data format');
    }

    setUser(response.data);
  } catch (err) {
    console.error('Auth load error:', err);
    logout();
  } finally {
    setLoading(false);
  }
};
  

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);