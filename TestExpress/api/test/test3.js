/* eslint no-console: "off", no-magic-numbers: "off" */

const moment = require('moment');
const number = require('numeral');

const thisMth = moment().date(1);
const beginMth = thisMth.clone().subtract(3, 'months');
const endMth = thisMth.clone().subtract(1, 'months');

console.log(thisMth.format('YYYYMMDD'));
console.log(beginMth.valueOf());
console.log(endMth.toDate());

console.log('Second.....');
const ab = moment(1471626745000);

console.log(ab.format('YYYY-MM-DD HH:mm:ss'));
console.log(ab.valueOf());

console.log('Next.....');
const cd = moment().year(2016).month(7).date(19).hour(12).minute(12).second(25).milliseconds(0);

console.log(cd.format('YYYY-MM-DD HH:mm:ss'));
console.log(cd.valueOf());

console.log('Next 3.....');
const ef = moment().year(2016).month(0).date(0);

console.log(ef.format('YYYY-MM-DD HH:mm:ss'));
console.log(ef.valueOf());

console.log('Next 444.....');

const abc = moment(1471626745000);

console.log(abc.format('YYYYMM'));
console.log(number(abc.format('YYYYMM')).value());
// console.log( thisMth > beginMth);
// console.log( endMth > thisMth);
// console.log( thisMth > endMth);
