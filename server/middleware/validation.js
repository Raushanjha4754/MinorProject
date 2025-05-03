// server/middleware/validation.js
const { body, validationResult } = require('express-validator');
const AppError = require('../utils/appError');

exports.validateLogin = [
  // Accept either email OR employee_id
  body('email')
  .if(body('employee_id').not().exists())
  .isEmail()
  .withMessage('Please provide a valid email address')
  .normalizeEmail(),
  
body('employee_id')
  .if(body('email').not().exists())
  .trim()
  .notEmpty()
  .withMessage('Employee ID cannot be empty')
  .isLength({ min: 6, max: 12 })
  .withMessage('Employee ID must be 6-12 characters')
  .matches(/^[A-Z0-9]+$/)
  .withMessage('Employee ID must contain only uppercase letters and numbers'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(errors.array()[0].msg, 400));
    }
    
    // Ensure at least one identifier is provided
    if (!req.body.email && !req.body.employee_id) {
      return next(new AppError('Please provide either email or employee_id', 400));
    }
    
    next();
  }
];

exports.validateRegister = [
  body('name').notEmpty().withMessage('Please provide your name'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  // Include employee_id in registration if needed
  body('employee_id')
    .optional()
    .notEmpty()
    .withMessage('Employee ID cannot be empty if provided'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number'),
  body('passwordConfirm')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(errors.array()[0].msg, 400));
    }
    next();
  }
];