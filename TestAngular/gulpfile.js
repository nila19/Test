dir = {
	src : 'src/main/webapp',
	temp : 'src/main/temp',
	dest : 'src/main/webapp'
};

config = {
	ugly : true,
	tmpjs : 'modules.js',
	tmpjs2 : 'others.js',
	finaljs : 'app.js',
};

files = {
	bower : dir.src + '/bower_components/**/*.*',
	old : dir.src + '/old/*.*',
	phone : dir.src + '/phoneapp/**/*.*',
	modules : dir.src + '/**/*.module.js',
	alljs : dir.src + '/**/*.js',
	destjs : dir.dest + '/' + config.finaljs,
	allcss : dir.src + '/**/*.less',
	temp : {
		all : dir.temp + '/**/*',
		alljs : dir.temp + '/*.js'
	}
};

const gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	runSequence = require('run-sequence'),
	del = require('del'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	jscs = require('gulp-jscs'),
	sourcemaps = require('gulp-sourcemaps'),
	less = require('gulp-less');

gulp.task('default', ['alljs']);

gulp.task('css', function() {
	return gulp.src([files.allcss, '!'+files.bower, '!'+files.old, '!'+files.phone])
	.pipe(sourcemaps.init())
	.pipe(less())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(dir.dest));
});

gulp.task('watch', function() {
	gulp.watch(files.alljs, ['jshint']);
});

gulp.task('alljs', function() {
	return runSequence('jshint', ['clean-temp','clean-dest'], ['js-modules', 'js-others'], 'js-merge');
});

gulp.task('jshint', function() {
	return gulp.src([files.alljs, '!'+files.bower, '!'+files.destjs, '!'+files.old, '!'+files.phone])
	.pipe(jshint())
	.pipe(jshint.reporter(stylish))
	.pipe(jscs())
	.pipe(jscs.reporter());
});

gulp.task('clean-temp', function() {
	return del(files.temp.all);
});

gulp.task('clean-dest', function() {
	return del(files.destjs);
});

gulp.task('js-modules', function() {
	return gulp.src([files.modules, '!'+files.bower, '!'+files.old, '!'+files.phone])
	.pipe(concat(config.tmpjs))
	.pipe(gulp.dest(dir.temp));
});

gulp.task('js-others', function() {
	return gulp.src([files.alljs, '!'+files.modules, '!'+files.bower, '!'+files.old, '!'+files.phone])
	.pipe(concat(config.tmpjs2))
	.pipe(gulp.dest(dir.temp));
});

gulp.task('js-merge', function() {
	return gulp.src(files.temp.alljs)
	.pipe(sourcemaps.init())
	.pipe(concat(config.finaljs))
	.pipe(config.ugly ? uglify() : gutil.noop())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(dir.dest));
});
