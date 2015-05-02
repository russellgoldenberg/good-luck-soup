var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var gm = require('gulp-gm');
var rimraf = require('gulp-rimraf');
var argv = require('minimist')(process.argv.slice(2));
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var fs = require('fs');

var sizes = {
	small: 640,
	medium: 960,
	large: 1280
};


//resize

gulp.task('resize', ['clean'], function() {
	//do it all homie
	runSequence(
		'resize-large',
		'resize-medium',
		'resize-small'
	);
});

gulp.task('resize-large', function() {
	var src = 'raw/**/*.jpg';
	gulp.src(src)
		.pipe(gm(function (gmfile) {
			return gmfile
			.resize(sizes.large)
		}))
		.pipe(rename(function (path) {
	        path.dirname += '/' + sizes.large;
	    }))
		.pipe(gulp.dest('input'));
});

gulp.task('resize-medium', function() {
	var src = 'raw/**/*.jpg';
	gulp.src(src)
		.pipe(gm(function (gmfile) {
			return gmfile
			.resize(sizes.medium)
		}))
		.pipe(rename(function (path) {
	        path.dirname += '/' + sizes.medium;
	    }))
		.pipe(gulp.dest('input'));
});


gulp.task('resize-small', function() {
	var src = 'raw/**/*.jpg';
	gulp.src(src)
		.pipe(gm(function (gmfile) {
			return gmfile
			.resize(sizes.small)
		}))
		.pipe(rename(function (path) {
	        path.dirname += '/' + sizes.small;
	    }))
		.pipe(gulp.dest('input'));
});

//take everything in the deepest _folder and combine tog


//sprites
gulp.task('sprite-large', function() {
	 // Generate our spritesheet

	var path = 'input/' + _name + '/' + _folder + '/' + sizes.large + '/';

	fs.readdir(path, function(err,files) {
		if(!err && files.length > 0) {

			for(var i = 0; i < files.length; i++) {
				files[i] = path + files[i];
			}

			var src = files[0];

			gulp.src(src)
			.pipe(gm(function (gmfile) {
				return gmfile
					.append(files[1],files[2],files[3],files[4])
			}))
			.pipe(rename(function (path) {
		        path.basename = sizes.large + '-' + _folder + '-' + _name;
		    }))
			.pipe(gulp.dest('output'));
		}
	});
});


gulp.task('sprite-medium', function() {
	var path = 'input/' + _name + '/' + _folder + '/' + sizes.medium + '/';

	fs.readdir(path, function(err,files) {
		if(!err && files.length > 0) {

			for(var i = 0; i < files.length; i++) {
				files[i] = path + files[i];
			}

			var src = files[0];

			gulp.src(src)
			.pipe(gm(function (gmfile) {
				return gmfile
					.append(files[1],files[2],files[3],files[4])
			}))
			.pipe(rename(function (path) {
		        path.basename = sizes.medium + '-' + _folder + '-' + _name;
		    }))
			.pipe(gulp.dest('output'));
		}
	});
});


gulp.task('sprite-small', function() {
	var path = 'input/' + _name + '/' + _folder + '/' + sizes.small + '/';

	fs.readdir(path, function(err,files) {
		if(!err && files.length > 0) {

			for(var i = 0; i < files.length; i++) {
				files[i] = path + files[i];
			}

			var src = files[0];

			gulp.src(src)
			.pipe(gm(function (gmfile) {
				return gmfile
					.append(files[1],files[2],files[3],files[4])
			}))
			.pipe(rename(function (path) {
		        path.basename = sizes.small + '-' + _folder + '-' + _name;
		    }))
			.pipe(gulp.dest('output'));
		}
	});
});

gulp.task('sprite-placeholder', function() {
	var path = 'input/' + _name + '/' + _folder + '/' + sizes.medium + '/';

	if(_folder === 'a') {
		fs.readdir(path, function(err,files) {
			if(!err && files.length > 0) {
				var src = path + files[0];

				gulp.src(src)
				.pipe(rename(function (path) {
			        path.basename = 'placeholder-' + _name;
			    }))
				.pipe(gulp.dest('output/placeholders'));
			}
		});
	}
});

gulp.task('placeholder', function() {
	//placeholder
	var path = 'output/placeholders/*.jpg';
	// fs.readdir(path, function(err,files) {
	// 	for(var i = 0; i < files.length; i++) {
	// 		files[i] = path + files[i];
	// 	}

	// 	var src = files[0];

		gulp.src(path)
			.pipe(gm(function (gmfile) {
				return gmfile
				// .append(files[1],files[2],files[3],files[4],files[5],files[6],files[7],files[8],files[9])
				.noProfile()
				.quality(40)
				.blur(4,1)
				.interlace('Line')
			}))
			// .pipe(rename(function(path) {
			// 	path.basename = 'placeholders'
			// }))
			.pipe(gulp.dest('optimized'));	
	// });
});	


gulp.task('optimize', function () {
	var src = 'output/*.jpg';
	var quality = 80;
	gulp.src(src)
		.pipe(gm(function (gmfile) {
			return gmfile
			.noProfile()
			.quality(quality)
			.interlace('Line')
		}))
		.pipe(gulp.dest('optimized'));
});

gulp.task('clean', function() {
	return gulp.src(['output','optimized', 'input'], { read: false })
		.pipe(rimraf());
});



gulp.task('sprite', function() {
	_name = argv.n;
	_folder = argv.f;
	if(_name && _folder) {
		runSequence(
			'sprite-large',
			'sprite-medium',
			'sprite-small',
			'sprite-placeholder'
		);
	}
});
