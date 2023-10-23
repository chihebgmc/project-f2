const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// User model
const User = mongoose.model('User', userSchema);

module.exports = User;
