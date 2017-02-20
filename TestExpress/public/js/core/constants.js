/** ** ./core/constants.js ****/

(function(angular) {
  'use strict';

  angular
    .module('core')
    .constant('CONSTANTS', {
      ALPHA_MAP: {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 1,
        f: 2,
        g: 3,
        h: 4,
        i: 1,
        j: 2,
        k: 3,
        l: 4,
        m: 1,
        n: 2,
        o: 3,
        p: 4,
        q: 1,
        r: 2,
        s: 3,
        t: 4,
        u: 1,
        v: 2,
        w: 3,
        x: 4,
        y: 1,
        z: 2,
      },
      CURRENCY_MAP: {
        USD: 'USD $',
        INR: 'INR Rs',
        GBP: 'GBP Lb',
        EUR: 'EUR Eu',
      },
      CURRENCY_CODES: [
        'USD', 'INR', 'GBP', 'EUR',
      ],
      UIDS: [
        'Bala', 'Senthan', 'Jill', 'Jackie',
      ],
      INTEGER_REGEXP: /^\d+$/,
      BASE_URL: 'http://localhost:8080/TestWebServices/servlet',
      // BASE_URL: './servlet',
      URLs: {
        Login: '/access/in',
        Forget: '/access/fgt',
      },
    });
})(window.angular);
