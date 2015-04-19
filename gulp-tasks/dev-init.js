var gulp = require('gulp');
var runSequence = require('run-sequence');


//compile everthing first time then start server
gulp.task('dev-init', function() {
	runSequence(
		'dev-clean',
		'dev-html',
		'dev-css',
		'dev-templates',
		'dev-js',
		'dev-libs',
		'dev-img',
		'dev-video',
		'dev-audio',
		'dev-font',
		'dev-browser-sync'
	);
});
