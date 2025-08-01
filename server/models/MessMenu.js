const mongoose = require('mongoose');

const messMenuSchema = new mongoose.Schema({
  weekStartDate: { 
    type: Date, 
    required: true 
  },
  weekEndDate: { 
    type: Date, 
    required: true 
  },
  days: [{
    day: { 
      type: String, 
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    },
    breakfast: { 
      type: String, 
      required: true 
    },
    lunch: { 
      type: String, 
      required: true 
    },
    dinner: { 
      type: String, 
      required: true 
    },
    snacks: String
  }],
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { 
  timestamps: true 
});

const MessMenu = mongoose.model('MessMenu', messMenuSchema);

module.exports = MessMenu;