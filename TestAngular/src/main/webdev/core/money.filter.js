/**** ./core/money.filter.js ****/

(function(angular) {
	'use strict';

	angular.module('filters').filter('money', money);

	money.$inject = ['CONSTANTS'];
	function money(CONSTANTS) {
		return money;
		///////////////////////
		function money(input, c) {
			var out = '0';
			if (input !== '' && !Number.isNaN(input)) {
				out = input * 100;
			}
			var currency = CONSTANTS.CURRENCY_MAP.INR;
			if (CONSTANTS.CURRENCY_MAP[c]) {
				currency = CONSTANTS.CURRENCY_MAP[c];
			}
			return currency + ' ' + out;
		}
	}

})(window.angular);
