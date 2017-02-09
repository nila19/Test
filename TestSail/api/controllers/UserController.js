module.exports = {
  _config: {
    actions: false
  },
  index: function(req, resp) {
    return resp.view('mypg', {
      date: (new Date()).toString(),
      age: 25,
      place: 'Houston'
    });
  }
};
