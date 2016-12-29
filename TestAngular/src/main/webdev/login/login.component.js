/**** ./login/login.component.js ****/

(function(angular) {
	'use strict';

	angular.module('login').component('login', {
		templateUrl: 'login/login.htm',
		controller: LoginController
	});

	LoginController.$inject = ['loginService','ajaxService','CONSTANTS','$location'];
	function LoginController(ls, as, CONSTANTS, $location) {
		var vm = this;
		vm.currency = 'INR';
		vm.CURRENCY_CODES = CONSTANTS.CURRENCY_CODES;
		vm.msg1m = 'Hi...';
		vm.value = value;
		vm.submitLogin = submitLogin;

		///////////////////////
		function value() {
			return ls.convert(vm.login) + ls.convert(vm.password) + ls.convert(vm.email);
		}

		function submitLogin(frm) {
			if (!frm.$valid) {
				return;
			}

			/*
			var data = $("form[name='fL']").jsonify();
			var req = as.submitLogin(vm);
			req.then(function(response) {
				vm.msg1m = response.data.message;
				if(response.data.code == 0){
					vm.msg1m = vm.msg1m + ' :: WOW!!!';
				};
			});
			*/
			var data = angular.toJson(vm);
			as.getURL('Login').save(vm, afterLogin);
		}

		function afterLogin(data) {
			vm.msg1m = data.message;
			if (data.code === 0) {
				vm.msg1m = vm.msg1m + ' :: WOW!!!';
				$location.path('/loggedin/' + vm.login);
			}
		}
	}
})(window.angular);
