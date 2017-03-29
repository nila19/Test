/** ** ./app.module.js ****/

(function (angular) {
  'use strict';

  angular.module('app', ['login', 'forget', 'filters', 'directives', 'loggedin',
    'chart', 'chart2', 'ngRoute']);

  angular.module('app').config(['$compileProvider',
    function ($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
      $compileProvider.commentDirectivesEnabled(false);
      $compileProvider.cssClassDirectivesEnabled(true);
    },
  ]);
})(window.angular);
