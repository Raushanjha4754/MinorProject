const mongoose = require('mongoose');
const MessMenu = require('../models/MessMenu');
const MessBilling = require('../models/MessBilling');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Utility function to validate menu days
const validateMenuDays = (days) => {
  const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days.every(day => validDays.includes(day.day));
};

// @desc    Get current mess menu
// @route   GET /api/mess/menu
// @access  Student
exports.getCurrentMenu = catchAsync(async (req, res, next) => {
  const currentDate = new Date();
  
  const menu = await MessMenu.findOne({
    weekStartDate: { $lte: currentDate },
    weekEndDate: { $gte: currentDate }
  })
  .populate('createdBy', 'name email')
  .lean();

  if (!menu) {
    return next(new AppError('No mess menu found for the current week', 404));
  }

  // Format dates for better readability
  menu.weekStartDate = menu.weekStartDate.toISOString().split('T')[0];
  menu.weekEndDate = menu.weekEndDate.toISOString().split('T')[0];

  res.status(200).json({
    status: 'success',
    data: {
      menu
    }
  });
});

// @desc    Create mess menu
// @route   POST /api/mess/menu
// @access  Admin
exports.createMenu = catchAsync(async (req, res, next) => {
  const { weekStartDate, weekEndDate, days } = req.body;

  // Validate input
  if (!weekStartDate || !weekEndDate || !days || !Array.isArray(days)) {
    return next(new AppError('Please provide weekStartDate, weekEndDate, and days array', 400));
  }

  // Validate dates
  if (new Date(weekStartDate) >= new Date(weekEndDate)) {
    return next(new AppError('End date must be after start date', 400));
  }

  // Validate days structure
  if (!validateMenuDays(days)) {
    return next(new AppError('Invalid day format or duplicate days', 400));
  }

  // Check for overlapping menus
  const existingMenu = await MessMenu.findOne({
    $or: [
      { 
        weekStartDate: { $lte: new Date(weekEndDate) },
        weekEndDate: { $gte: new Date(weekStartDate) }
      }
    ]
  });

  if (existingMenu) {
    return next(new AppError('A menu already exists for this time period', 400));
  }

  const newMenu = await MessMenu.create({
    weekStartDate,
    weekEndDate,
    days,
    createdBy: req.user.id
  });

  res.status(201).json({
    status: 'success',
    data: {
      menu: newMenu
    }
  });
});

// @desc    Get student's mess billing
// @route   GET /api/mess/billing
// @access  Student
exports.getMyBilling = catchAsync(async (req, res, next) => {
  const studentId = req.user.id;
  
  // Get billing records
  const billing = await MessBilling.find({ student: studentId })
    .sort('-date')
    .lean();

  // Calculate totals using aggregation
  const [totals] = await MessBilling.aggregate([
    { $match: { student: new mongoose.Types.ObjectId(studentId) } },
    {
      $group: {
        _id: null,
        totalDue: { 
          $sum: { 
            $cond: [{ $eq: ['$paid', false] }, '$amount', 0] 
          } 
        },
        totalPaid: { 
          $sum: { 
            $cond: [{ $eq: ['$paid', true] }, '$amount', 0] 
          } 
        }
      }
    }
  ]);

  // Format dates for better readability
  const formattedBilling = billing.map(record => ({
    ...record,
    date: record.date.toISOString().split('T')[0],
    createdAt: record.createdAt.toISOString().split('T')[0],
    updatedAt: record.updatedAt.toISOString().split('T')[0]
  }));

  res.status(200).json({
    status: 'success',
    data: {
      billing: formattedBilling,
      totalDue: totals?.totalDue || 0,
      totalPaid: totals?.totalPaid || 0
    }
  });
});

// @desc    Get all billing records (admin)
// @route   GET /api/mess/billing/all
// @access  Admin
exports.getAllBilling = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, paid, student } = req.query;
  
  // Build query
  const query = {};
  if (paid !== undefined) query.paid = paid === 'true';
  if (student) query.student = student;

  // Get paginated results
  const billing = await MessBilling.find(query)
    .sort('-date')
    .populate('student', 'name rollNumber email')
    .populate('createdBy', 'name email')
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .lean();

  // Format dates
  const formattedBilling = billing.map(record => ({
    ...record,
    date: record.date.toISOString().split('T')[0],
    paymentDate: record.paymentDate?.toISOString().split('T')[0],
    createdAt: record.createdAt.toISOString().split('T')[0]
  }));

  // Get total count for pagination
  const total = await MessBilling.countDocuments(query);

  res.status(200).json({
    status: 'success',
    results: total,
    data: {
      billing: formattedBilling
    }
  });
});

// @desc    Create a billing record
// @route   POST /api/mess/billing
// @access  Admin
exports.createBilling = catchAsync(async (req, res, next) => {
  const { student, amount, date, description, paid = false } = req.body;

  // Validate input
  if (!student || !amount || isNaN(amount)) {
    return next(new AppError('Please provide valid student ID and amount', 400));
  }

  // Validate student exists and is a student
  const studentExists = await User.findOne({
    _id: student,
    role: 'student'
  });

  if (!studentExists) {
    return next(new AppError('No student found with that ID', 404));
  }

  // Create billing record
  const newBilling = await MessBilling.create({
    student,
    amount: parseFloat(amount),
    date: date || Date.now(),
    description,
    paid,
    createdBy: req.user.id
  });

  res.status(201).json({
    status: 'success',
    data: {
      billing: newBilling
    }
  });
});

// @desc    Update billing record
// @route   PATCH /api/mess/billing/:id
// @access  Admin
exports.updateBilling = catchAsync(async (req, res, next) => {
  const { amount, date, description, paid } = req.body;
  const billingId = req.params.id;

  // Find and update billing record
  const updatedBilling = await MessBilling.findByIdAndUpdate(
    billingId,
    {
      amount,
      date,
      description,
      paid,
      paymentDate: paid ? new Date() : undefined
    },
    { new: true, runValidators: true }
  );

  if (!updatedBilling) {
    return next(new AppError('No billing record found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      billing: updatedBilling
    }
  });
});