/** ** ./core/directives/xx-unique.directive.js ****/

(function(angular) {
  'use strict';

  angular
    .module('directives')
    .directive('xxUnique', xxUnique);

  xxUnique.$inject = ['$q', '$timeout', '$http', 'CONSTANTS'];
  function xxUnique($q, $timeout, $http, CONSTANTS) {
    return {require: 'ngModel', link: unique};
    // /////////////////////
    function unique(scope, elm, attrs, ctrl) {
      ctrl.$asyncValidators.xxUnique = function(mv, vv) {
        if (ctrl.$isEmpty(mv)) {
          return $q.resolve();
        }
        let url = CONSTANTS.BASE_URL + '/access/checkName';
        let data = {
          'login': mv,
          'email': 'xyz',
          'password': '123',
        };
        return $http
          .post(url, data)
          .then(function(response) {
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
