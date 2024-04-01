const express = require('express');
const routes = express.Router();
const viewControllers = require('./../controllers/view-controllers');
const authenControllers = require('./../controllers/authen-controllers');
routes.get('/', viewControllers.getOverview);
routes.get('/aboutus', viewControllers.getAboutUs);
routes.get('/terms', viewControllers.termsAndCondition);
routes.get('/privacy', viewControllers.privacyPolicy);
routes.get('/contactus', viewControllers.contactUs);
routes.get('/legality', viewControllers.legality);
routes.get('/faq', viewControllers.faq);

module.exports = routes;
