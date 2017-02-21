'use strict';

const model = require('./Model');
const UserModel = function UserModel() {
  // do nothing
};

UserModel.prototype = model('users');
UserModel.prototype.checkLogin = function checkLogin(db, uid, pwd) {
  return this.findOne(db, {
    uid: uid,
    pwd: pwd
  });
};

module.exports = function exp() {
  return new UserModel();
};
