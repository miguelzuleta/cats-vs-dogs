var gulp = require('gulp'),
	haml = require('gulp-ruby-haml'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify');

gulp.task('connect', function(){
	connect.server({
		root: 'site/dev',
		livereload: true
	});
});


gulp.task('haml', function(){
	gulp.src('site/components/haml/index.haml')
		.pipe(haml({
		  trace: true
		}))
		.pipe(gulp.dest('site/dev'))
		.pipe(connect.reload());
});

gulp.task('sass', function(){
	gulp.src('site/components/sass/styles.scss')
		.pipe(sass({
			outputStyle: 'compressed',
			sourceComments: false
		}).on('error', sass.logError))
		.pipe(gulp.dest('site/dev'))
});

gulp.task('js', function(){
	gulp.src([
		'site/Ï/js/keyframes.js',
		'site/components/js/battle.js'
	])
		.pipe(concat('js.js'))
		.pipe(uglify())
		.pipe(gulp.dest('site/dev'))
});

gulp.task('partials', function(){
	gulp.src('site/dev/index.html')
		.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch('site/components/sass/*.scss', ['sass']);
	gulp.watch('site/components/haml/*.haml', ['haml']);
	gulp.watch('site/components/js/*.js', ['js']);
	gulp.watch('site/dev/**/*.*', ['partials']);
});

gulp.task('default', ['haml', 'sass', 'js', 'connect', 'watch']);