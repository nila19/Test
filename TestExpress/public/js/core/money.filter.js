/** ** ./core/money.filter.js ****/

(function (angular) {
  'use strict';

  const money = function (CONSTANTS) {
    const money = function (input, c) {
      let out = '0';
      let currency = CONSTANTS.CURRENCY_MAP.INR;

      if (input !== '' && !Number.isNaN(input)) {
        out = Number(input);
      }
      if (CONSTANTS.CURRENCY_MAP[c]) {
        currency = CONSTANTS.CURRENCY_MAP[c];
      }
      return currency + ' ' + out;
    };

    return money;
  };

  angular.module('filters').filter('money', money);
  money.$inject = ['CONSTANTS'];
})(window.angular);
