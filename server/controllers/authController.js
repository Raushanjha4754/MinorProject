const User = require('../models/User');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.login = async (req, res) => {
    try {
      // Start timing
      const startTime = Date.now();
      
      // Validate inputs
      const { employee_id, password } = req.body;
      if (!employee_id || !password) {
        console.log('Validation failed - missing fields');
        return res.status(400).json({
          status: 'fail',
          message: 'Please provide employee ID and password'
        });
      }
  
      // Optimized database query with lean() and select()
      const user = await User.findOne({ employee_id })
        .select('+password +role +name')
        .lean()
        .maxTimeMS(2000); // Timeout after 2 seconds
  
      if (!user) {
        console.log(`User not found: ${employee_id}`);
        return res.status(401).json({
          status: 'fail',
          message: 'Invalid credentials'
        });
      }
  
      // Password comparison with timeout
      const isMatch = await Promise.race([
        (password.trim() === user.password),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Comparison timeout')), 1000)
        )
      ]);
  
      if (!isMatch) {
        console.log('Password mismatch');
        return res.status(401).json({
          status: 'fail',
          message: 'Invalid credentials'
        });
      }
  
      // Generate token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });
  
      // Log performance
      console.log(`Login processed in ${Date.now() - startTime}ms`);
  
      res.status(200).json({
        status: 'success',
        token,
        user: {
          id: user._id,
          name: user.name,
          role: user.role,
          employee_id: user.employee_id
        }
      });
  
    } catch (err) {
      console.error('Login error:', err.message);
      res.status(500).json({
        status: 'error',
        message: 'Login processing failed',
        error: err.message
      });
    }
  };
  
  
  exports.register = catchAsync(async (req, res, next) => {
  const { name, email, employee_id, password, passwordConfirm, role } = req.body;

  if (password !== passwordConfirm) {
    return next(new AppError('Passwords do not match', 400));
  }

  const newUser = await User.create({
    name,
    email,
    employee_id,
    password,
    role
  });

  const token = signToken(newUser._id);
  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in!', 401));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  
  if (!currentUser) {
    return next(new AppError('User no longer exists', 401));
  }

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Permission denied', 403));
    }
    next();
  };
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.createAdmin = catchAsync(async (req, res, next) => {
  const { name, email, employee_id, password, passwordConfirm } = req.body;

  if (password !== passwordConfirm) {
    return next(new AppError('Passwords do not match', 400));
  }

  const admin = await User.create({
    name,
    email,
    employee_id,
    password,
    role: 'admin'
  });

  admin.password = undefined;
  res.status(201).json({
    status: 'success',
    data: {
      user: admin
    }
  });
});