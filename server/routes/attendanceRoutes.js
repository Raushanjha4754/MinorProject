// server/routes/attendanceRoutes
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authController = require('../controllers/authController');

// Protect all routes
router.use(authController.protect);

// Student attendance routes
router.get('/me', attendanceController.getMyAttendance);
router.post('/leave', attendanceController.applyForLeave);
router.get('/summary', attendanceController.getAttendanceSummary);

// Admin only routes
router.use(authController.restrictTo('admin'));
router.get('/', attendanceController.getAllAttendance);
router.post('/', attendanceController.markAttendance);
router.put('/:id/approve', attendanceController.approveLeave);

module.exports = router;