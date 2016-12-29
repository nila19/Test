/**** ./core/directives/xx-unique2.directive.js ****/

(function(angular) {
	'use strict';

	angular.module('directives').directive('xxUnique2', xxUnique2);

	xxUnique2.$inject = ['$q','$timeout','CONSTANTS'];
	function xxUnique2($q, $timeout, CONSTANTS) {
		return {
			require: 'ngModel',
			link: unique2
		};
		///////////////////////
		function unique2(scope, elm, attrs, ctrl) {
			ctrl.$asyncValidators.xxUnique2 = function(mv, vv) {
				if (ctrl.$isEmpty(mv)) {
					return $q.resolve();
				}
				//Defer the response.
				var def = $q.defer();
				$timeout(function() {
					if (CONSTANTS.UIDS.indexOf(mv) === -1) {
						def.resolve();
					} else {
						def.reject();
					}
				}, 2000); //Wait for 2 seconds.
				return def.promise;
			};
		}
	}

})(window.angular);
