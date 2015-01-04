var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync');

//combine all html parts
gulp.task('dev-html', function() {
	return gulp.src('src/html/builds/*.html')
		.pipe(fileinclude())
		.pipe(gulp.dest('dev'))
		.pipe(browserSync.reload({stream:true}));
});