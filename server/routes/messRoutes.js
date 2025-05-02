// server/routes/messRoutes
const express = require('express');
const router = express.Router();
const messController = require('../controllers/messController');
const authController = require('../controllers/authController');

// Protect all routes
router.use(authController.protect);

// Student mess routes
router.get('/menu', messController.getCurrentMenu);
router.get('/billing', messController.getMyBilling);

// Admin only routes
router.use(authController.restrictTo('admin'));
router.post('/menu', messController.createMenu);
router.get('/billing/all', messController.getAllBilling);
router.post('/billing', messController.createBilling);

module.exports = router;