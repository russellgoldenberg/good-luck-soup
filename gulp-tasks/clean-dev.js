var gulp = require('gulp');
var clean = require('gulp-clean');

//clear all dev folders and sass cache
gulp.task('clean-dev', function() {
	return gulp.src(['.sass-cache', 'dev'], {read: false})
		.pipe(clean());
});