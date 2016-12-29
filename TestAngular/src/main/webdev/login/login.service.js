/**** ./login/login.service.js ****/

(function(angular) {
	'use strict';

	angular.module('login').factory('loginService', loginService);

	loginService.$inject = ['CONSTANTS'];
	function loginService(CONSTANTS) {
		return {
			convert: convert
		};
		///////////////////////
		function convert(a) {
			var total = 0;
			for (var i = 0; a && i < a.length; i++) {
				if (CONSTANTS.ALPHA_MAP[a[i]]) {
					total += CONSTANTS.ALPHA_MAP[a[i]];
				} else {
					total += 0;
				}
			}
			return total;
		}
	}

})(window.angular);
