module.exports = function backToHomePage(code) {
  var req = this.req;
  var res = this.res;

  if(req.wantsJSON){
    return res.send(code || 200);
  }

  return res.redirect('/');
};
