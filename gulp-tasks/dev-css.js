var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');

//compile styl to css and autoprefix
gulp.task('dev-css', function () {
	gulp.src('src/css/main-dev.styl')
        .pipe(stylus())
		.pipe(autoprefixer())
		.pipe(rename('main.css'))
		.pipe(gulp.dest('dev/assets/css'))
		.pipe(browserSync.reload({stream:true}));
});


// var gulp = require('gulp');
// var sass = require('gulp-sass');
// var autoprefixer = require('gulp-autoprefixer');
// var browserSync = require('browser-sync');
// var notify = require('gulp-notify');
// var rename = require('gulp-rename');

// //compile all sass and autoprefix
// gulp.task('dev-css', function() {
// 	gulp.src('src/css/main-dev.scss')
// 	    .pipe(sass().on('error', handleErrors))
// 	    .pipe(autoprefixer({browsers:['last 2 versions'], cascade: false}))
// 		.pipe(rename('main.css'))
// 		.pipe(gulp.dest('dev/assets/css'))
// 		.pipe(browserSync.reload({stream:true}));
// });

// var handleErrors = function() {
// 	var args = Array.prototype.slice.call(arguments);
// 	var error = args[0].message;

// 	notify.onError({
// 	title: 'Sass compile error',
// 	message: 'Be better...'
// 	}).apply(this, args);

// 	console.log(error);
// 	this.emit('end');
// };