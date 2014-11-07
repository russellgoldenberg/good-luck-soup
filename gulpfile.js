var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');
var ftp = require('gulp-ftp');
var smoosher = require('gulp-smoosher');



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

//move videos to dev
gulp.task('video-dev', function() {
	return gulp.src('src/video/**/*')
		.pipe(gulp.dest('dev/assets/video'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('audio-dev', function() {
	return gulp.src('src/audio/**/*')
		.pipe(gulp.dest('dev/assets/audio'))
		.pipe(browserSync.reload({stream:true}));
});

//clear all dev folders and sass cache
gulp.task('clean-dev', function() {
	return gulp.src(['.sass-cache', 'dev'], {read: false})
		.pipe(clean());
});

//compile everthing first time then start server
gulp.task('init-dev', ['html-dev','css-dev', 'js-dev', 'img-dev', 'video-dev', 'audio-dev'], function() {
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
gulp.task('prod', ['clean-prod'], function() {
	runSequence(
	 	['css-prod', 'js-prod', 'img-prod', 'video-prod', 'audio-prod', 'html-prod'],
		'smoosh',
		'ftp'
	);
});

gulp.task('html-prod', function() {
	return gulp.src('src/html/builds/prod.html')
		.pipe(fileinclude())
		.pipe(rename('index.html'))
		.pipe(gulp.dest('.tmp'));
});

gulp.task('css-prod', function() {
	return gulp.src('src/css/main.scss')
		.pipe(sass({ style: 'expanded', compass: true }))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(minifycss())
		.pipe(gulp.dest('.tmp/assets/css'));
});

gulp.task('js-prod', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(gulp.dest('.tmp/assets/js'))
});

gulp.task('img-prod', function() {
	return gulp.src('src/img/**/*')
		.pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
		.pipe(gulp.dest('dist/assets/img'));
});

//move videos to dist
gulp.task('video-prod', function() {
	return gulp.src('src/video/**/*')
		.pipe(gulp.dest('dist/assets/video'));
});

//move audios to dist
gulp.task('audio-prod', function() {
	return gulp.src('src/audio/**/*')
		.pipe(gulp.dest('dist/assets/audio'));
});

gulp.task('clean-prod', function() {
	return gulp.src(['.tmp/**/*', 'dist/**/*'], {read: false})
		.pipe(clean());
});

gulp.task('smoosh', function() {
    gulp.src('.tmp/index.html')
        .pipe(smoosher())
        .pipe(gulp.dest('dist'));
});

gulp.task('ftp', function() {
	return gulp.src(['dist/index.html'])
        .pipe(ftp({
            host: 'russellgoldenberg.com',
            user: 'admin@russellgoldenberg.com',
            pass: 'russell',
            remotePath: '/goodluck'
        }));
})