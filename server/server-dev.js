const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Development logging
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.originalUrl}`);
  next();
});

// Mock API endpoints for testing
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Mock login endpoint
app.post('/api/login', (req, res) => {
  const { identifier, password, role } = req.body;
  
  console.log('Login attempt:', { identifier, role });
  
  // Mock validation
  if (role === 'student' && identifier === '20210001' && password === 'password123') {
    res.json({
      token: 'mock-student-token-' + Date.now(),
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@nitj.ac.in',
        rollNumber: '20210001',
        role: 'student',
        branch: 'Computer Science',
        year: '3rd Year',
        hostel: { name: 'Hostel A' }
      }
    });
  }
  else if (role === 'admin' && identifier === '12345678' && password === 'admin123') {
    res.json({
      token: 'mock-admin-token-' + Date.now(),
      user: {
        id: 101,
        name: 'Admin User',
        email: 'admin@nitj.ac.in',
        employeeId: '12345678',
        role: 'admin',
        department: 'IT',
        designation: 'System Administrator'
      }
    });
  } else {
    res.status(401).json({
      message: 'Invalid credentials'
    });
  }
});

// Mock register endpoint
app.post('/api/register', (req, res) => {
  const { name, email, password, role, employeeId, rollNumber } = req.body;
  
  console.log('Registration attempt:', { name, email, role });
  
  if (role === 'admin') {
    res.json({
      token: 'mock-admin-token-' + Date.now(),
      user: {
        id: Date.now(),
        name,
        email,
        employeeId,
        role: 'admin',
        department: req.body.department || 'General',
        designation: req.body.designation || 'Administrator'
      }
    });
  }
  else {
    res.json({
      token: 'mock-student-token-' + Date.now(),
      user: {
        id: Date.now(),
        name,
        email,
        rollNumber,
        role: 'student',
        branch: req.body.branch || 'General',
        year: req.body.year || '1st Year',
        hostel: { name: req.body.hostel || 'Hostel A' }
      }
    });
  }
});

// Mock dashboard endpoints
app.get('/api/admin/dashboard/stats', (req, res) => {
  res.json({
    totalStudents: 1250,
    pendingFees: 450000,
    todayAttendance: 87,
    activeComplaints: 23
  });
});

app.get('/api/students/me', (req, res) => {
  res.json({
    student: {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@nitj.ac.in',
      rollNumber: '20210001',
      role: 'student',
      branch: 'Computer Science',
      year: '3rd Year',
      hostel: { name: 'Hostel A' }
    }
  });
});

app.get('/api/attendance/summary', (req, res) => {
  res.json({
    percentage: 85,
    monthlyData: [
      { name: 'Jan', present: 85 },
      { name: 'Feb', present: 88 },
      { name: 'Mar', present: 82 },
      { name: 'Apr', present: 90 },
      { name: 'May', present: 87 },
      { name: 'Jun', present: 89 }
    ]
  });
});

app.get('/api/fees/summary', (req, res) => {
  res.json({
    pending: 5000,
    paid: 15000,
    total: 20000
  });
});

app.get('/api/mess/billing', (req, res) => {
  res.json({
    totalDue: 2500,
    balance: 2500
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

// Start server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`🚀 Development server running on port ${port}`);
  console.log(`📱 Frontend should be running on http://localhost:3000`);
  console.log(`🔗 API available at http://localhost:${port}/api`);
  console.log(`✅ Health check: http://localhost:${port}/api/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
}); 