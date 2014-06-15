var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	fileinclude = require('gulp-file-include');

var express = require('express');
var LIVERELOAD_PORT = 35729;
var EXPRESS_PORT = 5000;

// dev tasks
gulp.task('html-dev', function() {
	return gulp.src('src/html/builds/dev.html')
		.pipe(fileinclude())
		.pipe(rename('index.html'))
		.pipe(gulp.dest('dev'));
});

gulp.task('css-dev', function() {
	return gulp.src('src/css/main.scss')
		.pipe(sass({ style: 'expanded', compass: true}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('dev/assets/css'))
});

gulp.task('js-dev', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dev/assets/js'));
});

gulp.task('js-dev-watch', function() {
	return gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dev/assets/js'));
});

gulp.task('img-dev', function() {
	return gulp.src('src/img/**/*')
		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest('dev/assets/img'));
});


gulp.task('clean-dev', function() {
	return gulp.src(['dev/assets/css', 'dev/assets/js', 'dev/assets/img'], {read: false})
		.pipe(clean());
});

gulp.task('default', ['clean-dev'], function() {
	gulp.start('init-dev');
});

gulp.task('init-dev', ['html-dev','css-dev', 'js-dev', 'img-dev'], function() {
	gulp.start('watch');
});

gulp.task('watch', function(callback) {
	runServer(startLivereload);
	callback && callback();
});

// prod tasks

gulp.task('html-prod', function() {
	return gulp.src('src/html/builds/prod.html')
		.pipe(fileinclude())
		.pipe(rename('index.html'))
		.pipe(gulp.dest('dist'));
});

gulp.task('css-prod', function() {
	return gulp.src('src/css/main.scss')
		.pipe(sass({ style: 'expanded' }))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('dist/assets/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/assets/css'));
});

gulp.task('js-prod', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/assets/js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/assets/js'));
});

gulp.task('img-prod', function() {
	return gulp.src('src/img/**/*')
		.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(gulp.dest('dist/assets/img'));
});

gulp.task('clean-prod', function() {
	return gulp.src(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], {read: false})
		.pipe(clean());
});

gulp.task('prod', ['clean-prod'], function() {
	gulp.start('css-prod', 'js-prod', 'img-prod');
});


// start server
function runServer(callback) {

	var app = express();
	
	app.use(express.static(__dirname + '/dev'));
	app.listen(EXPRESS_PORT);

	callback && callback();
}

// start livereload
function startLivereload() {
	var server = livereload(LIVERELOAD_PORT);

	// Watch .html files
	gulp.watch('src/html/**/*', ['html-dev']);

	// Watch .scss files
	gulp.watch('src/css/**/*.scss', ['css-dev']);

	// Watch .js files (not libraries, just project files)
	gulp.watch('src/js/*.js', ['js-dev-watch']);

	// Watch img files
	gulp.watch('src/img/**/*', ['img-dev']);

	// Watch dev files and reload
	gulp.watch(['dev/**/*']).on('change', function(file) {
		server.changed(file.path);
	});

	console.log('[gulp] Starting up a fresh batch of awesome!');
}