
(function (angular) {
  'use strict';
  const appRoute = function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/ngchart', {template: '<ngchart></ngchart>'})
      .otherwise('/ngchart');
  };

  angular.module('app2').config(appRoute);
  appRoute.$inject = ['$locationProvider', '$routeProvider'];
})(window.angular);
