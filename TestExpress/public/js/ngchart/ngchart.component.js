/* eslint no-magic-numbers: 'off',  no-invalid-this: 'off'*/

(function (angular) {
  'use strict';
  const ngChartController = function ($scope) {
    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];

    // $scope.data = [[{x: -10, y: -5}, {x: 0, y: 10}, {x: 10, y: 5}]];
    // $scope.options = {scales: {xAxes: [{type: 'linear', position: 'bottom'}]}};
  };

  angular.module('ngchart').component('ngchart', {
    templateUrl: 'ngchart/ngchart.htm',
    controller: ngChartController,
  });
  ngChartController.$inject = ['$scope'];
})(window.angular);
