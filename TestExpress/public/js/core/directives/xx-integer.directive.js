/** ** ./core/directives/xx-integer.directive.js ****/

(function (angular) {
  'use strict';

  const xxInteger = function (CONSTANTS) {
    const integer = function (scope, elm, attrs, ctrl) {
      ctrl.$validators.xxInteger = function (mv, vv) {
        if (ctrl.$isEmpty(mv) || CONSTANTS.INTEGER_REGEXP.test(vv)) {
          return true;
        }
        return false;
      };
    };

    return {require: 'ngModel', link: integer};
  };

  angular.module('directives').directive('xxInteger', xxInteger);
  xxInteger.$inject = ['CONSTANTS'];
})(window.angular);
