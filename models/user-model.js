const mongoose = require('mongoose');
const BigNumberSchema = require('mongoose-bignumber');

const validator = require('validator');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter a name'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  mobileNumber: {
    type: BigNumberSchema,
    required: [true, 'Please enter your Mobile Number'],
  },
  birthDate: {
    type: Date,
  },
  city: {
    type: String,
    required: [true, 'Please enter your city'],
  },
  country: {
    type: String,
    required: [true, 'Please enter your city'],
  },
});
const User = mongoose.model('User', userSchema);
module.exports = User;
