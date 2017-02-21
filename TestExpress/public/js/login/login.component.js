/** ** ./login/login.component.js ****/

(function(angular) {
  'use strict';

  angular.module('login').component('login', {
    templateUrl: 'login/login.htm',
    controller: LoginController,
  });

  LoginController.$inject = ['loginService', 'ajaxService', 'CONSTANTS', '$location', '$timeout'];
  function LoginController(ls, as, CONSTANTS, $location, $timeout) {
    let vm = this;
    vm.currency = 'INR';
    vm.age = 25;
    vm.CURRENCY_CODES = CONSTANTS.CURRENCY_CODES;
    vm.value = value;
    vm.submitLogin = submitLogin;
    toastr.info('Are you the 6 fingered man?', 'Hi...');

    // /////////////////////
    function value() {
      return ls.convert(vm.login) + ls.convert(vm.password) + ls.convert(vm.email);
    }

    function submitLogin(frm) {
      if (!frm.$valid) {
        toastr.warning('Too smart, you!!!');
        return;
      }
      toastr.info('Fingers crossed!!!');
      let data = angular.toJson(vm);
      console.log(data);
      as.getURL('Login').save(vm, loginOK, loginError);
    }

    function loginOK(data) {
      toastr.remove();
      if (data.code === 0) {
        toastr.success(data.message, 'Hurray, you got through!!!!!');
        $timeout(function() {
          $location.path('/loggedin/' + vm.uid);
        }, 1000);
      } else {
        toastr.error(data.message, 'Something has gone horribly wrong man!!!');
      }
    }
    function loginError(resp) {
      toastr.remove();
      toastr.error(resp.status + ' :: ' + resp.statusText, 'Horribly wrong man!!!');
    }
  }
})(window.angular);
