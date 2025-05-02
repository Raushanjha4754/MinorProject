// server/routes/studentRoutes
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authController = require('../controllers/authController');

// Protect all routes
router.use(authController.protect);

// Student profile
router.get('/me', studentController.getMyProfile);
router.put('/me', studentController.updateMyProfile);

// Admin only routes
router.use(authController.restrictTo('admin'));
router.get('/', studentController.getAllStudents);
router.post('/', studentController.createStudent);
router.get('/:id', studentController.getStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;