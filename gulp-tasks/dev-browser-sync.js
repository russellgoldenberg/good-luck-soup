var gulp = require('gulp');
var browserSync = require('browser-sync');

//start server then watch files
gulp.task('dev-browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: './dev'
		}
	});

	gulp.start('dev-watch');
});