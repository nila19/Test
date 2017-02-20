/** ** ./core/ajax.service.js ****/

(function(angular) {
  'use strict';

  angular
    .module('services')
    .factory('ajaxService', ajaxService);

  ajaxService.$inject = ['CONSTANTS', '$resource'];
  function ajaxService(CONSTANTS, $resource) {
    return {getURL: getURL};
    // /////////////////////
    function getURL(func) {
      let url = CONSTANTS.BASE_URL + CONSTANTS.URLs[func];
      // return $http.post(url,obj);
      return $resource(url);
    }
  }
})(window.angular);
