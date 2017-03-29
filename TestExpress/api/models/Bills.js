/* eslint require-jsdoc: "off" */

'use strict';

const Model = require('./Model2');

class Bills extends Model {
  constructor() {
    super('bills');
  }
  findForCity(db, cityId, paid) {
    const filter = {cityId: cityId, closed: true};

    if(paid) {
      filter.balance = (paid === 'Y') ? 0: {$gt: 0};
    }
    return super.find(db, filter, {fields: {_id: 0}, sort: {billDt: -1}});
  }
  findForCityOpen(db, cityId) {
    return super.find(db, {
      cityId: cityId,
      closed: false
    }, {fields: {_id: 0}, sort: {billDt: -1}});
  }
  findForAcct(db, acctId, paid) {
    const filter = {'account.id': acctId};

    if(paid) {
      filter.balance = (paid === 'Y') ? 0: {$gt: 0};
      filter.closed = true;
    }
    return super.find(db, filter, {fields: {_id: 0}, sort: {billDt: -1}});
  }
  getName(acct, bill) {
    if(bill.id) {
      return acct.name + ' : ' + bill.billDt + ' #' + bill.id;
    } else {
      return acct.name + ' #0';
    }
  }
}

module.exports = function () {
  return new Bills();
};
