var gulp = require('gulp');
var clean = require('gulp-clean');

//clean out temp and prod folders
gulp.task('clean-prod', function() {
	return gulp.src(['.tmp', 'prod'], {read: false})
		.pipe(clean());
});