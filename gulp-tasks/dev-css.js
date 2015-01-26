var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var notify = require('gulp-notify');
var rename = require('gulp-rename');

//compile all sass and autoprefix
gulp.task('dev-css', function() {
	return gulp.src('src/css/main-dev.scss')
		.pipe(sass({ style: 'expanded', compass: true}))
		.on('error', handleErrors)
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ios 6', 'android 4'))
		.pipe(rename('main.css'))
		.pipe(gulp.dest('dev/assets/css'))
		.pipe(browserSync.reload({stream:true}));
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
}