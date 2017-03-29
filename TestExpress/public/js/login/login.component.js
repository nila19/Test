/** ** ./login/login.component.js ****/
/* eslint no-console: 'off'*/

(function (angular, toastr) {
  'use strict';

  const LoginController = function (ls, as, CONSTANTS, $location, $timeout) {
    const WAIT = 200;
    const vm = this;
    const value = function () {
      return ls.convert(vm.login) + ls.convert(vm.password) + ls.convert(vm.email);
    };
    const loginOK = function (data) {
      toastr.remove();
      if (data.code === 0) {
        toastr.success(data.message, 'Hurray, you got through!!!!!');
        $timeout(function () {
          $location.path('/loggedin/' + vm.uid);
        }, WAIT);
      } else {
        toastr.error(data.message, 'Something has gone horribly wrong man!!!');
      }
    };
    const loginError = function (resp) {
      toastr.remove();
      toastr.error(resp.status + ' :: ' + resp.statusText, 'Horribly wrong man!!!');
    };
    const submitLogin = function (frm) {
      if (!frm.$valid) {
        toastr.warning('Too smart, you!!!');
        return;
      }
      toastr.info('Fingers crossed!!!');
      const data = angular.toJson(vm);

      console.log(data);
      as.getURL('Login').save(vm, loginOK, loginError);
    };

    vm.currency = 'INR';
    vm.age = 5;
    vm.CURRENCY_CODES = CONSTANTS.CURRENCY_CODES;
    vm.value = value;
    vm.submitLogin = submitLogin;
    toastr.info('Are you the 6 fingered man?', 'Hi...');
  };

  angular.module('login').component('login', {
    templateUrl: 'login/login.htm',
    controller: LoginController,
  });
  LoginController.$inject = ['loginService', 'ajaxService', 'CONSTANTS', '$location', '$timeout'];
})(window.angular, window.toastr);
