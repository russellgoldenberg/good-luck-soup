var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');

//compile all sass and autoprefix and minify
gulp.task('prod-css', function() {
	gulp.src('src/css/main-dev.scss')
	    .pipe(autoprefixer({browsers:['last 2 versions'], cascade: false}))
	    .pipe(minifycss())
		.pipe(rename('main.css'))
		.pipe(gulp.dest('.tmp/assets/css'));
});
