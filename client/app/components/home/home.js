'use strict';
/*jshint node:true, quotmark:false*/
/*global angular,alert,_,moment*/
angular.module('hiApp')
	.controller('homeController', ['$scope', '$http', 'baseUrl', '$rootScope', '$state', 'session', function ($scope, $http, baseUrl, $rootScope, $state, session) {

		$scope.user = session.getUser().name;

		function getUsers(){

			$http.get(baseUrl + "/users").then(function (response) {
				
				console.log(response.data);
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