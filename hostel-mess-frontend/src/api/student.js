// src/api/student.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getStudentProfile = async (token) => {
  const response = await axios.get(`${API_URL}/students/me`, {
    headers: { 'x-auth-token': token }
  });
  return response.data;
};

export const updateStudentProfile = async (token, profileData) => {
  const response = await axios.put(`${API_URL}/students/me`, profileData, {
    headers: { 'x-auth-token': token }
  });
  return response.data;
};