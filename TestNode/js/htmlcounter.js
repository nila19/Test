let url = require('url');
let request = require('request');
let cheerio = require('cheerio');
// let once = require('once');
let async = require('async');
let bunyan = require('bunyan');

let log = bunyan.createLogger({
  name: 'myapp',
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
  },
});

// var isUrl = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
// var URL = process.env.URL;
let URL = 'https://bbc.co.uk/';

let html = '';
let resources = [];
let totalSize = 0;

async.series([
  function fetchHTML(cb) {
    request({url: URL, gzip: true}, function(err, res, body) {
      if (!isOK(err, res)) {
        return;
      }
      html = body;
      cb();
    });
  },
  function extractElements(cb) {
    let $ = cheerio.load(html);
    $('script').each(function(index, el) {
      let src = $(this).attr('src');
      if (src) {
        resources.push(src);
      }
    });
    cb();
  },
  function itemSizes(cb) {
    async.each(resources, function(relative, cb2) {
      let resourceUrl = url.resolve(URL, relative);
      request({url: resourceUrl, gzip: true}, function(err, res, body) {
        if (!isOK(err, res)) {
          return;
        }
        if (res.headers['content-length']) {
          totalSize += parseInt(res.headers['content-length'], 10);
        } else {
          totalSize += Buffer.byteLength(body, 'utf8');
        }
        cb2();
      });
    }, function(err) {
      log.info(err ? 'A file failed to process' : 'All files have been processed successfully');
      cb();
    });
  },
  function print() {
    let size = (totalSize / 1024 / 1024).toFixed(2);
    log.info('There are ~ %s resources with a size of %s Mb.', resources.length, size);
  }]);

function isOK(err, res) {
  if (err) {
    throw err;
  }
  if (res.statusCode !== 200) {
    log.error('Bad server response', res.statusCode);
    return 0;
  }
  return 1;
}
