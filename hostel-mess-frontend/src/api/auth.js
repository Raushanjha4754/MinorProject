// src/api/auth.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const getCurrentUser = async (token) => {
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: { 'x-auth-token': token }
  });
  return response.data;
};