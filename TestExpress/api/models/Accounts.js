/* eslint require-jsdoc: "off", no-invalid-this: "off" */

'use strict';

const Model = require('./Model2');
const bills = require('../models/Bills')();
const Promise = require('bluebird');

class Accounts extends Model {
  constructor() {
    super('accounts');
  }
  findForCityActive(db, cityId) {
    const vm = this;

    return new Promise(function (resolve, reject) {
      const promises = [];
      let accts = null;

      vm.find(db, {cityId: cityId, active: true}, {fields: {_id: 0}, sort: {seq: 1}}).then((acs) => {
        accts = acs;
        accts.forEach(function (acct) {
          promises.push(injectLastBill(db, acct));
          promises.push(injectOpenBill(db, acct));
        });
        return Promise.all(promises);
      }).then(() => {
        return resolve(accts);
      }).catch((err) => {
        return reject(err);
      });
    });
  }
  findForCityInactive(db, cityId) {
    return super.find(db, {cityId: cityId, active: false}, {fields: {_id: 0}, sort: {seq: 1}});
  }
  findBillable(db, cityId) {
    return super.find(db, {cityId: cityId, active: true, billed: true}, {fields: {_id: 0}, sort: {seq: 1}});
  }
  findById(db, id) {
    const vm = this;

    return new Promise(function (resolve, reject) {
      let acct = null;

      vm.findOne(db, {id: id}).then((ac) => {
        acct = ac;
        const promises = [];

        promises.push(injectLastBill(db, acct));
        promises.push(injectOpenBill(db, acct));
        return Promise.all(promises);
      }).then(() => {
        return resolve(acct);
      }).catch((err) => {
        return reject(err);
      });
    });
  }
}

const injectLastBill = function (db, acct) {
  return new Promise(function (resolve, reject) {
    if(!acct.billed || !acct.bills.last || !acct.bills.last.id) {
      return resolve(acct);
    }
    bills.findById(db, acct.bills.last.id).then((bill) => {
      acct.bills.last = bill;
      return resolve(acct);
    }).catch((err) => {
      return reject(err);
    });
  });
};
const injectOpenBill = function (db, acct) {
  return new Promise(function (resolve, reject) {
    if(!acct.billed || !acct.bills.open || !acct.bills.open.id) {
      return resolve(acct);
    }
    bills.findById(db, acct.bills.open.id).then((bill) => {
      acct.bills.open = bill;
      return resolve(acct);
    }).catch((err) => {
      return reject(err);
    });
  });
};

module.exports = function () {
  return new Accounts();
};
