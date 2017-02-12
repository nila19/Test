/*global Person*/

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
  },

  //Signup method...
  signup: function(req, res) {
    sails.log.silly('UserController.signup() ::  Trying to signup - ' + req.param('email'));
    var Passwords = require('machinepack-passwords');
    // Encrypt a string using the BCrypt algorithm.
    Passwords.encryptPassword({
      password: req.param('password'),
      difficulty: 10
    }).exec({
      error: function(err) {
        sails.log.error('There is some problem in the encryption...', err);
        res.negotiate(err);
      },
      success: function(pwd) {
        Person.create({
          firstName: req.param('firstName'),
          lastName: req.param('lastName'),
          email: req.param('email'),
          password: pwd,
          lastLoggedIn: new Date()
        }, function created(err, newUser) {
          if (err) {
            sails.log.error('UserController.signup() ::  Error in creating Person : ', err);
            // console.log('Error attributes...' + err.invalidAttributes);
            res.invalidInput();
            // res.negotiate(err);
          }
          req.session.me = newUser.id;
          // console.log('Person created...' + newUser);
          return res.json(newUser);
        });
      },
    });
  },

  login: function l(req, res) {
    sails.log.silly('UserController.login() ::  Trying to login - ' + req.param('email'));
    Person.findOne({
      email: req.param('email')
    }, function usr(err, u) {
      if (err) {
        return res.negotiate(err);
      }
      if (!u) {
        return res.notFound();
      }
      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: u.password
      }).exec({
        error: function e(err) {
          sails.log.error('There is some problem in the decryption...', err);
          res.negotiate(err);
        },
        incorrect: function i() {
          sails.log.info('Password does not match...');
          res.notFound();
        },
        success: function s() {
          sails.log.silly('Password matched!!!! ...');
          req.session.me = u.id;
          res.ok();
        }
      });
    });
  },

  logout: function l(req, res) {
    sails.log.silly('UserController.logout() ::  Trying to logout - ' + req.session.me);
    Person.findOne(req.session.me, function usr(err, u) {
      if (err) {
        return res.negotiate(err);
      }
      if (!u) {
        sails.log.warn('Session refers to user who does not exist...', err);
      }
      req.session.me = null;
      return res.backToHomePage();
    });
  }

};
