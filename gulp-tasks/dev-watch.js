var gulp = require('gulp');

//watch files for changes
gulp.task('dev-watch', function(callback) {
	// .html files
	gulp.watch('src/html/**/*', ['dev-html']);
	// .scss files
	gulp.watch('src/css/**/*.scss', ['dev-css']);
	// .js files
	gulp.watch('src/js/**/*.js', ['dev-js']);
	//  img files
	gulp.watch('src/img/**/*', ['dev-img']);
	//  video files
	gulp.watch('src/video/**/*', ['dev-video']);
	//  audio files
	gulp.watch('src/audio/**/*', ['dev-audio']);
	//  hbs files
	gulp.watch('src/templates/*.hbs', ['dev-templates']);
	//  font files
	gulp.watch('src/font/*.*', ['dev-font']);
});
