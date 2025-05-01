const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  hostel: {
    type: String
  },
  mobile: {
    type: String
  },
  bloodGroup: {
    type: String
  },
  profileImage: {
    type: String
  }
});

module.exports = mongoose.model('Student', StudentSchema);