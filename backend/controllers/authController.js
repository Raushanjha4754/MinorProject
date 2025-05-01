const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const AppError = require('../utils/appError'); 


// @desc    Authenticate user
// @route   POST /api/v1/auth/login
exports.login = async (req, res, next) => {
  try {
    const { rollNumber, password } = req.body;

    // 1) Check if rollNumber and password exist
    if (!rollNumber || !password) {
      return next(new AppError('Please provide roll number and password', 400));
    }

    // 2) Check if user exists and password is correct
    const user = await User.findOne({ rollNumber }).select('+password');
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError('Incorrect roll number or password', 401));
    }

    // 3) Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // 4) Send response
    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user._id,
          rollNumber: user.rollNumber,
          role: user.role
        }
      }
    });
  } catch (err) {
    next(err);
  }
};