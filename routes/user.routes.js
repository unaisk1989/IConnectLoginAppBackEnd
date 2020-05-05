//File for defining our routes, so that the "server.js" file code is not cluttered

const express = require('express')
const router = express.Router();

//Exporting user controller for getting access to all callback handlers
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');

router.post('/login', userController.login)
router.post('/signup', userController.signUp)
router.get('/profile',auth.authenticated, userController.showProfile); //Passing the auth service as a middleware for checking if the user is authorized to view the page

module.exports = router;