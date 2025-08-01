// server/controllers/attendanceController
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// attendance records (for - admin only)
exports.getAllAttendance = catchAsync(async (req, res, next) => {
  const { month, year, student } = req.query;
  
  let filter = {};
  
  if (month && year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    filter.date = { $gte: startDate, $lte: endDate };
  }
  
  if (student) {
    filter.student = student;
  }

  const attendance = await Attendance.find(filter)
    .populate('student')
    .populate('markedBy')
    .sort('-date');

  res.status(200).json({
    status: 'success',
    results: attendance.length,
    data: {
      attendance
    }
  });
});

// Mark the attendance (admin only)
exports.markAttendance = catchAsync(async (req, res, next) => {
  const { student, date, status } = req.body;

  // Check if student exists
  const studentExists = await User.findById(student);
  if (!studentExists || studentExists.role !== 'student') {
    return next(new AppError('No student found with that ID', 404));
  }

  // Check that attendence alredy marked
  const existingAttendance = await Attendance.findOne({
    student,
    date: new Date(date)
  });

  if (existingAttendance) {
    return next(new AppError('Attendance already marked for this date', 400));
  }

  const newAttendance = await Attendance.create({
    student,
    date: new Date(date),
    status,
    markedBy: req.user.id
  });

  res.status(201).json({
    status: 'success',
    data: {
      attendance: newAttendance
    }
  });
});

// leave application for student
exports.applyForLeave = catchAsync(async (req, res, next) => {
  const { date, reason } = req.body;

  // Check if attendance already marked for this date
  const existingAttendance = await Attendance.findOne({
    student: req.user.id,
    date: new Date(date)
  });

  if (existingAttendance) {
    return next(new AppError('Attendance already marked for this date', 400));
  }

  const newLeave = await Attendance.create({
    student: req.user.id,
    date: new Date(date),
    status: 'leave',
    leaveReason: reason,
    leaveStatus: 'pending'
  });

  res.status(201).json({
    status: 'success',
    data: {
      attendance: newLeave
    }
  });
});

// Approve leave by admin
exports.approveLeave = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  const leave = await Attendance.findOneAndUpdate(
    {
      _id: req.params.id,
      status: 'leave',
      leaveStatus: 'pending'
    },
    {
      leaveStatus: status,
      markedBy: req.user.id
    },
    {
      new: true,
      runValidators: true
    }
  ).populate('student');

  if (!leave) {
    return next(new AppError('No pending leave found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      attendance: leave
    }
  });
});


exports.getMyAttendance = catchAsync(async (req, res, next) => {
  const { month, year } = req.query;
  
  let filter = { student: req.user.id };
  
  if (month && year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    filter.date = { $gte: startDate, $lte: endDate };
  }

  const attendance = await Attendance.find(filter)
    .sort('-date');

  res.status(200).json({
    status: 'success',
    results: attendance.length,
    data: {
      attendance
    }
  });
});

// attendence summary foe dashboard
exports.getAttendanceSummary = catchAsync(async (req, res, next) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const startDate = new Date(currentYear, currentMonth - 1, 1);
  const endDate = new Date(currentYear, currentMonth, 0);

  // Get all attendance records for current month
  const attendance = await Attendance.find({
    student: req.user.id,
    date: { $gte: startDate, $lte: endDate }
  });

  // statics
  const present = attendance.filter(a => a.status === 'present').length;
  const absent = attendance.filter(a => a.status === 'absent').length;
  const leave = attendance.filter(a => a.status === 'leave').length;
  const totalDays = new Date(currentYear, currentMonth, 0).getDate();
  const workingDays = totalDays; // Adjust for weekends/holidays if needed
  const percentage = ((present + leave) / workingDays * 100).toFixed(1);

  // Monthly data on dashboard in chart format
  const monthlyData = [];
  for (let i = 0; i < 6; i++) {
    const month = currentMonth - i > 0 ? currentMonth - i : 12 + (currentMonth - i);
    const year = currentMonth - i > 0 ? currentYear : currentYear - 1;
    
    const monthStart = new Date(year, month - 1, 1);
    const monthEnd = new Date(year, month, 0);
    
    const monthAttendance = await Attendance.find({
      student: req.user.id,
      date: { $gte: monthStart, $lte: monthEnd }
    });
    
    const monthPresent = monthAttendance.filter(a => a.status === 'present').length;
    const monthAbsent = monthAttendance.filter(a => a.status === 'absent').length;
    const monthLeave = monthAttendance.filter(a => a.status === 'leave').length;
    const monthWorkingDays = new Date(year, month, 0).getDate();
    const monthPercentage = ((monthPresent + monthLeave) / monthWorkingDays * 100).toFixed(1);
    
    monthlyData.unshift({
      name: new Date(year, month - 1).toLocaleString('default', { month: 'short' }),
      present: monthPresent,
      absent: monthAbsent,
      leave: monthLeave,
      workingDays: monthWorkingDays,
      percentage: monthPercentage
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      present,
      absent,
      leave,
      workingDays,
      percentage,
      monthlyData
    }
  });
});