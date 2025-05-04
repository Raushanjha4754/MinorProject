// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api'; // Import the main api instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await api.getMe();
          setUser(userData.user);
        }
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (identifier, password, role) => {
    try {
      setLoading(true);
      const response = await api.login(identifier, password, role);
      
      console.log('Raw login response:', response); // Debug log
      
      // Handle case where response is the direct data (no .data property)
      const responseData = response.data || response;
      
      if (!responseData || !responseData.token) {
        throw new Error('Login failed: invalid response format');
      }
  
      const { token, user } = responseData;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', user.role);
      setUser(user);
      return user;
  
    } catch (err) {
      console.error('Login error:', err);
      throw err;
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