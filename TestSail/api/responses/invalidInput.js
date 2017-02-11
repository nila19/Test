module.exports = function invalidInput() {
  var res = this.res;
  return res.send(420, 'You cannot leave fields empty... Please fill them...');
};
