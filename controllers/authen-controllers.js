// const { error } = require('console');
const User = require('./../models/user-model');
const catchAsync = require('./../utils/catch-Async');
const AppError = require('./../utils/app-error');
const jwt = require('jsonwebtoken');
const accountSid = process.env.TWILLIO_ACCOUNT_SSID;
const authToken = process.env.TWILLIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

let OTP = '';
let user;

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOption);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, mobileNumber, city, country } = req.body;
  console.log(email);
  const existingUser = await User.findOne({ mobileNumber });
  if (existingUser) {
    return next(
      new AppError('User with same mobile number alreasy exist', 401)
    );
  }
  user = new User({ name, email, mobileNumber, city, country });
  let digits = '0123456789';
  OTP = '';
  let len = digits.length;
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * len)];
  }
  await client.messages
    .create({
      body: `OTP for verifaction of ${mobileNumber} is ${OTP}`,
      messagingServiceSid: process.env.TWILIO_MessagingServiceSID,
      // from: `process.env.TWILIO_FROM_PHONE_NUMBER`,
      to: `process.env.TWILIO_TO_PHONE_NUMBER`,
    })
    .then((message) =>
      res.status(200).json({
        msg: message.body,
      })
    );
  // createSendToken(newUser, 201, res);
});

exports.signUpOTP = catchAsync(async (req, res, next) => {
  const { otp } = req.body;
  console.log(otp);
  if (otp != OTP) {
    return next(new AppError('Incorrect OTP', 400));
  }

  user = await user.save();
  createSendToken(user, 200, res);
});

let currentUser;
exports.getLogin = catchAsync(async (req, res, next) => {
  //   console.log('abhishek');
  const { mobileNumber } = req.body;
  if (!mobileNumber) {
    return next(new AppError('Please Enter a valid mobile no', 400));
  }

  currentUser = await User.findOne({ mobileNumber });
  if (!currentUser) {
    return next(new AppError('User does not exit for this mobile no', 400));
  }

  let digits = '0123456789';

  let len = digits.length;
  OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * len)];
  }
  console.log(OTP);
  await client.messages
    .create({
      body: `OTP for verifacation of ${mobileNumber} is ${OTP}`,
      messagingServiceSid: process.env.TWILIO_MessagingServiceSID,
      // from: `process.env.TWILIO_FROM_PHONE_NUMBER`,
      to: `process.env.TWILIO_TO_PHONE_NUMBER`,
    })
    .then((message) =>
      res.status(200).json({
        msg: message.body,
      })
    );
});
exports.confirmOTP = catchAsync(async (req, res, next) => {
  const { otp } = req.body;
  console.log(otp);
  if (otp != OTP) {
    return next(new AppError('Incorrect OTP', 400));
  }

  createSendToken(currentUser, 200, res);
});

exports.protects = catchAsync(async (req, res, next) => {
  //Getting a token--------
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }
  next();
});
