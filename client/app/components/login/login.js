'use strict';
/*jshint node:true, quotmark:false*/
/*global angular,alert*/
angular.module('hiApp')
	.controller('loginController', ['$scope', '$http', 'baseUrl', '$rootScope', '$state', 'session', function ($scope, $http, baseUrl, $rootScope, $state, session) {

		$scope.login = function () {
			$http.post(baseUrl + "/login", $scope.user).then(function (response) {
				$scope.showSuccess("Login successful");
				console.log(response.data.user);
				session.setUser(response.data.user);
				session.setAccessToken(response.data.accessToken);

				if (session.getUser()) {
					$rootScope.nameOfUser = session.getUser().name;
				}
					$state.go('app.home');
				
			}).catch(function (response) {
				$scope.showError("Unable to log in.Please try again");
			});
		};

		$scope.gotoSignUpPage = function () {
			$state.go('signup');
		};


	}]);