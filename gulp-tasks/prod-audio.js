var gulp = require('gulp');

//move audios to prod
gulp.task('prod-audio', function() {
	return gulp.src('src/audio/**/*')
		.pipe(gulp.dest('prod/assets/audio'));
});