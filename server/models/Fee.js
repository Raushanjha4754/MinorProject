// server/models/Fee
const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['hostel', 'mess', 'other'], required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
  paymentDate: Date,
  transactionId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Fee', feeSchema);