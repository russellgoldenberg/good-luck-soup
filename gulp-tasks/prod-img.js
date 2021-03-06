var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

//minify images
gulp.task('prod-img', function() {
	return gulp.src('src/img/**/*')
		.pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
		.pipe(gulp.dest('prod/assets/img'));
});
