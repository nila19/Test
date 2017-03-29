/** ** ./loggedin/loggedin.component.js ****/

(function (angular) {
  'use strict';

  const LoggedInController = function ($routeParams) {
    const vm = this;

    vm.id = $routeParams.id;
    vm.msg1m = 'Hurray you ( ' + vm.id + ' ) are in secure zone!!!';
  };

  angular.module('loggedin').component('loggedin', {
    templateUrl: 'loggedin/loggedin.htm',
    controller: LoggedInController,
  });
  LoggedInController.$inject = ['$routeParams'];
})(window.angular);
