//server/routes/auth

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin, validateRegister } = require('../middleware/validation');
const User = require('../models/User'); 
  


router.post('/login', validateLogin, authController.login);
router.post('/register', validateRegister, authController.register);
router.get('/me', authController.protect, authController.getMe);

module.exports = router;