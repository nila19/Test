/* eslint no-console: "off", no-magic-numbers: "off" */

const monk = require('monk');
const moment = require('moment');

const test = require('./TestModel')();

const url = 'localhost:27017/test';
let db = null;

const dbReq = function () {
  test.findAll(db).then((docs) => {
    console.log('************** TEST **************...');
    console.log(JSON.stringify(docs));
    console.log('************** DONE TEST **************...');
  });

  const thisMth = moment().date(1);
  const beginMth = thisMth.clone().subtract(3, 'months');
  const endMth = thisMth.clone().subtract(1, 'months');

  test.insert(db, {
    thisMth: thisMth.valueOf(),
    beginMth: beginMth.valueOf(),
    endMth: endMth.valueOf()
  }).then((docs) => {
    console.log('************** USERS **************...');
    console.log(JSON.stringify(docs));
    console.log('************** DONE USERS **************...');
  });
};

monk(url).then((db1) => {
  db = db1;
  console.log('Connected to database...');
  dbReq();
}).catch((err) => {
  console.log(err);
});
