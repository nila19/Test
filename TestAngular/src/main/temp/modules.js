/**** ./app.module.js ****/

(function(angular) {
	'use strict';

	angular.module('app', ['login','forget','filters','loggedin','ngRoute']);

	angular.module('app').config(['$compileProvider', function($compileProvider) {
		$compileProvider.debugInfoEnabled(false);
		$compileProvider.commentDirectivesEnabled(false);
		$compileProvider.cssClassDirectivesEnabled(false);
	}]);

})(window.angular);

/**** ./forget/forget.module.js ****/

(function(angular) {
	'use strict';

	angular.module('forget', ['core','services']);

})(window.angular);

/**** ./core/core.module.js ****/

(function(angular) {
	'use strict';

	angular.module('core', []);

})(window.angular);

/**** ./core/filters.module.js ****/

(function(angular) {
	'use strict';

	angular.module('filters', ['core']);

})(window.angular);

/**** ./core/services.module.js ****/

(function(angular) {
	'use strict';

	angular.module('services', ['core','ngResource']);

})(window.angular);

/**** ./loggedin/loggedin.module.js ****/

(function(angular) {
	'use strict';

	angular.module('loggedin', ['core','services','ngRoute']);

})(window.angular);

/**** ./login/login.module.js ****/

(function(angular) {
	'use strict';

	angular.module('login', ['core','services']);

})(window.angular);

/**** ./core/directives/directives.module.js ****/

(function(angular) {
	'use strict';

	angular.module('directives', ['core','services']);

})(window.angular);
