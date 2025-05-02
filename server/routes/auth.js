// // server/routes/auth
// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
// const { validateLogin, validateRegister } = require('../middleware/validation');

// const User = require('../models/User');
// router.get('/debug-users', async (req, res) => {
//     try {
//       const users = await User.find({});
//       res.status(200).json({ users });
//     } catch (err) {
//       res.status(500).json({ message: 'Error fetching users', error: err.message });
//     }
//   });
  
//   router.get('/debug', async (req, res) => {
//     try {
//       const user = await User.findOne({ employee_id: 'NITJADMIN001' });
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       res.json({
//         storedPassword: user.password,
//         inputPassword: 'Secure@Admin123',
//         match: user.password === 'Secure@Admin123',
//         userFound: true
//       });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });

// router.post('/login', validateLogin, authController.login);
// router.post('/register', validateRegister, authController.register);
// router.get('/me', authController.protect, authController.getMe);

// module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin, validateRegister } = require('../middleware/validation');
const User = require('../models/User'); // Make sure this import exists

// Add this debug route ABOVE the other routes
router.post('/debug-login', async (req, res) => {
    try {
      const { employee_id, password } = req.body;
      const user = await User.findOne({ employee_id });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({
        employee_id: user.employee_id,
        storedPassword: user.password,
        inputPassword: password,
        exactMatch: password === user.password,
        trimmedMatch: password.trim() === user.password.trim(),
        charCodes: {
          stored: Array.from(user.password).map(c => c.charCodeAt(0)),
          input: Array.from(password).map(c => c.charCodeAt(0))
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
router.get('/check', async (req, res) => {
    const user = await User.findOne({ employee_id: 'NITJADMIN001' });
    res.send(`Stored password for NITJADMIN001: "${user?.password}"`);
  });

// Keep your existing routes below
router.post('/login', validateLogin, authController.login);
router.post('/register', validateRegister, authController.register);
router.get('/me', authController.protect, authController.getMe);

module.exports = router;