/*global Person*/

module.exports = {
  showHomePage: function(req, res) {
    sails.log.info('Session is ... ', req.session.me);
    if (!req.session.me) {
      return res.view('homepage');
    }

    Person.findOne(req.session.me, function(err, u) {
      if (err) {
        return res.negotiate(err);
      }
      if (!u) {
        sails.log.warn('User id on the session is invalid... ', req.session.me);
        return res.view('homepage');
      }

      return res.view('dashboard', {
        me: {
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          lastLoggedIn: u.lastLoggedIn
        }
      });
    });

  }
};
