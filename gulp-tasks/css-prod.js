var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

//compile all sass and autoprefix and minify
gulp.task('css-prod', function() {
	return gulp.src('src/css/main.scss')
		.pipe(sass({ style: 'expanded', compass: true }))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(minifycss())
		.pipe(gulp.dest('.tmp/assets/css'));
});
