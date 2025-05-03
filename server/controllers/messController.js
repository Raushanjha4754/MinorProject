// server/controllers/messController
const MessMenu = require('../models/MessMenu');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Get current mess menu
exports.getCurrentMenu = catchAsync(async (req, res, next) => {
  const currentDate = new Date();
  
  const menu = await MessMenu.findOne({
    weekStartDate: { $lte: currentDate },
    weekEndDate: { $gte: currentDate }
  });

  if (!menu) {
    return next(new AppError('No mess menu found for the current week', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      menu
    }
  });
});

// create and update mess menu (admin)
exports.createMenu = catchAsync(async (req, res, next) => {
  const { weekStartDate, weekEndDate, menuItems } = req.body;

  // Check if menu already exists for this week
  const existingMenu = await MessMenu.findOne({
    weekStartDate: { $lte: weekEndDate },
    weekEndDate: { $gte: weekStartDate }
  });

  if (existingMenu) {
    return next(new AppError('A menu already exists for this time period', 400));
  }

  const newMenu = await MessMenu.create({
    weekStartDate,
    weekEndDate,
    menuItems,
    createdBy: req.user.id
  });

  res.status(201).json({
    status: 'success',
    data: {
      menu: newMenu
    }
  });
});

// student's mess billing 
exports.getMyBilling = catchAsync(async (req, res, next) => {
  // In a real application, you would query the billing records
  // For this example, we'll return mock data
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Mock data - replace with actual database queries
  const totalDue = 1200;
  const paidAmount = 800;
  const upcomingCharges = 400;
  
  const paymentHistory = [
    { date: '2023-11-01', amount: 400 },
    { date: '2023-11-15', amount: 400 }
  ];
  
  const upcomingBills = [
    { date: '2023-12-05', amount: 200 },
    { date: '2023-12-20', amount: 200 }
  ];
  
  // Daily billing mock data
  const dailyBilling = [];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
  
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;
    
    dailyBilling.push({
      date: date.toISOString().split('T')[0],
      breakfast: Math.random() > 0.1, // 90% chance of having breakfast
      lunch: Math.random() > 0.05, // 95% chance of having lunch
      dinner: Math.random() > 0.05, // 95% chance of having dinner
      extraItems: Math.random() > 0.8 ? ['Juice'] : [], // 20% chance of extra items
      total: Math.floor(Math.random() * 50) + 50 // Random amount between 50-100
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      totalDue,
      paidAmount,
      upcomingCharges,
      paymentHistory,
      upcomingBills,
      dailyBilling
    }
  });
});


exports.getAllBilling = catchAsync(async (req, res, next) => {

  
  const billingRecords = [
    {
      student: 'student1',
      name: 'John Doe',
      totalDue: 1200,
      paidAmount: 800,
      upcomingCharges: 400
    },
    {
      student: 'student2',
      name: 'Jane Smith',
      totalDue: 1000,
      paidAmount: 600,
      upcomingCharges: 400
    }
  ];

  res.status(200).json({
    status: 'success',
    results: billingRecords.length,
    data: {
      billing: billingRecords
    }
  });
});

//creating a billing record of mess
exports.createBilling = catchAsync(async (req, res, next) => {
  const { student, amount, description } = req.body;

  // Check if student exists
  const studentExists = await User.findById(student);
  if (!studentExists || studentExists.role !== 'student') {
    return next(new AppError('No student found with that ID', 404));
  }


  
  res.status(201).json({
    status: 'success',
    data: {
      billing: {
        student,
        amount,
        description,
        createdAt: new Date()
      }
    }
  });
});