// server/controllers/complaintController
const Complaint = require('../models/Complaint');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.getAllComplaints = catchAsync(async (req, res, next) => {
  const { status, category } = req.query;
  
  let filter = {};
  
  if (status) {
    filter.status = status;
  }
  
  if (category) {
    filter.category = category;
  }

  const complaints = await Complaint.find(filter)
    .populate('student')
    .populate('resolvedBy')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: complaints.length,
    data: {
      complaints
    }
  });
});

// create a complaint given by student
exports.createComplaint = catchAsync(async (req, res, next) => {
  const { title, category, description } = req.body;

  const newComplaint = await Complaint.create({
    student: req.user.id,
    title,
    category,
    description
  });

  res.status(201).json({
    status: 'success',
    data: {
      complaint: newComplaint
    }
  });
});

// resolve complaints by admin (access to admin)
exports.resolveComplaint = catchAsync(async (req, res, next) => {
  const { status, response } = req.body;

  if (!['resolved', 'rejected'].includes(status)) {
    return next(new AppError('Invalid status. Must be "resolved" or "rejected"', 400));
  }

  const complaint = await Complaint.findOneAndUpdate(
    {
      _id: req.params.id,
      status: 'pending'
    },
    {
      status,
      response,
      resolvedBy: req.user.id,
      resolvedAt: Date.now()
    },
    {
      new: true,
      runValidators: true
    }
  ).populate('student');

  if (!complaint) {
    return next(new AppError('No pending complaint found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      complaint
    }
  });
});

// getting current complain by student
exports.getMyComplaints = catchAsync(async (req, res, next) => {
  const { status } = req.query;
  
  let filter = { student: req.user.id };
  
  if (status) {
    filter.status = status;
  }

  const complaints = await Complaint.find(filter)
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: complaints.length,
    data: {
      complaints
    }
  });
});