const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  bulkAssignRoom
} = require('../controllers/studentController');

// Public routes (if any)

// Protected routes
router.use(auth(['admin', 'staff']));

router.route('/')
  .get(getStudents)
  .post(createStudent);

router.route('/bulk-assign-room')
  .post(bulkAssignRoom);

router.route('/:id')
  .get(getStudent)
  .put(updateStudent);

module.exports = router;