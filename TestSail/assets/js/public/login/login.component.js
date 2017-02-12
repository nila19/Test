(function(angular) {
  'use strict';

  angular.module('login').controller('LoginController', LoginController);
  LoginController.$inject = ['$http', '$location'];

  function LoginController($http, $location) {
    var vm = this;
    vm.email = 'jcarter@jc.com';
    vm.password = '';
    vm.loading = false;

    vm.inLogin = inLogin;
    vm.submitLogin = submitLogin;

    function inLogin() {
      console.log('Yes, Im in login..');
    }

    function submitLogin() {
      console.log('Logging in...');
      vm.loading = true;

      $http.put('/login', {
        email: vm.email,
        password: vm.password
      }).then(function ok() {
        console.log('Successfully logged in...');
        window.location = '/';
        //$location.path('../');
      }).catch(function e(res) {
        if (res.status === 400 || res.status === 404) {
          console.log('Somehow got a 400/404 in login...');
        } else {
          console.log('Unknown error in login...' + res.status);
        }
      }).finally(function x() {
        vm.loading = false;
      });
    }
  }
})(window.angular);
