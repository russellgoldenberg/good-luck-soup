var gulp = require('gulp');

//move audios to prod
gulp.task('audio-prod', function() {
	return gulp.src('src/audio/**/*')
		.pipe(gulp.dest('prod/assets/audio'));
});