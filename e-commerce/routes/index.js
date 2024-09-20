const express = require('express');
const routes = express.Router();
const adminCtl = require('../controllers/adminCtl');
const passport = require('passport');
const productController = require('../controllers/ProductCtl');

// Admin routes
routes.get('/', adminCtl.login);
routes.get('/logout', adminCtl.logout);
routes.get('/dashboard', passport.checkAuthentication, adminCtl.dashboard);
routes.get('/viewAdmin', passport.checkAuthentication, adminCtl.viewAdmin);
routes.get('/addAdmin', passport.checkAuthentication, adminCtl.addAdmin);
routes.get('/profile', passport.checkAuthentication, adminCtl.profile);
routes.get('/changePass', passport.checkAuthentication, adminCtl.changePass);
routes.get('/forgetPassword', adminCtl.forgetPassword);

routes.post('/insert', adminCtl.addData);
routes.post('/loginInfo', passport.authenticate('local', { failureRedirect: '/' }), adminCtl.loginInfo);
routes.post('/changePassword', adminCtl.changePassword);
routes.post('/lostPass', adminCtl.lostPass);
routes.post('/checkNewPassword', adminCtl.checkNewPassword);
module.exports = routes;
