/**
 * Main js
 *
 */
var sudoApp = angular.module('sudoApp', ['ui.router','toastr','ui.bootstrap','720kb.datepicker']);
sudoApp.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('signin', {
	         url: '/',
	         templateUrl:'pages/signin.html',
	         controller: 'loginCtrl'
	       })
		   .state('profile', {
	          url: '/profile?param?id',
	         templateUrl:'pages/profile.html',
	         controller: 'profileCtrl'
	       })

});
