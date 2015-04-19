var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('prod-libs', function() {
	gulp.src([
			'src/libs/jquery-1.11.2.min.js',
			'src/libs/velocity.min.js',
			'src/libs/noframework.waypoints.min.js',
			'src/libs/inview.min.js',
			'src/libs/handlebars.runtime.min.js',
			'src/libs/jquery.jplayer.min.js',
			'src/libs/raf.min.js'
		])
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('prod/assets/js'));
});

gulp.task('prod-libs-jquery', function() {
	gulp.src('src/libs/jquery-1.11.2.min.js')
		.pipe(gulp.dest('.tmp/assets/js/libs'));
});