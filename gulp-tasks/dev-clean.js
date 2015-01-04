var gulp = require('gulp');
var clean = require('gulp-clean');

//clear all dev folders and sass cache
gulp.task('dev-clean', function() {
	return gulp.src(['.sass-cache', 'dev'], {read: false})
		.pipe(clean());
});