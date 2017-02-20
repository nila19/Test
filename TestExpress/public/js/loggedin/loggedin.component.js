/** ** ./loggedin/loggedin.component.js ****/

(function(angular) {
  'use strict';

  angular
    .module('loggedin')
    .component('loggedin', {
      templateUrl: 'loggedin/loggedin.htm',
      controller: LoggedInController,
    });

  LoggedInController.$inject = ['ajaxService', 'CONSTANTS', '$routeParams'];
  function LoggedInController(as, CONSTANTS, $routeParams) {
    let vm = this;
    vm.id = $routeParams.id;
    vm.msg1m = 'Hurray you ( ' + vm.id + ' ) are in secure zone!!!';
  }
})(window.angular);
