// server/routes/attendanceRoutes
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authController = require('../controllers/authController');

//protect all routes
router.use(authController.protect);

//student attendance routes
router.get('/me', attendanceController.getMyAttendance);
router.post('/leave', attendanceController.applyForLeave);
router.get('/summary', attendanceController.getAttendanceSummary);

//admin only routes
router.use(authController.restrictTo('admin'));
router.get('/', attendanceController.getAllAttendance);
router.post('/', attendanceController.markAttendance);
router.put('/:id/approve', attendanceController.approveLeave);

module.exports = router;