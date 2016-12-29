var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	streamqueue = require('streamqueue'),
	del = require('del'),
	gulpif = require('gulp-if'),
	plugins = require('gulp-load-plugins')();

var opt = {
	dir: {
		src: 'src/main/webdev',
		dest: 'src/main/webapp'
	},
	appjs: 'app.js',
	flag: {
		prod: !!plugins.util.env.prod,		//gulp --prod
		maps: !plugins.util.env.prod,
		merge: !!plugins.util.env.merge	//gulp --merge
	}
};

var path = {
	excludes : {
		bower: opt.dir.src + '/bower_components/**/*.*',
		old: opt.dir.src + '/old/*.*',
		phone: opt.dir.src + '/phoneapp/**/*.*',
	},
	js: {
		modules: opt.dir.src + '/**/*.module.js',
		all: opt.dir.src + '/**/*.js',
		app: opt.dir.dest + '/' + opt.appjs,
	},
	less: opt.dir.src + '/**/*.less',
	htm: opt.dir.src + '/**/*.htm',
	images: opt.dir.src + '/images/**/*.*'
};

function buildExcludes() {
	var paths = ['!' + path.excludes.bower, '!' + path.excludes.old, '!' + path.excludes.phone];
	for (var i = 0; i < arguments.length; i++) {
		paths.concat('!' + arguments[i]);
	}
	return paths;
}

var allsrc = {
	js: [path.js.all].concat(buildExcludes()),
	less: [path.less].concat(buildExcludes()),
	htm: [path.htm].concat(buildExcludes()),
	images: [path.images].concat(buildExcludes()),
	jsModules: [path.js.modules].concat(buildExcludes()),
	jsOthers: [path.js.all].concat(buildExcludes(path.js.modules))
};

//******************************** Tasks ********************************//

gulp.task('default', function() {
	runSequence('js', 'less', 'htm', 'images', 'bower');
});

gulp.task('watch', ['default'], function() {
	plugins.util.log('***** STARTED WATCH... *****');
	gulp.watch(allsrc.js, ['js']);
	gulp.watch(allsrc.less, ['less']);
	gulp.watch(allsrc.htm, ['htm']);
	gulp.watch(allsrc.images, ['images']);
});

gulp.task('bower', function() {
	plugins.util.log('Processing bower...');
	return gulp.src(path.excludes.bower)
		.pipe(gulp.dest(opt.dir.dest + '/bower_components/'));
});

gulp.task('images', function() {
	plugins.util.log('Processing images...');
	return gulp.src(allsrc.images)
		.pipe(gulp.dest(opt.dir.dest + '/images/'));
});

gulp.task('htm', function() {
	plugins.util.log('Processing htm...');
	return gulp.src(allsrc.htm)
		.pipe(gulp.dest(opt.dir.dest));
});

gulp.task('less', function() {
	plugins.util.log('Processing less...');
	return gulp.src(allsrc.less)
		.pipe(gulpif(opt.flag.maps, plugins.sourcemaps.init()))
		.pipe(plugins.less())
		.pipe(gulpif(opt.flag.prod, plugins.cleanCss()))
		.pipe(gulpif(opt.flag.maps, plugins.sourcemaps.write('.')))
		.pipe(gulp.dest(opt.dir.dest));
});

gulp.task('js', function() {
	plugins.util.log('Processing js...');
	return runSequence('js-jshint', 'js-merge');
});

gulp.task('js-jshint', function() {
	plugins.util.log('Processing js-jshint...');
	return gulp.src(allsrc.js)
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter(plugins.stylish))
		.pipe(plugins.jscs())
		.pipe(plugins.jscs.reporter());
});

gulp.task('js-merge', function() {
	plugins.util.log('Processing js-merge...');
	return streamqueue({objectMode: true}, gulp.src(allsrc.jsModules), gulp.src(allsrc.jsOthers))
		.pipe(gulpif((opt.flag.maps && opt.flag.merge), plugins.sourcemaps.init()))
		.pipe(gulpif(opt.flag.merge, plugins.concat(opt.appjs)))
		.pipe(gulpif(opt.flag.prod, plugins.uglify()))
		.pipe(gulpif((opt.flag.maps && opt.flag.merge), plugins.sourcemaps.write('.')))
		.pipe(gulp.dest(opt.dir.dest));
});
