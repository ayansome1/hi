'use strict';
/*jshint node:true, quotmark:false*/
/*global angular,alert,_,moment*/
angular.module('hiApp')
	.controller('homeController', ['$scope', '$http', 'baseUrl', '$rootScope', '$state', 'session', function ($scope, $http, baseUrl, $rootScope, $state, session) {

		$scope.user = session.getUser().name;

		let  getUsers = () => {

			$http.get(baseUrl + "/users").then(function (response) {
				
				$scope.users=response.data;
			})
			.catch(function () {
				$scope.showError("Unable to fetch other users");
			 });

		};

		getUsers();

		$scope.sayHi = () => {

				$http.post(baseUrl + "/new-hi", {
					sendTo: $scope.recipient
				}).then(function () {
					$scope.showSuccess("Successfully sent Hi");
				}).catch(function () {
					$scope.showError("Unable to send Hi");
				});

		};

		let getAllHi = () => {

			$http.get(baseUrl + "/all-hi").then(function (response) {
				
				$scope.messages = response.data;
			})
			.catch(function () {
				$scope.showError("Unable to fetch all received Hi");
			 });

		};

		getAllHi();

}]);