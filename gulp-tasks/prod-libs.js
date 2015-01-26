var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('prod-libs', function() {
	gulp.src(['src/js/libs/jquery-1.11.2.min.js','src/js/libs/velocity.min.js','src/js/libs/noframework.waypoints.min.js','src/js/libs/inview.min.js','src/js/libs/handlebars.runtime.min.js'])
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('prod/assets/js'));
});