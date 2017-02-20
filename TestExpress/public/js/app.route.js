/** ** ./app.route.js ****/

(function(angular) {
  'use strict';

  angular
    .module('app')
    .config(appRoute);

  appRoute.$inject = ['$locationProvider', '$routeProvider'];
  function appRoute($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/login', {template: '<login></login>'})
      .when('/loggedin/:id', {template: '<loggedin></loggedin>'})
      .when('/forget', {template: '<forget></forget>'})
      .otherwise('/login');
  }
})(window.angular);
