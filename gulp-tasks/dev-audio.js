var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('dev-audio', function() {
	return gulp.src('src/audio/**/*')
		.pipe(gulp.dest('dev/assets/audio'))
		.pipe(browserSync.reload({stream:true}));
});