'use strict';

const model = require('./Model');
const ShopModel = function ShopModel() {
  // do nothing.
};

ShopModel.prototype = model('shops');
ShopModel.prototype.findCostco = function findCostco(db) {
  return db.get(this.collection).find({name: 'Costco'});
};

module.exports = function exp() {
  return new ShopModel();
};
