// server/controllers/studentController
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Helper function to filter object fields
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Get all students (admin only)
exports.getAllStudents = catchAsync(async (req, res, next) => {
  const students = await User.find({ role: 'student' })
    .populate('hostel')
    .select('-password -__v');

  res.status(200).json({
    status: 'success',
    results: students.length,
    data: {
      students
    }
  });
});

// Create a new student (admin only)
exports.createStudent = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, rollNumber, hostel, roomNumber } = req.body;

  if (password !== passwordConfirm) {
    return next(new AppError('Passwords do not match', 400));
  }

  const newStudent = await User.create({
    name,
    email,
    password,
    role: 'student',
    rollNumber,
    hostel,
    roomNumber
  });

  // Remove password from output
  newStudent.password = undefined;

  res.status(201).json({
    status: 'success',
    data: {
      student: newStudent
    }
  });
});

// Get a specific student (admin only)
exports.getStudent = catchAsync(async (req, res, next) => {
  const student = await User.findById(req.params.id)
    .populate('hostel')
    .select('-password -__v');

  if (!student || student.role !== 'student') {
    return next(new AppError('No student found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      student
    }
  });
});

// Update student (admin only)
exports.updateStudent = catchAsync(async (req, res, next) => {
  // Filter out unwanted fields that should not be updated
  const filteredBody = filterObj(
    req.body,
    'name',
    'email',
    'rollNumber',
    'hostel',
    'roomNumber',
    'contactNumber',
    'profileImage'
  );

  const updatedStudent = await User.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true
    }
  ).select('-password -__v');

  if (!updatedStudent || updatedStudent.role !== 'student') {
    return next(new AppError('No student found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      student: updatedStudent
    }
  });
});

// Delete student (admin only)
exports.deleteStudent = catchAsync(async (req, res, next) => {
  const student = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!student || student.role !== 'student') {
    return next(new AppError('No student found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Get current student profile
exports.getMyProfile = catchAsync(async (req, res, next) => {
  const student = await User.findById(req.user.id)
    .populate('hostel')
    .select('-password -__v');

  res.status(200).json({
    status: 'success',
    data: {
      student
    }
  });
});

// Update current student profile
exports.updateMyProfile = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'name',
    'email',
    'contactNumber',
    'profileImage',
    'bloodGroup'
  );

  // 3) Update user document
  const updatedStudent = await User.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true
    }
  ).select('-password -__v');

  res.status(200).json({
    status: 'success',
    data: {
      student: updatedStudent
    }
  });
});