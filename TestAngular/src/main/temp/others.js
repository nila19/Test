/**** ./app.jquery.js ****/

var LOGIN = {
	hideAll: function() {
		$('div.sectionDecision').hide();
		//$("span.msgError").html("");
	},
	show: function(p) {
		this.hideAll();
		p.show();
	},
};

function loadLogin() {
	LOGIN.show($('div#loginPanel'));

	$('a#lFgt').click(function() {
		LOGIN.show($('div#fgtPanel'));
	});
	$('a#lLogin, a#lPrev').click(function() {
		LOGIN.show($('div#loginPanel'));
	});
	$('a#lNext').click(function() {
		LOGIN.show($('div#loginPanel2'));
	});
}

/**** ./app.route.js ****/

(function(angular) {
	'use strict';

	angular.module('app').config(appRoute);

	appRoute.$inject = ['$locationProvider', '$routeProvider'];
	function appRoute($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('!');

		$routeProvider.
			when('/login', {
				template: '<login></login>'
			}).
			when('/loggedin/:id', {
				template: '<loggedin></loggedin>'
			}).
			when('/forget', {
				template: '<forget></forget>'
			}).
			otherwise('/login');
	}
})(window.angular);

/**** ./forget/forget.component.js ****/

(function(angular) {
	'use strict';

	angular.module('forget').component('forget', {
		templateUrl: 'forget/forget.htm',
		controller: ForgetController
	});

	ForgetController.$inject = ['ajaxService','CONSTANTS'];
	function ForgetController(as, CONSTANTS) {
		var vm = this;
		vm.msg1m = 'Did you really forget ??';
		vm.submitForget = submitForget;

		///////////////////////
		function submitForget(frm) {
			if (!frm.$valid) {
				return;
			}

			var data = angular.toJson(vm);
			as.getURL('Forget').save(vm, afterFgt);
		}

		function afterFgt(data) {
			vm.msg1m = data.message;
			if (data.code === 0) {
				vm.msg1m = vm.msg1m + ' :: WOW!!!';
			}
		}
	}
})(window.angular);

/**** ./core/ajax.service.js ****/

(function(angular) {
	'use strict';

	angular.module('services').factory('ajaxService', ajaxService);

	ajaxService.$inject = ['CONSTANTS', '$resource'];
	function ajaxService(CONSTANTS, $resource) {
		return {
			getURL: getURL
		};
		///////////////////////
		function getURL(func) {
			var url = CONSTANTS.BASE_URL + CONSTANTS.URLs[func];
			// return $http.post(url,obj);
			return $resource(url);
		}
	}

})(window.angular);

/**** ./core/constants.js ****/

(function(angular) {
	'use strict';

	angular.module('core').constant('CONSTANTS', {
		ALPHA_MAP: {a: 1, b: 2, c: 3, d: 4, e: 1, f: 2, g: 3, h: 4, i: 1, j: 2, k: 3, l: 4, m: 1,
			n: 2, o: 3, p: 4, q: 1, r: 2, s: 3, t: 4, u: 1, v: 2, w: 3, x: 4, y: 1, z: 2},
		CURRENCY_MAP: {USD: 'USD $', INR: 'INR Rs', GBP: 'GBP Lb', EUR: 'EUR Eu'},
		CURRENCY_CODES: ['USD', 'INR', 'GBP', 'EUR'],
		UIDS: ['Bala', 'Senthan', 'Jill', 'Jackie'],
		INTEGER_REGEXP: /^\d+$/,
		BASE_URL: './servlet',
		URLs: {Login: '/access/in', Forget: '/access/fgt'}
	});

})(window.angular);

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
			if (input !== '' && !isNaN(input)) {
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

/**** ./loggedin/loggedin.component.js ****/

(function(angular) {
	'use strict';

	angular.module('loggedin').component('loggedin', {
		templateUrl: 'loggedin/loggedin.htm',
		controller: LoggedInController
	});

	LoggedInController.$inject = ['ajaxService','CONSTANTS','$routeParams'];
	function LoggedInController(as, CONSTANTS, $routeParams) {
		var vm = this;
		vm.id = $routeParams.id;
		vm.msg1m = 'Hurray you ( ' + vm.id + ' ) are in secure zone!!!';
	}
})(window.angular);

/**** ./login/login.component.js ****/

(function(angular) {
	'use strict';

	angular.module('login').component('login', {
		templateUrl: 'login/login.htm',
		controller: LoginController
	});

	LoginController.$inject = ['loginService','ajaxService','CONSTANTS','$location'];
	function LoginController(ls, as, CONSTANTS, $location) {
		var vm = this;
		vm.currency = 'INR';
		vm.CURRENCY_CODES = CONSTANTS.CURRENCY_CODES;
		vm.msg1m = 'Hi...';
		vm.value = value;
		vm.submitLogin = submitLogin;

		///////////////////////
		function value() {
			return ls.convert(vm.login) + ls.convert(vm.password) + ls.convert(vm.email);
		}

		function submitLogin(frm) {
			if (!frm.$valid) {
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
			var data = angular.toJson(vm);
			as.getURL('Login').save(vm, afterLogin);
		}

		function afterLogin(data) {
			vm.msg1m = data.message;
			if (data.code === 0) {
				vm.msg1m = vm.msg1m + ' :: WOW!!!';
				$location.path('/loggedin/' + vm.login);
			}
		}
	}
})(window.angular);

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

/**** ./core/directives/xx-integer.directive.js ****/

(function(angular) {
	'use strict';

	angular.module('directives').directive('xxInteger', xxInteger);

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

})(window.angular);

/**** ./core/directives/xx-unique.directive.js ****/

(function(angular) {
	'use strict';

	angular.module('directives').directive('xxUnique', xxUnique);

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
				var url = CONSTANTS.BASE_URL + '/access/checkName';
				var data = {'login': mv, 'email': 'xyz', 'password': '123'};
				return $http.post(url, data).then(function(response) {
					if (response.data.code === 0) {
						return $q.resolve();
					} else {
						return $q.reject();
					}
				});
			};
		}
	}

})(window.angular);

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
