// server/models/Hostel
const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, enum: ['boys', 'girls'], required: true },
  totalRooms: { type: Number, required: true },
  occupiedRooms: { type: Number, default: 0 },
  warden: { type: String, required: true },
  contactNumber: { type: String, required: true },
  facilities: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hostel', hostelSchema);