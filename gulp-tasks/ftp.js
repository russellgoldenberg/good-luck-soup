var gulp = require('gulp');
var ftp = require('gulp-ftp');

gulp.task('ftp', function() {
	return gulp.src(['prod/index.html'])
        .pipe(ftp({
            host: 'russellgoldenberg.com',
            user: 'admin@russellgoldenberg.com',
            pass: 'russell',
            remotePath: '/goodluck'
        }));
});