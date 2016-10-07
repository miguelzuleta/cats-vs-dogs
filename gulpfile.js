var gulp = require('gulp'),
	haml = require('gulp-ruby-haml'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	gIF = require('gulp-if'),
	uglify = require('gulp-uglify'),
	scssLint = require('gulp-scss-lint');

var env = process.env.NODE_ENV || 'envDev',
	dir,
	cssOutput,
	cssComments;

if(env === 'envDev'){
	dir = 'site/dev';
	cssOutput = 'expanded';
	cssComments = true;
} else{
	dir = 'site/prod';
	cssOutput = 'compressed';
	cssComments = false;
}

gulp.task('connect', function(){
	connect.server({
		root: dir,
		livereload: true
	});
});


gulp.task('haml', function(){
	gulp.src('site/components/haml/index.haml')
		.pipe(haml({
		  trace: true
		}))
		.pipe(gulp.dest(dir))
		.pipe(connect.reload());
});

gulp.task('sass-lint', function(){
	gulp.src('site/components/sass/*.scss')
		.pipe(scssLint({
			'reporterOutput' : 'site/components/_scssReport.json'
		}))
});

gulp.task('sass', function(){
	gulp.src('site/components/sass/styles.scss')
		.pipe(sass({
			outputStyle: cssOutput,
			sourceComments: cssComments
		}).on('error', sass.logError))
		.pipe(gulp.dest(dir))
});

gulp.task('js', function(){
	gulp.src([
		'site/components/js/keyframes.js',
		'site/components/js/battle.js'
	])
		.pipe(concat('js.js'))
		.pipe(gIF(env !== 'envDev', uglify()))
		.pipe(gulp.dest(dir))
});

gulp.task('partials', function(){
	gulp.src(dir + '/index.html')
		.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch('site/components/sass/*.scss', ['sass']);
	gulp.watch('site/components/haml/*.haml', ['haml']);
	gulp.watch('site/components/js/*.js', ['js']);
	gulp.watch(dir + '/**/*.*', ['partials']);
});

gulp.task('default', ['haml', 'sass', 'sass-lint', 'js', 'connect', 'watch']);