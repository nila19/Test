var schools = require('./schools');
var shops = require('./shops');
var contacts = require('./contacts');
var http = require('http');
var url = require('url');

var respond = function(res, data) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(JSON.stringify(data));
  res.end('\n\nHello World!!!');
};

var server = function() {
  http.Server(function(req, res) {
    var qry = url.parse(req.url, true).query;
    console.log('Request received for : ' + JSON.stringify(qry));

    switch (qry.doc ? qry.doc : '') {
      case 'shops':
        shops.find(function(docs) {
          respond(res, docs);
        });
      break;
      case 'schools':
        schools.find(function(docs) {
          respond(res, docs);
        });
      break;
      case 'contacts':
        contacts.find(function(docs) {
          respond(res, docs);
        });
      break;
      default:
        respond(res, {});
    }
  }).listen(1237, '127.0.0.1');
  console.log('Server running @ :1237 ....');
};

server();
