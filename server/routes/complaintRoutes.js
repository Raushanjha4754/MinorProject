// server/routes/complaintRoutes
const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const authController = require('../controllers/authController');

//protect all routes
router.use(authController.protect);

//student complaint routes
router.get('/me', complaintController.getMyComplaints);
router.post('/', complaintController.createComplaint);

//admin only routes
router.use(authController.restrictTo('admin'));
router.get('/', complaintController.getAllComplaints);
router.put('/:id/resolve', complaintController.resolveComplaint);

module.exports = router;