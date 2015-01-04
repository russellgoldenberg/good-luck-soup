var gulp = require('gulp');
var browserSync = require('browser-sync');

//just move the js files
gulp.task('dev-js', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(gulp.dest('dev/assets/js'))
		.pipe(browserSync.reload({stream:true}));
});