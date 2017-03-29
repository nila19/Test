/** ** ./core/directives/xx-unique.directive.js ****/

(function (angular) {
  'use strict';

  const xxUnique = function ($q, $timeout, $http, CONSTANTS) {
    const unique = function (scope, elm, attrs, ctrl) {
      ctrl.$asyncValidators.xxUnique = function (mv) {
        if (ctrl.$isEmpty(mv)) {
          return $q.resolve();
        }
        const url = CONSTANTS.BASE_URL + '/access/checkName';
        const data = {login: mv, email: 'xyz', password: '123'};

        return $http.post(url, data).then(function (response) {
          if (response.data.code === 0) {
            return $q.resolve();
          } else {
            return $q.reject();
          }
        });
      };
    };

    return {require: 'ngModel', link: unique};
  };

  angular.module('directives').directive('xxUnique', xxUnique);
  xxUnique.$inject = ['$q', '$timeout', '$http', 'CONSTANTS'];
})(window.angular);
