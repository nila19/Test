(function(angular) {
	'use strict';

	angular.module('phonedetail').component('phoneDetail', {
	    templateUrl : 'phonedetail/phonedetail.htm',
	    controller : PhoneDetailController
	});

	PhoneDetailController.$inject = ['PhoneService', '$http', '$routeParams'];
	function PhoneDetailController(ps, $http, $routeParams) {
		var vm = this;
		vm.setImage = setImage;
		vm.mainImg = '';

		////////////////////

		function setImage(img) {
			vm.mainImg = img;
		}

		vm.phone = ps.get({phoneId: $routeParams.phoneId}, onload);
		function onload(ph) {
			vm.setImage(ph.images[0]);
		}

//		$http.get('phones/'+$routeParams.phoneId+'.json')
//			.then(function (response) {
//				vm.phone = response.data;
//				vm.setImage(response.data.images[0]);
//			})
//			.catch(function (e) {
//				return $q.reject(e);
//			});
	}

})(window.angular);
