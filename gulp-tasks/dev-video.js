var gulp = require('gulp');
var browserSync = require('browser-sync');

//move videos to dev
gulp.task('dev-video', function() {
	return gulp.src('src/video/**/*')
		.pipe(gulp.dest('dev/assets/video'))
		.pipe(browserSync.reload({stream:true}));
});