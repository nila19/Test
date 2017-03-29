/** ** ./forget/forget.component.js ****/
/* eslint no-console: 'off'*/

(function (angular) {
  'use strict';

  const ForgetController = function (as) {
    const vm = this;
    const submitForget = function (frm) {
      if (!frm.$valid) {
        return;
      }
      const data = angular.toJson(vm);

      console.log(data);
      as.getURL('Forget').save(vm, afterFgt);
    };
    const afterFgt = function (data) {
      vm.msg1m = data.message;
      if (data.code === 0) {
        vm.msg1m = vm.msg1m + ' :: WOW!!!';
      }
    };

    vm.msg1m = 'Did you really forget ??';
    vm.submitForget = submitForget;
  };

  angular.module('forget').component('forget', {
    templateUrl: 'forget/forget.htm',
    controller: ForgetController,
  });
  ForgetController.$inject = ['ajaxService'];
})(window.angular);
