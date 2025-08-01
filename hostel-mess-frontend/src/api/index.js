// src/api/index.js
import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Mock data for testing
const mockUsers = {
  students: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@nitj.ac.in',
      rollNumber: '20210001',
      role: 'student',
      branch: 'Computer Science',
      year: '3rd Year',
      hostel: { name: 'Hostel A' },
      profileImage: null
    }
  ],
  admins: [
    {
      id: 101,
      name: 'Admin User',
      email: 'admin@nitj.ac.in',
      employeeId: '12345678',
      role: 'admin',
      department: 'IT',
      designation: 'System Administrator',
      profileImage: null
    }
  ]
};

// Mock login function
export const login = async (identifier, password, role = 'student') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (!identifier || !password) {
    throw new Error('Identifier and password are required');
  }
  
  if (role === 'student') {
    const student = mockUsers.students.find(s => s.rollNumber === identifier);
    if (student && password === 'password123') {
      return {
        token: 'mock-student-token-' + Date.now(),
        user: student
      };
    }
  } else if (role === 'admin') {
    const admin = mockUsers.admins.find(a => a.employeeId === identifier);
    if (admin && password === 'admin123') {
      return {
        token: 'mock-admin-token-' + Date.now(),
        user: admin
      };
    }
  }
  
  throw new Error('Invalid credentials');
};

// Mock register function
export const register = async (userData, role = 'student') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock validation
  if (!userData.name || !userData.email || !userData.password) {
    throw new Error('Name, email, and password are required');
  }
  
  if (role === 'admin') {
    if (!userData.employeeId) {
      throw new Error('Employee ID is required for admin registration');
    }
    
    // Check if employee ID already exists
    const existingAdmin = mockUsers.admins.find(a => a.employeeId === userData.employeeId);
    if (existingAdmin) {
      throw new Error('Employee ID already exists');
    }
    
    const newAdmin = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      employeeId: userData.employeeId,
      role: 'admin',
      department: userData.department || 'General',
      designation: userData.designation || 'Administrator',
      profileImage: null
    };
    
    mockUsers.admins.push(newAdmin);
    
    return {
      token: 'mock-admin-token-' + Date.now(),
      user: newAdmin
    };
  } else {
    if (!userData.rollNumber) {
      throw new Error('Roll number is required for student registration');
    }
    
    // Check if roll number already exists
    const existingStudent = mockUsers.students.find(s => s.rollNumber === userData.rollNumber);
    if (existingStudent) {
      throw new Error('Roll number already exists');
    }
    
    const newStudent = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      rollNumber: userData.rollNumber,
      role: 'student',
      branch: userData.branch || 'General',
      year: userData.year || '1st Year',
      hostel: { name: userData.hostel || 'Hostel A' },
      profileImage: null
    };
    
    mockUsers.students.push(newStudent);
    
    return {
      token: 'mock-student-token-' + Date.now(),
      user: newStudent
    };
  }
};

// Get current user
export const getMe = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock user data based on token
  if (token.includes('admin')) {
    return mockUsers.admins[0];
  } else {
    return mockUsers.students[0];
  }
};

// Dashboard API functions
export const getAdminStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    data: {
      totalStudents: 1250,
      pendingFees: 450000,
      todayAttendance: 87,
      activeComplaints: 23
    }
  };
};

export const getStudentProfile = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return {
    data: {
      student: mockUsers.students[0]
    }
  };
};

export const getAttendanceSummary = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    data: {
      percentage: 85,
      monthlyData: [
        { name: 'Jan', present: 85 },
        { name: 'Feb', present: 88 },
        { name: 'Mar', present: 82 },
        { name: 'Apr', present: 90 },
        { name: 'May', present: 87 },
        { name: 'Jun', present: 89 }
      ]
    }
  };
};

export const getFeeSummary = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return {
    data: {
      pending: 5000,
      paid: 15000,
      total: 20000
    }
  };
};

export const getMessBalance = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    data: {
      totalDue: 2500,
      balance: 2500
    }
  };
};

export default api;