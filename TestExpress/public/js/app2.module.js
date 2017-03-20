
(function (angular) {
  'use strict';

  angular.module('app2', ['ngchart', 'ngRoute']);

  angular.module('app2').config(['$compileProvider',
    function ($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
      $compileProvider.commentDirectivesEnabled(false);
      $compileProvider.cssClassDirectivesEnabled(true);
    },
  ]);
})(window.angular);
