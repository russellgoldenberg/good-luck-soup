var gulp = require('gulp');
var clean = require('gulp-clean');

//clean out temp and prod folders
gulp.task('prod-clean', function() {
	return gulp.src(['.tmp', 'prod'], {read: false})
		.pipe(clean());
});