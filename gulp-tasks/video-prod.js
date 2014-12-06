var gulp = require('gulp');

//move videos to prod
gulp.task('video-prod', function() {
	return gulp.src('src/video/**/*')
		.pipe(gulp.dest('prod/assets/video'));
});