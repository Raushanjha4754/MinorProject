// server/models/Complaint
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, enum: ['hostel', 'mess', 'maintenance', 'other'], required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'resolved', 'rejected'], default: 'pending' },
  response: String,
  resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resolvedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);