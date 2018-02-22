/*global require, module*/
'use strict';

let loginSignUpCtrl = require('../controllers/login-signup-server-controller');


module.exports = (app) =>{

	app.post('/signup',loginSignUpCtrl.signUp);
	// app.post('/resendEmailVerificationLink',loginSignUpCtrl.resendEmailVerificationLink);
	// app.get('/verify/email/:token',loginSignUpCtrl.verifyEmail);
	app.post('/login',loginSignUpCtrl.logIn);

};