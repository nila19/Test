/**** ./login/login.component.js ****/

(function(angular) {
	'use strict';

	angular.module('login').component('login', {
		templateUrl: 'login/login.htm',
		controller: LoginController
	});

	LoginController.$inject = ['loginService','ajaxService','CONSTANTS','$location','$timeout'];
	function LoginController(ls, as, CONSTANTS, $location, $timeout) {
		var vm = this;
		vm.currency = 'INR';
		vm.CURRENCY_CODES = CONSTANTS.CURRENCY_CODES;
		vm.value = value;
		vm.submitLogin = submitLogin;
		toastr.info('Are you the 6 fingered man?', 'Hi...');

		///////////////////////
		function value() {
			return ls.convert(vm.login) + ls.convert(vm.password) + ls.convert(vm.email);
		}

		function submitLogin(frm) {
			if (!frm.$valid) {
				toastr.warning('Too smart, you!!!');
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
			toastr.info('Fingers crossed!!!');
			var data = angular.toJson(vm);
			as.getURL('Login').save(vm, loginOK, loginError);
		}

		function loginOK(data) {
			toastr.remove();
			if (data.code === 0) {
				toastr.success(data.message, 'Hurray, you got through!!!!!');
				$timeout(function() {
					$location.path('/loggedin/' + vm.login);
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
