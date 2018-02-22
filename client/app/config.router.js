'use strict';
/*global angular,noty*/

angular.module('hiApp')
	.run(['$rootScope', '$state', 'session', function ($rootScope, $state, session) {

		// $rootScope.$state = $state;

		$rootScope.$on('$stateChangeStart', function (event, toState) {
			if(toState.name === 'signup'){
				return;
			}
			else if(toState.name === 'login'){
				return;
			}

			else if (!session.getAccessToken() || session.getAccessToken() === 'null') {

				$state.go('login');
				event.preventDefault();
				
			}else{
				return;
			}

		});



	}])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

	$urlRouterProvider.otherwise('/');
	$httpProvider.interceptors.push('APIInterceptor');

	$stateProvider
		.state('app', {
			abstract: true,
			templateUrl: 'components/common/layout.html'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'components/login/login.html',
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'components/signup/signup.html',
		})
		.state('app.home', {
			url: '/',
			templateUrl: 'components/home/home.html',
		});

}])

;