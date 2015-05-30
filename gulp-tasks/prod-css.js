var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var notify = require('gulp-notify');

//compile all sass and autoprefix and minify
gulp.task('prod-css', function() {
	gulp.src('src/css/main-dev.scss')
		.pipe(sass().on('error', handleErrors))
	    .pipe(autoprefixer({browsers:['last 2 versions'], cascade: false}))
	    .pipe(minifycss())
		.pipe(rename('main.css'))
		.pipe(gulp.dest('.tmp/assets/css'));
});

var handleErrors = function() {
	var args = Array.prototype.slice.call(arguments);
	var error = args[0].message;

	notify.onError({
	title: 'Sass compile error',
	message: 'Be better...'
	}).apply(this, args);

	console.log(error);
	this.emit('end');
};