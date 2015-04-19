var gulp = require('gulp');
var browserSync = require('browser-sync');

//just move the js files
gulp.task('dev-libs', function() {
	return gulp.src('src/libs/**/*.js')
		.pipe(gulp.dest('dev/assets/js/libs'))
		.pipe(browserSync.reload({stream:true}));
});