/** ** ./core/directives/xx-unique2.directive.js ****/

(function (angular) {
  'use strict';

  const xxUnique2 = function ($q, $timeout, CONSTANTS) {
    const unique2 = function (scope, elm, attrs, ctrl) {
      ctrl.$asyncValidators.xxUnique2 = function (mv) {
        if (ctrl.$isEmpty(mv)) {
          return $q.resolve();
        }
        // defer the response.
        const def = $q.defer();
        const WAIT = 2000;

        $timeout(function () {
          if (CONSTANTS.UIDS.indexOf(mv) === -1) {
            def.resolve();
          } else {
            def.reject();
          }
        }, WAIT);
        return def.promise;
      };
    };

    return {require: 'ngModel', link: unique2};
  };

  angular.module('directives').directive('xxUnique2', xxUnique2);
  xxUnique2.$inject = ['$q', '$timeout', 'CONSTANTS'];
})(window.angular);
