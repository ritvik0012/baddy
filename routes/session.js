const express = require('express');
const router = express.Router();

const controllerRoutes = require('../controller/session');
const middleware = require('../helper/middleware');

router.get('/',middleware.isLoggedIn,controllerRoutes.getSignUp);
router.get('/signup',middleware.isLoggedIn,controllerRoutes.getSignUp);
router.get('/homePage',middleware.isLoggedIn,controllerRoutes.getHomePage);

router.post('/signup',middleware.isLoggedIn,controllerRoutes.postSignUp);
router.post('/logout',middleware.isLoggedIn,controllerRoutes.postLogout);

module.exports = router