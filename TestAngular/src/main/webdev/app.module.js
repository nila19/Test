/**** ./app.module.js ****/

(function(angular) {
	'use strict';

	angular.module('app', ['login','forget','filters','directives','loggedin','ngRoute']);

	angular.module('app').config(['$compileProvider', function($compileProvider) {
		$compileProvider.debugInfoEnabled(false);
		$compileProvider.commentDirectivesEnabled(false);
		$compileProvider.cssClassDirectivesEnabled(false);
	}]);

})(window.angular);

//TODO Remove this
//toastr.options = {
//	"closeButton": true,
//	"debug": false,
//	"newestOnTop": false,
//	"progressBar": false,
//	"positionClass": "toast-top-center",
//	"preventDuplicates": false,
//	"onclick": null,
//	"showDuration": "300",
//	"hideDuration": "1000",
//	"timeOut": "2000",
//	"extendedTimeOut": "1000",
//	"showEasing": "swing",
//	"hideEasing": "linear",
//	"showMethod": "fadeIn",
//	"hideMethod": "fadeOut"
//}