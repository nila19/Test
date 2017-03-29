/* eslint no-magic-numbers: "off", no-unused-vars: "off", no-console: "off" */

const mongo = require('../config/mongodb-config');
const accounts = require('../models/Accounts')();
const bills = require('../models/Bills')();

const queryBills = function (mongo, next) {
  bills.findForAcct(mongo, 60).then((docs) => {
    console.log('************** TEST **************...');
    docs.forEach(function (row) {
      console.log(JSON.stringify(row));
    });
    console.log('************** DONE TEST **************...');
    return next();
  }).catch((err) => {
    console.log(err);
    return next();
  });
};

const queryAccounts = function (mongo, next) {
  accounts.findForCityActive(mongo, 20140301).then((docs) => {
    console.log('************** TEST **************...');
    docs.forEach(function (row) {
      console.log(JSON.stringify(row));
    });
    console.log('************** DONE TEST **************...');
    return next();
  }).catch((err) => {
    console.log(err);
    return next();
  });
};

const query = function () {
  mongo.connect(function (mongo) {
    queryAccounts(mongo, function (err) {
      if(err) {
        console.log(err);
      }
      mongo.close();
    });
  });
};

query();
