var gulp = require('gulp');
var ftp = require('gulp-ftp');

gulp.task('prod-ftp', function() {
	return gulp.src(['prod/**/*'])
        .pipe(ftp({
            host: 'russellgoldenberg.com',
            user: 'admin@russellgoldenberg.com',
            pass: 'russell',
            remotePath: '/goodluck'
        }));
});