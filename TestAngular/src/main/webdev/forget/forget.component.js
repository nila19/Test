/**** ./forget/forget.component.js ****/

(function(angular) {
	'use strict';

	angular.module('forget').component('forget', {
		templateUrl: 'forget/forget.htm',
		controller: ForgetController
	});

	ForgetController.$inject = ['ajaxService','CONSTANTS'];
	function ForgetController(as, CONSTANTS) {
		var vm = this;
		vm.msg1m = 'Did you really forget ??';
		vm.submitForget = submitForget;

		///////////////////////
		function submitForget(frm) {
			if (!frm.$valid) {
				return;
			}

			var data = angular.toJson(vm);
			as.getURL('Forget').save(vm, afterFgt);
		}

		function afterFgt(data) {
			vm.msg1m = data.message;
			if (data.code === 0) {
				vm.msg1m = vm.msg1m + ' :: WOW!!!';
			}
		}
	}
})(window.angular);
