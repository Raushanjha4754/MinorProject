
const mongoose = require('mongoose');
const User = require('./models/User');
const Hostel = require('./models/Hostel');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config({ path: './.env' });

mongoose.set('strictQuery', false);

const MONGODB_URI = process.env.MONGODB_URI.replace(
  '<db_password>',
  process.env.DB_PASSWORD
);

const seedDB = async () => {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('DB connection successful!');
  
      // Clear only users collection
      await User.deleteMany({});
  
      // Create admin users with VERIFIED credentials
      const admins = [
        {
          name: 'Hostel Administrator',
          email: 'hostel.admin@nitj.ac.in',
          employee_id: 'NITJADMIN001',
          password: 'Secure@Admin123', 
          role: 'admin',
          contactNumber: '9876543201'
        },
        {
          name: 'Warden Office',
          email: 'warden.office@nitj.ac.in',
          employee_id: 'NITJADMIN002',
          password: 'Warden@Office456', 
          role: 'admin',
          contactNumber: '9876543202'
        },
        {
          name: 'Mess Supervisor',
          email: 'mess.supervisor@nitj.ac.in',
          employee_id: 'NITJADMIN003',
          password: 'Mess@Super789', 
          role: 'admin',
          contactNumber: '9876543203'
        }
      ];
  
      await User.create(admins);
  
      console.log('Admins created successfully!');
      console.log('Use these exact credentials:');
      admins.forEach(admin => {
        console.log(`\nEmployee ID: ${admin.employee_id}`);
        console.log(`Password: ${admin.password}`);
      });
  
      process.exit();
    } catch (err) {
      console.error('Seeding failed:', err.message);
      process.exit(1);
    }
  };

seedDB();
