var gulp = require('gulp');
var browserSync = require('browser-sync');

//move fonts to dev
gulp.task('dev-font', function() {
	return gulp.src('src/font/**/*')
		.pipe(gulp.dest('dev/assets/font'))
		.pipe(browserSync.reload({stream:true}));
});