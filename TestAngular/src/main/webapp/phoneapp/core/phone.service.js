(function(angular) {
	'use strict';

	angular.module('core.phone').factory('PhoneService', PhoneService);

	PhoneService.$inject = ['$resource'];
	function PhoneService($resource) {
		return $resource('data/:phoneId.json', {}, {
			query : {
				method : 'GET',
				params : {
					phoneId : 'phones'
				},
				isArray : true
			}
		});
	}
})(window.angular);