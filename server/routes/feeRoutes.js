// server/routes/feeRoutes
const express = require('express');
const router = express.Router();
const feeController = require('../controllers/feeController');
const authController = require('../controllers/authController');

//protect all routes
router.use(authController.protect);

//student fee routes
router.get('/me', feeController.getMyFees);
router.post('/:id/pay', feeController.payFee);
router.get('/summary', feeController.getFeeSummary);

//admin only routes
router.use(authController.restrictTo('admin'));
router.get('/', feeController.getAllFees);
router.post('/', feeController.createFee);
router.get('/:id', feeController.getFee);
router.put('/:id', feeController.updateFee);
router.delete('/:id', feeController.deleteFee);

module.exports = router;