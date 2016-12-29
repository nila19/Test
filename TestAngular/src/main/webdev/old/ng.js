(function(angular) {
	'use strict';
	//Service.
	var login_services = angular.module('login.services',['ngResource']);
	login_services.constant('CONSTANTS', {
		ALPHA_MAP : {a:1,b:2,c:3,d:4,e:1,f:2,g:3,h:4,i:1,j:2,k:3,l:4,m:1,n:2,o:3,p:4,q:1,r:2,s:3,t:4,u:1,v:2,w:3,x:4,y:1,z:2},
		CURRENCY_MAP : {USD: "USD $", INR: "INR Rs", GBP: "GBP Lb", EUR: "EUR Eu"},
		CURRENCY_CODES : ["USD", "INR", "GBP", "EUR"],
		UIDS : ['Bala', 'Senthan', 'Jill', 'Jackie'],
		INTEGER_REGEXP : /^\d+$/,
		URL: "./servlet"
	});

	login_services.factory('loginService', loginService);
	loginService.$inject = ['CONSTANTS'];
	function loginService(CONSTANTS) {
		return {
			convert: convert
		};
		///////////////////////
		function convert (a) {
			var total = 0;
			for(var i=0; a && i<a.length; i++) {
				CONSTANTS.ALPHA_MAP[a[i]] ? total += CONSTANTS.ALPHA_MAP[a[i]] : 0;
			}
			return total;
		};
	}

	login_services.factory('ajaxService', ajaxService);
	ajaxService.$inject = ['CONSTANTS', '$resource'];
	function ajaxService(CONSTANTS, $resource) {
		return {
			submitLogin: submitLogin
		};
		///////////////////////
		function submitLogin() {
			var url = CONSTANTS.URL + '/access/in';
//			return $http.post(url,obj);
			return $resource(url);
		};
	}

	//Filter.
	var login_filters = angular.module('login.filters',[]);

	login_filters.filter('money', money);
	money.$inject = ['CONSTANTS'];
	function money(CONSTANTS) {
		return money;
		///////////////////////
		function money(input, c) {
			var out = '0';
			if(input != '' && !isNaN(input)) {
				out = input * 100;
			}
			var currency = CONSTANTS.CURRENCY_MAP[c] ? CONSTANTS.CURRENCY_MAP[c] : CONSTANTS.CURRENCY_MAP['INR'];
			out = currency + ' ' + out;
			return out;
		};
	}

	//Validator
	var login_diretives = angular.module('login.directives',[]);

	login_diretives.directive('xxInteger', xxInteger);
	xxInteger.$inject = ['CONSTANTS'];
	function xxInteger(CONSTANTS) {
		return {
			require: 'ngModel',
			link: integer 
		};
		///////////////////////
		function integer(scope, elm, attrs, ctrl) {
			ctrl.$validators.xxInteger = function(mv, vv) {
				if (ctrl.$isEmpty(mv) || CONSTANTS.INTEGER_REGEXP.test(vv)) {
					return true;
				}
				return false;
			};
		}
	}

	login_diretives.directive('xxUnique', xxUnique);
	xxUnique.$inject = ['$q','$timeout','$http','CONSTANTS'];
	function xxUnique($q, $timeout, $http, CONSTANTS) {
		return {
			require: 'ngModel',
			link: unique
		};
		///////////////////////
		function unique(scope, elm, attrs, ctrl) {
			ctrl.$asyncValidators.xxUnique = function(mv, vv) {
				if (ctrl.$isEmpty(mv)) {
					return $q.resolve();
				}
				var url = CONSTANTS.URL + '/access/checkName';
				var data = {'login':mv,'email':'xyz','password':'123'};
				return $http.post(url,data).then( function(response) {
					if(response.data.code == 0) {
						return $q.resolve();
					} else {
						return $q.reject();
					};
				});
			};
		}
	}

	login_diretives.directive('xxUnique2', xxUnique2);
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

	//Controller.
	var loginApp = angular.module('login.app',['ngAnimate','login.services','login.filters','login.directives']);
	loginApp.config(['$compileProvider', function ($compileProvider) {
		$compileProvider.debugInfoEnabled(false);
		$compileProvider.commentDirectivesEnabled(false);
		$compileProvider.cssClassDirectivesEnabled(false);
	}]);

	loginApp.controller('LoginController',LoginController);
	LoginController.$inject = ['loginService','ajaxService','CONSTANTS'];
	function LoginController(ls, as, CONSTANTS) {
		var vm = this;
		vm.currency = 'INR';
		vm.CURRENCY_CODES = CONSTANTS.CURRENCY_CODES;
		vm.msg1m = 'Hi...';
		vm.value = value;
		vm.submitLogin = submitLogin;

		///////////////////////
		function value() {
			return ls.convert(this.login) + ls.convert(this.password) + ls.convert(this.email);
		}
		function submitLogin(frm) {
			if (!frm.$valid) return;

			var data = angular.toJson(vm);
//			var data = $("form[name='fL']").jsonify();
//			var req = as.submitLogin(vm);
//			req.then(function(response) {
//				vm.msg1m = response.data.message;
//				if(response.data.code == 0){
//					vm.msg1m = vm.msg1m + ' :: WOW!!!';
//				};
//			});
			as.submitLogin().save(vm, afterUpd);
		}
		function afterUpd(data) {
			vm.msg1m = data.message;
			if(data.code == 0) {
				vm.msg1m = vm.msg1m + ' :: WOW!!!';
			};
		}
	}

})(window.angular);

//JQuery
function loadLogin() {
	LOGIN.show($("div#loginPanel"));
	
	$("a#lFgt").click(function() {
		LOGIN.show($("div#fgtPanel"));
	});
	$("a#lLogin, a#lPrev").click(function() {
		LOGIN.show($("div#loginPanel"));
	});
	$("a#lNext").click(function() {
		LOGIN.show($("div#loginPanel2"));
	});
}

var LOGIN = {
	hideAll: function() {
		$("div.sectionDecision").hide();
		//$("span.msgError").html("");
	},
	show: function(p) {
		this.hideAll();
		p.show();
	},
};
