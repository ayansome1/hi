'use strict';
/*jshint node:true, quotmark:false*/
/*global angular,_*/
var app = angular.module('hiApp');

app.directive('emailValidation', function () {
	return {
		require: 'ngModel',
		link: function (scope, elem, attr, ngModel) {

			ngModel.$parsers.unshift(function (value) {

				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				var valid = re.test(value);
				ngModel.$setValidity('email', valid);
				if(_.isEmpty(value)){
					return true;
				}
				return valid ? value : undefined;
			});

		}
	};
});