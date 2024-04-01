const express = require('express');
const routes = express.Router();
const authenControllers = require('./../controllers/authen-controllers');

routes.post('/signup', authenControllers.signup);
routes.post('/login', authenControllers.getLogin);
routes.post('/login/verify', authenControllers.confirmOTP);
routes.post('/signup/verify', authenControllers.signUpOTP);

module.exports = routes;
