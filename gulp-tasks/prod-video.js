var gulp = require('gulp');

//move videos to prod
gulp.task('prod-video', function() {
	return gulp.src('src/video/**/*')
		.pipe(gulp.dest('prod/assets/video'));
});