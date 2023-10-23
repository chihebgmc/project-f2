const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

/**
 * @route POST /api/users
 * @desc Register new user
 * @access Public
 */

const registerUser = asyncHandler(async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(
    //   errors
    //     .array()
    //     .map(error => error.msg)
    //     .join('\n')
    // );
    res.status(400);
    throw new Error(
      errors
        .array()
        .map(error => error.msg)
        .join('\n')
    );
  }

  // Get user data from request body
  const { name, email, password } = req.body;

  //   Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //   Hash password
  // docs: https://www.npmjs.com/package/bcryptjs
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  //   create user
  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 * @route POST /api/users/login
 * @desc Authenticate new user
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  // Get user data from request body
  const { email, password } = req.body;

  //   Check if user exists
  const user = await User.findOne({ email });

  if (
    user &&
    (await bcrypt.compare(
      typeof password === 'undefined' ? '' : password,
      user.password
    ))
  ) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

/**
 * @route GET /api/users/me
 * @desc Get user data
 * @access Private
 */

const getMe = asyncHandler((req, res) => {
  res.status(200).json(req.user);
});

const generateToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
