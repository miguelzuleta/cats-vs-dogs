var gulp = require('gulp'),
	haml = require('gulp-ruby-haml'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify');

gulp.task('connect', function(){
	connect.server({
		root: 'site/compiled',
		livereload: true
	});
});


gulp.task('haml', function(){
	gulp.src('site/uncompiled/haml/index.haml')
		.pipe(haml({
		  trace: true
		}))
		.pipe(gulp.dest('site/compiled'))
		.pipe(connect.reload());
});

gulp.task('sass', function(){
	gulp.src('site/uncompiled/sass/styles.scss')
		.pipe(sass({
			outputStyle: 'expanded',
			sourceComments: true
		}).on('error', sass.logError))
		.pipe(gulp.dest('site/compiled'))
});

gulp.task('js', function(){
	gulp.src([
		'site/uncompiled/js/keyframes.js',
		'site/uncompiled/js/battle.js'
	])
		.pipe(concat('js.js'))
		.pipe(uglify())
		.pipe(gulp.dest('site/compiled'))
});

gulp.task('partials', function(){
	gulp.src('site/compiled/index.html')
		.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch('site/uncompiled/sass/*.scss', ['sass']);
	gulp.watch('site/uncompiled/haml/*.haml', ['haml']);
	gulp.watch('site/uncompiled/js/*.js', ['js']);
	gulp.watch('site/compiled/**/*.*', ['partials']);
});

gulp.task('default', ['haml', 'sass', 'js', 'connect', 'watch']);