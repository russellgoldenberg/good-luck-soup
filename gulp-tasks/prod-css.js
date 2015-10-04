var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var browserSync = require('browser-sync');

//compile styl to css and autoprefix
gulp.task('prod-css', function () {
	gulp.src('src/css/main-dev.styl')
        .pipe(stylus())
		.pipe(autoprefixer())
	    .pipe(minifycss())
		.pipe(rename('main.css'))
		.pipe(gulp.dest('.tmp/assets/css'));
});