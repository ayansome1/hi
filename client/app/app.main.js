'use strict';
/*jshint node:true, quotmark:false*/
/*global angular,alert*/
angular.module('hiApp')
	.controller('appCtrl', ['$scope', '$http', 'baseUrl', '$rootScope', '$state', 'session', function ($scope, $http, baseUrl, $rootScope, $state, session) {

		$scope.logout = function () {
			session.destroy();
			$state.go('login');
		};

		if (session.getUser()) {
			$rootScope.nameOfUser = session.getUser().name;
		}

	}]);