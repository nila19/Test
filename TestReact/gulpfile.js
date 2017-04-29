
'use strict';

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const babel = require('gulp-babel');

const src = {
  js: 'public/js',
  jsx: 'public/jsx/*.jsx'
};

gulp.task('default', ['babel'], function () {
  plugins.util.log('Babel DONE...');
});

gulp.task('watch', ['default'], function () {
  gulp.watch(src.jsx, ['babel']);
  plugins.util.log('***** WATCHING FOR SOURCE CHANGES *****');
});

gulp.task('babel', function () {
  return gulp.src(src.jsx)
    .pipe(babel({
      plugins: ['transform-react-jsx', 'transform-class-properties']
    }))
    .pipe(gulp.dest(src.js));
});

