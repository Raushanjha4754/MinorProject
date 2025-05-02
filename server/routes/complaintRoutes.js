// server/routes/complaintRoutes
const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const authController = require('../controllers/authController');

// Protect all routes
router.use(authController.protect);

// Student complaint routes
router.get('/me', complaintController.getMyComplaints);
router.post('/', complaintController.createComplaint);

// Admin only routes
router.use(authController.restrictTo('admin'));
router.get('/', complaintController.getAllComplaints);
router.put('/:id/resolve', complaintController.resolveComplaint);

module.exports = router;