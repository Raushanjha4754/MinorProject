/**
 * ============================================================================
 * Main Server File - Hostel Mess Management System
 * NIT Jalandhar - Minor Project
 * ============================================================================
 * 
 * This file sets up the Express.js server with:
 * - MongoDB database connection
 * - CORS configuration
 * - API route handlers
 * - Error handling middleware
 * - Request logging (development only)
 */

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configuration and Middleware
const config = require('./config/config');
const errorHandler = require('./middleware/errorHandler');

// Route Handlers
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const feeRoutes = require('./routes/feeRoutes');
const messRoutes = require('./routes/messRoutes');

// ============================================================================
// Initialize Express Application
// ============================================================================
const app = express();

// ============================================================================
// Middleware Configuration
// ============================================================================

// Body Parser - Parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Configuration - Allow requests from frontend
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Express Built-in Parsers (additional layer)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logging - Only in development mode
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// Request Logger Middleware - Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ============================================================================
// Database Connection
// ============================================================================
mongoose
  .connect(config.mongodb.uri, config.mongodb.options)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
    console.log(`📍 Database: ${config.mongodb.uri.split('/').pop()}`);
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Exit process if database connection fails
  });

// ============================================================================
// API Routes
// ============================================================================

// Authentication Routes - Login, Registration, Token Management
app.use('/api', authRoutes);

// Student Management Routes - CRUD operations for students
app.use('/api/students', studentRoutes);

// Attendance Routes - Mark attendance, view records, statistics
app.use('/api/attendance', attendanceRoutes);

// Complaint Routes - Submit, view, and resolve complaints
app.use('/api/complaints', complaintRoutes);

// Fee Management Routes - Fee payment, billing, records
app.use('/api/fees', feeRoutes);

// Mess Management Routes - Menu, billing, consumption logs
app.use('/api/mess', messRoutes);

// ============================================================================
// Health Check Endpoint
// ============================================================================
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: config.env,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// ============================================================================
// Error Handling Middleware
// ============================================================================
// This must be last, after all routes
app.use(errorHandler);

// ============================================================================
// Start Server
// ============================================================================
const PORT = config.port || 5000;

app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('🚀 Hostel Mess Management System Server');
  console.log('='.repeat(60));
  console.log(`📍 Environment: ${config.env}`);
  console.log(`🌐 Server running on: http://localhost:${PORT}`);
  console.log(`📊 API Health Check: http://localhost:${PORT}/api/health`);
  console.log('='.repeat(60));
});

// ============================================================================
// Error Handling for Unhandled Promise Rejections
// ============================================================================
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Promise Rejection:', error);
  // Close server gracefully in production
  if (config.env === 'production') {
    server.close(() => {
      process.exit(1);
    });
  }
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});