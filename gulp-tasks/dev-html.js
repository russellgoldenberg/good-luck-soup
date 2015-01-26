var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');

//combine all html parts
gulp.task('dev-html', function() {
	return gulp.src('src/html/builds/dev.html')
		.pipe(fileinclude())
		.pipe(rename('index.html'))
		.pipe(gulp.dest('dev'))
		.pipe(browserSync.reload({stream:true}));
});