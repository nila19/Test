(function(angular) {
  'use strict';

  angular.module('dashboard').controller('DashboardController', DashboardController);

  function DashboardController() {
    var vm = this;
    vm.inDashboard = inDashboard;

    function inDashboard() {
      console.log('Yes, Im in Dashboard..');
    }

    function logout() {}
  }
})(window.angular);
