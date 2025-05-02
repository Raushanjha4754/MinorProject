// server/controllers/feeController
const Fee = require('../models/Fee');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Get all fees (admin only)
exports.getAllFees = catchAsync(async (req, res, next) => {
  const fees = await Fee.find()
    .populate('student')
    .sort('-dueDate');

  res.status(200).json({
    status: 'success',
    results: fees.length,
    data: {
      fees
    }
  });
});

// Create a fee record (admin only)
exports.createFee = catchAsync(async (req, res, next) => {
  const { student, type, amount, dueDate } = req.body;

  // Check if student exists
  const studentExists = await User.findById(student);
  if (!studentExists || studentExists.role !== 'student') {
    return next(new AppError('No student found with that ID', 404));
  }

  const newFee = await Fee.create({
    student,
    type,
    amount,
    dueDate
  });

  res.status(201).json({
    status: 'success',
    data: {
      fee: newFee
    }
  });
});

// Get a specific fee (admin only)
exports.getFee = catchAsync(async (req, res, next) => {
  const fee = await Fee.findById(req.params.id).populate('student');

  if (!fee) {
    return next(new AppError('No fee found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      fee
    }
  });
});

// Update fee (admin only)
exports.updateFee = catchAsync(async (req, res, next) => {
  const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate('student');

  if (!fee) {
    return next(new AppError('No fee found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      fee
    }
  });
});

// Delete fee (admin only)
exports.deleteFee = catchAsync(async (req, res, next) => {
  const fee = await Fee.findByIdAndDelete(req.params.id);

  if (!fee) {
    return next(new AppError('No fee found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Get current student's fees
exports.getMyFees = catchAsync(async (req, res, next) => {
  const fees = await Fee.find({ student: req.user.id }).sort('-dueDate');

  res.status(200).json({
    status: 'success',
    results: fees.length,
    data: {
      fees
    }
  });
});

// Pay a fee
exports.payFee = catchAsync(async (req, res, next) => {
  const fee = await Fee.findOne({
    _id: req.params.id,
    student: req.user.id
  });

  if (!fee) {
    return next(new AppError('No fee found with that ID', 404));
  }

  if (fee.status === 'paid') {
    return next(new AppError('This fee has already been paid', 400));
  }

  // In a real application, you would integrate with a payment gateway here
  // For this example, we'll just mark it as paid
  fee.status = 'paid';
  fee.paymentDate = Date.now();
  fee.transactionId = `TXN${Date.now()}`;
  await fee.save();

  res.status(200).json({
    status: 'success',
    data: {
      fee
    }
  });
});

// Get fee summary for dashboard
exports.getFeeSummary = catchAsync(async (req, res, next) => {
  const fees = await Fee.find({ student: req.user.id });

  const pending = fees
    .filter(fee => fee.status === 'pending')
    .reduce((sum, fee) => sum + fee.amount, 0);

  const paid = fees
    .filter(fee => fee.status === 'paid')
    .reduce((sum, fee) => sum + fee.amount, 0);

  res.status(200).json({
    status: 'success',
    data: {
      pending,
      paid
    }
  });
});