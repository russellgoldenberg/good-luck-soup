var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('audio-dev', function() {
	return gulp.src('src/audio/**/*')
		.pipe(gulp.dest('dev/assets/audio'))
		.pipe(browserSync.reload({stream:true}));
});