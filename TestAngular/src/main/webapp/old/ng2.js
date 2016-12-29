(function(angular) {
	'use strict';
	//Service.
	var login_services = angular.module('login.services',[]);
	login_services.constant('CONSTANTS', {
		ALPHA_MAP : {a:1,b:2,c:3,d:4,e:1,f:2,g:3,h:4,i:1,j:2,k:3,l:4,m:1,n:2,o:3,p:4,q:1,r:2,s:3,t:4,u:1,v:2,w:3,x:4,y:1,z:2},
		CURRENCY_MAP : {USD: "USD $", INR: "INR Rs", GBP: "GBP Lb", EUR: "EUR Eu"},
		CURRENCY_CODES : ["USD", "INR", "GBP", "EUR"],
		UIDS : ['Bala', 'Senthan', 'Jill', 'Jackie'],
		INTEGER_REGEXP : /^\d+$/,
		URL: "./servlet"
	});
	login_services.factory('LoginService', ['CONSTANTS', function (CONSTANTS) {
		var convert = function (a) {
			var total = 0;
			for(var i=0; a && i<a.length; i++) {
				CONSTANTS.ALPHA_MAP[a[i]] ? total += CONSTANTS.ALPHA_MAP[a[i]] : 0;
			}
			return total;
		};

		return {
			convert: convert,
		};
	}]);

	login_services.factory('AjaxService', ['CONSTANTS', '$http', function (CONSTANTS, $http) {
		var submitLogin = function (obj) {
			var url = CONSTANTS.URL + '/access/in';
			return $http.post(url,obj);
		};
		return {
			submitLogin: submitLogin
		};
	}]);

	//Filter.
	var login_filters = angular.module('login.filters',[]);
	login_filters.filter('money', ['CONSTANTS', function (CONSTANTS) {
		return function(input, c) {
			var out = '0';
			if(input != '' && !isNaN(input)) {
				out = input * 100;
			}
			var currency = CONSTANTS.CURRENCY_MAP[c] ? CONSTANTS.CURRENCY_MAP[c] : CONSTANTS.CURRENCY_MAP['INR'];
			out = currency + ' ' + out;
			return out;
		};
	}]);

	//Validator
	var login_diretives = angular.module('login.directives',[]);
	login_diretives.directive('integer', ['CONSTANTS', function (CONSTANTS) {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				ctrl.$validators.integer = function(mv, vv) {
					if (ctrl.$isEmpty(mv) || CONSTANTS.INTEGER_REGEXP.test(vv)) {
						return true;
					}
					return false;
				};
			}
		};
	}]);
	login_diretives.directive('unique', ['$q','$timeout','$http','CONSTANTS', function ($q, $timeout, $http, CONSTANTS) {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				ctrl.$asyncValidators.unique = function(mv, vv) {
					if (ctrl.$isEmpty(mv)) {
						return $q.resolve();
					}
					var url = CONSTANTS.URL + '/access/checkName';
					var data = {'login':mv,'email':'xyz','password':'123'};
					return $http.post(url,data).then( function(response) {
						if(response.data.code == 0) {
							$q.resolve();
						} else {
							def.reject();
						};
					});
				};
			}
		};
	}]);
	login_diretives.directive('unique2', ['$q','$timeout','CONSTANTS', function ($q, $timeout, CONSTANTS) {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				ctrl.$asyncValidators.unique2 = function(mv, vv) {
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
		};
	}]);

	//Controller.
	var loginApp = angular.module('login.app',['ngAnimate','login.services','login.filters','login.directives']);
	loginApp.config(['$compileProvider', function ($compileProvider) {
		$compileProvider.debugInfoEnabled(false);
		$compileProvider.commentDirectivesEnabled(false);
		$compileProvider.cssClassDirectivesEnabled(false);
	}]);
	loginApp.controller('LoginController',['LoginService','AjaxService','CONSTANTS', function LoginController(ls, as, CONSTANTS) {
		this.login = '';
		this.password = '';
		this.email = '';
		this.age = 0;
		this.currency = 'INR';
		this.CURRENCY_CODES = CONSTANTS.CURRENCY_CODES;
		this.msg1m = 'Hi...';

		this.value = function value() {
			return ls.convert(this.login) + ls.convert(this.password) + ls.convert(this.email);
		}

		this.submitLogin = function (frm) {
			submitLogin2(frm, as, this);
		}
	}]);
	
})(window.angular);

function submitLogin2(frm, as, l) {
	if (!frm.$valid) return;

	var data = $("form[name='fL']").jsonify();
	var req = as.submitLogin(data);
	req.then(function(response) {
		l.msg1m = response.data.message;
		if(response.data.code == 0){
			l.msg1m = l.msg1m + ' :: WOW!!!';
		};
	});
}

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
