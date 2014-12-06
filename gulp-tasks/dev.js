var gulp = require('gulp');
var runSequence = require('run-sequence');


//compile everthing first time then start server
gulp.task('dev', function() {
	runSequence(
		'clean-dev',
		'html-dev',
		'css-dev',
		'js-dev',
		'img-dev',
		'video-dev',
		'audio-dev',
		'browser-sync'
	);
});
