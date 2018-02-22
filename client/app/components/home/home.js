'use strict';
/*jshint node:true, quotmark:false*/
/*global angular,alert,_,moment*/
angular.module('hiApp')
	.controller('homeController', ['$scope', '$http', 'baseUrl', '$rootScope', '$state', 'session', function ($scope, $http, baseUrl, $rootScope, $state, session) {

		$scope.user = session.getUser().name;

		
		// $scope.closePatientModal = function () {
		// 	patientModal.close();
		// };

		// $scope.addOrEditPatient = function () {

		// 	let patientDetails = angular.copy($scope.newPatient);
		// 	patientDetails.dob = moment(patientDetails.dob).format('YYYY-MM-DD');
		// 	$scope.savingPatient = true;

		// 	if ($scope.newOrEdit === 'NEW') {

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

		// 	} else {

		// 		patientDetails.patientId = $scope.selectedPatient.patientId;

		// 		$http.post(baseUrl + "/patient/edit", {
		// 			data: patientDetails
		// 		}).then(function () {
		// 			$scope.showSuccess("Successfully updated patient details");
		// 			patientModal.close();
		// 			getAllPatients(true);
		// 		}).catch(function () {
		// 			$scope.showError("Unable to add new patient");
		// 		}).finally(function () {
		// 			$scope.savingPatient = false;
		// 		});

		// 	}

		// };


		// function getAllPatients(keepSelectedPatientHighlighted) {

		// 	$http.get(baseUrl + "/patient/all").then(function (response) {
		// 		let patients = response.data.patients;
		// 		let reports = response.data.reports;
		// 		reports = _.groupBy(reports, function (item) {
		// 			return item.patientid;
		// 		});
		// 		console.log(reports);
		// 		_.each(patients, function (item, key) {
		// 			patients[key].reports = reports[item.patientId];
		// 		});

		// 		$scope.patients = patients.reverse();

		// 		console.log($scope.patients);
		// 		if (keepSelectedPatientHighlighted) {
		// 			_.each($scope.patients, function (item) {
		// 				if (item.patientId === $scope.selectedPatient.patientId) {
		// 					$scope.selectedPatient = item;
		// 				}
		// 			});
		// 		} else {
		// 			$scope.selectedPatient = $scope.patients[0];

		// 		}
		// 	}).catch(function () {
		// 		$scope.showError("Unable to fetch all patient details");
		// 	});

		// }

		// getAllPatients();
		// $scope.highlightPatient = function (patient) {
		// 	$scope.selectedPatient = patient;
		// 	resetInputtedEcgDetails();

		// };





	}]);