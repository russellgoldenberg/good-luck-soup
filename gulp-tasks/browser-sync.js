var gulp = require('gulp');
var browserSync = require('browser-sync');

//start server then watch files
gulp.task('browser-sync', function () {
	browserSync.init(null, {
		server: {
			baseDir: './dev'
		},
		ports: {min: 5000, max: 5100}
	});

	gulp.start('watch-dev');
});