const express = require('express');
const router = express.Router();

const controllerRoutes = require('../controller/session');
const middleware = require('../helper/middleware');

router.get('/',middleware.middlewareFunction,controllerRoutes.getSignUp);
router.get('/signup',middleware.middlewareFunction,controllerRoutes.getSignUp);
router.get('/homePage',middleware.middlewareFunction,controllerRoutes.getHomePage);
router.get('/login',controllerRoutes.getLogin);
router.get('/forgotPassword',controllerRoutes.getForgotPassword);
router.get('/reset/:userId',controllerRoutes.getReset);

router.post('/signup',controllerRoutes.postSignUp);
router.post('/login',controllerRoutes.postLogin);
router.post('/logout',middleware.middlewareFunction,controllerRoutes.postLogout);
router.post('/forgotPassword',controllerRoutes.postForgotPassword)
router.post('/reset/:token',controllerRoutes.postReset);

module.exports = router