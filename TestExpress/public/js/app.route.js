/** ** ./app.route.js ****/

(function (angular) {
  'use strict';
  const appRoute = function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/login', {template: '<login></login>'})
      .when('/loggedin/:id', {template: '<loggedin></loggedin>'})
      .when('/forget', {template: '<forget></forget>'})
      .when('/chart', {template: '<chart></chart>'})
      .when('/ngchart', {template: '<ngchart></ngchart>'})
      .otherwise('/login');
  };

  angular.module('app').config(appRoute);
  appRoute.$inject = ['$locationProvider', '$routeProvider'];
})(window.angular);
