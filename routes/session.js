const express = require('express');
const router = express.Router();

const controllerRoutes = require('../controller/session');
const middleware = require('../helper/middleware');

router.get('/',middleware.isLoggedIn,controllerRoutes.getSignUp);
router.get('/signup',middleware.isLoggedIn,controllerRoutes.getSignUp);
router.get('/homePage',middleware.isLoggedIn,controllerRoutes.getHomePage);
router.get('/login',middleware.isLoggedIn,controllerRoutes.getLogin);
router.get('/forgotPassword',middleware.isLoggedIn,controllerRoutes.getForgotPassword);

router.post('/signup',middleware.isLoggedIn,controllerRoutes.postSignUp);
router.post('/login',middleware.isLoggedIn,controllerRoutes.postLogin);
router.post('/logout',middleware.isLoggedIn,controllerRoutes.postLogout);
router.post('/forgotPassword',middleware.isLoggedIn,controllerRoutes.postForgotPassword)

module.exports = router