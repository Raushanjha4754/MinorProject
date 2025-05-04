// src/api/index.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';


const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Keep this for cookies/sessions
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    console.error('API Error:', {
      status: error.response?.status || 'No response',
      data: error.response?.data || 'No response data'
    });
    return Promise.reject(new Error(errorMessage));
  }
);



// Auth endpoints

export const login = async (identifier, password, role) => {
  try {
    const response = await api.post('/login', {
      employee_id: identifier,
      password,
      role
    });

    if (!response.data?.token || !response.data?.user) {
      console.error('Invalid server response structure:', response.data);
      throw new Error('Invalid server response format');
    }

    return response.data;
    
  } catch (error) {
    // Improved error handling
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Login failed';
    console.error('API Login Error:', {
      status: error.response?.status,
      data: error.response?.data
    });
    throw new Error(errorMessage);
  }
};
  
export const getMe = () => api.get('/auth/me');
export const logout = () => {
  localStorage.removeItem('token');
  return api.post('/auth/logout');
};

// Student endpoints
export const getStudentProfile = () => api.get('/students/me');
export const updateStudentProfile = (data) => api.put('/students/me', data);

// Attendance endpoints
export const getAttendanceSummary = () => api.get('/attendance/summary');
export const getMyAttendance = (params) => api.get('/attendance/me', { params });
export const applyForLeave = (data) => api.post('/attendance/leave', data);

// Fee endpoints
export const getFeeSummary = () => api.get('/fees/summary');
export const getMyFees = () => api.get('/fees/me');
export const payFee = (id) => api.post(`/fees/${id}/pay`);

// Mess endpoints
export const getCurrentMenu = () => api.get('/mess/menu');
export const getMyBilling = () => api.get('/mess/billing');

// Complaint endpoints
export const getMyComplaints = () => api.get('/complaints/me');
export const createComplaint = (data) => api.post('/complaints', data);

// Admin endpoints
export const admin = {
  // Student management
  getAllStudents: () => api.get('/admin/students'),
  createStudent: (data) => api.post('/admin/students', data),
  updateStudent: (id, data) => api.put(`/admin/students/${id}`, data),
  deleteStudent: (id) => api.delete(`/admin/students/${id}`),

  // Attendance management
  getAllAttendance: (params) => api.get('/admin/attendance', { params }),
  markAttendance: (data) => api.post('/admin/attendance', data),
  approveLeave: (id) => api.put(`/admin/attendance/${id}/approve`),

  // Fee management
  getAllFees: () => api.get('/admin/fees'),
  createFee: (data) => api.post('/admin/fees', data),
  updateFee: (id, data) => api.put(`/admin/fees/${id}`, data),
  deleteFee: (id) => api.delete(`/admin/fees/${id}`),

  // Mess management
  createMenu: (data) => api.post('/admin/mess/menu', data),
  getAllBilling: () => api.get('/admin/mess/billing'),
  createBilling: (data) => api.post('/admin/mess/billing', data),

  // Complaint management
  getAllComplaints: () => api.get('/admin/complaints'),
  resolveComplaint: (id) => api.put(`/admin/complaints/${id}/resolve`)
};

// Add to your api/index.js interceptors
api.interceptors.request.use(config => {
    console.log('Request:', config.method, config.url, config.data);
    return config;
  });
  
// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Ensure we always return the data in consistent format
    return {
      data: response.data,
      status: response.status,
      headers: response.headers
    };
  },
  (error) => {
    const errorMessage = error.response?.data?.message || 
                       error.message || 
                       'An error occurred';
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(new Error(errorMessage));
  }
);

export default {
  login,
  getMe,
  logout,
  getStudentProfile,
  updateStudentProfile,
  getAttendanceSummary,
  getMyAttendance,
  applyForLeave,
  getFeeSummary,
  getMyFees,
  payFee,
  getCurrentMenu,
  getMyBilling,
  getMyComplaints,
  createComplaint,
  admin
};