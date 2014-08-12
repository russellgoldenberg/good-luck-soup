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
	fileinclude = require('gulp-file-include'),
	browserSync = require('browser-sync');


/*** DEV TASKS ***/

//combine all html parts save out as index.html
gulp.task('html-dev', function() {
	return gulp.src('src/html/builds/dev.html')
		.pipe(fileinclude())
		.pipe(rename('index.html'))
		.pipe(gulp.dest('dev'))
		.pipe(browserSync.reload({stream:true}));
});

//compile all sass and autoprefix
gulp.task('css-dev', function() {
	return gulp.src('src/css/main.scss')
		.pipe(sass({ style: 'expanded', compass: true}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ios 6', 'android 4'))
		.pipe(gulp.dest('dev/assets/css'))
		.pipe(browserSync.reload({stream:true}));
});

//uglify all js (including libs) 
gulp.task('js-dev', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(gulp.dest('dev/assets/js'))
		.pipe(browserSync.reload({stream:true}));
});

//optimize all images that have changed
gulp.task('img-dev', function() {
	return gulp.src('src/img/**/*')
		.pipe(gulp.dest('dev/assets/img'))
		.pipe(browserSync.reload({stream:true}));
});

//clear all dev folders and sass cache
gulp.task('clean-dev', function() {
	return gulp.src(['.sass-cache', 'dev'], {read: false})
		.pipe(clean());
});

//compile everthing first time then start server
gulp.task('init-dev', ['html-dev','css-dev', 'js-dev', 'img-dev'], function() {
	gulp.start('browser-sync');
});

//start server then watch files
gulp.task('browser-sync', function () {
	browserSync.init(null, {
		server: {
			baseDir: './dev',
		},
		ports: {min: 5000, max: 5100}
	});

	gulp.start('watch-dev');
});

gulp.task('watch-dev', function(callback) {

	// Watch .html files
	gulp.watch('src/html/**/*', ['html-dev']);

	// Watch .scss files
	gulp.watch('src/css/**/*.scss', ['css-dev']);

	// Watch .js files (not libraries, just project files)
	gulp.watch('src/js/*.js', ['js-dev']);

	// Watch img files
	gulp.watch('src/img/**/*', ['img-dev']);

});

//clean out dev first time then compile
gulp.task('default', ['clean-dev'], function() {
	gulp.start('init-dev');
});




/*** PROD TASKS ****/

gulp.task('html-prod', function() {
	return gulp.src('src/html/builds/prod.html')
		.pipe(fileinclude())
		.pipe(rename('index.html'))
		.pipe(gulp.dest('dist'));
});

gulp.task('css-prod', function() {
	return gulp.src('src/css/main.scss')
		.pipe(sass({ style: 'expanded', compass: true }))
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
		.pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
		.pipe(gulp.dest('dist/assets/img'));
});

gulp.task('clean-prod', function() {
	return gulp.src(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], {read: false})
		.pipe(clean());
});

gulp.task('prod', ['clean-prod'], function() {
	gulp.start('css-prod', 'js-prod', 'img-prod', 'html-prod');
});