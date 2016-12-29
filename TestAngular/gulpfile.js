var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	streamqueue = require('streamqueue'),
	del = require('del'),
	gulpif = require('gulp-if'),
	plugins = require('gulp-load-plugins')();

//****************************** Intermediate path variables ******************************//
var	dir = {
	src: 'src/main/webdev',
	dest: 'src/main/webapp'
};

var path = {
	excludes : {
		bower: dir.src + '/bower_components/**/*.*',
		old: dir.src + '/old/*.*',
		phone: dir.src + '/phoneapp/**/*.*',
	},
	js: {
		modules: dir.src + '/**/*.module.js',
		all: dir.src + '/**/*.js'
	},
	less: dir.src + '/**/*.less',
	htm: dir.src + '/**/*.htm',
	images: dir.src + '/images/**/*.*'
};

function buildExcludes() {
	var paths = ['!' + path.excludes.bower, '!' + path.excludes.old, '!' + path.excludes.phone];
	for (var i = 0; i < arguments.length; i++) {
		paths.concat('!' + arguments[i]);
	}
	return paths;
}

//*********************** Source & Destination paths used in Tasks ***********************//
var src = {
	js: [path.js.all].concat(buildExcludes()),
	less: [path.less].concat(buildExcludes()),
	htm: [path.htm].concat(buildExcludes()),
	images: [path.images].concat(buildExcludes()),
	bower: path.excludes.bower,
	jsModules: [path.js.modules].concat(buildExcludes()),
	jsOthers: [path.js.all].concat(buildExcludes(path.js.modules))
};

var dest = {
	root: dir.dest,
	images: dir.dest + '/images/',
	bower: dir.dest + '/bower_components/',
	appjs: 'app.js'
};

var flag = {
	prod: !!plugins.util.env.prod,		//gulp --prod
	merge: !!plugins.util.env.merge,	//gulp --merge
	maps: !plugins.util.env.prod,		//Do not generate sourcemaps for --prod
	clean: !plugins.util.env.clean		//gulp --clean
};

//******************************** Tasks ********************************//

gulp.task('default', function() {
	return runSequence('js', 'less', 'htm', 'images', 'bower');
});

gulp.task('watch', ['default'], function() {
	gulp.watch(src.js, ['js']);
	gulp.watch(src.less, ['less']);
	gulp.watch(src.htm, ['htm']);
	gulp.watch(src.images, ['images']);
	plugins.util.log('***** STARTED WATCHING FOR SOURCE CHANGES *****');
});

gulp.task('bower', function() {
	plugins.util.log('Processing bower...');
	return gulp.src(src.bower)
		.pipe(gulp.dest(dest.bower));
});

gulp.task('images', function() {
	plugins.util.log('Processing images...');
	return gulp.src(src.images)
		.pipe(gulp.dest(dest.images));
});

gulp.task('htm', function() {
	plugins.util.log('Processing htm...');
	return gulp.src(src.htm)
		.pipe(gulp.dest(dest.root));
});

gulp.task('less', function() {
	plugins.util.log('Processing less...');
	return gulp.src(src.less)
		.pipe(gulpif(flag.maps, plugins.sourcemaps.init()))
		.pipe(plugins.less())
		.pipe(gulpif(flag.prod, plugins.cleanCss()))
		.pipe(gulpif(flag.maps, plugins.sourcemaps.write('.')))
		.pipe(gulp.dest(dest.root));
});

gulp.task('js', function() {
	plugins.util.log('Processing js...');
	return runSequence('js-jshint', 'js-merge');
});

gulp.task('js-jshint', function() {
	plugins.util.log('Processing js-jshint...');
	return gulp.src(src.js)
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter(plugins.stylish))
		.pipe(plugins.jscs())
		.pipe(plugins.jscs.reporter());
});

gulp.task('js-merge', function() {
	plugins.util.log('Processing js-merge...');
	return streamqueue({objectMode: true}, gulp.src(src.jsModules), gulp.src(src.jsOthers))
		.pipe(gulpif((flag.maps && flag.merge), plugins.sourcemaps.init()))
		.pipe(gulpif(flag.merge, plugins.concat(dest.appjs)))
		.pipe(gulpif(flag.prod, plugins.uglify()))
		.pipe(gulpif((flag.maps && flag.merge), plugins.sourcemaps.write('.')))
		.pipe(gulp.dest(dest.root));
});