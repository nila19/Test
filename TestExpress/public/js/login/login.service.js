/** ** ./login/login.service.js ****/

(function (angular) {
  'use strict';

  const loginService = function (CONSTANTS) {
    const convert = function (a) {
      let total = 0;

      for (let i = 0; a && i < a.length; i++) {
        if (CONSTANTS.ALPHA_MAP[a[i]]) {
          total += CONSTANTS.ALPHA_MAP[a[i]];
        } else {
          total += 0;
        }
      }
      return total;
    };

    return {convert: convert};
  };

  angular.module('login').factory('loginService', loginService);
  loginService.$inject = ['CONSTANTS'];
})(window.angular);
