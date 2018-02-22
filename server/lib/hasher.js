'use strict';

/*jshint node:true*/
/* global require */

(function (hasher) {

	var crypto = require('crypto');
	var config = require('../config/config.js');

	hasher.hash = function (options, callback) {

		let salt = options.salt;

		//crypto.pbkdf2(password, salt, iterations, keylen, digest, callback)		
		crypto.pbkdf2(options.password, salt, 10000, 32, 'sha1', function (err, derivedKey) {
			var hash = new Buffer(derivedKey).toString('hex');

			console.log('^^^^hash : ' + hash);
			callback({
				salt: salt,
				hash: hash
			});
		});
	};



})(module.exports);