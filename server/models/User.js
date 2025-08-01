const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    maxlength: [255, 'Email cannot exceed 255 characters']
  },
  employee_id: {
    type: String,
    unique: true,
    sparse: true,
    uppercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[A-Z0-9]{6,12}$/.test(v);
      },
      message: 'Employee ID must be 6-12 uppercase alphanumeric characters'
    }
  },
  password: { 
    type: String, 
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false,
    validate: {
      validator: function(v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v);
      },
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  role: { 
    type: String, 
    enum: ['admin', 'student', 'staff'], 
    default: 'student' 
  },
  rollNumber: { 
    type: String, 
    unique: true, 
    sparse: true,
    uppercase: true,
    validate: {
      validator: function(v) {
        return /^[A-Z0-9]{8,12}$/.test(v);
      },
      message: 'Roll number must be 8-12 uppercase alphanumeric characters'
    }
  },
  hostel: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Hostel' 
  },
  roomNumber: {
    type: String,
    uppercase: true,
    trim: true
  },
  isActive: { 
    type: Boolean, 
    default: true,
    select: false
  },
  profileImage: String,
  contactNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: 'Phone number must be 10 digits'
    }
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', null],
    default: null
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    select: false
  },
  lastActiveAt: {
    type: Date,
    select: false
  }
}, {
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  },
  toObject: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  },
  timestamps: false // Using custom createdAt instead
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  // Accept all bcrypt hash prefixes
  if (this.password && /^\$2[aby]\$/.test(this.password)) return next();

  try {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordChangedAt = Date.now() - 1000;
    next();
  } catch (err) {
    next(err);
  }
});

// Query middleware to exclude inactive users by default
userSchema.pre(/^find/, function(next) {
  this.find({ isActive: { $ne: false } });
  next();
});

// Instance methods
userSchema.methods.correctPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ employee_id: 1 }, { unique: true, sparse: true });
userSchema.index({ rollNumber: 1 }, { unique: true, sparse: true });
userSchema.index({ role: 1 });
userSchema.index({ hostel: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({
  name: 'text',
  email: 'text',
  employee_id: 'text',
  rollNumber: 'text'
});

// Virtuals
userSchema.virtual('fullProfile').get(function() {
  return `${this.name} (${this.role}) - ${this.email}`;
});

const User = mongoose.model('User', userSchema);

module.exports = User;