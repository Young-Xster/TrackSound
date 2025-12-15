const express = require('express');
const { signUp, signin , updatePassword } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signin);
router.put('/update-password', authenticate, updatePassword);

module.exports = router;