var gulp = require('gulp');

//watch files for changes
gulp.task('watch-dev', function(callback) {
	// .html files
	gulp.watch('src/html/**/*', ['html-dev']);
	// .scss files
	gulp.watch('src/css/**/*.scss', ['css-dev']);
	// .js files
	gulp.watch('src/js/*.js', ['js-dev']);
	//  img files
	gulp.watch('src/img/**/*', ['img-dev']);
	//  video files
	gulp.watch('src/video/**/*', ['img-dev']);
});
