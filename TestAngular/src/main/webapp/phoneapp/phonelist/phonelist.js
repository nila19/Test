(function(angular) {
	'use strict';

	angular.module('phonelist').component('phoneList', {
	    templateUrl : 'phonelist/phonelist.htm',
	    controller : PhoneListController
	});

	PhoneListController.$inject = ['PhoneService','$http'];
	function PhoneListController(ps, $http) {
		var vm = this;

		vm.orderProp = 'age';
		vm.phones = ps.query();

		////////////////////

//		$http.get('phones/phones.json').then(function (response) {
//			vm.phones = response.data;
//		});
	}

})(window.angular);
