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
    const { employee_id, password } = req.body;

    if(!password) {
      return res.status(400).json({
        status:'fail',
        message:'Password is required'
      });
    }

    // 1. Finding the user: 
    const user = await User.findOne({ employee_id }).select('+password');

    if (!user) {
      console.log(`User not found: ${employee_id}`);
      return res.status(403).json({
        status: 'fail',
        message: 'Invalid credentials'
      });
    }

    if (!user.password || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid login request'
      });
    }
    

    // 2. Verifying password entered using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    
    console.log('Comparing:', {
      input: password,
      stored: user.password,
      match: await bcrypt.compare(password, user.password)
    });

    if (!isMatch) {
      console.log('Password mismatch for user:', employee_id);
      return res.status(403).json({
        status: 'fail',
        message: 'Invalid credentials'
      });
    }

    // 3. Generate JWT token after verifying password
    const token = jwt.sign(
      { 
        id: user._id,
        role: user.role
       },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      status: 'success',
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        employee_id: user.employee_id,
        token:token,
      }
    });


  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Login processing failed'
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

  console.log(req)
  console.log("................")
  console.log(req.headers)

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

exports.getMe = catchAsync(async (req, res) => {
  // Debug logging
  console.log('Headers received:', req.headers);
  console.log('Token received:', req.headers.authorization);

  const userId =  req.user.id;
  console.log(userId)

  const user = await User.findById(req.user.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        employee_id: user.employee_id
      }
    }
  });
});

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