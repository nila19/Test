let once = require('once');

function greet(name, cb) {
  // return is missing from the if statement
  // when no name is passed, the callback is called twice
  if (!name) {
    cb('Hello anonymous');
  }
  cb('Hello ' + name);
}

function log(msg) {
  console.log(msg);
}

// this will print 'Hello anonymous' but the logical error will be missed
greet(null, once.strict(log));
