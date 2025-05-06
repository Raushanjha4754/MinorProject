const mongoose = require('mongoose');

const messBillingSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
  description: String,
  paid: { type: Boolean, default: false },
  paymentDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const MessBilling = mongoose.model('MessBilling', messBillingSchema);

module.exports = MessBilling;