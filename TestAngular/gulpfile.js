//const gulp = require('gulp'),
//	util = require('gulp-util'),
//	uglify = require('gulp-uglify'),
//	concat = require('gulp-concat'),
//	jshint = require('gulp-jshint'),
//	stylish = require('jshint-stylish'),
//	jscs = require('gulp-jscs'),
//	sourcemaps = require('gulp-sourcemaps'),
//	less = require('gulp-less'),
//	cleanCss = require('gulp-clean-css')
//	runSequence = require('run-sequence'),
//	del = require('del');

const gulp = require('gulp'),
	runSequence = require('run-sequence'),
	streamqueue = require('streamqueue'),
	del = require('del');
var plugins = require('gulp-load-plugins')();

var dir = {
	src: 'src/main/webapp',
	temp: 'src/main/temp',
	dest: 'src/main/webapp'
};

var config = {
	tmpjs: 'modules.js',
	tmpjs2: 'others.js',
	finaljs: 'app.js',
	prod: !!plugins.util.env.prod
};

var path = {
	bower: dir.src + '/bower_components/**/*.*',
	old: dir.src + '/old/*.*',
	phone: dir.src + '/phoneapp/**/*.*',
	modules: dir.src + '/**/*.module.js',
	alljs: dir.src + '/**/*.js',
	allcss: dir.src + '/**/*.less',
	destjs: dir.dest + '/' + config.finaljs,
	temp: {
		all: dir.temp + '/**/*',
		alljs: dir.temp + '/*.js'
	}
};

function exclude() {
	var p = ['!' + path.bower, '!' + path.old, '!' + path.phone];
	for (var i = 0; i < arguments.length; i++) {
		p.concat('!' + arguments[i]);
	}
	return p;
}

//******************************** Tasks ********************************//

gulp.task('default', ['alljs','css']);

gulp.task('css', function() {
	var files = [path.allcss].concat(exclude());
	return gulp.src(files)
	.pipe(config.prod ? plugins.sourcemaps.init() : plugins.util.noop())
	.pipe(plugins.less())
	.pipe(config.prod ? plugins.cleanCss() : plugins.util.noop())
	.pipe(config.prod ? plugins.sourcemaps.write('.') : plugins.util.noop())
	.pipe(gulp.dest(dir.dest));
});

gulp.task('watch', function() {
	gulp.watch(path.alljs, ['jshint']);
});

gulp.task('alljs', function() {
	return runSequence('jshint', 'clean-dest', 'js-merge');
});

gulp.task('jshint', function() {
	var files = [path.alljs].concat(exclude(path.destjs));
	//TODO - not working. considering the dest js.. why ?
	return gulp.src(files)
	.pipe(plugins.jshint())
	.pipe(plugins.jshint.reporter(plugins.stylish))
	.pipe(plugins.jscs())
	.pipe(plugins.jscs.reporter());
});

gulp.task('clean-dest', function() {
	return del(path.destjs);
});

gulp.task('js-merge', function() {
	var mods = [path.modules].concat(exclude());
	var others = [path.alljs].concat(exclude(path.modules));

	return streamqueue({objectMode: true}, gulp.src(mods), gulp.src(others))
	.pipe(config.prod ? plugins.sourcemaps.init() : plugins.util.noop())
	.pipe(plugins.concat(config.finaljs))
	.pipe(config.prod ? plugins.uglify() : plugins.util.noop())
	.pipe(config.prod ? plugins.sourcemaps.write('.') : plugins.util.noop())
	.pipe(gulp.dest(dir.dest));
});

//gulp.task('clean-temp', function() {
//	return del(path.temp.all);
//});
//
//gulp.task('js-modules', function() {
//	var files = [path.modules].concat(exclude());
//	return gulp.src(files)
//	.pipe(plugins.concat(config.tmpjs))
//	.pipe(gulp.dest(dir.temp));
//});
//
//gulp.task('js-others', function() {
//	var files = [path.alljs].concat(exclude(path.modules));
//	return gulp.src(files)
//	.pipe(plugins.concat(config.tmpjs2))
//	.pipe(gulp.dest(dir.temp));
//});
//
//gulp.task('js-merge2', function() {
//	return gulp.src(path.temp.alljs)
//	.pipe(config.prod ? plugins.sourcemaps.init() : plugins.util.noop())
//	.pipe(plugins.concat(config.finaljs))
//	.pipe(config.prod ? plugins.uglify() : plugins.util.noop())
//	.pipe(config.prod ? plugins.sourcemaps.write('.') : plugins.util.noop())
//	.pipe(gulp.dest(dir.dest));
//});
