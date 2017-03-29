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
      .when('/chart2', {template: '<chart2></chart2>'})
      .otherwise('/login');
  };

  angular.module('app').config(appRoute);
  appRoute.$inject = ['$locationProvider', '$routeProvider'];
})(window.angular);
