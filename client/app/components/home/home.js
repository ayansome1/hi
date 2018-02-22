'use strict';
/*jshint node:true, quotmark:false*/
/*global angular,alert,_,moment*/
angular.module('hiApp')
	.controller('homeController', ['$scope', '$http', 'baseUrl', '$rootScope', '$state', 'session', function ($scope, $http, baseUrl, $rootScope, $state, session) {

		$scope.user = session.getUser().name;

		let  getUsers = () => {

			$http.get(baseUrl + "/users").then(function (response) {
				
				console.log(response.data);
				$scope.users=response.data;
			})
			.catch(function () {
				$scope.showError("Unable to fetch other users");
			 });/*.finally(function () {
				$scope.savingPatient = false;
			 })*/
				// _.each(patients, function (item, key) {
				// 	patients[key].reports = reports[item.patientId];
				// });

		};

		getUsers();

		$scope.sayHi = () => {

				$http.post(baseUrl + "/new-hi", {
					sendTo: $scope.recipient
				}).then(function () {
					$scope.showSuccess("Successfully sent Hi");
					// getAllPatients();
				}).catch(function () {
					$scope.showError("Unable to send Hi");
				// }).finally(function () {
				// 	$scope.savingPatient = false;
				});

		};

		let getAllHi = () => {

			$http.get(baseUrl + "/all-hi").then(function (response) {
				
				console.log(response.data);
				$scope.messages = response.data;
				// $scope.users=response.data;
			})
			.catch(function () {
				$scope.showError("Unable to fetch all received Hi");
			 });

		};

		getAllHi();

		
		

		// 		$http.post(baseUrl + "/patient/new", {
		// 			data: patientDetails
		// 		}).then(function () {
		// 			$scope.showSuccess("Successfully added new patient");
		// 			patientModal.close();
		// 			getAllPatients();
		// 		}).catch(function () {
		// 			$scope.showError("Unable to add new patient");
		// 		}).finally(function () {
		// 			$scope.savingPatient = false;
		// 		});

	






	}]);