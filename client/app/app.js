'use strict';
/*global angular,noty*/

var app = angular.module('hiApp', ['ui.router','ngAnimate','ui.bootstrap','ngTouch']);

app.run(['$rootScope', 'session', function ($rootScope, session) {


	$rootScope.showSuccess = function (msg) {

		var $layout = 'topRight';
		noty({
			theme: 'urban-noty',
			text: msg,
			type: 'success',
			timeout: 3000,
			layout: $layout,
			closeWith: ['button', 'click'],
			animation: {
				open: 'in',
				close: 'out',
				easing: 'swing'
			},
		});
	};

	$rootScope.showError = function (error, msg) {
		var content = '';
		if (error && error.stack) {
			content = error.stack;
		} else if (typeof (error) === 'object') {
			content = JSON.stringify(error);
		} else {
			content = error;
		}

		if (msg) {
			content += '<br>' + msg;
		}
		var $layout = 'top';
		noty({
			theme: 'urban-noty',
			text: 'Error : ' + content,
			type: 'error',
			timeout: 3000,
			layout: $layout,
			closeWith: ['button', 'click'],
			animation: {
				open: 'in',
				close: 'out',
				easing: 'swing'
			},
		});
	};

}]);

app.constant('baseUrl', 'http://localhost/hi/api');