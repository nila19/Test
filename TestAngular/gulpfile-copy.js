dir = {
	src : 'src/main/web',
	temp : 'src/main/temp',
	dest : 'src/main/webout'
};

config = {
	tmpjs : 'modules.js',
	tmpjs2 : 'others.js',
	finaljs : 'app.js',
//	src : {
//		js : dir.src + '/resources/js'
//	},
//	dest : {
//		js : dir.dest + '/resources/js'
//	}
};

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	runSequence = require('run-sequence');

gulp.task('default', ['js']);

//gulp.task('js', function() {
//	gulp.src(dir.src + '/**/*.module.js')
//	.pipe(concat(config.outjs))
//	.pipe(uglify())
////	.pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
//	.pipe(gulp.dest('src/main/webout/'));
//
//	gutil.log('Copied index.htm...');
//});

//gulp.task('js', gulp.series(['js-modules', 'js-others', 'js-merge']));
gulp.task('js', ['js-merge']);

gulp.task('js-modules', function() {
	return gulp.src(dir.src + '/**/*.module.js')
	.pipe(concat(config.tmpjs))
	.pipe(gulp.dest(dir.temp));
});

gulp.task('js-others', function() {
	return gulp.src([dir.src + '/**/*.js', '!' + dir.src + '/**/*.module.js', '!' + dir.src + '/bower_components/**/*.js', '!' + dir.src + '/old/*.js', '!' + dir.src + '/phoneapp/*.js', '!' + dir.src + '/phoneapp/**/*.js'])
	.pipe(concat(config.tmpjs2))
	.pipe(gulp.dest(dir.temp));
});

gulp.task('js-merge', ['js-modules', 'js-others'], function() {
	return gulp.src(dir.temp + '/*.js')
	.pipe(concat(config.finaljs))
	.pipe(gulp.dest(dir.dest));
});

//gulp.task('js2', function() {
//	gulp.task('jsmods')
//	.pipe(gulp.src('src/main/web/**/*.module.js').pipe(concat('modules.js')))
//	.pipe(gulp.dest('src/main/webout/',{overwrite : false}));
//
//	gutil.log('Copied all js...');
//});
