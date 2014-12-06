var gulp = require('gulp');
var browserSync = require('browser-sync');

//just move the img files
gulp.task('img-dev', function() {
	return gulp.src('src/img/**/*')
		.pipe(gulp.dest('dev/assets/img'))
		.pipe(browserSync.reload({stream:true}));
});