var gulp = require('gulp');
var haml = require('gulp-ruby-haml');
var sass = require('gulp-sass');

// gulp.task('haml', function(){
// 	gulp.src('site/uncompiled/haml/index.haml')
// 		.pipe(haml({
// 		  compiler: 'creationix'
// 		}))
// 		.pipe(gulp.dest('site/compiled'));
// });

gulp.task('haml', function(){
	gulp.src('site/uncompiled/haml/index.haml')
		.pipe(haml({
		  trace: true
		}))
		.pipe(gulp.dest('site/compiled'));
});

gulp.task('sass', function(){
	gulp.src('site/uncompiled/sass/styles.scss')
		.pipe(sass({
			outputStyle: 'expanded',
			sourceComments: true
		}).on('error', sass.logError))
		.pipe(gulp.dest('site/compiled'))
});

gulp.task('watch', function(){
	gulp.watch('site/uncompiled/sass/*.scss', ['sass'])
	gulp.watch('site/uncompiled/haml/*.haml', ['haml'])
});

gulp.task('default', ['haml', 'sass', 'watch']);