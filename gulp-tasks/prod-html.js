var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var rename = require('gulp-rename');

//combine all html parts
gulp.task('prod-html', function() {
	return gulp.src('src/html/builds/prod.html')
		.pipe(fileinclude())
		.pipe(rename('index.html'))
		.pipe(gulp.dest('.tmp'));
});