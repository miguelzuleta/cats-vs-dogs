'use strict';

var gulp = require('gulp');
var haml = require('gulp-haml');
var sass = require('gulp-sass');

gulp.task('one', function(){
	return gulp.src('uncompiled/haml/index.haml')
		.pipe(haml())
		.pipe(gulp.dest('/compiled'));
});

gulp.task('sass', function(){
	return gulp.src('./uncompiled/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./compiled'))
});

gulp.task('default', ['one', 'sass']);