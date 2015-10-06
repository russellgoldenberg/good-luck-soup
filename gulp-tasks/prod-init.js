var gulp = require('gulp');
var runSequence = require('run-sequence');

// run all prod tasks to deploy
gulp.task('prod-init', function() {
	runSequence(
		'prod-clean',
		'prod-html',
	 	'prod-css',
		'prod-js',
		'prod-libs',
		'prod-libs-jquery',
		// 'prod-img',
		// 'prod-video',
		// 'prod-audio',
		'prod-font',
		'prod-smoosh'
	);
});