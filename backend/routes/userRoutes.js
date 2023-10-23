const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

const { body } = require('express-validator');

const router = require('express').Router();

// localhost:5000/api/users
// localhost:5000/api/users/login
// localhost:5000/api/users/me
router.post(
  '/',
  body('name', 'Please include your name').notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body(
    'password',
    'Please enter a paswword with 8 or more characters'
  ).isLength({ min: 8 }),
  registerUser
);
router.post('/login', loginUser);
router.get('/me', getMe);

module.exports = router;
