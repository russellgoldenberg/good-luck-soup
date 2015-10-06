var gulp = require('gulp');
var uglify = require('gulp-uglify');

//jshint and uglify js files
gulp.task('prod-js', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('.tmp/assets/js'))
});