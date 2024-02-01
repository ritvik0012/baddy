const express = require('express');
const router = express.Router();

const controllerRoutes = require('../controller/session');
const middleware = require('../helper/middleware');

router.get('/',middleware.isLoggedIn,controllerRoutes.getSignUp);
router.get('/signup',middleware.isLoggedIn,controllerRoutes.getSignUp);
router.get('/homePage',middleware.isLoggedIn,controllerRoutes.getHomePage);
router.get('/login',controllerRoutes.getLogin);
router.get('/forgotPassword',controllerRoutes.getForgotPassword);
router.get('/reset/:userId',controllerRoutes.getReset);

router.post('/signup',controllerRoutes.postSignUp);
router.post('/login',controllerRoutes.postLogin);
router.post('/logout',middleware.isLoggedIn,controllerRoutes.postLogout);
router.post('/forgotPassword',controllerRoutes.postForgotPassword)
router.post('/reset/:token',controllerRoutes.postReset);

module.exports = router