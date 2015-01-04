var gulp = require('gulp');
var fileinclude = require('gulp-file-include');

//combine all html parts
gulp.task('prod-html', function() {
	return gulp.src('src/html/builds/*.html')
		.pipe(fileinclude())
		.pipe(gulp.dest('.tmp'));
});