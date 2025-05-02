// src/api/hostelApi.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const hostelApi = axios.create({
  baseURL: `${API_BASE_URL}/hostels`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for adding auth token
hostelApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
hostelApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data?.message || 'Hostel API request failed');
  }
);

export default {
  // Hostel CRUD Operations
  getAllHostels: () => hostelApi.get('/'),
  getHostelById: (id) => hostelApi.get(`/${id}`),
  createHostel: (data) => hostelApi.post('/', data),
  updateHostel: (id, data) => hostelApi.put(`/${id}`, data),
  deleteHostel: (id) => hostelApi.delete(`/${id}`),

  // Room Management
  getAllRooms: (hostelId) => hostelApi.get(`/${hostelId}/rooms`),
  getRoomById: (hostelId, roomId) => hostelApi.get(`/${hostelId}/rooms/${roomId}`),
  createRoom: (hostelId, data) => hostelApi.post(`/${hostelId}/rooms`, data),
  updateRoom: (hostelId, roomId, data) => hostelApi.put(`/${hostelId}/rooms/${roomId}`, data),
  deleteRoom: (hostelId, roomId) => hostelApi.delete(`/${hostelId}/rooms/${roomId}`),

  // Student Allocation
  allocateStudent: (hostelId, data) => hostelApi.post(`/${hostelId}/allocate`, data),
  deallocateStudent: (hostelId, studentId) => hostelApi.delete(`/${hostelId}/allocate/${studentId}`),
  getHostelOccupancy: (hostelId) => hostelApi.get(`/${hostelId}/occupancy`),

  // Maintenance Requests
  createMaintenanceRequest: (hostelId, data) => hostelApi.post(`/${hostelId}/maintenance`, data),
  getMaintenanceRequests: (hostelId) => hostelApi.get(`/${hostelId}/maintenance`),
  updateMaintenanceRequest: (hostelId, requestId, data) => hostelApi.put(`/${hostelId}/maintenance/${requestId}`, data),

  // Hostel Staff Management
  getStaffMembers: (hostelId) => hostelApi.get(`/${hostelId}/staff`),
  addStaffMember: (hostelId, data) => hostelApi.post(`/${hostelId}/staff`, data),
  updateStaffMember: (hostelId, staffId, data) => hostelApi.put(`/${hostelId}/staff/${staffId}`, data),
  removeStaffMember: (hostelId, staffId) => hostelApi.delete(`/${hostelId}/staff/${staffId}`)
};