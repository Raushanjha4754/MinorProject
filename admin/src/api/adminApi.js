import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001', 
  });

const adminApi = {
    // User Management (primarily for students)
    createUser: async (userData) => {
      const response = await api.post('/admin/users', userData);
      return response.data;
    },
    
    getUsers: async () => {
      const response = await api.get('/admin/users');
      return response.data.data.users;
    },
    
    activateUser: async (userId) => {
      const response = await api.patch(`/admin/users/${userId}/activate`);
      return response.data;
    },
  
    deactivateUser: async (userId) => {
      const response = await api.patch(`/admin/users/${userId}/deactivate`);
      return response.data;
    },
  
    resetPassword: async (userId, newPassword) => {
      const response = await api.patch(`/admin/users/${userId}/reset-password`, { newPassword });
      return response.data;
    }
  };
  
  export default adminApi;