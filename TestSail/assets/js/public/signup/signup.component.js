/**** ./login/login.component.js ****/

(function(angular) {
  'use strict';

  angular.module('signup').controller('SignupController', SignupController);

  function SignupController() {
    var vm = this;
    vm.currency = 'INR';
    vm.firstName = 'Jimmy';
    vm.lastName = 'Carter';
    vm.password = 'secret';

    function submitLogin(frm) {}
  }
})(window.angular);
