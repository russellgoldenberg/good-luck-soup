var gulp = require('gulp');

//move font to prod
gulp.task('prod-font', function() {
	return gulp.src('src/font/**/*')
		.pipe(gulp.dest('prod/assets/font'));
});