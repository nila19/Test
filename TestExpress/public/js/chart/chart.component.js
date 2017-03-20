
(function (angular) {
  'use strict';
  const ChartController = function (cs) {
    // const vm = this;

    cs.build();
  };

  angular.module('chart').component('chart', {
    templateUrl: 'chart/chart.htm',
    controller: ChartController,
  });
  ChartController.$inject = ['chartService'];
})(window.angular);
