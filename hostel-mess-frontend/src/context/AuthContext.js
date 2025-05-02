import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const { data } = await api.getMe();
          setUser(data.user);
        }
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Login function
// In your main AuthContext file (not the one in api/auth)
const login = async (identifier, password, role) => {
  try {
    // Show loading state immediately
    setLoading(true); 

    const startTime = Date.now();
    const { token, user } = await api.login(identifier, password, role);
    
    console.log(`Login completed in ${Date.now() - startTime}ms`);
    
    localStorage.setItem('token', token);
    setUser(user);
    return user;

  } catch (err) {
    console.error('Auth Context Error:', {
      error: err,
      time: new Date().toISOString()
    });
    
    // Specific error messages
    let message = err.message;
    if (message.includes('timeout')) {
      message = 'Server is taking too long to respond. Please try again later.';
    } else if (message.includes('credentials')) {
      message = 'Invalid employee ID or password';
    }

    throw new Error(message);
  } finally {
    setLoading(false);
  }
};

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Context value
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