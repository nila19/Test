let gulp = require('gulp');
let runSequence = require('run-sequence');
let gulpif = require('gulp-if');
let plugins = require('gulp-load-plugins')();

//* ***************************** Intermediate path variables ******************************//
let dir = {
  root: './',
  public: './public',
};

let path = {
  public: {
    excludes: {
      node_modules: dir.root + '/node_modules/**/*.*',
      bower: dir.public + '/bower_components/**/*.*',
    },
    js: dir.public + '/**/*.js',
    less: dir.public + '/**/*.less',
    htm: dir.public + '/**/*.htm',
    images: dir.public + '/images/**/*.*',
  },
  server: {
    js: {
      api: dir.root + '/api/**/*.js',
      bin: dir.root + '/bin/**/*.js',
      routes: dir.root + '/routes/**/*.js',
      utils: dir.root + '/utils/**/*.js',
    },
    ejs: dir.root + '/views/**/*.ejs',
  },
};

//* ********************** Source & Destination paths used in Tasks ***********************//
let flag = {
  prod: !!plugins.util.env.prod, // gulp --prod
  merge: !!plugins.util.env.merge, // gulp --merge
  maps: !!plugins.util.env.maps, // gulp --merge
};

let src = {
  public: {
    js: [path.public.js].concat(buildExcludes()),
    less: [path.public.less].concat(buildExcludes()),
  },
  server: {
    js: toArray(path.server.js).concat(buildExcludes()),
    ejs: [path.server.ejs].concat(buildExcludes()),
  },
};

//* ******************************* Tasks ********************************//
gulp.task('default', function(next) {
  return runSequence('server', 'public', function() {
    log('default', 'END');
    log('COMPLETED ALL DEFAULT TASKS');
    next();
  });
});

gulp.task('watch', ['default'], function() {
  gulp.watch(src.public.js, ['public-js']);
  gulp.watch(src.public.less, ['public-less']);
  gulp.watch(src.server.js, ['server-js']);
  gulp.watch(src.server.ejs, ['server.ejs']);
  log('WATCHING FOR SOURCE CHANGES');
});

gulp.task('server', function(next) {
  return runSequence('server-js', function() {
    log('SERVER processing', 'COMPLETED');
    next();
  });
});

gulp.task('server-js', function() {
  return gulp
    .src(src.server.js)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
});

// Unused
gulp.task('server-ejs', function() {
  return gulp
    .src(src.server.ejs)
    .pipe(plugins.ejs());
});

gulp.task('public', function(next) {
  return runSequence('public-js', 'public-less', function() {
    log('PUBLIC processing', 'COMPLETED');
    next();
  });
});

gulp.task('public-js', function() {
  return gulp
    .src(src.public.js)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
});

gulp.task('public-less', function() {
  return gulp
    .src(src.public.less)
    .pipe(plugins.less())
    .pipe(gulpif(flag.prod, plugins.cleanCss()));
});

//* ***************************** Functions ******************************//
function buildExcludes(...args) {
  // Add the declared paths from path.public.excludes to the array.
  let paths = toArray(path.public.excludes);
  // Add any additional paths arguments to the array.
  paths = paths.concat(args);
  // Negate the path names.
  let excludes = [];
  for (let i = 0; i < paths.length; i++) {
    excludes.push('!' + paths[i]);
  }
  return excludes;
}

function toArray(obj) {
  let arr = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push(obj[key]);
    }
  }
  return arr;
}

function log(task, status) {
  log(status + ' :: ' + task);
}

function log(msg) {
  let util = plugins.util;
  util.log('********** ' + msg + ' **********');
}
