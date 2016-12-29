(function(angular) {
	'use strict';

	angular.module('app').config(appRoute);

	appRoute.$inject = ['$locationProvider', '$routeProvider'];
	function appRoute($locationProvider, $routeProvider){
		$locationProvider.hashPrefix('!');

		$routeProvider.
			when('/phones', {
				template: '<phone-list></phone-list>'
			}).
			when('/phones/:phoneId', {
				template: '<phone-detail></phone-detail>'
			}).
			otherwise('/phones');
	}
})(window.angular);
