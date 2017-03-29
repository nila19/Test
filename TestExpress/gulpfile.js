/* eslint no-sync: 'off'*/
// usage of browserify (atomifyJs & atomifyCss)....

'use strict';

const gulp = require('gulp');
const fs = require('fs');
const watchify = require('watchify');
const browserify = require('browserify');
const atomifyJs = require('atomify-js');
const atomifyCss = require('atomify-css');
const stream = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const plugins = require('gulp-load-plugins')();
const _ = require('lodash');

gulp.task('default', ['css', 'js'], function () {
  plugins.util.log('ALL DONE...');
});

gulp.task('css', function () {
  plugins.util.log('STARTING CSS...');
  const customOpts = {
    entries: ['./public/bundle/browserify.vendor.css'],
    output: './public/bundle/browserify/browserify.vendor.css',
    // debug: true,
    compress: true,
  };
  const opts = _.assign({}, atomifyCss.opts, customOpts);

  atomifyCss(opts);
  plugins.util.log('ENDING CSS...');
});

gulp.task('js', function () {
  plugins.util.log('STARTING JS...');
  const customOpts = {
    entries: ['./public/bundle/browserify.vendor.js', './public/bundle/browserify.vendor2.js'],
    // debug: true,
    // minify: true,
    common: true
  };
  const opts = _.assign({}, atomifyJs.opts, customOpts);
  const b = atomifyJs(opts);

  atomifyJs.emitter.on('entry', function (content, bundleNm) {
    plugins.util.log('Bundle = ' + bundleNm + ' :: ');
    fs.writeFileSync('./public/bundle/browserify/'+ bundleNm +'.js', content.toString());
  });

  return b.pipe(stream('common.js'))
  .pipe(buffer())
  .pipe(plugins.sourcemaps.init({loadMaps: true}))
  // .pipe(plugins.uglify())
  .pipe(plugins.sourcemaps.write('./'))
  .pipe(gulp.dest('./public/bundle/browserify'));
});

// using browserify, watchify
gulp.task('browse', function () {
  const customOpts = {
    entries: ['./public/bundle/browserify.vendor.js', './public/bundle/browserify.vendor2.js'],
    debug: true
  };
  const opts = _.assign({}, watchify.args, customOpts);

  return browserify(opts).bundle()
  // log errors if they happen
  .on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'))
  .pipe(stream('all.js'))
  .pipe(buffer())
  .pipe(plugins.sourcemaps.init({loadMaps: true})) // loads map from browserify file
  // add transformation tasks to the pipeline here.
  .pipe(plugins.uglify())
  .pipe(plugins.sourcemaps.write('./')) // writes .map file
  .pipe(gulp.dest('./public/bundle/browserify'));
});
