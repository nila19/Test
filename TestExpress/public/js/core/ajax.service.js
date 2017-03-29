/** ** ./core/ajax.service.js ****/

(function (angular) {
  'use strict';

  const ajaxService = function (CONSTANTS, $resource) {
    const getURL = function (func) {
      const url = CONSTANTS.BASE_URL + CONSTANTS.URLs[func];
      // return $http.post(url,obj);

      return $resource(url);
    };

    return {getURL: getURL};
  };

  angular.module('services').factory('ajaxService', ajaxService);
  ajaxService.$inject = ['CONSTANTS', '$resource'];
})(window.angular);
