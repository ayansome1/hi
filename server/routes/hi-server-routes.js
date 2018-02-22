/*global require, module*/
'use strict';

let hiCtrl = require('../controllers/hi-server-controller');


module.exports = (app, auth) => {

	app.post('/new-hi', auth, hiCtrl.newHi);
	app.get('/all-hi', auth, hiCtrl.getAllHi);
	app.get('/users',auth,hiCtrl.getAllUsers);
};