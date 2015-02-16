var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');

//compile all sass and autoprefix and minify
gulp.task('prod-css', function() {
	return sass('src/css/main-prod.scss', {
			style: 'expanded', compass: true
		})
		.pipe(autoprefixer({browsers:['last 2 versions'], cascade: false}))
		.pipe(minifycss())
		.pipe(rename('main.css'))
		.pipe(gulp.dest('.tmp/assets/css'));
});
