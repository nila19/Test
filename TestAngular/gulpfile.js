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

var bower = {
	src: opt.dir.src + '/bower_components/',
	files: ['bootstrap/dist/css/bootstrap.css','jquery/dist/jquery.js','angular/angular.js',
			'angular-route/angular-route.js','angular-resource/angular-resource.js',
			'angular-animate/angular-animate.js','less/dist/less.js'],
	dest: opt.dir.dest + '/bower_components/'
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

//******************************** Tasks ********************************//

gulp.task('default', function() {
	return runSequence('js', 'css', 'htm', 'images', 'bower');
});

gulp.task('bower', function() {
	plugins.util.log('Processing all bower...');
	bower.files.forEach(function(file) {
		gulp.src(bower.src + file)
		.pipe(gulp.dest(bower.dest + file));
	});
});

gulp.task('images', function() {
	plugins.util.log('Processing all images...');
	var files = [path.images].concat(buildExcludes());
	return gulp.src(files)
	.pipe(gulp.dest(opt.dir.dest + '/images/'));
});

gulp.task('htm', function() {
	plugins.util.log('Processing all htm...');
	var files = [path.htm].concat(buildExcludes());
	return gulp.src(files)
	.pipe(gulp.dest(opt.dir.dest));
});

gulp.task('css', function() {
	plugins.util.log('Processing all less...');
	var files = [path.less].concat(buildExcludes());
	return gulp.src(files)
	.pipe(gulpif(opt.flag.maps, plugins.sourcemaps.init()))
	.pipe(plugins.less())
	.pipe(gulpif(opt.flag.prod, plugins.cleanCss()))
	.pipe(gulpif(opt.flag.maps, plugins.sourcemaps.write('.')))
	.pipe(gulp.dest(opt.dir.dest));
});

gulp.task('watch', function() {
	gulp.watch(path.js.all, ['jshint']);
});

gulp.task('js', function() {
	return runSequence('jshint', 'clean-dest', 'js-merge');
});

gulp.task('jshint', function() {
	var files = [path.js.all].concat(buildExcludes(path.js.app));
	return gulp.src(files)
	.pipe(plugins.jshint())
	.pipe(plugins.jshint.reporter(plugins.stylish))
	.pipe(plugins.jscs())
	.pipe(plugins.jscs.reporter());
});

gulp.task('clean-dest', function() {
	plugins.util.log('Cleaning dest app.js...');
	return del(path.js.app);
});

gulp.task('js-merge', function() {
	plugins.util.log('Processing all js...');
	var modules = [path.js.modules].concat(buildExcludes());
	var others = [path.js.all].concat(buildExcludes(path.js.modules));

	return streamqueue({objectMode: true}, gulp.src(modules), gulp.src(others))
	.pipe(gulpif((opt.flag.maps && opt.flag.merge), plugins.sourcemaps.init()))
	.pipe(gulpif(opt.flag.merge, plugins.concat(opt.appjs)))
	.pipe(gulpif(opt.flag.prod, plugins.uglify()))
	.pipe(gulpif((opt.flag.maps && opt.flag.merge), plugins.sourcemaps.write('.')))
	.pipe(gulp.dest(opt.dir.dest));
});
