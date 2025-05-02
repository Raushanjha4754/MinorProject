// server/models/MessMenu
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  day: { type: String, required: true, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
  breakfast: { type: String, required: true },
  lunch: { type: String, required: true },
  snacks: { type: String, required: true },
  dinner: { type: String, required: true },
  specialNote: String
});

const messMenuSchema = new mongoose.Schema({
  weekStartDate: { type: Date, required: true },
  weekEndDate: { type: Date, required: true },
  menuItems: [menuItemSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MessMenu', messMenuSchema);