const Student = require('../models/Student');
const AppError = require('../utils/appError');

// @desc    Get student profile
// @route   GET /api/v1/students/me
exports.getStudentProfile = async (req, res, next) => {
  try {
    const student = await Student.findOne({ rollNumber: req.user.rollNumber });

    if (!student) {
      return next(new AppError('No student found with that roll number', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        student
      }
    });
  } catch (err) {
    next(err);
  }
};
