// backend/utils/appError.js

class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
  
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true; // Mark this as an expected (operational) error
  
      // Capture the stack trace and exclude constructor call
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;
  