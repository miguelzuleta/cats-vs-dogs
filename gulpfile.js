var gulp = require('gulp'),
	haml = require('gulp-ruby-haml'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect');

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

gulp.task('partials', function(){
	gulp.src('site/uncompiled/**/*.*')
		.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch('site/uncompiled/sass/*.scss', ['sass']);
	gulp.watch('site/uncompiled/haml/*.haml', ['haml']);
	gulp.watch('site/uncompiled/**/*.*', ['partials']);
});

gulp.task('default', ['haml', 'sass', 'connect', 'watch']);