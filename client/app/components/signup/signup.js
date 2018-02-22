'use strict';
/*jshint node:true, quotmark:false*/
/*global angular,alert*/
angular.module('hiApp')
	.controller('signupController', ['$scope', '$http', 'baseUrl', '$rootScope', '$state', 'session', function ($scope, $http, baseUrl, $rootScope, $state, session) {



		$scope.signup = function () {
			$http.post(baseUrl + "/signup", $scope.user).then(function (response) {
				$scope.showSuccess("Sign up successful");
				session.setUser(response.data.user);
				session.setAccessToken(response.data.accessToken);

				if (session.getUser()) {
					$rootScope.nameOfUser = session.getUser().name;
				}

				$state.go('app.home');
			}).catch(function (response) {
				if (response.status === 409) {
					$scope.showError("Username already exists");
				} else {
					$scope.showError("Unable to sign up.Please try again");
				}


			});
		};


		$scope.gotoLoginPage = function () {
			$state.go('login');
		};

	}]);